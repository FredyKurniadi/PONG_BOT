#include <stdint.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>

#ifdef _WIN32
#define DT_API __declspec(dllexport)
#else
#define DT_API
#endif

typedef struct {
  int left;
  int right;
  int feature;
  float threshold;
  int predicted_class;
  int is_leaf;
  float* class_counts;
} DTNode;

typedef struct {
  int max_depth;
  int min_samples_leaf;
  int min_samples_split;
  int max_thresholds_per_feature;

  int num_classes;
  int num_features;

  DTNode* nodes;
  int num_nodes;
  int cap_nodes;
} DTModel;

typedef struct {
  int feature;
  float threshold;
  float loss;
  int left_count;
  int right_count;
} SplitResult;

static int compare_float(const void* a, const void* b) {
  float x = *(const float*)a;
  float y = *(const float*)b;
  if (x < y) return -1;
  if (x > y) return 1;
  return 0;
}

static float gini_from_counts(const float* counts, int num_classes) {
  float total = 0.0f;
  for (int i = 0; i < num_classes; ++i) {
    total += counts[i];
  }
  if (total <= 0.0f) {
    return 0.0f;
  }

  float sum_sq = 0.0f;
  for (int i = 0; i < num_classes; ++i) {
    float p = counts[i] / total;
    sum_sq += p * p;
  }
  return 1.0f - sum_sq;
}

static int ensure_node_capacity(DTModel* model, int needed) {
  if (needed <= model->cap_nodes) {
    return 1;
  }

  int next_cap = model->cap_nodes <= 0 ? 64 : model->cap_nodes;
  while (next_cap < needed) {
    next_cap *= 2;
  }

  DTNode* next_nodes = (DTNode*)realloc(model->nodes, (size_t)next_cap * sizeof(DTNode));
  if (!next_nodes) {
    return 0;
  }

  model->nodes = next_nodes;
  model->cap_nodes = next_cap;
  return 1;
}

static int add_node(DTModel* model) {
  if (!ensure_node_capacity(model, model->num_nodes + 1)) {
    return -1;
  }

  int idx = model->num_nodes;
  DTNode* node = &model->nodes[idx];
  node->left = -1;
  node->right = -1;
  node->feature = -2;
  node->threshold = -2.0f;
  node->predicted_class = 0;
  node->is_leaf = 1;
  node->class_counts = (float*)calloc((size_t)model->num_classes, sizeof(float));
  if (!node->class_counts) {
    return -1;
  }

  model->num_nodes += 1;
  return idx;
}

static void free_nodes(DTModel* model) {
  if (!model->nodes) {
    return;
  }

  for (int i = 0; i < model->num_nodes; ++i) {
    free(model->nodes[i].class_counts);
    model->nodes[i].class_counts = NULL;
  }
  free(model->nodes);
  model->nodes = NULL;
  model->num_nodes = 0;
  model->cap_nodes = 0;
}

static int all_same_class(const int64_t* y, const int* indices, int count) {
  if (count <= 1) {
    return 1;
  }

  int64_t first = y[indices[0]];
  for (int i = 1; i < count; ++i) {
    if (y[indices[i]] != first) {
      return 0;
    }
  }
  return 1;
}

static int compute_node_counts(
  const int64_t* y,
  const float* w,
  const int* indices,
  int count,
  int num_classes,
  float* out_counts,
  int* out_pred_class
) {
  for (int c = 0; c < num_classes; ++c) {
    out_counts[c] = 0.0f;
  }

  for (int i = 0; i < count; ++i) {
    int cls = (int)y[indices[i]];
    if (cls < 0 || cls >= num_classes) {
      return 0;
    }
    out_counts[cls] += w[indices[i]];
  }

  int best = 0;
  for (int c = 1; c < num_classes; ++c) {
    if (out_counts[c] > out_counts[best]) {
      best = c;
    }
  }

  *out_pred_class = best;
  return 1;
}

static int build_threshold_candidates(
  const float* x,
  const int* indices,
  int count,
  int n_features,
  int feature,
  int max_thresholds,
  float** out_thresholds,
  int* out_count
) {
  *out_thresholds = NULL;
  *out_count = 0;
  if (count <= 1) {
    return 1;
  }

  float* values = (float*)malloc((size_t)count * sizeof(float));
  if (!values) {
    return 0;
  }

  for (int i = 0; i < count; ++i) {
    int row = indices[i];
    values[i] = x[(size_t)row * (size_t)n_features + (size_t)feature];
  }

  qsort(values, (size_t)count, sizeof(float), compare_float);

  float* unique_vals = (float*)malloc((size_t)count * sizeof(float));
  if (!unique_vals) {
    free(values);
    return 0;
  }

  int unique_count = 0;
  for (int i = 0; i < count; ++i) {
    if (i == 0 || values[i] != values[i - 1]) {
      unique_vals[unique_count++] = values[i];
    }
  }

  free(values);

  if (unique_count <= 1) {
    free(unique_vals);
    return 1;
  }

  int mids_count = unique_count - 1;
  float* mids = (float*)malloc((size_t)mids_count * sizeof(float));
  if (!mids) {
    free(unique_vals);
    return 0;
  }

  for (int i = 0; i < mids_count; ++i) {
    mids[i] = 0.5f * (unique_vals[i] + unique_vals[i + 1]);
  }
  free(unique_vals);

  int final_count = mids_count;
  if (final_count > max_thresholds && max_thresholds > 0) {
    final_count = max_thresholds;
  }

  float* final = (float*)malloc((size_t)final_count * sizeof(float));
  if (!final) {
    free(mids);
    return 0;
  }

  if (final_count == mids_count) {
    memcpy(final, mids, (size_t)mids_count * sizeof(float));
  } else {
    for (int i = 0; i < final_count; ++i) {
      int idx = (int)((long long)i * (long long)(mids_count - 1) / (long long)(final_count - 1));
      final[i] = mids[idx];
    }
  }

  free(mids);

  *out_thresholds = final;
  *out_count = final_count;
  return 1;
}

static int find_best_split(
  DTModel* model,
  const float* x,
  const int64_t* y,
  const float* w,
  const int* indices,
  int count,
  SplitResult* out_best
) {
  out_best->feature = -1;
  out_best->threshold = 0.0f;
  out_best->loss = 1e30f;
  out_best->left_count = 0;
  out_best->right_count = 0;

  float* left_counts = (float*)malloc((size_t)model->num_classes * sizeof(float));
  float* right_counts = (float*)malloc((size_t)model->num_classes * sizeof(float));
  if (!left_counts || !right_counts) {
    free(left_counts);
    free(right_counts);
    return 0;
  }

  for (int feature = 0; feature < model->num_features; ++feature) {
    float* thresholds = NULL;
    int threshold_count = 0;
    if (!build_threshold_candidates(
      x,
      indices,
      count,
      model->num_features,
      feature,
      model->max_thresholds_per_feature,
      &thresholds,
      &threshold_count
    )) {
      free(left_counts);
      free(right_counts);
      return 0;
    }

    for (int t = 0; t < threshold_count; ++t) {
      float th = thresholds[t];
      for (int c = 0; c < model->num_classes; ++c) {
        left_counts[c] = 0.0f;
        right_counts[c] = 0.0f;
      }

      int left_count = 0;
      int right_count = 0;
      float left_w_sum = 0.0f;
      float right_w_sum = 0.0f;

      for (int i = 0; i < count; ++i) {
        int row = indices[i];
        float v = x[(size_t)row * (size_t)model->num_features + (size_t)feature];
        int cls = (int)y[row];
        float wi = w[row];

        if (v <= th) {
          left_count += 1;
          left_w_sum += wi;
          left_counts[cls] += wi;
        } else {
          right_count += 1;
          right_w_sum += wi;
          right_counts[cls] += wi;
        }
      }

      if (left_count < model->min_samples_leaf || right_count < model->min_samples_leaf) {
        continue;
      }

      float total = left_w_sum + right_w_sum;
      if (total <= 0.0f) {
        continue;
      }

      float left_loss = gini_from_counts(left_counts, model->num_classes);
      float right_loss = gini_from_counts(right_counts, model->num_classes);
      float split_loss = (left_w_sum / total) * left_loss + (right_w_sum / total) * right_loss;

      if (split_loss < out_best->loss) {
        out_best->feature = feature;
        out_best->threshold = th;
        out_best->loss = split_loss;
        out_best->left_count = left_count;
        out_best->right_count = right_count;
      }
    }

    free(thresholds);
  }

  free(left_counts);
  free(right_counts);
  return 1;
}

static int split_indices(
  DTModel* model,
  const float* x,
  const int* indices,
  int count,
  int feature,
  float threshold,
  int* left_out,
  int* right_out,
  int* left_count,
  int* right_count
) {
  int l = 0;
  int r = 0;
  for (int i = 0; i < count; ++i) {
    int row = indices[i];
    float v = x[(size_t)row * (size_t)model->num_features + (size_t)feature];
    if (v <= threshold) {
      left_out[l++] = row;
    } else {
      right_out[r++] = row;
    }
  }

  *left_count = l;
  *right_count = r;
  return 1;
}

static int build_tree_recursive(
  DTModel* model,
  const float* x,
  const int64_t* y,
  const float* w,
  const int* indices,
  int count,
  int depth,
  int* out_node_id
) {
  int node_id = add_node(model);
  if (node_id < 0) {
    return 0;
  }

  DTNode* node = &model->nodes[node_id];
  if (!compute_node_counts(y, w, indices, count, model->num_classes, node->class_counts, &node->predicted_class)) {
    return 0;
  }

  if (count < model->min_samples_split || depth >= model->max_depth || all_same_class(y, indices, count)) {
    *out_node_id = node_id;
    return 1;
  }

  SplitResult best;
  if (!find_best_split(model, x, y, w, indices, count, &best)) {
    return 0;
  }

  if (best.feature < 0) {
    *out_node_id = node_id;
    return 1;
  }

  int* left_idx = (int*)malloc((size_t)count * sizeof(int));
  int* right_idx = (int*)malloc((size_t)count * sizeof(int));
  if (!left_idx || !right_idx) {
    free(left_idx);
    free(right_idx);
    return 0;
  }

  int left_count = 0;
  int right_count = 0;
  split_indices(model, x, indices, count, best.feature, best.threshold, left_idx, right_idx, &left_count, &right_count);

  if (left_count < model->min_samples_leaf || right_count < model->min_samples_leaf) {
    free(left_idx);
    free(right_idx);
    *out_node_id = node_id;
    return 1;
  }

  int left_id = -1;
  int right_id = -1;
  if (!build_tree_recursive(model, x, y, w, left_idx, left_count, depth + 1, &left_id)) {
    free(left_idx);
    free(right_idx);
    return 0;
  }
  if (!build_tree_recursive(model, x, y, w, right_idx, right_count, depth + 1, &right_id)) {
    free(left_idx);
    free(right_idx);
    return 0;
  }

  free(left_idx);
  free(right_idx);

  node->is_leaf = 0;
  node->feature = best.feature;
  node->threshold = best.threshold;
  node->left = left_id;
  node->right = right_id;

  *out_node_id = node_id;
  return 1;
}

DT_API void* dt_create(int max_depth, int min_samples_leaf, int min_samples_split, int max_thresholds_per_feature) {
  DTModel* model = (DTModel*)calloc(1, sizeof(DTModel));
  if (!model) {
    return NULL;
  }

  model->max_depth = max_depth;
  model->min_samples_leaf = min_samples_leaf;
  model->min_samples_split = min_samples_split;
  model->max_thresholds_per_feature = max_thresholds_per_feature;
  model->num_classes = 0;
  model->num_features = 0;
  model->nodes = NULL;
  model->num_nodes = 0;
  model->cap_nodes = 0;
  return (void*)model;
}

DT_API void dt_free(void* handle) {
  if (!handle) {
    return;
  }

  DTModel* model = (DTModel*)handle;
  free_nodes(model);
  free(model);
}

DT_API int dt_fit(
  void* handle,
  const float* x,
  int n_samples,
  int n_features,
  const int64_t* y,
  const float* sample_weight,
  int num_classes
) {
  if (!handle || !x || !y || !sample_weight || n_samples <= 0 || n_features <= 0 || num_classes <= 1) {
    return 0;
  }

  DTModel* model = (DTModel*)handle;
  free_nodes(model);

  model->num_classes = num_classes;
  model->num_features = n_features;

  int* indices = (int*)malloc((size_t)n_samples * sizeof(int));
  if (!indices) {
    return 0;
  }
  for (int i = 0; i < n_samples; ++i) {
    indices[i] = i;
  }

  int root = -1;
  int ok = build_tree_recursive(model, x, y, sample_weight, indices, n_samples, 0, &root);
  free(indices);
  if (!ok) {
    free_nodes(model);
    return 0;
  }

  return 1;
}

DT_API int dt_predict(
  void* handle,
  const float* x,
  int n_samples,
  int n_features,
  int64_t* out_pred
) {
  if (!handle || !x || !out_pred || n_samples <= 0 || n_features <= 0) {
    return 0;
  }

  DTModel* model = (DTModel*)handle;
  if (n_features != model->num_features || model->num_nodes <= 0) {
    return 0;
  }

  for (int i = 0; i < n_samples; ++i) {
    int node_id = 0;
    while (1) {
      DTNode* node = &model->nodes[node_id];
      if (node->is_leaf || node->left < 0 || node->right < 0) {
        out_pred[i] = (int64_t)node->predicted_class;
        break;
      }

      float v = x[(size_t)i * (size_t)n_features + (size_t)node->feature];
      node_id = (v <= node->threshold) ? node->left : node->right;
      if (node_id < 0 || node_id >= model->num_nodes) {
        out_pred[i] = (int64_t)node->predicted_class;
        break;
      }
    }
  }

  return 1;
}

DT_API int dt_num_nodes(void* handle) {
  if (!handle) {
    return 0;
  }
  DTModel* model = (DTModel*)handle;
  return model->num_nodes;
}

DT_API int dt_num_classes(void* handle) {
  if (!handle) {
    return 0;
  }
  DTModel* model = (DTModel*)handle;
  return model->num_classes;
}

DT_API int dt_copy_children_left(void* handle, int* out, int len) {
  if (!handle || !out) {
    return 0;
  }
  DTModel* model = (DTModel*)handle;
  if (len < model->num_nodes) {
    return 0;
  }
  for (int i = 0; i < model->num_nodes; ++i) {
    out[i] = model->nodes[i].left;
  }
  return model->num_nodes;
}

DT_API int dt_copy_children_right(void* handle, int* out, int len) {
  if (!handle || !out) {
    return 0;
  }
  DTModel* model = (DTModel*)handle;
  if (len < model->num_nodes) {
    return 0;
  }
  for (int i = 0; i < model->num_nodes; ++i) {
    out[i] = model->nodes[i].right;
  }
  return model->num_nodes;
}

DT_API int dt_copy_feature(void* handle, int* out, int len) {
  if (!handle || !out) {
    return 0;
  }
  DTModel* model = (DTModel*)handle;
  if (len < model->num_nodes) {
    return 0;
  }
  for (int i = 0; i < model->num_nodes; ++i) {
    out[i] = model->nodes[i].feature;
  }
  return model->num_nodes;
}

DT_API int dt_copy_threshold(void* handle, float* out, int len) {
  if (!handle || !out) {
    return 0;
  }
  DTModel* model = (DTModel*)handle;
  if (len < model->num_nodes) {
    return 0;
  }
  for (int i = 0; i < model->num_nodes; ++i) {
    out[i] = model->nodes[i].threshold;
  }
  return model->num_nodes;
}

DT_API int dt_copy_value(void* handle, float* out, int len) {
  if (!handle || !out) {
    return 0;
  }
  DTModel* model = (DTModel*)handle;
  int needed = model->num_nodes * model->num_classes;
  if (len < needed) {
    return 0;
  }

  for (int n = 0; n < model->num_nodes; ++n) {
    for (int c = 0; c < model->num_classes; ++c) {
      out[(size_t)n * (size_t)model->num_classes + (size_t)c] = model->nodes[n].class_counts[c];
    }
  }
  return needed;
}
