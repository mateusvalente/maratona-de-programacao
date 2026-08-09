const grid = document.querySelector("#lesson-grid");

window.STRING_LESSONS.forEach((lesson) => {
  const article = document.createElement("article");
  article.className = "lesson-card";
  article.innerHTML = `
    <img src="assets/imagens/${lesson.id}.svg" alt="Diagrama da aula ${lesson.order}: ${lesson.title}">
    <div class="lesson-card-body">
      <p class="eyebrow">Aula ${lesson.order} · ${lesson.category}</p>
      <h3>${lesson.id} - ${lesson.title}</h3>
      <p>${lesson.summary}</p>
      <div class="card-links">
        <a href="aulas/aula_${String(lesson.order).padStart(2, "0")}_${lesson.id}.html">Abrir aula</a>
        <a href="resolucoes/${lesson.id}.py">Código .py</a>
        <a href="https://judge.beecrowd.com/pt/problems/view/${lesson.id}" target="_blank" rel="noopener">beecrowd</a>
      </div>
    </div>
  `;
  grid.append(article);
});
