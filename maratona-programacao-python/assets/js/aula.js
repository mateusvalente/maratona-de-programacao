(function () {
  const ui = window.CourseUI;
  const id = Number(document.body.dataset.lesson);
  const lessons = window.COURSE_LESSONS || [];
  const lesson = lessons.find((item) => item.id === id);

  if (!lesson) {
    ui.shell('<section class="lesson-header"><p class="eyebrow">Curso</p><h1>Aula não encontrada</h1></section>', 0);
    return;
  }

  const previous = lessons[id - 2];
  const next = lessons[id];
  const lessonErrors = {
    1: ["Começar a programar antes de saber exatamente o que deve sair.", "Validar a ideia apenas com o exemplo do enunciado."],
    2: ["Usar regras de uma edição antiga sem consultar o regulamento atual.", "Comparar equipes pelo tempo antes de comparar a quantidade de problemas resolvidos."],
    3: ["Deixar todos lendo o mesmo problema sem combinar esse foco.", "Ocupar o computador enquanto a ideia ainda não consegue ser explicada."],
    4: ["Escolher pela letra em vez da chance de Accepted.", "Insistir sem novos testes ou evidências de progresso."],
    5: ["Forçar uma categoria antes de entender entrada e saída.", "Achar que reconhecer o tema já prova a solução."],
    6: ["Modificar várias partes ao mesmo tempo e perder a causa do erro.", "Reenviar o mesmo código esperando outro veredito."],
    7: ["Enviar o arquivo certo para o problema errado.", "Confundir o placar público com o feedback privado da equipe."],
    8: ["Trocar de linguagem para esconder um algoritmo inadequado.", "Usar uma linguagem sem confirmar se ela está disponível na competição."],
    9: ["Confundir / com //.", "Usar ^ como potência; em Python, potência é **."],
    10: ["Somar strings e produzir 1020 em vez de 30.", "Acrescentar mensagens que não foram pedidas na saída."],
    11: ["Copiar código antes de entender a fórmula.", "Testar somente a amostra e ignorar formatação e limites."],
    12: ["Usar = quando a intenção era comparar com ==.", "Esquecer a indentação ou testar intervalos em ordem incorreta."],
    13: ["Esperar que o limite final de range seja incluído.", "Reiniciar o acumulador dentro do laço."],
    14: ["Não atualizar o estado e criar um laço infinito.", "Processar o sentinela como se fosse um dado comum."],
    15: ["Acessar o índice len(lista), que já está fora da lista.", "Confundir uma lista indexada com uma lista encadeada."],
    16: ["Remover espaços quando eles fazem parte da resposta.", "Alternar ou contar posições sem lembrar que o primeiro índice é zero."],
    17: ["Confundir print com return.", "Criar funções sem responsabilidade clara apenas para fragmentar o código."]
  };
  const errors = (lessonErrors[id] || []).map((error) => `<li><strong>Atenção:</strong> ${ui.esc(error)}</li>`).join("");
  const sources = lesson.sources.map(([label, url]) => `<li><a href="${url}" target="_blank" rel="noreferrer">${ui.esc(label)}</a></li>`).join("");
  const solution = lesson.solution.includes("\n")
    ? `<div class="code-shell"><div class="code-head">Uma solução possível</div><pre><code>${ui.esc(lesson.solution)}</code></pre></div>`
    : `<p>${ui.esc(lesson.solution)}</p>`;

  const html = `
    <header class="lesson-header">
      <p class="eyebrow">Aula ${String(id).padStart(2, "0")} de ${lessons.length}</p>
      <h1>${ui.esc(lesson.title)}</h1>
      <p class="lead">${ui.esc(lesson.summary)}</p>
      <div class="lesson-meta"><span class="badge green">Python 3</span><span class="badge">${ui.esc(lesson.duration)}</span><span class="badge yellow">com laboratório</span></div>
      <div class="progress-track" aria-label="Progresso do curso"><span style="width:${(id / lessons.length) * 100}%"></span></div>
    </header>
    ${lesson.content}
    <section class="band">
      <h2>Erros comuns</h2>
      <ul class="error-list">${errors}</ul>
    </section>
    <section class="band">
      <div class="lab" id="lesson-lab" data-activity="${lesson.activity}">
        <div class="lab-header"><h2>Laboratório da aula</h2><span class="badge green">interativo</span></div>
        <div class="lab-body" id="lab-body"></div>
      </div>
    </section>
    <section class="band">
      <div class="challenge">
        <h2>Desafio</h2>
        <p>${ui.esc(lesson.challenge)}</p>
        <details class="solution"><summary>Conferir uma solução possível</summary><div>${solution}</div></details>
      </div>
    </section>
    <section class="band">
      <h2>Para estudar além da aula</h2>
      <ul class="sources">${sources}</ul>
      <p class="source-note">As regras de competição foram descritas a partir das fontes oficiais indicadas. Para uma edição específica, consulte sempre o regulamento publicado naquele ano.</p>
    </section>
    <nav class="lesson-nav" aria-label="Navegação entre aulas">
      ${previous ? `<a href="${ui.lessonUrl(previous)}">← ${ui.esc(previous.title)}</a>` : `<a href="${ui.rootPath()}index.html">← Página inicial</a>`}
      ${next ? `<a href="${ui.lessonUrl(next)}">${ui.esc(next.title)} →</a>` : `<a href="${ui.rootPath()}index.html#listas">Listas de exercícios →</a>`}
    </nav>`;

  ui.shell(html, id);
  ui.decorateCode();
  initActivity(lesson.activity);

  function initActivity(type) {
    const body = document.querySelector("#lab-body");
    const lab = document.querySelector("#lesson-lab");
    const activities = {
      flow: flowActivity,
      scoreboard: scoreboardActivity,
      team: teamActivity,
      strategy: strategyActivity,
      categories: categoriesActivity,
      verdicts: verdictsActivity,
      boca: bocaActivity,
      languages: languagesActivity,
      calculator: calculatorActivity,
      input: inputActivity,
      "problems-basic": problemsActivity,
      if: ifActivity,
      range: rangeActivity,
      while: whileActivity,
      list: listActivity,
      string: stringActivity,
      function: functionActivity
    };
    (activities[type] || flowActivity)(body, lab);
  }

  function controls(lab, content) {
    lab.insertAdjacentHTML("beforeend", `<div class="lab-controls">${content}</div>`);
  }

  function flowActivity(body, lab) {
    const names = ["Problema", "Entender", "Entrada e saída", "Algoritmo", "Código", "Teste", "Submissão", "Juiz"];
    let step = 0;
    const messages = ["Leia o pedido sem pensar em sintaxe.", "Reescreva a tarefa com suas palavras.", "Separe o que chega do que deve sair.", "Crie passos finitos e verificáveis.", "Traduza a ideia para Python.", "Use exemplos e casos de borda.", "Envie o arquivo correto.", "Interprete o veredito e aprenda com ele."];
    function draw() {
      body.innerHTML = `<div class="flow">${names.map((name, index) => `<span class="flow-step ${index === step ? "active" : ""}">${name}</span>${index < names.length - 1 ? '<span class="flow-arrow">→</span>' : ''}`).join("")}</div><div class="lab-message"><strong>Etapa ${step + 1}:</strong> ${messages[step]}</div>`;
    }
    controls(lab, '<button class="btn" id="flow-back" type="button">← Anterior</button><button class="btn primary" id="flow-next" type="button">Próxima etapa →</button>');
    lab.querySelector("#flow-back").onclick = () => { step = (step - 1 + names.length) % names.length; draw(); };
    lab.querySelector("#flow-next").onclick = () => { step = (step + 1) % names.length; draw(); };
    draw();
  }

  function scoreboardActivity(body, lab) {
    let solved = 3;
    let time = 340;
    let wrong = 0;
    function draw(message = "Adicione tentativas e observe a posição.") {
      const effective = time;
      const teams = [
        { name: "Ada", solved: 5, time: 615 },
        { name: "Sua equipe", solved, time: effective, current: true },
        { name: "Turing", solved: 4, time: 470 },
        { name: "Hamilton", solved: 3, time: 290 }
      ].sort((a, b) => b.solved - a.solved || a.time - b.time);
      body.innerHTML = `<div class="scoreboard">${teams.map((team, index) => `<div class="score-row ${team.current ? "current" : ""}"><span>${index + 1}º</span><strong>${team.name}</strong><span>${team.solved} AC</span><span>${team.time} min</span></div>`).join("")}</div><div class="lab-message">${message} Tentativas rejeitadas no próximo problema: <strong>${wrong}</strong>.</div>`;
    }
    controls(lab, '<button class="btn" id="add-wa" type="button">Registrar WA</button><button class="btn primary" id="solve" type="button">Receber Accepted</button><button class="btn" id="score-reset" type="button">Reiniciar</button>');
    lab.querySelector("#add-wa").onclick = () => { wrong += 1; draw("O WA só será somado se este problema for aceito."); };
    lab.querySelector("#solve").onclick = () => { if (solved < 5) { solved += 1; time += 55; time += wrong * 20; wrong = 0; } draw("Problema aceito: primeiro conta quantidade resolvida, depois o tempo."); };
    lab.querySelector("#score-reset").onclick = () => { solved = 3; time = 340; wrong = 0; draw(); };
    draw();
  }

  function teamActivity(body, lab) {
    const jobs = ["Ler A, B e C", "Ler D, E e F", "Implementar o mais seguro"];
    const assigned = [null, null, null];
    function draw(message = "Distribua uma tarefa diferente para cada integrante.") {
      body.innerHTML = `<div class="three-col">${assigned.map((job, index) => `<article class="concept-card"><h3>Integrante ${index + 1}</h3><p>${job || "Aguardando tarefa"}</p><div class="btn-row">${jobs.map((item) => `<button class="btn task" data-person="${index}" data-job="${item}" type="button">${item.split(" ")[0]}</button>`).join("")}</div></article>`).join("")}</div><div class="lab-message">${message}</div>`;
      body.querySelectorAll(".task").forEach((button) => button.onclick = () => { assigned[Number(button.dataset.person)] = button.dataset.job; draw("A equipe enxerga quem está lendo, pensando e usando o computador."); });
    }
    controls(lab, '<button class="btn" id="team-reset" type="button">Limpar quadro</button>');
    lab.querySelector("#team-reset").onclick = () => { assigned.fill(null); draw(); };
    draw();
  }

  function strategyActivity(body, lab) {
    const problems = [{id:"A",d:1},{id:"B",d:3},{id:"C",d:1},{id:"D",d:2},{id:"E",d:2.5},{id:"F",d:1},{id:"G",d:3}];
    let order = [];
    function draw() {
      body.innerHTML = `<div class="tokens">${problems.map((p) => `<button class="token ${order.includes(p.id) ? "done" : ""}" data-id="${p.id}" type="button">${p.id}<span class="token-index">${["fácil","médio","difícil"][Math.ceil(p.d)-1]}</span></button>`).join("")}</div><div class="lab-message"><strong>Ordem montada:</strong> ${order.length ? order.join(" → ") : "selecione os problemas pela chance de Accepted"}</div>`;
      body.querySelectorAll(".token").forEach((button) => button.onclick = () => { if (!order.includes(button.dataset.id)) order.push(button.dataset.id); draw(); });
    }
    controls(lab, '<button class="btn primary" id="suggest-order" type="button">Sugerir ordem</button><button class="btn" id="strategy-reset" type="button">Recomeçar</button>');
    lab.querySelector("#suggest-order").onclick = () => { order = [...problems].sort((a,b) => a.d-b.d).map((p) => p.id); draw(); };
    lab.querySelector("#strategy-reset").onclick = () => { order = []; draw(); };
    draw();
  }

  function categoriesActivity(body) {
    const questions = [
      ["Dado N, imprima o quadrado de cada número de 1 até N.", "Repetição"],
      ["Informe em qual intervalo um valor está.", "Condicionais"],
      ["Conte as vogais de uma frase.", "Strings"],
      ["Encontre a posição do menor valor.", "Listas"],
      ["Calcule a área de um círculo.", "Matemática"]
    ];
    let current = 0;
    const options = ["Matemática", "Condicionais", "Repetição", "Listas", "Strings"];
    function draw(message = "Qual pista revela a categoria principal?") {
      const [question] = questions[current];
      body.innerHTML = `<h3>${question}</h3><div class="verdict-grid">${options.map((option) => `<button class="verdict" data-answer="${option}" type="button"><strong>${option}</strong></button>`).join("")}</div><div class="lab-message">${message}</div>`;
      body.querySelectorAll(".verdict").forEach((button) => button.onclick = () => { const right = button.dataset.answer === questions[current][1]; const msg = right ? `Correto: ${questions[current][1]}.` : `Observe os verbos e os dados. A resposta principal é ${questions[current][1]}.`; current = (current + 1) % questions.length; window.setTimeout(() => draw(msg), 250); });
    }
    draw();
  }

  function verdictsActivity(body) {
    const cases = [
      ["O código não possui ':' depois do if.", "CE"],
      ["O programa imprime 1020 em vez de 30.", "WA"],
      ["Acessou numeros[10] em uma lista de tamanho 3.", "RE"],
      ["Um while nunca altera sua condição.", "TLE"],
      ["Guardou uma matriz gigantesca sem necessidade.", "MLE"]
    ];
    let current = 0;
    const names = ["AC", "WA", "CE", "RE", "TLE", "MLE"];
    function draw(message = "Escolha o veredito mais provável.") {
      body.innerHTML = `<h3>${cases[current][0]}</h3><div class="verdict-grid">${names.map((name) => `<button class="verdict" data-answer="${name}" type="button"><strong>${name}</strong></button>`).join("")}</div><div class="lab-message">${message}</div>`;
      body.querySelectorAll(".verdict").forEach((button) => button.onclick = () => { const correct = button.dataset.answer === cases[current][1]; const answer = cases[current][1]; current = (current + 1) % cases.length; draw(correct ? `Certo: ${answer} orienta a investigação.` : `O mais provável é ${answer}.`); });
    }
    draw();
  }

  function bocaActivity(body, lab) {
    let queue = [];
    let history = [];
    let serial = 1;
    function draw(message = "Envie um arquivo para acompanhar o fluxo.") {
      body.innerHTML = `<div class="two-col"><div><h3>Fila de julgamento</h3><div class="tokens">${queue.length ? queue.map((item) => `<span class="token active">#${item.id}<span class="token-index">${item.problem}</span></span>`).join("") : '<p>Fila vazia.</p>'}</div></div><div><h3>Julgados</h3><div class="tokens">${history.length ? history.map((item) => `<span class="token ${item.verdict === "AC" ? "done" : "bad"}">#${item.id}<span class="token-index">${item.verdict}</span></span>`).join("") : '<p>Nenhum resultado.</p>'}</div></div></div><div class="lab-message">${message}</div>`;
    }
    controls(lab, '<div class="field"><label for="boca-problem">Problema</label><select id="boca-problem"><option>A</option><option>B</option><option>C</option></select></div><button class="btn primary" id="submit" type="button">Enviar .py</button><button class="btn" id="judge" type="button">Julgar próximo</button>');
    lab.querySelector("#submit").onclick = () => { queue.push({ id: serial++, problem: lab.querySelector("#boca-problem").value }); draw("A submissão entrou na fila e ainda não alterou o placar."); };
    lab.querySelector("#judge").onclick = () => { if (!queue.length) return draw("Não há submissões aguardando."); const item = queue.shift(); item.verdict = item.id % 3 === 0 ? "WA" : "AC"; history.unshift(item); draw(`A submissão #${item.id} saiu da fila com ${item.verdict}.`); };
    draw();
  }

  function languagesActivity(body) {
    const data = {
      Python: ["print(\"Hello World!\")", "Implementação rápida e leitura direta."],
      "C++": ["cout << \"Hello World!\\n\";", "Desempenho alto e STL ampla."],
      Java: ["System.out.println(\"Hello World!\");", "Tipagem forte e biblioteca sólida."],
      C: ["printf(\"Hello World!\\n\");", "Controle e desempenho com mais detalhes manuais."]
    };
    function draw(name) {
      body.innerHTML = `<div class="btn-row">${Object.keys(data).map((key) => `<button class="btn ${key === name ? "primary" : ""}" data-name="${key}" type="button">${key}</button>`).join("")}</div><div class="code-shell" style="margin-top:14px"><div class="code-head">Mesmo objetivo em ${name}</div><pre><code>${ui.esc(data[name][0])}</code></pre></div><div class="lab-message">${data[name][1]} A ideia do algoritmo continua sendo o centro.</div>`;
      body.querySelectorAll("[data-name]").forEach((button) => button.onclick = () => draw(button.dataset.name));
    }
    draw("Python");
  }

  function calculatorActivity(body, lab) {
    function calculate() {
      const a = Number(lab.querySelector("#calc-a").value);
      const b = Number(lab.querySelector("#calc-b").value);
      const op = lab.querySelector("#calc-op").value;
      const operations = { "+": a + b, "-": a - b, "*": a * b, "/": b === 0 ? "indefinida" : a / b, "//": b === 0 ? "indefinida" : Math.floor(a / b), "%": b === 0 ? "indefinido" : a % b, "**": a ** b };
      body.innerHTML = `<div class="tokens"><span class="token">${a}</span><span class="token active">${op}</span><span class="token">${b}</span><span class="flow-arrow">→</span><span class="token done">${operations[op]}</span></div><div class="lab-message"><strong>Expressão:</strong> ${a} ${op} ${b}</div>`;
    }
    controls(lab, '<div class="field"><label for="calc-a">Valor A</label><input id="calc-a" type="number" value="7"></div><div class="field"><label for="calc-op">Operador</label><select id="calc-op"><option>+</option><option>-</option><option>*</option><option>/</option><option>//</option><option>%</option><option>**</option></select></div><div class="field"><label for="calc-b">Valor B</label><input id="calc-b" type="number" value="2"></div><button class="btn primary" id="calc" type="button">Calcular</button>');
    lab.querySelector("#calc").onclick = calculate;
    calculate();
  }

  function inputActivity(body, lab) {
    let step = 0;
    const stages = [
      ["input()", (raw) => `\"${raw}\"`, "A linha inteira ainda é texto."],
      ["split()", (raw) => `[${raw.trim().split(/\s+/).map((x) => `\"${x}\"`).join(", ")}]`, "Os espaços separam strings."],
      ["map(int, ...)", (raw) => raw.trim().split(/\s+/).map(Number).join("    "), "Cada parte foi convertida para inteiro."],
      ["atribuição", (raw) => raw.trim().split(/\s+/).map((x, i) => `${String.fromCharCode(97 + i)} = ${Number(x)}`).join("; "), "Cada número chega à sua variável."]
    ];
    function draw() {
      const raw = lab.querySelector("#raw-input")?.value || "10 20";
      const [name, transform, message] = stages[step];
      body.innerHTML = `<div class="flow">${stages.map((item, index) => `<span class="flow-step ${index === step ? "active" : ""}">${item[0]}</span>${index < stages.length - 1 ? '<span class="flow-arrow">→</span>' : ''}`).join("")}</div><div class="tokens">${raw.trim().split(/\s+/).map((token) => `<span class="token ${step >= 2 ? "done" : ""}">${ui.esc(token)}<span class="token-index">${step >= 2 ? "int" : "str"}</span></span>`).join("")}</div><div class="lab-message"><strong>${name}:</strong> ${ui.esc(transform(raw))}<br>${message}</div>`;
    }
    controls(lab, '<div class="field"><label for="raw-input">Linha de entrada</label><input id="raw-input" value="10 20"></div><button class="btn" id="input-back" type="button">←</button><button class="btn primary" id="input-next" type="button">Próxima etapa</button>');
    lab.querySelector("#input-back").onclick = () => { step = (step - 1 + stages.length) % stages.length; draw(); };
    lab.querySelector("#input-next").onclick = () => { step = (step + 1) % stages.length; draw(); };
    lab.querySelector("#raw-input").oninput = draw;
    draw();
  }

  function problemsActivity(body) {
    const ids = [[1000,"Hello World!"],[1001,"Extremamente Básico"],[1002,"Área do Círculo"],[1003,"Soma Simples"],[1004,"Produto Simples"],[1005,"Média 1"],[1006,"Média 2"],[1007,"Diferença"],[1008,"Salário"],[1009,"Salário com Bônus"]];
    body.innerHTML = `<div class="problem-list">${ids.map(([problemId, title]) => `<article class="problem-card"><span class="problem-id">${problemId}</span><div><h3><a href="${ui.rootPath()}problemas/beecrowd/${problemId}/index.html">${title}</a></h3><p>Abra a explicação, tente primeiro e use o teste de mesa para conferir.</p></div><span class="difficulty">muito fácil</span></article>`).join("")}</div>`;
  }

  function ifActivity(body, lab) {
    function draw() {
      const value = Number(lab.querySelector("#if-value").value);
      let result = "ZERO";
      let path = "else";
      if (value > 0) { result = "POSITIVO"; path = "if numero > 0"; }
      else if (value < 0) { result = "NEGATIVO"; path = "elif numero < 0"; }
      body.innerHTML = `<div class="flow"><span class="flow-step active">numero = ${value}</span><span class="flow-arrow">→</span><span class="flow-step active">${path}</span><span class="flow-arrow">→</span><span class="flow-step active">${result}</span></div><div class="lab-message">Python testou de cima para baixo e entrou em <strong>${path}</strong>.</div>`;
    }
    controls(lab, '<div class="field"><label for="if-value">Número</label><input id="if-value" type="number" value="7"></div><button class="btn primary" id="if-test" type="button">Testar condição</button>');
    lab.querySelector("#if-test").onclick = draw;
    lab.querySelector("#if-value").oninput = draw;
    draw();
  }

  function rangeActivity(body, lab) {
    function draw() {
      const start = Number(lab.querySelector("#range-start").value);
      const stop = Number(lab.querySelector("#range-stop").value);
      const step = Number(lab.querySelector("#range-step").value) || 1;
      const values = [];
      if (step > 0) for (let i = start; i < stop && values.length < 30; i += step) values.push(i);
      else for (let i = start; i > stop && values.length < 30; i += step) values.push(i);
      body.innerHTML = `<div class="tokens">${values.length ? values.map((value) => `<span class="token">${value}</span>`).join("") : '<p>Nenhuma repetição: o início e o passo não caminham até o limite.</p>'}</div><div class="lab-message"><strong>range(${start}, ${stop}, ${step})</strong>: o limite ${stop} não entra.</div>`;
    }
    controls(lab, '<div class="field"><label for="range-start">Início</label><input id="range-start" type="number" value="0"></div><div class="field"><label for="range-stop">Fim exclusivo</label><input id="range-stop" type="number" value="10"></div><div class="field"><label for="range-step">Passo</label><input id="range-step" type="number" value="2"></div><button class="btn primary" id="range-run" type="button">Visualizar</button>');
    lab.querySelector("#range-run").onclick = draw;
    draw();
  }

  function whileActivity(body, lab) {
    const values = [8, 3, 5, 0, 9];
    let pointer = 0;
    function draw(message = "Avance uma repetição; zero é o sentinela.") {
      body.innerHTML = `<div class="tokens">${values.map((value, index) => `<span class="token ${index < pointer ? "done" : index === pointer ? "active" : ""}">${value}<span class="token-index">${value === 0 ? "fim" : `posição ${index}`}</span></span>`).join("")}</div><div class="lab-message">${message}</div>`;
    }
    controls(lab, '<button class="btn primary" id="while-next" type="button">Executar uma volta</button><button class="btn" id="while-reset" type="button">Reiniciar</button>');
    lab.querySelector("#while-next").onclick = () => { if (pointer >= values.length) return; if (values[pointer] === 0) { draw("A condição do if encontrou zero: break encerra o laço. O 9 não é lido por esse fluxo."); pointer = values.length; } else { const value = values[pointer++]; draw(`O valor ${value} não é o sentinela e foi processado.`); } };
    lab.querySelector("#while-reset").onclick = () => { pointer = 0; draw(); };
    draw();
  }

  function listActivity(body, lab) {
    let values = [10, 20, 30, 40];
    let active = 0;
    function draw(message = "Clique em uma célula para consultar seu índice e valor.") {
      body.innerHTML = `<div class="tokens">${values.map((value, index) => `<button class="token ${index === active ? "active" : ""}" data-index="${index}" type="button">${value}<span class="token-index">índice ${index}</span></button>`).join("")}</div><div class="lab-message">${message}<br><strong>len = ${values.length}; min = ${Math.min(...values)}; max = ${Math.max(...values)}; sum = ${values.reduce((a,b) => a+b,0)}</strong></div>`;
      body.querySelectorAll("[data-index]").forEach((button) => button.onclick = () => { active = Number(button.dataset.index); draw(`numeros[${active}] devolve ${values[active]}.`); });
    }
    controls(lab, '<div class="field"><label for="append-value">Novo valor</label><input id="append-value" type="number" value="50"></div><button class="btn primary" id="append" type="button">append</button><button class="btn" id="list-reset" type="button">Reiniciar</button>');
    lab.querySelector("#append").onclick = () => { values.push(Number(lab.querySelector("#append-value").value)); active = values.length - 1; draw("append adicionou uma nova célula ao final."); };
    lab.querySelector("#list-reset").onclick = () => { values = [10,20,30,40]; active = 0; draw(); };
    draw();
  }

  function stringActivity(body, lab) {
    function draw() {
      const text = lab.querySelector("#string-value").value;
      body.innerHTML = `<div class="tokens">${[...text].map((char, index) => `<span class="token">${char === " " ? "␠" : ui.esc(char)}<span class="token-index">índice ${index}</span></span>`).join("") || '<p>A string está vazia.</p>'}</div><div class="lab-message"><strong>len = ${[...text].length}</strong><br>lower: ${ui.esc(text.toLowerCase())}<br>upper: ${ui.esc(text.toUpperCase())}<br>strip: ${ui.esc(text.trim())}</div>`;
    }
    controls(lab, '<div class="field"><label for="string-value">Texto</label><input id="string-value" value="Maratona"></div><button class="btn primary" id="string-run" type="button">Examinar</button>');
    lab.querySelector("#string-run").onclick = draw;
    lab.querySelector("#string-value").oninput = draw;
    draw();
  }

  function functionActivity(body, lab) {
    let step = 0;
    const stages = ["A chamada soma(10, 20) começa.", "a recebe 10 e b recebe 20.", "A expressão a + b produz 30.", "return devolve 30 para resultado.", "print mostra 30."];
    function draw() {
      body.innerHTML = `<div class="flow">${stages.map((_, index) => `<span class="flow-step ${index === step ? "active" : ""}">${index + 1}</span>${index < stages.length - 1 ? '<span class="flow-arrow">→</span>' : ''}`).join("")}</div><div class="lab-message"><strong>Passo ${step + 1}:</strong> ${stages[step]}</div>`;
    }
    controls(lab, '<button class="btn" id="fn-back" type="button">← Anterior</button><button class="btn primary" id="fn-next" type="button">Próximo passo →</button>');
    lab.querySelector("#fn-back").onclick = () => { step = (step - 1 + stages.length) % stages.length; draw(); };
    lab.querySelector("#fn-next").onclick = () => { step = (step + 1) % stages.length; draw(); };
    draw();
  }
})();
