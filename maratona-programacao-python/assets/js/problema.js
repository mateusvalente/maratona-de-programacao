(function () {
  const ui = window.CourseUI;
  const id = Number(document.body.dataset.problem);
  const problem = (window.BEE_PROBLEMS || []).find((item) => item.id === id);

  if (!problem) {
    ui.shell('<header class="lesson-header"><p class="eyebrow">beecrowd</p><h1>Problema não encontrado</h1></header>', 0);
    return;
  }

  const originalUrl = `https://judge.beecrowd.com/pt/problems/view/${problem.id}`;
  const steps = problem.algorithm.map((step) => `<li>${ui.esc(step)}</li>`).join("");
  const errors = problem.errors.map((error) => `<li><strong>Atenção:</strong> ${ui.esc(error)}</li>`).join("");
  const codeLines = problem.code.split("\n");
  const explanations = codeLines
    .map((line, index) => line.trim() ? `<div class="trace-row"><span class="trace-number">${index + 1}</span><div class="trace-copy"><code>${ui.esc(line)}</code><br>${explainLine(line)}</div></div>` : "")
    .join("");

  const html = `
    <header class="lesson-header">
      <p class="eyebrow">beecrowd · explicação autoral</p>
      <div class="problem-title-row"><span class="problem-number">${problem.id}</span><span class="badge">${ui.esc(problem.topic)}</span></div>
      <h1>${ui.esc(problem.title)}</h1>
      <p class="lead">${ui.esc(problem.summary)}</p>
      <div class="lesson-meta"><span class="badge green">${ui.esc(problem.difficulty)}</span><span class="badge">Python 3</span></div>
      <div class="problem-actions"><a class="btn primary" href="${originalUrl}" target="_blank" rel="noreferrer">Abrir problema no beecrowd ↗</a><a class="btn" href="solucao.py">Abrir solução .py</a></div>
    </header>

    <section class="band">
      <h2>O que precisamos fazer?</h2>
      <p>${ui.esc(problem.summary)}</p>
      <div class="io-grid">
        <article class="concept-card"><h3>Entrada</h3><p>${ui.esc(problem.input)}</p></article>
        <article class="concept-card"><h3>Saída</h3><p>${ui.esc(problem.output)}</p></article>
      </div>
    </section>

    <section class="band">
      <h2>Exemplo</h2>
      <div class="io-grid">
        <div class="io-box"><h3>Entrada</h3><pre>${ui.esc(problem.sampleInput)}</pre></div>
        <div class="io-box"><h3>Saída</h3><pre>${ui.esc(problem.sampleOutput)}</pre></div>
      </div>
      <p class="source-note">O exemplo é uma amostra didática compatível com o problema; consulte a página oficial para o enunciado e os limites completos.</p>
    </section>

    <section class="band">
      <h2>Entendendo o raciocínio</h2>
      <p>Antes do Python, acompanhe a transformação dos dados. Cada passo usa apenas informações já lidas ou calculadas no passo anterior.</p>
      <ol class="steps">${steps}</ol>
    </section>

    <section class="band">
      <h2>Solução em Python</h2>
      <div class="code-shell"><div class="code-head">solucao.py</div><pre><code>${ui.esc(problem.code)}</code></pre></div>
    </section>

    <section class="band">
      <h2>O código por partes</h2>
      <div class="trace">${explanations}</div>
    </section>

    <section class="band">
      <div class="lab" id="problem-lab">
        <div class="lab-header"><h2>Teste de mesa</h2><span class="badge green">passo a passo</span></div>
        <div class="lab-body" id="trace-body"></div>
        <div class="lab-controls"><button class="btn" id="trace-back" type="button">← Anterior</button><button class="btn primary" id="trace-next" type="button">Próximo passo →</button><button class="btn" id="trace-reset" type="button">Reiniciar</button></div>
      </div>
    </section>

    <section class="band">
      <h2>Erros comuns</h2>
      <ul class="error-list">${errors}</ul>
      <div class="warning"><strong>Saída exata:</strong> não acrescente explicações, prompts ou unidades que não tenham sido pedidas.</div>
    </section>

    <section class="band">
      <h2>Depois de estudar</h2>
      <ol class="steps"><li>Feche esta explicação e reescreva a solução sem consultar.</li><li>Teste pelo menos um caso diferente do exemplo.</li><li>Submeta no beecrowd e use o veredito como evidência.</li></ol>
    </section>

    <nav class="lesson-nav" aria-label="Navegação do problema">
      <a href="${ui.rootPath()}index.html#listas">← Listas de exercícios</a>
      <a href="${originalUrl}" target="_blank" rel="noreferrer">Resolver no beecrowd →</a>
    </nav>`;

  ui.shell(html, 0);
  ui.decorateCode();
  initTrace();

  function explainLine(line) {
    const clean = line.trim();
    if (clean.startsWith("#")) return "Comentário para orientar a leitura; não altera a execução.";
    if (clean.startsWith("for ")) return "Inicia uma repetição e atribui o próximo valor à variável de controle.";
    if (clean.startsWith("while ")) return "Repete o bloco enquanto a condição continuar verdadeira.";
    if (clean.startsWith("if ")) return "Testa uma condição; o bloco indentado só executa quando ela é verdadeira.";
    if (clean.startsWith("elif ")) return "Testa uma nova condição apenas se os caminhos anteriores falharam.";
    if (clean === "else:") return "Executa o caminho restante quando as condições anteriores são falsas.";
    if (clean.startsWith("print")) return "Envia o resultado para a saída no formato exigido.";
    if (clean.startsWith("break")) return "Encerra imediatamente o laço atual.";
    if (clean.startsWith("return")) return "Devolve o valor calculado para quem chamou a função.";
    if (clean.includes("input()") && clean.includes("map(")) return "Lê uma linha, separa seus campos e converte cada um para o tipo indicado.";
    if (clean.includes("input()")) return clean.includes("int(") ? "Lê uma linha e converte o texto para inteiro." : clean.includes("float(") ? "Lê uma linha e converte o texto para número decimal." : "Lê uma linha da entrada como texto.";
    if (clean.includes("append(")) return "Acrescenta o novo valor ao final da lista.";
    if (clean.includes("=")) return "Calcula ou guarda o valor à direita no nome à esquerda.";
    return "Executa esta instrução dentro do bloco indicado pela indentação.";
  }

  function initTrace() {
    let step = 0;
    const body = document.querySelector("#trace-body");
    function draw() {
      body.innerHTML = `<div class="flow">${problem.trace.map((_, index) => `<span class="flow-step ${index === step ? "active" : ""}">${index + 1}</span>${index < problem.trace.length - 1 ? '<span class="flow-arrow">→</span>' : ''}`).join("")}</div><div class="lab-message"><strong>Passo ${step + 1}:</strong> ${ui.esc(problem.trace[step])}</div><div class="io-grid" style="margin-top:14px"><div class="io-box"><h3>Entrada usada</h3><pre>${ui.esc(problem.sampleInput)}</pre></div><div class="io-box"><h3>Saída esperada</h3><pre>${ui.esc(problem.sampleOutput)}</pre></div></div>`;
    }
    document.querySelector("#trace-back").onclick = () => { step = (step - 1 + problem.trace.length) % problem.trace.length; draw(); };
    document.querySelector("#trace-next").onclick = () => { step = (step + 1) % problem.trace.length; draw(); };
    document.querySelector("#trace-reset").onclick = () => { step = 0; draw(); };
    draw();
  }
})();
