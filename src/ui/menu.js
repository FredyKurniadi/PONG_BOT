export function setStatus(text, isError = false) {
  const el = document.getElementById("status");
  el.textContent = `Status: ${text}`;
  el.style.color = isError ? "#8a1c1c" : "#1f2520";
}

export function bindButtons(handlers) {
  document.getElementById("btn-pvp").addEventListener("click", handlers.onPvp);
  document.getElementById("btn-pve").addEventListener("click", handlers.onPve);
  document.getElementById("btn-bvb").addEventListener("click", handlers.onBvb);
  document.getElementById("btn-stop").addEventListener("click", handlers.onStop);
  document.getElementById("btn-replay-last").addEventListener("click", handlers.onReplayLast);
  document.getElementById("btn-replay-selected").addEventListener("click", handlers.onReplaySelected);
  document.getElementById("btn-stop-replay").addEventListener("click", handlers.onStopReplay);
  document.getElementById("btn-delete-replay").addEventListener("click", handlers.onDeleteReplay);
  document.getElementById("btn-export-csv").addEventListener("click", handlers.onExportCsv);
  document.getElementById("btn-train-guide").addEventListener("click", handlers.onTrainGuide);
  document.getElementById("btn-load-model").addEventListener("click", handlers.onLoadModel);
}

export function renderReplayOptions(options) {
  const replaySelect = document.getElementById("replay-select");
  const deleteSelect = document.getElementById("replay-delete-select");
  const previousReplayValue = replaySelect.value;
  const previousDeleteValue = deleteSelect.value;

  replaySelect.innerHTML = '<option value="">Pilih replay...</option>';
  deleteSelect.innerHTML = '<option value="">Pilih replay untuk dihapus...</option>';

  for (const item of options) {
    const replayOption = document.createElement("option");
    replayOption.value = item.id;
    replayOption.textContent = `${item.id} (${item.mode})`;
    replaySelect.appendChild(replayOption);

    const deleteOption = document.createElement("option");
    deleteOption.value = item.id;
    deleteOption.textContent = `${item.id} (${item.mode})`;
    deleteSelect.appendChild(deleteOption);
  }

  if (previousReplayValue) {
    replaySelect.value = previousReplayValue;
  }

  if (previousDeleteValue) {
    deleteSelect.value = previousDeleteValue;
  }
}

export function getSelectedReplayId() {
  return document.getElementById("replay-select").value;
}

export function getSelectedReplayDeleteId() {
  return document.getElementById("replay-delete-select").value;
}

export function getSelectedModelFile() {
  const input = document.getElementById("model-file");
  return input.files?.[0] ?? null;
}
