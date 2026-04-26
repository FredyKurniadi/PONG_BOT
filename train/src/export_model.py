from pathlib import Path
import numpy as np
import onnx
from onnx import helper, numpy_helper


def export_onnx(model, input_size: int, sequence_length: int, output_path: str) -> None:
  if hasattr(model, "sync_parameters"):
    model.sync_parameters()

  target = Path(output_path)
  target.parent.mkdir(parents=True, exist_ok=True)

  flat_size = int(input_size) * int(sequence_length)
  input_info = helper.make_tensor_value_info("input", onnx.TensorProto.FLOAT, ["batch", int(sequence_length), int(input_size)])
  output_info = helper.make_tensor_value_info("logits", onnx.TensorProto.FLOAT, ["batch", model.num_classes])

  initializers = []
  nodes = []

  reshape_shape = numpy_helper.from_array(np.array([-1, flat_size], dtype=np.int64), name="reshape_shape")
  initializers.append(reshape_shape)
  nodes.append(helper.make_node("Reshape", inputs=["input", "reshape_shape"], outputs=["flat_input"]))

  previous = "flat_input"
  for idx, (w, b) in enumerate(zip(model.weights, model.biases)):
    w_name = f"W{idx}"
    b_name = f"b{idx}"
    mm_out = f"mm_{idx}"
    add_out = f"add_{idx}"

    initializers.append(numpy_helper.from_array(w.astype(np.float32), name=w_name))
    initializers.append(numpy_helper.from_array(b.astype(np.float32), name=b_name))

    nodes.append(helper.make_node("MatMul", inputs=[previous, w_name], outputs=[mm_out]))
    nodes.append(helper.make_node("Add", inputs=[mm_out, b_name], outputs=[add_out]))

    is_last = idx == (len(model.weights) - 1)
    if is_last:
      previous = add_out
    else:
      relu_out = f"relu_{idx}"
      nodes.append(helper.make_node("Relu", inputs=[add_out], outputs=[relu_out]))
      previous = relu_out

  nodes.append(helper.make_node("Identity", inputs=[previous], outputs=["logits"]))

  graph = helper.make_graph(
    nodes=nodes,
    name="PongNumpyMLP",
    inputs=[input_info],
    outputs=[output_info],
    initializer=initializers,
  )

  model_proto = helper.make_model(graph, opset_imports=[helper.make_operatorsetid("", 17)], producer_name="pong-numpy-mlp")
  onnx.checker.check_model(model_proto)
  onnx.save(model_proto, str(target))
