(function () {
  "use strict";

  const fixedParadigm = document.body.dataset.paradigm || "";
  const root = window.CourseUI.rootPath();
  const app = document.querySelector("#app");
  const labels = window.PARADIGM_LABELS;
  const mainParadigms = ["forca-bruta", "recursao", "backtracking", "divisao-conquista", "guloso", "programacao-dinamica", "memoizacao", "branch-and-bound"];
  const title = fixedParadigm ? `Exercícios de ${labels[fixedParadigm]}` : "Exercícios por paradigma";

  document.title = `${title} | Paradigmas`;
  app.innerHTML = `
    ${window.CourseUI.header()}
    <main class="catalog">
      <header class="catalog-head">
        <p class="eyebrow">Prática orientada · sem solução antecipada</p>
        <h1>${title}</h1>
        <p class="lead">Escolha um problema, abra o enunciado oficial e desenvolva sua tentativa. A descrição abaixo apresenta o objetivo pedagógico, mas não entrega a modelagem da resposta.</p>
        <div class="lesson-meta"><span class="badge yellow">⏳ aguardando validação</span><span class="badge">respostas/ é a fonte oficial</span></div>
      </header>

      <section class="band">
        <div class="validation-flow">
          <div class="validation-step"><strong>1 · Escolha</strong>Leia a ficha e o enunciado oficial.</div>
          <div class="validation-step"><strong>2 · Resolva</strong>Use o arquivo preparado em <code>questoes/</code>.</div>
          <div class="validation-step"><strong>3 · Valide</strong>Teste e mova a resposta aprovada para <code>respostas/</code>.</div>
          <div class="validation-step"><strong>4 · Explique</strong>A aula da solução só nasce depois disso.</div>
        </div>
      </section>

      <section class="band">
        <div class="filter-bar">
          <div class="field"><label for="filter-paradigm">Paradigma</label><select id="filter-paradigm"><option value="">Todos</option>${mainParadigms.map((key) => `<option value="${key}" ${fixedParadigm === key ? "selected" : ""}>${labels[key]}</option>`).join("")}</select></div>
          <div class="field"><label for="filter-difficulty">Dificuldade</label><select id="filter-difficulty"><option value="">Todas</option><option>Introdução</option><option>Intermediário</option><option>Desafio</option></select></div>
          <div class="field"><label for="filter-platform">Plataforma</label><select id="filter-platform"><option value="">Todas</option>${[...new Set(window.PARADIGM_EXERCISES.map((item) => item.platform))].sort().map((platform) => `<option>${platform}</option>`).join("")}</select></div>
          <div class="field"><label for="filter-status">Status</label><select id="filter-status"><option value="">Todos</option><option value="waiting">Aguardando validação</option><option value="validated">Validados</option></select></div>
        </div>
        <div class="catalog-summary" id="catalog-summary"></div>
        <div class="exercise-grid" id="exercise-grid"></div>
      </section>
      <nav class="lesson-nav"><a href="${root}index.html">← Voltar ao índice</a><a href="${root}questoes/index.html">Arquivos para tentativas →</a></nav>
    </main>
    ${window.CourseUI.footer()}`;

  const controls = {
    paradigm: document.querySelector("#filter-paradigm"),
    difficulty: document.querySelector("#filter-difficulty"),
    platform: document.querySelector("#filter-platform"),
    status: document.querySelector("#filter-status")
  };
  if (fixedParadigm) controls.paradigm.disabled = true;

  function isValidated(exercise) {
    return window.VALIDATED_ANSWERS.includes(exercise.key);
  }

  function card(exercise) {
    const validated = isValidated(exercise);
    return `
      <article class="exercise-card">
        <div><span class="exercise-id">${exercise.platform}<br>${exercise.id}</span></div>
        <div class="exercise-main">
          <h2>${exercise.title}</h2>
          <p>${exercise.reason}</p>
          <div class="exercise-tags">${exercise.paradigms.filter((key) => labels[key]).map((key) => `<span class="tag">${labels[key]}</span>`).join("")}${exercise.concepts.map((item) => `<span class="tag">${item}</span>`).join("")}</div>
          <dl class="exercise-meta"><dt>Pré-requisitos</dt><dd>${exercise.prerequisites}</dd><dt>Dificuldade</dt><dd>${exercise.difficulty}</dd><dt>Paradigma principal</dt><dd>${labels[exercise.primary]}</dd></dl>
        </div>
        <div class="exercise-side">
          <span class="status-badge ${validated ? "validated" : "waiting"}">${validated ? "✓ Solução validada" : "⏳ Aguardando validação"}</span>
          <a class="btn primary" href="${exercise.url}" target="_blank" rel="noreferrer">Abrir enunciado ↗</a>
          <a class="btn" href="${root}questoes/${exercise.key}.py">Abrir arquivo .py</a>
          ${validated ? `<span class="source-note">Arquivo localizado em respostas/. A explicação será criada a partir dele.</span>` : ""}
        </div>
      </article>`;
  }

  function render() {
    const selected = window.PARADIGM_EXERCISES.filter((exercise) => {
      const validated = isValidated(exercise);
      if (controls.paradigm.value && !exercise.paradigms.includes(controls.paradigm.value)) return false;
      if (controls.difficulty.value && exercise.difficulty !== controls.difficulty.value) return false;
      if (controls.platform.value && exercise.platform !== controls.platform.value) return false;
      if (controls.status.value === "waiting" && validated) return false;
      if (controls.status.value === "validated" && !validated) return false;
      return true;
    });
    const validatedCount = selected.filter(isValidated).length;
    document.querySelector("#catalog-summary").innerHTML = `<span class="badge green">${selected.length} problema(s)</span><span class="badge yellow">${selected.length - validatedCount} aguardando</span><span class="badge">${validatedCount} validado(s)</span>`;
    document.querySelector("#exercise-grid").innerHTML = selected.length ? selected.map(card).join("") : `<div class="empty-state">Nenhum exercício corresponde aos filtros atuais.</div>`;
  }

  Object.values(controls).forEach((control) => control.addEventListener("change", render));
  render();
}());
