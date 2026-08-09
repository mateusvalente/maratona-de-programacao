(function () {
  "use strict";

  const app = document.querySelector("#app");
  const root = window.CourseUI.rootPath();
  const escapeHTML = window.CourseUI.escapeHTML;

  app.innerHTML = `
    ${window.CourseUI.header()}
    <main class="catalog">
      <header class="catalog-head">
        <p class="eyebrow">Códigos validados · beecrowd</p>
        <h1>Resoluções explicadas</h1>
        <p class="lead">Estas aulas seguem exatamente os códigos encontrados em <code>respostas/</code>. Cada página relaciona a implementação ao paradigma e apresenta comentários, teste de mesa e complexidade.</p>
        <div class="lesson-meta"><span class="badge green">${window.PARADIGM_SOLUTIONS.length} aulas</span><span class="badge">Python 3</span><span class="badge yellow">originais preservados</span></div>
      </header>

      <section class="band">
        <div class="filter-bar two-filters">
          <div class="field"><label for="solution-paradigm">Paradigma</label><select id="solution-paradigm"><option value="">Todos</option>${[...new Set(window.PARADIGM_SOLUTIONS.map((item) => item.paradigm))].sort().map((item) => `<option>${escapeHTML(item)}</option>`).join("")}</select></div>
          <div class="field"><label for="solution-search">Buscar por ID ou nome</label><input id="solution-search" type="search" placeholder="Ex.: 1084 ou Futebol"></div>
        </div>
        <div class="catalog-summary" id="solution-summary"></div>
        <div class="exercise-grid" id="solution-list"></div>
      </section>

      <section class="band">
        <div class="note"><strong>Exercícios ainda indicados:</strong> problemas sem código não recebem uma explicação antecipada. Eles continuam no catálogo com o status “Aguardando validação”.</div>
      </section>
      <nav class="lesson-nav"><a href="${root}index.html">← Índice do módulo</a><a href="${root}exercicios/index.html">Exercícios indicados →</a></nav>
    </main>
    ${window.CourseUI.footer()}`;

  const paradigm = document.querySelector("#solution-paradigm");
  const search = document.querySelector("#solution-search");

  function render() {
    const term = search.value.trim().toLocaleLowerCase("pt-BR");
    const selected = window.PARADIGM_SOLUTIONS.filter((solution) => {
      if (paradigm.value && solution.paradigm !== paradigm.value) return false;
      if (term && !`${solution.id} ${solution.title}`.toLocaleLowerCase("pt-BR").includes(term)) return false;
      return true;
    });
    document.querySelector("#solution-summary").innerHTML = `<span class="badge green">${selected.length} resolução(ões)</span>`;
    document.querySelector("#solution-list").innerHTML = selected.length ? selected.map((solution) => `
      <article class="exercise-card">
        <span class="exercise-id">beecrowd<br>${solution.id}</span>
        <div class="exercise-main"><h2>${escapeHTML(solution.title)}</h2><p>${escapeHTML(solution.summary)}</p><div class="exercise-tags"><span class="tag">${escapeHTML(solution.paradigm)}</span><span class="tag">${escapeHTML(solution.time)}</span></div></div>
        <div class="exercise-side"><a class="btn primary" href="${solution.key}/index.html">Ver aula explicada →</a><a class="btn" href="${root}respostas/${solution.id}.py">Abrir <code>.py</code></a></div>
      </article>`).join("") : `<div class="empty-state">Nenhuma resolução corresponde ao filtro.</div>`;
  }

  paradigm.addEventListener("change", render);
  search.addEventListener("input", render);
  render();
}());
