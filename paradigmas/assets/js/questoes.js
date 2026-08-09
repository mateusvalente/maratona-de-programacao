(function () {
  "use strict";
  const app = document.querySelector("#app");
  const root = window.CourseUI.rootPath();

  app.innerHTML = `
    ${window.CourseUI.header()}
    <main class="catalog">
      <header class="catalog-head">
        <p class="eyebrow">Área de trabalho</p>
        <h1>Arquivos para suas tentativas</h1>
        <p class="lead">Cada problema já possui um arquivo <code>.py</code> com o link oficial e espaço para você colar ou escrever a solução. Esses arquivos ainda não significam que a resposta foi validada.</p>
      </header>
      <section class="band">
        <div class="two-col">
          <div class="note"><strong>Use <code>questoes/</code> durante o desenvolvimento.</strong> Aqui podem existir tentativas incompletas, testes e ajustes.</div>
          <div class="success"><strong>Use <code>respostas/</code> somente após validar.</strong> A presença do arquivo nessa pasta autoriza a futura aula de resolução.</div>
        </div>
      </section>
      <section class="band">
        <div class="filter-bar" style="grid-template-columns:repeat(2,minmax(180px,1fr))">
          <div class="field"><label for="draft-paradigm">Paradigma</label><select id="draft-paradigm"><option value="">Todos</option>${Object.entries(window.PARADIGM_LABELS).map(([key, label]) => `<option value="${key}">${label}</option>`).join("")}</select></div>
          <div class="field"><label for="draft-platform">Plataforma</label><select id="draft-platform"><option value="">Todas</option>${[...new Set(window.PARADIGM_EXERCISES.map((item) => item.platform))].sort().map((platform) => `<option>${platform}</option>`).join("")}</select></div>
        </div>
        <div class="catalog-summary" id="draft-summary"></div>
        <div class="exercise-grid" id="draft-grid"></div>
      </section>
      <nav class="lesson-nav"><a href="${root}exercicios/index.html">← Voltar aos exercícios</a><a href="${root}index.html">Índice do módulo →</a></nav>
    </main>
    ${window.CourseUI.footer()}`;

  const paradigm = document.querySelector("#draft-paradigm");
  const platform = document.querySelector("#draft-platform");
  function render() {
    const items = window.PARADIGM_EXERCISES.filter((exercise) => (!paradigm.value || exercise.paradigms.includes(paradigm.value)) && (!platform.value || exercise.platform === platform.value));
    document.querySelector("#draft-summary").innerHTML = `<span class="badge green">${items.length} arquivo(s) disponível(is)</span>`;
    document.querySelector("#draft-grid").innerHTML = items.map((exercise) => {
      const validated = window.VALIDATED_ANSWERS.includes(exercise.key);
      const lesson = window.PARADIGM_SOLUTIONS.some((solution) => solution.key === exercise.key);
      return `
      <article class="exercise-card" style="grid-template-columns:110px minmax(0,1fr) 210px">
        <span class="exercise-id">${exercise.platform}<br>${exercise.id}</span>
        <div class="exercise-main"><h2>${exercise.title}</h2><p><code>${exercise.key}.py</code></p><span class="status-badge ${validated ? "validated" : "waiting"}">${validated ? "✓ solução validada" : "⏳ exercício indicado"}</span></div>
        <div class="exercise-side">${lesson ? `<a class="btn primary" href="${root}resolucoes/${exercise.key}/index.html">Ver aula explicada</a>` : `<a class="btn primary" href="${exercise.key}.py">Abrir tentativa .py</a>`}<a class="btn" href="${exercise.url}" target="_blank" rel="noreferrer">Enunciado ↗</a></div>
      </article>`;
    }).join("");
  }
  paradigm.addEventListener("change", render);
  platform.addEventListener("change", render);
  render();
}());
