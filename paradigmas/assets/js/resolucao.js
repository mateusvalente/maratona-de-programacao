(function () {
  "use strict";

  const key = document.body.dataset.solution;
  const solution = window.PARADIGM_SOLUTIONS.find((item) => item.key === key);
  const app = document.querySelector("#app");
  const escapeHTML = window.CourseUI.escapeHTML;
  const root = window.CourseUI.rootPath();

  if (!solution) {
    app.innerHTML = `<main class="catalog"><h1>Resolução não encontrada</h1><a href="${root}exercicios/index.html">Voltar aos exercícios</a></main>`;
    return;
  }

  document.title = `${solution.id} — ${solution.title} | Resolução explicada`;
  const index = window.PARADIGM_SOLUTIONS.indexOf(solution);
  const previous = window.PARADIGM_SOLUTIONS[index - 1];
  const next = window.PARADIGM_SOLUTIONS[index + 1];

  const breakdown = solution.breakdown.map(([title, text]) => `
    <article class="concept-card"><h3>${escapeHTML(title)}</h3><p>${escapeHTML(text)}</p></article>`).join("");

  const traceRows = solution.trace.rows.map((row, rowIndex) => `
    <tr data-trace-row="${rowIndex}">${row.map((cell) => `<td>${escapeHTML(cell)}</td>`).join("")}</tr>`).join("");

  app.innerHTML = `
    ${window.CourseUI.header()}
    <div class="layout">
      ${window.CourseUI.sidebar(0)}
      <main class="main">
        <header class="lesson-header">
          <p class="eyebrow">Resolução validada · beecrowd ${solution.id}</p>
          <h1>${escapeHTML(solution.title)}</h1>
          <p class="lead">${escapeHTML(solution.summary)}</p>
          <div class="lesson-meta"><span class="badge green">${escapeHTML(solution.paradigm)}</span><span class="badge">Python 3</span><span class="badge yellow">código do professor</span></div>
          <div class="problem-actions"><a class="btn primary" href="${solution.sourceUrl}" target="_blank" rel="noreferrer">Abrir enunciado ↗</a><a class="btn" href="${root}respostas/${solution.id}.py">Abrir <code>.py</code> original</a></div>
        </header>

        <section class="band">
          <div class="two-col">
            <div><p class="eyebrow">Interpretando</p><h2>O que o problema pede</h2>${solution.problem.map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`).join("")}</div>
            <div class="note"><strong>Antes do algoritmo:</strong> identifique o que deve ser otimizado, contado ou encontrado e quais dados podem ser preparados uma única vez.</div>
          </div>
        </section>

        <section class="band">
          <p class="eyebrow">Paradigma utilizado</p>
          <h2>${escapeHTML(solution.paradigm)}</h2>
          <p>${escapeHTML(solution.idea)}</p>
          <ul class="clean-list">${solution.why.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>
        </section>

        <section class="band">
          <p class="eyebrow">Construção</p><h2>Passo a passo da solução</h2>
          <ol class="steps">${solution.steps.map((step) => `<li>${escapeHTML(step)}</li>`).join("")}</ol>
        </section>

        <section class="band">
          <div class="section-head"><div><p class="eyebrow">Código explicado</p><h2>Resposta validada com comentários</h2></div><p>Os comentários foram adicionados somente nesta página. O arquivo em <code>respostas/</code> permanece intacto.</p></div>
          ${window.CourseUI.codeBlock({ title: `beecrowd ${solution.id} · Python 3 comentado`, source: solution.commentedCode, note: "Versão didática: mesma lógica do arquivo validado, com comentários explicando cada bloco." })}
        </section>

        <section class="band">
          <p class="eyebrow">Lendo o código</p><h2>O papel de cada parte</h2>
          <div class="concept-grid">${breakdown}</div>
        </section>

        <section class="band">
          <div class="lab" id="solution-trace">
            <div class="lab-header"><div><span class="lab-kicker">Teste de mesa interativo</span><h2>${escapeHTML(solution.trace.title)}</h2></div><span class="badge green">passo <span id="trace-current">1</span>/${solution.trace.rows.length}</span></div>
            <div class="lab-body">
              <p>${escapeHTML(solution.trace.intro)}</p>
              <div class="table-wrap"><table><thead><tr>${solution.trace.headers.map((header) => `<th>${escapeHTML(header)}</th>`).join("")}</tr></thead><tbody>${traceRows}</tbody></table></div>
              <div class="lab-message" id="trace-message"></div>
            </div>
            <div class="lab-controls"><button class="btn icon-btn" id="trace-prev" type="button" title="Passo anterior">←</button><button class="btn primary" id="trace-next" type="button">Próximo →</button><button class="btn" id="trace-reset" type="button">Reiniciar</button></div>
          </div>
        </section>

        <section class="band">
          <div class="two-col">
            <div><p class="eyebrow">Corretude</p><h2>Por que a solução funciona</h2><p>A explicação abaixo liga a propriedade do paradigma ao resultado produzido pelo código.</p></div>
            <ul class="check-list">${solution.correctness.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>
          </div>
        </section>

        <section class="band">
          <p class="eyebrow">Análise</p><h2>Complexidade</h2>
          <div class="metrics"><div class="metric-card"><span>Tempo</span><strong>${escapeHTML(solution.time)}</strong></div><div class="metric-card"><span>Espaço</span><strong>${escapeHTML(solution.space)}</strong></div></div>
          <p>${escapeHTML(solution.complexityReason)}</p>
        </section>

        <section class="band">
          <p class="eyebrow">Atenção</p><h2>Erros comuns</h2>
          <ul class="error-list">${solution.errors.map((error) => `<li>${escapeHTML(error)}</li>`).join("")}</ul>
        </section>

        <section class="band">
          <div class="success"><strong>Arquivo preservado:</strong> esta aula explica exatamente a estratégia encontrada em <a href="${root}respostas/${solution.id}.py"><code>respostas/${solution.id}.py</code></a>. Nenhuma otimização foi aplicada silenciosamente ao original.</div>
        </section>

        <nav class="lesson-nav" aria-label="Navegação entre resoluções">
          ${previous ? `<a href="${root}resolucoes/${previous.key}/index.html">← ${previous.id} · ${escapeHTML(previous.title)}</a>` : `<a href="${root}exercicios/index.html">← Catálogo de exercícios</a>`}
          ${next ? `<a href="${root}resolucoes/${next.key}/index.html">${next.id} · ${escapeHTML(next.title)} →</a>` : `<a href="${root}exercicios/index.html">Exercícios indicados →</a>`}
        </nav>
      </main>
    </div>
    ${window.CourseUI.footer()}`;

  let traceIndex = 0;
  const rows = [...document.querySelectorAll("[data-trace-row]")];
  const current = document.querySelector("#trace-current");
  const message = document.querySelector("#trace-message");
  const previousButton = document.querySelector("#trace-prev");
  const nextButton = document.querySelector("#trace-next");

  function renderTrace(shouldScroll = false) {
    rows.forEach((row, rowIndex) => row.classList.toggle("trace-active", rowIndex === traceIndex));
    const values = solution.trace.rows[traceIndex];
    current.textContent = traceIndex + 1;
    message.innerHTML = `<strong>${escapeHTML(values[0])}:</strong> ${escapeHTML(values.at(-1))}`;
    previousButton.disabled = traceIndex === 0;
    nextButton.disabled = traceIndex === rows.length - 1;
    if (shouldScroll) rows[traceIndex].scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  previousButton.addEventListener("click", () => { traceIndex -= 1; renderTrace(true); });
  nextButton.addEventListener("click", () => { traceIndex += 1; renderTrace(true); });
  document.querySelector("#trace-reset").addEventListener("click", () => { traceIndex = 0; renderTrace(true); });
  window.CourseUI.initCopyButtons();
  renderTrace();
}());
