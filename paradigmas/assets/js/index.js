(function () {
  "use strict";

  const lessonGrid = document.querySelector("#lesson-grid");
  const paradigmGrid = document.querySelector("#paradigm-grid");

  lessonGrid.innerHTML = window.PARADIGM_LESSONS.map((lesson) => `
    <a class="lesson-link" href="aulas/${lesson.slug}/index.html">
      <span class="lesson-number">Aula ${String(lesson.number).padStart(2, "0")}</span>
      <strong>${lesson.title}</strong>
      <span>${lesson.summary}</span>
    </a>`).join("");

  const mainParadigms = ["forca-bruta", "recursao", "backtracking", "divisao-conquista", "guloso", "programacao-dinamica", "memoizacao", "branch-and-bound"];
  paradigmGrid.innerHTML = mainParadigms.map((key) => {
    const exercises = window.PARADIGM_EXERCISES.filter((exercise) => exercise.paradigms.includes(key));
    const validated = exercises.filter((exercise) => window.VALIDATED_ANSWERS.includes(exercise.key)).length;
    return `
      <a class="paradigm-link" href="exercicios/${key}/index.html">
        <strong>${window.PARADIGM_LABELS[key]}</strong>
        <span>${exercises.length} problema(s) · ${validated} validado(s) · ${exercises.length - validated} aguardando</span>
      </a>`;
  }).join("");
}());
