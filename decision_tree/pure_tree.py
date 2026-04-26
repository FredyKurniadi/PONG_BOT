from dataclasses import dataclass
from typing import Optional

import numpy as np


@dataclass
class TreeNode:
  feature_index: int = -1
  threshold: float = 0.0
  left: Optional["TreeNode"] = None
  right: Optional["TreeNode"] = None
  class_counts: Optional[np.ndarray] = None
  predicted_class: int = 0
  depth: int = 0
  node_id: int = -1


@dataclass
class _QueueEntry:
  node: TreeNode
  next: Optional["_QueueEntry"] = None


class NodeLinkedList:
  def __init__(self):
    self.head: Optional[_QueueEntry] = None
    self.tail: Optional[_QueueEntry] = None

  def push(self, node: TreeNode) -> None:
    entry = _QueueEntry(node=node)
    if self.tail is None:
      self.head = entry
      self.tail = entry
      return

    self.tail.next = entry
    self.tail = entry

  def pop(self) -> TreeNode:
    if self.head is None:
      raise IndexError("NodeLinkedList is empty")

    entry = self.head
    self.head = entry.next
    if self.head is None:
      self.tail = None
    return entry.node

  def is_empty(self) -> bool:
    return self.head is None


def weighted_gini_loss(y: np.ndarray, sample_weight: np.ndarray, num_classes: int) -> float:
  total = float(np.sum(sample_weight))
  if total <= 0:
    return 0.0

  counts = np.zeros((num_classes,), dtype=np.float64)
  for cls in range(num_classes):
    counts[cls] = float(np.sum(sample_weight[y == cls]))

  probs = counts / total
  return float(1.0 - np.sum(probs * probs))


class PureDecisionTreeClassifier:
  def __init__(self, max_depth: int = 8, min_samples_leaf: int = 20, min_samples_split: int = 40, max_thresholds_per_feature: int = 64):
    self.max_depth = int(max_depth)
    self.min_samples_leaf = int(min_samples_leaf)
    self.min_samples_split = int(min_samples_split)
    self.max_thresholds_per_feature = int(max_thresholds_per_feature)

    self.root: Optional[TreeNode] = None
    self.num_classes = 0
    self.classes_: np.ndarray | None = None

    self.children_left: list[int] = []
    self.children_right: list[int] = []
    self.feature: list[int] = []
    self.threshold: list[float] = []
    self.value: list[list[float]] = []

  def fit(self, x: np.ndarray, y: np.ndarray, sample_weight: Optional[np.ndarray] = None):
    if x.ndim != 2:
      raise ValueError("x must be 2D")
    if y.ndim != 1:
      raise ValueError("y must be 1D")
    if x.shape[0] != y.shape[0]:
      raise ValueError("x and y sample size mismatch")

    n_samples = x.shape[0]
    if sample_weight is None:
      sample_weight = np.ones((n_samples,), dtype=np.float64)
    else:
      sample_weight = np.asarray(sample_weight, dtype=np.float64)

    self.classes_ = np.unique(y)
    self.num_classes = int(np.max(self.classes_)) + 1

    indices = np.arange(n_samples, dtype=np.int64)
    self.root = self._build_node(x, y, sample_weight, indices, depth=0)
    self._build_web_arrays()
    return self

  def predict(self, x: np.ndarray) -> np.ndarray:
    if self.root is None:
      raise ValueError("model is not fitted")

    out = np.zeros((x.shape[0],), dtype=np.int64)
    for i in range(x.shape[0]):
      node = self.root
      while node.left is not None and node.right is not None and node.feature_index >= 0:
        node = node.left if x[i, node.feature_index] <= node.threshold else node.right
      out[i] = node.predicted_class
    return out

  def to_web_json(self, sequence_length: int, feature_size: int, label_to_index: dict[str, int]):
    inverse = {int(v): str(k) for k, v in label_to_index.items()}
    classes = [int(v) for v in sorted(label_to_index.values())]

    return {
      "model_type": "decision_tree",
      "input": {
        "sequence_length": int(sequence_length),
        "feature_size": int(feature_size),
      },
      "classes": classes,
      "label_by_index": {str(k): inverse.get(int(k), "stay") for k in classes},
      "tree": {
        "children_left": self.children_left,
        "children_right": self.children_right,
        "feature": self.feature,
        "threshold": self.threshold,
        "value": self.value,
      },
    }

  def _build_node(self, x: np.ndarray, y: np.ndarray, w: np.ndarray, indices: np.ndarray, depth: int) -> TreeNode:
    node = TreeNode(depth=depth)

    y_local = y[indices]
    w_local = w[indices]
    class_counts = np.zeros((self.num_classes,), dtype=np.float64)
    for cls in range(self.num_classes):
      class_counts[cls] = float(np.sum(w_local[y_local == cls]))

    node.class_counts = class_counts
    node.predicted_class = int(np.argmax(class_counts))

    if self._should_stop(y_local, depth, indices.size):
      return node

    best = self._best_split(x, y, w, indices)
    if best is None:
      return node

    feature_idx, split_threshold, left_idx, right_idx = best
    node.feature_index = int(feature_idx)
    node.threshold = float(split_threshold)
    node.left = self._build_node(x, y, w, left_idx, depth + 1)
    node.right = self._build_node(x, y, w, right_idx, depth + 1)
    return node

  def _should_stop(self, y_local: np.ndarray, depth: int, sample_count: int) -> bool:
    if sample_count < self.min_samples_split:
      return True
    if depth >= self.max_depth:
      return True
    if np.unique(y_local).size <= 1:
      return True
    return False

  def _candidate_thresholds(self, values: np.ndarray) -> np.ndarray:
    unique = np.unique(values)
    if unique.size <= 1:
      return np.array([], dtype=np.float64)

    mids = (unique[:-1] + unique[1:]) * 0.5
    if mids.size <= self.max_thresholds_per_feature:
      return mids

    sel = np.linspace(0, mids.size - 1, num=self.max_thresholds_per_feature, dtype=np.int64)
    return mids[sel]

  def _best_split(self, x: np.ndarray, y: np.ndarray, w: np.ndarray, indices: np.ndarray):
    n_features = x.shape[1]
    best_feature = -1
    best_threshold = 0.0
    best_loss = float("inf")
    best_left: Optional[np.ndarray] = None
    best_right: Optional[np.ndarray] = None

    for feature_idx in range(n_features):
      values = x[indices, feature_idx]
      thresholds = self._candidate_thresholds(values)
      for th in thresholds:
        left_mask = values <= th
        right_mask = ~left_mask

        left_indices = indices[left_mask]
        right_indices = indices[right_mask]

        if left_indices.size < self.min_samples_leaf or right_indices.size < self.min_samples_leaf:
          continue

        left_w = float(np.sum(w[left_indices]))
        right_w = float(np.sum(w[right_indices]))
        total_w = left_w + right_w
        if total_w <= 0:
          continue

        left_loss = weighted_gini_loss(y[left_indices], w[left_indices], self.num_classes)
        right_loss = weighted_gini_loss(y[right_indices], w[right_indices], self.num_classes)
        split_loss = (left_w / total_w) * left_loss + (right_w / total_w) * right_loss

        if split_loss < best_loss:
          best_loss = split_loss
          best_feature = feature_idx
          best_threshold = float(th)
          best_left = left_indices
          best_right = right_indices

    if best_feature < 0 or best_left is None or best_right is None:
      return None

    return best_feature, best_threshold, best_left, best_right

  def _build_web_arrays(self):
    self.children_left = []
    self.children_right = []
    self.feature = []
    self.threshold = []
    self.value = []

    if self.root is None:
      return

    queue = NodeLinkedList()
    queue.push(self.root)

    order: list[TreeNode] = []
    while not queue.is_empty():
      node = queue.pop()
      node.node_id = len(order)
      order.append(node)
      if node.left is not None:
        queue.push(node.left)
      if node.right is not None:
        queue.push(node.right)

    for node in order:
      if node.left is None or node.right is None:
        self.children_left.append(-1)
        self.children_right.append(-1)
        self.feature.append(-2)
        self.threshold.append(-2.0)
      else:
        self.children_left.append(node.left.node_id)
        self.children_right.append(node.right.node_id)
        self.feature.append(node.feature_index)
        self.threshold.append(float(node.threshold))

      counts = node.class_counts if node.class_counts is not None else np.zeros((self.num_classes,), dtype=np.float64)
      self.value.append([float(counts[i]) for i in range(self.num_classes)])
