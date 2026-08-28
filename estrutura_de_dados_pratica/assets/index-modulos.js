(() => {
  "use strict";

  const STORAGE_KEY = "edp-foundation-exercises-v1";
  const TOTAL_EXERCISES = 10;
  const text = document.getElementById("module-progress-text");
  const fill = document.getElementById("module-progress-fill");
  const progressbar = fill?.closest('[role="progressbar"]');

  if (!text || !fill || !progressbar) return;

  let completed = 0;

  try {
    const savedProgress = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    completed = Object.values(savedProgress).filter(Boolean).length;
  } catch {
    completed = 0;
  }

  completed = Math.min(Math.max(completed, 0), TOTAL_EXERCISES);
  text.textContent = `${completed} de ${TOTAL_EXERCISES} exercícios`;
  fill.style.width = `${(completed / TOTAL_EXERCISES) * 100}%`;
  progressbar.setAttribute("aria-valuenow", String(completed));
})();
