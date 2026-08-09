(function () {
  "use strict";

  const number = Number(document.body.dataset.lesson);
  const lesson = window.PARADIGM_LESSONS.find((item) => item.number === number);
  const app = document.querySelector("#app");

  if (!lesson) {
    app.innerHTML = `<main class="catalog"><h1>Aula não encontrada</h1></main>`;
    return;
  }

  document.title = `Aula ${String(number).padStart(2, "0")} — ${lesson.title} | Paradigmas`;

  const sections = lesson.sections.map((section) => `
    <section class="band">
      <h2>${window.CourseUI.escapeHTML(section.title)}</h2>
      ${section.html.replaceAll("{{ROOT}}", window.CourseUI.rootPath())}
      ${section.code ? window.CourseUI.codeBlock(section.code) : ""}
    </section>`).join("");

  const questions = lesson.questions.map((item, index) => `
    <details>
      <summary>${index + 1}. ${window.CourseUI.escapeHTML(item[0])}</summary>
      <div class="question-answer"><p>${window.CourseUI.escapeHTML(item[1])}</p></div>
    </details>`).join("");

  const sources = lesson.sources.map((source) => `
    <li><a href="${source[1]}" target="_blank" rel="noreferrer">${window.CourseUI.escapeHTML(source[0])}</a></li>`).join("");

  const previous = window.PARADIGM_LESSONS[number - 2];
  const next = window.PARADIGM_LESSONS[number];

  app.innerHTML = `
    ${window.CourseUI.header()}
    <div class="layout">
      ${window.CourseUI.sidebar(number)}
      <main class="main">
        <header class="lesson-header">
          <p class="eyebrow">Aula ${String(number).padStart(2, "0")} · Paradigmas</p>
          <h1>${window.CourseUI.escapeHTML(lesson.title)}</h1>
          <p class="lead">${window.CourseUI.escapeHTML(lesson.summary)}</p>
          <div class="lesson-meta"><span class="badge green">${lesson.duration}</span><span class="badge">Python 3</span><span class="badge yellow">Exemplo didático próprio</span></div>
          <div class="progress-track" aria-label="Progresso na trilha"><span style="width:${number * 10}%"></span></div>
        </header>

        <section class="band">
          <div class="two-col">
            <div><p class="eyebrow">Antes de começar</p><h2>Pré-requisitos</h2><p>Revise estes pontos se algum termo ainda não estiver confortável.</p></div>
            <ul class="check-list">${lesson.prerequisites.map((item) => `<li>${window.CourseUI.escapeHTML(item)}</li>`).join("")}</ul>
          </div>
        </section>

        ${sections}

        <section class="band" id="laboratorio">
          <div id="lesson-lab"></div>
        </section>

        <section class="band">
          <div class="two-col">
            <div><p class="eyebrow">Fechamento</p><h2>O que você deve ter aprendido</h2><p>Ao terminar esta aula, você deve conseguir:</p></div>
            <ul class="check-list">${lesson.goals.map((item) => `<li>${window.CourseUI.escapeHTML(item)}</li>`).join("")}</ul>
          </div>
        </section>

        <section class="band">
          <p class="eyebrow">Fixação</p><h2>Perguntas conceituais</h2>
          <p>Responda antes de abrir cada item. A resposta serve para conferir o raciocínio.</p>
          <div class="question-list">${questions}</div>
        </section>

        <section class="band">
          <p class="eyebrow">Aprofundamento</p><h2>Fontes verificadas</h2>
          <ul class="sources">${sources}</ul>
          <p class="source-note">As fontes apoiam a parte teórica. Os exemplos de código desta página foram criados especificamente para a aula.</p>
        </section>

        <nav class="lesson-nav" aria-label="Navegação entre aulas">
          ${previous ? `<a href="${window.CourseUI.lessonHref(previous)}">← Aula ${String(previous.number).padStart(2, "0")} · ${window.CourseUI.escapeHTML(previous.title)}</a>` : `<a href="${window.CourseUI.rootPath()}index.html">← Voltar ao índice</a>`}
          ${next ? `<a href="${window.CourseUI.lessonHref(next)}">Aula ${String(next.number).padStart(2, "0")} · ${window.CourseUI.escapeHTML(next.title)} →</a>` : `<a href="${window.CourseUI.rootPath()}exercicios/index.html">Ver exercícios por paradigma →</a>`}
        </nav>
      </main>
    </div>
    ${window.CourseUI.footer()}`;

  window.CourseUI.initCopyButtons();
  window.ParadigmLabs.mount(document.querySelector("#lesson-lab"), lesson.lab);
}());
