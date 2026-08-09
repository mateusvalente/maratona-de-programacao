(function () {
  const ui = window.CourseUI;
  const id = Number(document.body.dataset.list);
  const list = (window.PROBLEM_LISTS || []).find((item) => item.id === id);
  const allProblems = window.BEE_PROBLEMS || [];

  if (!list) {
    ui.shell('<header class="lesson-header"><h1>Lista não encontrada</h1></header>', 0);
    return;
  }

  const cards = list.problems.map((problemId, index) => {
    const problem = allProblems.find((item) => item.id === problemId);
    return `<article class="problem-card">
      <span class="problem-id">${problem.id}</span>
      <div>
        <h3><a href="${ui.rootPath()}problemas/beecrowd/${problem.id}/index.html">${ui.esc(problem.title)}</a></h3>
        <p><strong>Assunto:</strong> ${ui.esc(problem.topic)} · <strong>Conhecimento necessário:</strong> ${ui.esc(problem.summary)}</p>
      </div>
      <span class="difficulty">${index + 1}. ${ui.esc(problem.difficulty)}</span>
    </article>`;
  }).join("");

  const previous = (window.PROBLEM_LISTS || [])[id - 2];
  const next = (window.PROBLEM_LISTS || [])[id];
  const html = `
    <header class="lesson-header">
      <p class="eyebrow">Lista ${String(id).padStart(2, "0")} · ${list.problems.length} exercícios</p>
      <h1>${ui.esc(list.title)}</h1>
      <p class="lead">${ui.esc(list.summary)}</p>
      <div class="lesson-meta"><span class="badge green">beecrowd</span><span class="badge">Python 3</span></div>
    </header>
    <section class="band">
      <h2>Como usar esta lista</h2>
      <ol class="steps"><li>Abra primeiro o enunciado oficial pelo link da página do exercício.</li><li>Escreva a ideia e tente implementar antes de revelar a solução.</li><li>Use a explicação para localizar o ponto que ainda não entendeu.</li><li>Reescreva e submeta sua própria versão.</li></ol>
    </section>
    <section class="band"><h2>Exercícios</h2><div class="problem-list">${cards}</div></section>
    <section class="band"><div class="note"><strong>Ordem sugerida:</strong> a sequência aumenta a quantidade de conceitos combinados, mas você pode voltar a um exercício depois de revisar a aula correspondente.</div></section>
    <nav class="lesson-nav">
      ${previous ? `<a href="${ui.rootPath()}listas/${previous.slug}/index.html">← ${ui.esc(previous.title)}</a>` : `<a href="${ui.rootPath()}index.html#listas">← Todas as listas</a>`}
      ${next ? `<a href="${ui.rootPath()}listas/${next.slug}/index.html">${ui.esc(next.title)} →</a>` : `<a href="${ui.rootPath()}aulas/aula-18-matematica-estatistica/index.html">Revisar matemática e estatística →</a>`}
    </nav>`;

  ui.shell(html, 0);
})();
