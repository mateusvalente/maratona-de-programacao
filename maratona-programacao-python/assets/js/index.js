(function () {
  const lessons = window.COURSE_LESSONS || [];
  const lists = window.PROBLEM_LISTS || [];
  const esc = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  const trackLabels = ["Introdução", "Competição", "Python", "Entrada e saída", "Condicionais", "Repetição", "Listas", "Strings", "Problemas"];

  document.querySelector("#track").innerHTML = trackLabels.map((label, index) => `<div class="track-step"><strong>${String(index + 1).padStart(2, "0")}</strong>${label}</div>`).join("");

  document.querySelector("#lesson-grid").innerHTML = lessons.map((lesson) => `
    <a class="lesson-card" href="aulas/${lesson.slug}/index.html">
      <span class="number">AULA ${String(lesson.id).padStart(2, "0")}</span>
      <h3>${esc(lesson.title)}</h3>
      <p>${esc(lesson.summary)}</p>
      <span class="open">Abrir aula →</span>
    </a>`).join("");

  document.querySelector("#list-grid").innerHTML = lists.map((list) => `
    <a class="list-card" href="listas/${list.slug}/index.html">
      <strong>Lista ${String(list.id).padStart(2, "0")} · ${esc(list.title)}</strong>
      <span>${list.problems.length} exercícios · ${esc(list.summary)}</span>
    </a>`).join("");
})();
