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
    10: ["Somar strings e produzir 1020 em vez de 30.", "Tentar desempacotar uma quantidade de valores diferente da quantidade de variáveis.", "Ler T dentro do laço ou tratar a linha de T como se já fosse o primeiro caso.", "Esperar a palavra EOF em vez de reconhecer o fim real da entrada.", "Acrescentar mensagens que não foram pedidas na saída."],
    11: ["Copiar código antes de entender a fórmula.", "Testar somente a amostra e ignorar formatação e limites."],
    12: ["Usar = quando a intenção era comparar com ==.", "Esquecer a indentação ou testar intervalos em ordem incorreta."],
    13: ["Esperar que o limite final de range seja incluído.", "Reiniciar o acumulador dentro do laço."],
    14: ["Não atualizar o estado e criar um laço infinito.", "Processar o sentinela como se fosse um dado comum.", "Confundir continue, que pula uma volta, com break, que encerra o laço.", "Colocar a atualização depois de continue e nunca alcançar essa linha."],
    15: ["Acessar o índice len(lista), que já está fora da lista.", "Confundir uma lista indexada com uma lista encadeada."],
    16: ["Remover espaços quando eles fazem parte da resposta.", "Alternar ou contar posições sem lembrar que o primeiro índice é zero."],
    17: ["Confundir print com return.", "Criar funções sem responsabilidade clara apenas para fragmentar o código."],
    18: ["Calcular a mediana antes de ordenar os dados.", "Dividir pela quantidade errada em uma média ponderada.", "Supor que todo conjunto possui uma única moda.", "Arredondar resultados intermediários e acumular erro."],
    19: ["Procurar uma sintaxe chamada switch em Python em vez de usar match/case.", "Esquecer case _ e não tratar valores inesperados.", "Usar match para intervalos que seriam mais claros com if/elif.", "Colocar um padrão geral antes de um caso mais específico."],
    20: ["Usar colchetes em uma chave inexistente e causar KeyError.", "Esperar que um conjunto mantenha índices ou uma ordem fixa.", "Criar um conjunto vazio com {}, que na verdade cria um dicionário.", "Alterar o tamanho de um dicionário enquanto o percorre."]
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
      <p class="source-note">Use as referências para aprofundar o conceito e consulte a documentação atual da linguagem e os enunciados oficiais ao resolver os exercícios.</p>
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
      function: functionActivity,
      statistics: statisticsActivity,
      "match-case": matchCaseActivity,
      "dictionary-set": dictionarySetActivity
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
    const presets = {
      line: "10 20 30",
      tests: "3\n10 20\n5 7\n8 1",
      eof: "10 20\n5 7\n8 1"
    };
    let mode = "line";
    let step = 0;

    function linesFrom(raw) {
      return raw.replace(/\r/g, "").split("\n").filter((line) => line.trim() !== "");
    }

    function sumLine(line) {
      const values = line.trim().split(/\s+/).map(Number);
      return values.every(Number.isFinite) ? values.reduce((sum, value) => sum + value, 0) : "entrada inválida";
    }

    function drawSingleLine(raw) {
      const line = linesFrom(raw)[0] || "";
      const tokens = line.trim() ? line.trim().split(/\s+/) : [];
      const stages = ["input()", "split()", "map(int, ...)", "atribuição"];
      const explanations = [
        [`\"${line}\"`, "A linha inteira chegou como uma única string."],
        [`[${tokens.map((token) => `\"${token}\"`).join(", ")}]`, "Os espaços separaram a linha em várias strings."],
        [tokens.map((token) => Number(token)).join(", "), "int foi aplicado a cada parte da linha."],
        [tokens.map((token, index) => `${String.fromCharCode(97 + index)} = ${Number(token)}`).join("; "), "Os valores foram distribuídos entre as variáveis, na ordem."]
      ];
      const [result, message] = explanations[step];
      body.innerHTML = `<div class="flow">${stages.map((name, index) => `<span class="flow-step ${index === step ? "active" : ""}">${name}</span>${index < stages.length - 1 ? '<span class="flow-arrow">→</span>' : ''}`).join("")}</div><div class="tokens">${tokens.length ? tokens.map((token) => `<span class="token ${step >= 2 ? "done" : ""}">${ui.esc(token)}<span class="token-index">${step >= 2 ? "int" : "str"}</span></span>`).join("") : "<p>Digite pelo menos um valor.</p>"}</div><div class="lab-message"><strong>Resultado desta etapa:</strong> ${ui.esc(result)}<br>${message}</div>`;
    }

    function inputRows(lines, consumed, current, countFirst) {
      return lines.map((line, index) => {
        const isConsumed = index < consumed;
        const isCurrent = index === current;
        const label = countFirst && index === 0 ? "T" : countFirst ? `caso ${index}` : `caso ${index + 1}`;
        return `<div class="input-line ${isConsumed ? "consumed" : ""} ${isCurrent ? "current" : ""}"><span class="input-line-number">${index + 1}</span><code>${ui.esc(line)}</code><span class="input-status">${isConsumed ? "consumida" : isCurrent ? "próxima" : label}</span></div>`;
      }).join("");
    }

    function drawTests(raw) {
      const lines = linesFrom(raw);
      const declared = Number.parseInt(lines[0], 10);
      const validT = Number.isInteger(declared) && declared >= 0;
      const available = Math.max(lines.length - 1, 0);
      const totalCases = validT ? Math.min(declared, available) : 0;
      const consumedCases = Math.min(Math.max(step - 1, 0), totalCases);
      const consumedLines = step === 0 ? 0 : 1 + consumedCases;
      const current = step === 0 ? 0 : consumedCases < totalCases ? consumedCases + 1 : -1;
      const outputs = lines.slice(1, 1 + consumedCases).map(sumLine);
      let message = "A primeira leitura recebe T; ela informa quantas voltas o for deverá executar.";
      if (!validT) message = "A primeira linha precisa ser um inteiro não negativo para representar T.";
      else if (step === 1) message = `T vale ${declared}. Agora começa a primeira das ${declared} voltas.`;
      else if (consumedCases < totalCases) message = `O caso ${consumedCases} foi resolvido. A próxima volta lerá o caso ${consumedCases + 1}.`;
      else if (declared > available) message = `T vale ${declared}, mas a simulação possui apenas ${available} linha(s) de casos.`;
      else message = `Os ${declared} casos foram processados. O for terminou exatamente após T voltas.`;
      body.innerHTML = `<div class="input-simulation"><div><h3>Linhas da entrada</h3><div class="input-lines">${inputRows(lines, consumedLines, current, true)}</div></div><div><h3>Saída acumulada</h3><div class="input-output">${outputs.length ? outputs.map((value, index) => `<code>Caso ${index + 1}: ${ui.esc(value)}</code>`).join("") : "<span>Nenhum caso processado.</span>"}</div></div></div><div class="lab-message"><strong>Estado do laço:</strong> ${message}</div>`;
    }

    function drawEof(raw) {
      const lines = linesFrom(raw);
      const consumed = Math.min(step, lines.length);
      const eofReached = step > lines.length;
      const current = consumed < lines.length ? consumed : -1;
      const outputs = lines.slice(0, consumed).map(sumLine);
      const eofRow = `<div class="input-line eof ${eofReached ? "consumed" : consumed === lines.length ? "current" : ""}"><span class="input-line-number">${lines.length + 1}</span><code>EOF</code><span class="input-status">${eofReached ? "alcançado" : consumed === lines.length ? "próximo" : "fim"}</span></div>`;
      let message = "O for pede a primeira linha disponível em sys.stdin.";
      if (consumed > 0 && consumed < lines.length) message = `A linha ${consumed} foi processada. Ainda existe outra linha na entrada.`;
      else if (consumed === lines.length && !eofReached) message = "Todas as linhas foram processadas. A próxima tentativa encontra o fim da entrada.";
      else if (eofReached) message = "Não existe outra linha: o for reconhece o EOF e termina sozinho.";
      body.innerHTML = `<div class="input-simulation"><div><h3>Linhas da entrada</h3><div class="input-lines">${inputRows(lines, consumed, current, false)}${eofRow}</div></div><div><h3>Saída acumulada</h3><div class="input-output">${outputs.length ? outputs.map((value) => `<code>${ui.esc(value)}</code>`).join("") : "<span>Nenhuma linha processada.</span>"}</div></div></div><div class="lab-message"><strong>Leitura até EOF:</strong> ${message}</div>`;
    }

    function draw() {
      const raw = lab.querySelector("#input-data")?.value || "";
      if (mode === "line") drawSingleLine(raw);
      else if (mode === "tests") drawTests(raw);
      else drawEof(raw);
      const next = lab.querySelector("#input-next");
      if (mode === "line") next.disabled = step >= 3;
      else if (mode === "tests") {
        const lines = linesFrom(raw);
        const declared = Number.parseInt(lines[0], 10);
        next.disabled = !Number.isInteger(declared) || step >= Math.min(Math.max(declared, 0), Math.max(lines.length - 1, 0)) + 1;
      } else next.disabled = step > linesFrom(raw).length;
    }
    controls(lab, `<div class="field input-mode-field"><label for="input-mode">Formato do enunciado</label><select id="input-mode"><option value="line">Vários valores na mesma linha</option><option value="tests">Primeira linha contém T</option><option value="eof">Casos até EOF</option></select></div><div class="field input-data-field"><label for="input-data">Entrada de exemplo</label><textarea id="input-data" rows="5">${presets.line}</textarea></div><button class="btn" id="input-reset" type="button">Reiniciar</button><button class="btn primary" id="input-next" type="button">Próxima leitura</button>`);
    lab.querySelector("#input-mode").onchange = (event) => {
      mode = event.target.value;
      step = 0;
      lab.querySelector("#input-data").value = presets[mode];
      draw();
    };
    lab.querySelector("#input-reset").onclick = () => { step = 0; draw(); };
    lab.querySelector("#input-next").onclick = () => { step += 1; draw(); };
    lab.querySelector("#input-data").oninput = () => { step = 0; draw(); };
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
    const values = [8, -3, 5, 0, 9];
    let status = values.map(() => "pending");
    let pointer = 0;
    let sum = 0;
    let finished = false;
    function draw(message = "Positivo processa, negativo usa continue e zero usa break.") {
      body.innerHTML = `<div class="tokens">${values.map((value, index) => {
        const tokenClass = status[index] === "used" ? "done" : status[index] === "skipped" || status[index] === "stop" ? "bad" : index === pointer && !finished ? "active" : "";
        const label = status[index] === "used" ? "processado" : status[index] === "skipped" ? "continue" : status[index] === "stop" ? "break" : value === 0 ? "sentinela" : `posição ${index}`;
        return `<span class="token ${tokenClass}">${value}<span class="token-index">${label}</span></span>`;
      }).join("")}</div><div class="stats-grid compact"><div class="stat-card"><span>Soma dos processados</span><strong>${sum}</strong></div><div class="stat-card"><span>Próxima posição</span><strong>${finished ? "fim" : pointer}</strong></div></div><div class="lab-message">${message}</div>`;
      lab.querySelector("#while-next").disabled = finished;
    }
    controls(lab, '<button class="btn primary" id="while-next" type="button">Executar uma volta</button><button class="btn" id="while-reset" type="button">Reiniciar</button>');
    lab.querySelector("#while-next").onclick = () => {
      if (finished || pointer >= values.length) return;
      const index = pointer;
      const value = values[pointer];
      pointer += 1;
      if (value === 0) {
        status[index] = "stop";
        finished = true;
        draw("O zero executou break: o laço inteiro terminou e o valor 9 não será lido.");
        return;
      }
      if (value < 0) {
        status[index] = "skipped";
        draw(`O valor ${value} executou continue: esta volta foi ignorada, mas o laço seguirá.`);
        return;
      }
      status[index] = "used";
      sum += value;
      draw(`O valor ${value} chegou ao processamento e foi somado.`);
    };
    lab.querySelector("#while-reset").onclick = () => {
      status = values.map(() => "pending");
      pointer = 0;
      sum = 0;
      finished = false;
      draw();
    };
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
    function operationData() {
      const a = Number(lab.querySelector("#fn-a").value);
      const b = Number(lab.querySelector("#fn-b").value);
      const operation = lab.querySelector("#fn-operation").value;
      if (operation === "maior") return { name: "maior", expression: `a if a > b else b`, result: a > b ? a : b };
      if (operation === "media") return { name: "media", expression: `(a + b) / 2`, result: (a + b) / 2 };
      return { name: "soma", expression: "a + b", result: a + b };
    }
    function draw() {
      const a = Number(lab.querySelector("#fn-a").value);
      const b = Number(lab.querySelector("#fn-b").value);
      const operation = operationData();
      const stages = [
        `A chamada ${operation.name}(${a}, ${b}) começa.`,
        `Os parâmetros locais recebem a = ${a} e b = ${b}.`,
        `A expressão ${operation.expression} produz ${operation.result}.`,
        `return devolve ${operation.result} para o ponto da chamada.`,
        `A variável resultado recebe ${operation.result} e pode ser impressa ou reutilizada.`
      ];
      body.innerHTML = `<div class="flow">${stages.map((_, index) => `<span class="flow-step ${index === step ? "active" : ""}">${index + 1}</span>${index < stages.length - 1 ? '<span class="flow-arrow">→</span>' : ''}`).join("")}</div><div class="code-shell"><div class="code-head">Fluxo da função ${operation.name}</div><pre><code>resultado = ${operation.name}(${a}, ${b})</code></pre></div><div class="lab-message"><strong>Passo ${step + 1}:</strong> ${stages[step]}</div>`;
    }
    controls(lab, '<div class="field"><label for="fn-operation">Função</label><select id="fn-operation"><option value="soma">soma</option><option value="maior">maior</option><option value="media">media</option></select></div><div class="field"><label for="fn-a">Argumento A</label><input id="fn-a" type="number" value="10"></div><div class="field"><label for="fn-b">Argumento B</label><input id="fn-b" type="number" value="20"></div><button class="btn" id="fn-back" type="button">← Anterior</button><button class="btn primary" id="fn-next" type="button">Próximo passo →</button>');
    lab.querySelector("#fn-back").onclick = () => { step = (step - 1 + 5) % 5; draw(); };
    lab.querySelector("#fn-next").onclick = () => { step = (step + 1) % 5; draw(); };
    lab.querySelector("#fn-operation").onchange = () => { step = 0; draw(); };
    lab.querySelector("#fn-a").oninput = () => { step = 0; draw(); };
    lab.querySelector("#fn-b").oninput = () => { step = 0; draw(); };
    draw();
  }

  function statisticsActivity(body, lab) {
    function parseValues(raw) {
      return raw
        .trim()
        .split(/[\s,;]+/)
        .filter(Boolean)
        .map(Number)
        .filter(Number.isFinite);
    }

    function formatNumber(value) {
      return Number.isInteger(value) ? String(value) : value.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
    }

    function draw(message = "Altere os dados e compare as medidas.") {
      const input = lab.querySelector("#statistics-values");
      const values = parseValues(input.value);

      if (!values.length) {
        body.innerHTML = '<div class="lab-message"><strong>Nenhum número válido.</strong> Digite valores separados por espaço, vírgula ou ponto e vírgula.</div>';
        return;
      }

      const sorted = [...values].sort((a, b) => a - b);
      const total = values.reduce((sum, value) => sum + value, 0);
      const mean = total / values.length;
      const middle = Math.floor(sorted.length / 2);
      const median = sorted.length % 2
        ? sorted[middle]
        : (sorted[middle - 1] + sorted[middle]) / 2;
      const frequencies = new Map();

      values.forEach((value) => frequencies.set(value, (frequencies.get(value) || 0) + 1));
      const maxFrequency = Math.max(...frequencies.values());
      const modes = [...frequencies.entries()]
        .filter(([, frequency]) => frequency === maxFrequency)
        .map(([value]) => value)
        .sort((a, b) => a - b);
      const modeLabel = maxFrequency === 1 ? "sem moda" : modes.map(formatNumber).join(", ");
      const range = sorted.at(-1) - sorted[0];

      body.innerHTML = `
        <h3>Dados em ordem</h3>
        <div class="tokens">${sorted.map((value, index) => `<span class="token ${index === middle || (sorted.length % 2 === 0 && index === middle - 1) ? "active" : ""}">${formatNumber(value)}<span class="token-index">posição ${index}</span></span>`).join("")}</div>
        <div class="stats-grid">
          <div class="stat-card"><span>Média</span><strong>${formatNumber(mean)}</strong><small>${formatNumber(total)} / ${values.length}</small></div>
          <div class="stat-card"><span>Mediana</span><strong>${formatNumber(median)}</strong><small>centro ordenado</small></div>
          <div class="stat-card"><span>Moda</span><strong>${modeLabel}</strong><small>frequência ${maxFrequency}</small></div>
          <div class="stat-card"><span>Amplitude</span><strong>${formatNumber(range)}</strong><small>máximo - mínimo</small></div>
        </div>
        <div class="frequency-list" aria-label="Frequência dos valores">
          ${[...frequencies.entries()].sort((a, b) => a[0] - b[0]).map(([value, frequency]) => `<div class="frequency-row"><strong>${formatNumber(value)}</strong><div class="frequency-track"><span style="width:${(frequency / maxFrequency) * 100}%"></span></div><span>${frequency} vez${frequency === 1 ? "" : "es"}</span></div>`).join("")}
        </div>
        <div class="lab-message">${message} Os valores destacados ocupam o centro usado pela mediana.</div>`;
    }

    controls(lab, '<div class="field"><label for="statistics-values">Conjunto de dados</label><input id="statistics-values" value="5 6 6 7 30" inputmode="decimal"></div><button class="btn primary" id="statistics-calculate" type="button">Calcular medidas</button><button class="btn" id="statistics-outlier" type="button">Testar valor extremo</button><button class="btn" id="statistics-tie" type="button">Testar duas modas</button>');
    lab.querySelector("#statistics-calculate").onclick = () => draw();
    lab.querySelector("#statistics-values").oninput = () => draw();
    lab.querySelector("#statistics-outlier").onclick = () => {
      lab.querySelector("#statistics-values").value = "5 6 6 7 30";
      draw("O 30 afasta a média da mediana.");
    };
    lab.querySelector("#statistics-tie").onclick = () => {
      lab.querySelector("#statistics-values").value = "1 1 2 2 3";
      draw("1 e 2 empatam com a maior frequência.");
    };
    draw();
  }

  function matchCaseActivity(body, lab) {
    const cases = [
      { label: "case 1", values: [1], result: "Cadastrar" },
      { label: "case 2", values: [2], result: "Consultar" },
      { label: "case 3", values: [3], result: "Atualizar" },
      { label: "case 4 | 5", values: [4, 5], result: "Relatório" },
      { label: "case _", values: [], result: "Opção inválida" }
    ];

    function draw() {
      const value = Number(lab.querySelector("#match-value").value);
      let selected = cases.findIndex((item) => item.values.includes(value));
      if (selected === -1) selected = cases.length - 1;
      body.innerHTML = `<div class="flow">${cases.map((item, index) => `<span class="flow-step ${index === selected ? "active" : ""}">${item.label}</span>${index < cases.length - 1 ? '<span class="flow-arrow">→</span>' : ''}`).join("")}</div><div class="concept-grid"><article class="concept-card"><h3>Valor analisado</h3><p><code>match opcao</code> recebeu <strong>${value}</strong>.</p></article><article class="concept-card"><h3>Primeiro padrão compatível</h3><p><code>${cases[selected].label}</code> produz <strong>${cases[selected].result}</strong>.</p></article></div><div class="lab-message">Os casos anteriores foram descartados. Depois do caso selecionado, o match termina sem precisar de break.</div>`;
    }

    controls(lab, '<div class="field"><label for="match-value">Opção</label><select id="match-value"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="9">9 (inválida)</option></select></div><button class="btn primary" id="match-run" type="button">Executar match</button>');
    lab.querySelector("#match-run").onclick = draw;
    lab.querySelector("#match-value").onchange = draw;
    draw();
  }

  function dictionarySetActivity(body, lab) {
    function wordsFromInput() {
      return lab.querySelector("#dictionary-text").value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    }

    function draw(message = "O dicionário conta; o conjunto guarda somente valores únicos.") {
      const words = wordsFromInput();
      const frequencies = new Map();
      words.forEach((word) => frequencies.set(word, (frequencies.get(word) || 0) + 1));
      const unique = [...new Set(words)].sort();
      const maximum = Math.max(1, ...frequencies.values());

      body.innerHTML = `<div class="two-col"><div><h3>Dicionário de frequências</h3><div class="frequency-list">${frequencies.size ? [...frequencies.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([word, quantity]) => `<div class="frequency-row"><strong>${ui.esc(word)}</strong><div class="frequency-track"><span style="width:${(quantity / maximum) * 100}%"></span></div><span>${quantity} vez${quantity === 1 ? "" : "es"}</span></div>`).join("") : "<p>Nenhuma palavra.</p>"}</div></div><div><h3>Conjunto de palavras únicas</h3><div class="tokens">${unique.length ? unique.map((word) => `<span class="token done">${ui.esc(word)}</span>`).join("") : "<p>Conjunto vazio.</p>"}</div><div class="stats-grid compact"><div class="stat-card"><span>Total lido</span><strong>${words.length}</strong></div><div class="stat-card"><span>Diferentes</span><strong>${unique.length}</strong></div></div></div></div><div class="lab-message">${message}</div>`;
    }

    controls(lab, '<div class="field"><label for="dictionary-text">Palavras</label><input id="dictionary-text" value="python dados python aula dados python"></div><button class="btn primary" id="dictionary-run" type="button">Contar palavras</button><button class="btn" id="dictionary-example" type="button">Testar novo exemplo</button>');
    lab.querySelector("#dictionary-run").onclick = () => draw();
    lab.querySelector("#dictionary-text").oninput = () => draw();
    lab.querySelector("#dictionary-example").onclick = () => {
      lab.querySelector("#dictionary-text").value = "azul verde azul amarelo verde azul";
      draw("As chaves são as palavras e os valores são suas contagens.");
    };
    draw();
  }
})();
