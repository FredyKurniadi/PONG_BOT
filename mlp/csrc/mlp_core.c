#include <stdint.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>

#ifdef _WIN32
#define MLP_API __declspec(dllexport)
#else
#define MLP_API
#endif

typedef struct {
  int input_size;
  int sequence_length;
  int flat_size;
  int num_layers;
  int num_classes;
  float dropout;
  uint32_t rng_state;
  int* layer_sizes;
  float** weights;
  float** biases;
} MLPModel;

static uint32_t lcg_next(MLPModel* model) {
  model->rng_state = (1664525u * model->rng_state) + 1013904223u;
  return model->rng_state;
}

static float random_uniform_signed(MLPModel* model) {
  const float inv = 1.0f / 4294967296.0f;
  float u = (float)lcg_next(model) * inv;
  return (u * 2.0f) - 1.0f;
}

static void linear_forward(
  const float* input,
  const float* weight,
  const float* bias,
  int batch,
  int in_dim,
  int out_dim,
  float* out
) {
  for (int b = 0; b < batch; ++b) {
    const float* in_row = input + ((size_t)b * (size_t)in_dim);
    float* out_row = out + ((size_t)b * (size_t)out_dim);

    for (int o = 0; o < out_dim; ++o) {
      float sum = bias[o];
      for (int i = 0; i < in_dim; ++i) {
        sum += in_row[i] * weight[((size_t)i * (size_t)out_dim) + (size_t)o];
      }
      out_row[o] = sum;
    }
  }
}

static void relu_inplace(float* values, int len) {
  for (int i = 0; i < len; ++i) {
    if (values[i] < 0.0f) {
      values[i] = 0.0f;
    }
  }
}

static void apply_dropout_inplace(MLPModel* model, float* values, uint8_t* mask, int len) {
  float keep_prob = 1.0f - model->dropout;
  if (keep_prob <= 0.0f) {
    keep_prob = 1.0f;
  }

  for (int i = 0; i < len; ++i) {
    float r = (float)lcg_next(model) / 4294967296.0f;
    if (r < keep_prob) {
      mask[i] = 1;
      values[i] = values[i] / keep_prob;
    } else {
      mask[i] = 0;
      values[i] = 0.0f;
    }
  }
}

MLP_API void* mlp_create(
  int input_size,
  int sequence_length,
  const int* hidden_sizes,
  int hidden_count,
  int num_classes,
  float dropout,
  uint32_t seed
) {
  if (input_size <= 0 || sequence_length <= 0 || num_classes <= 1 || hidden_count < 0) {
    return NULL;
  }

  MLPModel* model = (MLPModel*)calloc(1, sizeof(MLPModel));
  if (!model) {
    return NULL;
  }

  model->input_size = input_size;
  model->sequence_length = sequence_length;
  model->flat_size = input_size * sequence_length;
  model->num_layers = hidden_count + 1;
  model->num_classes = num_classes;
  model->dropout = dropout;
  model->rng_state = seed == 0 ? 42u : seed;

  model->layer_sizes = (int*)calloc((size_t)model->num_layers + 1u, sizeof(int));
  model->weights = (float**)calloc((size_t)model->num_layers, sizeof(float*));
  model->biases = (float**)calloc((size_t)model->num_layers, sizeof(float*));

  if (!model->layer_sizes || !model->weights || !model->biases) {
    free(model->layer_sizes);
    free(model->weights);
    free(model->biases);
    free(model);
    return NULL;
  }

  model->layer_sizes[0] = model->flat_size;
  for (int i = 0; i < hidden_count; ++i) {
    if (hidden_sizes[i] <= 0) {
      return NULL;
    }
    model->layer_sizes[i + 1] = hidden_sizes[i];
  }
  model->layer_sizes[model->num_layers] = num_classes;

  for (int l = 0; l < model->num_layers; ++l) {
    int in_dim = model->layer_sizes[l];
    int out_dim = model->layer_sizes[l + 1];

    model->weights[l] = (float*)malloc((size_t)in_dim * (size_t)out_dim * sizeof(float));
    model->biases[l] = (float*)calloc((size_t)out_dim, sizeof(float));

    if (!model->weights[l] || !model->biases[l]) {
      for (int k = 0; k <= l; ++k) {
        free(model->weights[k]);
        free(model->biases[k]);
      }
      free(model->layer_sizes);
      free(model->weights);
      free(model->biases);
      free(model);
      return NULL;
    }

    float scale = sqrtf(2.0f / (float)in_dim);
    for (int i = 0; i < in_dim * out_dim; ++i) {
      model->weights[l][i] = random_uniform_signed(model) * scale;
    }
  }

  return (void*)model;
}

MLP_API void mlp_free(void* handle) {
  if (!handle) {
    return;
  }

  MLPModel* model = (MLPModel*)handle;
  for (int l = 0; l < model->num_layers; ++l) {
    free(model->weights[l]);
    free(model->biases[l]);
  }

  free(model->layer_sizes);
  free(model->weights);
  free(model->biases);
  free(model);
}

MLP_API int mlp_num_layers(void* handle) {
  if (!handle) {
    return 0;
  }
  MLPModel* model = (MLPModel*)handle;
  return model->num_layers;
}

MLP_API int mlp_get_layer_shape(void* handle, int layer_idx, int* in_dim, int* out_dim) {
  if (!handle || !in_dim || !out_dim) {
    return 0;
  }

  MLPModel* model = (MLPModel*)handle;
  if (layer_idx < 0 || layer_idx >= model->num_layers) {
    return 0;
  }

  *in_dim = model->layer_sizes[layer_idx];
  *out_dim = model->layer_sizes[layer_idx + 1];
  return 1;
}

MLP_API int mlp_copy_layer_weights(void* handle, int layer_idx, float* out_buffer, int len) {
  if (!handle || !out_buffer) {
    return 0;
  }

  MLPModel* model = (MLPModel*)handle;
  if (layer_idx < 0 || layer_idx >= model->num_layers) {
    return 0;
  }

  int in_dim = model->layer_sizes[layer_idx];
  int out_dim = model->layer_sizes[layer_idx + 1];
  int required = in_dim * out_dim;
  if (len < required) {
    return 0;
  }

  memcpy(out_buffer, model->weights[layer_idx], (size_t)required * sizeof(float));
  return required;
}

MLP_API int mlp_copy_layer_biases(void* handle, int layer_idx, float* out_buffer, int len) {
  if (!handle || !out_buffer) {
    return 0;
  }

  MLPModel* model = (MLPModel*)handle;
  if (layer_idx < 0 || layer_idx >= model->num_layers) {
    return 0;
  }

  int out_dim = model->layer_sizes[layer_idx + 1];
  if (len < out_dim) {
    return 0;
  }

  memcpy(out_buffer, model->biases[layer_idx], (size_t)out_dim * sizeof(float));
  return out_dim;
}

MLP_API int mlp_forward(
  void* handle,
  const float* x,
  int batch,
  int flat_size,
  float* logits_out
) {
  if (!handle || !x || !logits_out || batch <= 0) {
    return 0;
  }

  MLPModel* model = (MLPModel*)handle;
  if (flat_size != model->flat_size) {
    return 0;
  }

  float* current = (float*)malloc((size_t)batch * (size_t)flat_size * sizeof(float));
  if (!current) {
    return 0;
  }
  memcpy(current, x, (size_t)batch * (size_t)flat_size * sizeof(float));

  for (int l = 0; l < model->num_layers; ++l) {
    int in_dim = model->layer_sizes[l];
    int out_dim = model->layer_sizes[l + 1];
    float* next = (float*)malloc((size_t)batch * (size_t)out_dim * sizeof(float));
    if (!next) {
      free(current);
      return 0;
    }

    linear_forward(current, model->weights[l], model->biases[l], batch, in_dim, out_dim, next);
    free(current);

    if (l < model->num_layers - 1) {
      relu_inplace(next, batch * out_dim);
    }

    current = next;
  }

  memcpy(logits_out, current, (size_t)batch * (size_t)model->num_classes * sizeof(float));
  free(current);
  return 1;
}

MLP_API int mlp_predict(
  void* handle,
  const float* x,
  int batch,
  int flat_size,
  int64_t* out_pred
) {
  if (!handle || !x || !out_pred || batch <= 0) {
    return 0;
  }

  MLPModel* model = (MLPModel*)handle;
  float* logits = (float*)malloc((size_t)batch * (size_t)model->num_classes * sizeof(float));
  if (!logits) {
    return 0;
  }

  int ok = mlp_forward(handle, x, batch, flat_size, logits);
  if (!ok) {
    free(logits);
    return 0;
  }

  for (int b = 0; b < batch; ++b) {
    float* row = logits + ((size_t)b * (size_t)model->num_classes);
    int max_idx = 0;
    float max_val = row[0];
    for (int c = 1; c < model->num_classes; ++c) {
      if (row[c] > max_val) {
        max_val = row[c];
        max_idx = c;
      }
    }
    out_pred[b] = (int64_t)max_idx;
  }

  free(logits);
  return 1;
}

MLP_API float mlp_train_batch(
  void* handle,
  const float* x,
  int batch,
  int flat_size,
  const int64_t* y,
  const float* sample_weight,
  float learning_rate,
  float weight_decay
) {
  if (!handle || !x || !y || !sample_weight || batch <= 0) {
    return -1.0f;
  }

  MLPModel* model = (MLPModel*)handle;
  if (flat_size != model->flat_size) {
    return -1.0f;
  }

  int layers = model->num_layers;
  float** activations = (float**)calloc((size_t)layers + 1u, sizeof(float*));
  float** preacts = (float**)calloc((size_t)layers, sizeof(float*));
  uint8_t** dropout_masks = (uint8_t**)calloc((size_t)layers, sizeof(uint8_t*));

  if (!activations || !preacts || !dropout_masks) {
    free(activations);
    free(preacts);
    free(dropout_masks);
    return -1.0f;
  }

  activations[0] = (float*)malloc((size_t)batch * (size_t)flat_size * sizeof(float));
  if (!activations[0]) {
    free(activations);
    free(preacts);
    free(dropout_masks);
    return -1.0f;
  }
  memcpy(activations[0], x, (size_t)batch * (size_t)flat_size * sizeof(float));

  for (int l = 0; l < layers; ++l) {
    int in_dim = model->layer_sizes[l];
    int out_dim = model->layer_sizes[l + 1];

    preacts[l] = (float*)malloc((size_t)batch * (size_t)out_dim * sizeof(float));
    activations[l + 1] = (float*)malloc((size_t)batch * (size_t)out_dim * sizeof(float));
    if (!preacts[l] || !activations[l + 1]) {
      return -1.0f;
    }

    linear_forward(activations[l], model->weights[l], model->biases[l], batch, in_dim, out_dim, preacts[l]);
    memcpy(activations[l + 1], preacts[l], (size_t)batch * (size_t)out_dim * sizeof(float));

    if (l < layers - 1) {
      relu_inplace(activations[l + 1], batch * out_dim);
      if (model->dropout > 0.0f) {
        dropout_masks[l] = (uint8_t*)malloc((size_t)batch * (size_t)out_dim * sizeof(uint8_t));
        if (!dropout_masks[l]) {
          return -1.0f;
        }
        apply_dropout_inplace(model, activations[l + 1], dropout_masks[l], batch * out_dim);
      }
    }
  }

  float* logits = activations[layers];
  float* grad = (float*)calloc((size_t)batch * (size_t)model->num_classes, sizeof(float));
  float* norm_w = (float*)malloc((size_t)batch * sizeof(float));
  if (!grad || !norm_w) {
    return -1.0f;
  }

  float mean_w = 0.0f;
  for (int i = 0; i < batch; ++i) {
    mean_w += sample_weight[i];
  }
  mean_w /= (float)batch;
  if (mean_w < 1e-8f) {
    mean_w = 1.0f;
  }

  for (int i = 0; i < batch; ++i) {
    norm_w[i] = sample_weight[i] / mean_w;
  }

  float loss = 0.0f;
  for (int b = 0; b < batch; ++b) {
    float* row = logits + ((size_t)b * (size_t)model->num_classes);
    float max_logit = row[0];
    for (int c = 1; c < model->num_classes; ++c) {
      if (row[c] > max_logit) {
        max_logit = row[c];
      }
    }

    float sum_exp = 0.0f;
    for (int c = 0; c < model->num_classes; ++c) {
      row[c] = expf(row[c] - max_logit);
      sum_exp += row[c];
    }

    int target = (int)y[b];
    for (int c = 0; c < model->num_classes; ++c) {
      float p = row[c] / sum_exp;
      if (c == target) {
        loss += -logf(fmaxf(p, 1e-8f)) * norm_w[b];
        grad[((size_t)b * (size_t)model->num_classes) + (size_t)c] = (p - 1.0f) * (norm_w[b] / (float)batch);
      } else {
        grad[((size_t)b * (size_t)model->num_classes) + (size_t)c] = p * (norm_w[b] / (float)batch);
      }
    }
  }
  loss /= (float)batch;

  for (int l = layers - 1; l >= 0; --l) {
    int in_dim = model->layer_sizes[l];
    int out_dim = model->layer_sizes[l + 1];

    float* grad_prev = NULL;
    if (l > 0) {
      int prev_dim = model->layer_sizes[l];
      grad_prev = (float*)calloc((size_t)batch * (size_t)prev_dim, sizeof(float));
      if (!grad_prev) {
        return -1.0f;
      }

      for (int b = 0; b < batch; ++b) {
        for (int i = 0; i < prev_dim; ++i) {
          float sum = 0.0f;
          for (int o = 0; o < out_dim; ++o) {
            sum += grad[((size_t)b * (size_t)out_dim) + (size_t)o] * model->weights[l][((size_t)i * (size_t)out_dim) + (size_t)o];
          }
          grad_prev[((size_t)b * (size_t)prev_dim) + (size_t)i] = sum;
        }
      }
    }

    for (int i = 0; i < in_dim; ++i) {
      for (int o = 0; o < out_dim; ++o) {
        float gw = 0.0f;
        for (int b = 0; b < batch; ++b) {
          float a = activations[l][((size_t)b * (size_t)in_dim) + (size_t)i];
          float g = grad[((size_t)b * (size_t)out_dim) + (size_t)o];
          gw += a * g;
        }
        gw += weight_decay * model->weights[l][((size_t)i * (size_t)out_dim) + (size_t)o];
        model->weights[l][((size_t)i * (size_t)out_dim) + (size_t)o] -= learning_rate * gw;
      }
    }

    for (int o = 0; o < out_dim; ++o) {
      float gb = 0.0f;
      for (int b = 0; b < batch; ++b) {
        gb += grad[((size_t)b * (size_t)out_dim) + (size_t)o];
      }
      model->biases[l][o] -= learning_rate * gb;
    }

    if (l > 0) {
      int prev_dim = model->layer_sizes[l];
      for (int b = 0; b < batch; ++b) {
        for (int i = 0; i < prev_dim; ++i) {
          float z = preacts[l - 1][((size_t)b * (size_t)prev_dim) + (size_t)i];
          if (z <= 0.0f) {
            grad_prev[((size_t)b * (size_t)prev_dim) + (size_t)i] = 0.0f;
          }
          if (dropout_masks[l - 1]) {
            float keep_prob = 1.0f - model->dropout;
            if (keep_prob <= 0.0f) {
              keep_prob = 1.0f;
            }
            if (dropout_masks[l - 1][((size_t)b * (size_t)prev_dim) + (size_t)i] == 0) {
              grad_prev[((size_t)b * (size_t)prev_dim) + (size_t)i] = 0.0f;
            } else {
              grad_prev[((size_t)b * (size_t)prev_dim) + (size_t)i] /= keep_prob;
            }
          }
        }
      }

      free(grad);
      grad = grad_prev;
    }
  }

  free(grad);
  free(norm_w);

  for (int l = 0; l <= layers; ++l) {
    free(activations[l]);
  }
  for (int l = 0; l < layers; ++l) {
    free(preacts[l]);
    free(dropout_masks[l]);
  }
  free(activations);
  free(preacts);
  free(dropout_masks);

  return loss;
}
