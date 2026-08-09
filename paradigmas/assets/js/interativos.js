(function () {
  "use strict";

  const escapeHTML = (value) => window.CourseUI.escapeHTML(value);

  function shell(title, subtitle, body, controls = "") {
    return `
      <div class="lab">
        <div class="lab-header"><div><span class="lab-kicker">Laboratório interativo</span><h2>${title}</h2></div><span class="badge green">${subtitle}</span></div>
        <div class="lab-body">${body}</div>
        ${controls ? `<div class="lab-controls">${controls}</div>` : ""}
      </div>`;
  }

  function classifier(container) {
    const scenarios = [
      { text: "Testar todas as senhas de 3 dígitos até encontrar uma válida.", answer: "Força bruta", why: "O espaço tem apenas 1.000 candidatas e todas podem ser enumeradas." },
      { text: "Resolver uma lista ordenada descartando metade a cada comparação.", answer: "Divisão e conquista", why: "A busca reduz o intervalo para uma parte menor independente." },
      { text: "A mesma pergunta menor aparece dezenas de vezes em uma árvore recursiva.", answer: "Memoização / DP", why: "Guardar estados evita recalcular subproblemas sobrepostos." },
      { text: "Construir uma configuração, perceber conflito e retirar a última escolha.", answer: "Backtracking", why: "Há escolha, exploração, detecção de inviabilidade e desfazer." }
    ];
    let current = 0;

    container.innerHTML = shell(
      "Que tipo de estratégia aparece?",
      "classificar pela ideia",
      `<p id="scenario-text"></p><div class="quiz-options" id="scenario-options"></div><div class="lab-message" id="scenario-message">Leia a situação e escolha a descrição mais próxima.</div>`,
      `<button class="btn" id="scenario-prev" type="button">← Anterior</button><button class="btn primary" id="scenario-next" type="button">Próxima →</button>`
    );

    const options = ["Força bruta", "Divisão e conquista", "Backtracking", "Memoização / DP"];
    function render() {
      const scenario = scenarios[current];
      container.querySelector("#scenario-text").innerHTML = `<strong>Situação ${current + 1}/${scenarios.length}:</strong> ${escapeHTML(scenario.text)}`;
      container.querySelector("#scenario-options").innerHTML = options.map((option) => `<button class="quiz-option" type="button" data-option="${escapeHTML(option)}">${escapeHTML(option)}</button>`).join("");
      container.querySelector("#scenario-message").textContent = "Escolha uma opção e explique mentalmente o motivo.";
      container.querySelector("#scenario-prev").disabled = current === 0;
      container.querySelector("#scenario-next").disabled = current === scenarios.length - 1;
      container.querySelectorAll("[data-option]").forEach((button) => {
        button.addEventListener("click", () => {
          const correct = button.dataset.option === scenario.answer;
          container.querySelectorAll("[data-option]").forEach((item) => {
            item.disabled = true;
            if (item.dataset.option === scenario.answer) item.classList.add("correct");
          });
          if (!correct) button.classList.add("wrong");
          container.querySelector("#scenario-message").innerHTML = `<strong>${correct ? "Boa leitura." : "Repare na ação central."}</strong> ${escapeHTML(scenario.why)}`;
        });
      });
    }
    container.querySelector("#scenario-prev").addEventListener("click", () => { current -= 1; render(); });
    container.querySelector("#scenario-next").addEventListener("click", () => { current += 1; render(); });
    render();
  }

  function growth(container) {
    container.innerHTML = shell(
      "Quanto o trabalho cresce?",
      "mude n",
      `<div class="metrics" id="growth-metrics"></div><div class="lab-message" id="growth-message"></div>`,
      `<div class="field"><label for="growth-n">Tamanho n: <span id="growth-n-label">10</span></label><input id="growth-n" type="range" min="1" max="20" value="10"></div>`
    );
    const input = container.querySelector("#growth-n");
    function factorial(n) {
      let value = 1n;
      for (let i = 2n; i <= BigInt(n); i += 1n) value *= i;
      return value;
    }
    function format(value) {
      return value.toLocaleString("pt-BR");
    }
    function render() {
      const n = Number(input.value);
      const values = [
        ["O(n)", BigInt(n)], ["O(n log n)", BigInt(Math.ceil(n * Math.log2(Math.max(n, 1))))],
        ["O(n²)", BigInt(n * n)], ["O(2^n)", 2n ** BigInt(n)], ["O(n!)", factorial(n)]
      ];
      container.querySelector("#growth-n-label").textContent = n;
      container.querySelector("#growth-metrics").innerHTML = values.map(([label, value]) => `<div class="metric-card"><span>${label}</span><strong>${format(value)}</strong></div>`).join("");
      const message = n <= 8 ? "Mesmo o fatorial ainda pode ser observado diretamente." : n <= 15 ? "Os crescimentos exponencial e fatorial já se afastaram bastante dos polinomiais." : "Com n = 20, testar ordens produz mais de 2 quintilhões de candidatas.";
      container.querySelector("#growth-message").innerHTML = `<strong>Leitura:</strong> ${message}`;
    }
    input.addEventListener("input", render);
    render();
  }

  function recursionStack(container) {
    let n = 4;
    let step = 0;
    let frames = [];
    function buildSteps(value) {
      const result = [];
      const stack = [];
      for (let current = value; current >= 1; current -= 1) {
        stack.push(current);
        result.push({ stack: [...stack], active: current, message: current === 1 ? "Caso base alcançado: fatorial(1) devolve 1." : `fatorial(${current}) aguarda ${current} × fatorial(${current - 1}).` });
      }
      let answer = 1;
      for (let current = 1; current <= value; current += 1) {
        answer *= current;
        const remaining = Array.from({ length: value - current }, (_, index) => value - index);
        result.push({ stack: remaining.reverse(), active: remaining.at(-1), message: current === 1 ? "A chamada do caso base sai da pilha." : `Retorno: fatorial(${current}) = ${answer}.` });
      }
      return result;
    }
    function reset() {
      frames = buildSteps(n);
      step = 0;
      render();
    }
    function render() {
      const state = frames[Math.min(step, frames.length - 1)];
      const stackHTML = state.stack.length ? state.stack.map((value) => `<div class="stack-frame ${value === state.active ? "active" : ""}">fatorial(${value})</div>`).join("") : `<div class="empty-state">Pilha vazia: a chamada inicial terminou.</div>`;
      container.querySelector("#stack-view").innerHTML = stackHTML;
      container.querySelector("#stack-message").innerHTML = `<strong>Passo ${step + 1}/${frames.length}:</strong> ${escapeHTML(state.message)}`;
      container.querySelector("#stack-prev").disabled = step === 0;
      container.querySelector("#stack-next").disabled = step === frames.length - 1;
    }
    container.innerHTML = shell(
      "Pilha de fatorial(n)",
      "descida e retorno",
      `<div class="stack-view" id="stack-view"></div><div class="lab-message" id="stack-message"></div>`,
      `<div class="field"><label for="stack-n">Valor de n</label><select id="stack-n"><option>3</option><option selected>4</option><option>5</option><option>6</option></select></div><button class="btn icon-btn" id="stack-prev" type="button" title="Passo anterior">←</button><button class="btn primary" id="stack-next" type="button">Próximo →</button><button class="btn" id="stack-reset" type="button">Reiniciar</button>`
    );
    container.querySelector("#stack-n").addEventListener("change", (event) => { n = Number(event.target.value); reset(); });
    container.querySelector("#stack-prev").addEventListener("click", () => { step -= 1; render(); });
    container.querySelector("#stack-next").addEventListener("click", () => { step += 1; render(); });
    container.querySelector("#stack-reset").addEventListener("click", reset);
    reset();
  }

  function backtracking(container) {
    const states = [
      { path: [], action: "Início: soma 0. Podemos escolher 2, 3 ou 5.", nodes: ["root"] },
      { path: [2], action: "Escolher 2. A soma parcial vira 2.", nodes: ["root", "2"] },
      { path: [2, 2], action: "Explorar outro 2. A soma parcial vira 4.", nodes: ["root", "2", "22"] },
      { path: [2, 2, 2], action: "A soma seria 6, acima do alvo 5. Podar este ramo.", nodes: ["root", "2", "22", "222"], pruned: true },
      { path: [2, 2], action: "Desfazer: o último 2 sai do caminho.", nodes: ["root", "2", "22"] },
      { path: [2, 3], action: "Tentar 3. A soma é 5: encontramos uma candidata.", nodes: ["root", "2", "23"], found: true },
      { path: [2], action: "Desfazer 3 para continuar a árvore.", nodes: ["root", "2"] },
      { path: [], action: "Desfazer 2. Voltamos ao estado inicial antes de tentar outro primeiro valor.", nodes: ["root"] }
    ];
    let index = 0;
    container.innerHTML = shell(
      "Escolher, explorar e desfazer",
      "alvo = 5",
      `<div class="diagram"><div class="tree"><div class="tree-level"><span class="tree-node" data-node="root">0</span></div><div class="tree-level"><span class="tree-node" data-node="2">+2</span><span class="tree-node" data-node="3">+3</span><span class="tree-node" data-node="5">+5</span></div><div class="tree-level"><span class="tree-node" data-node="22">+2</span><span class="tree-node" data-node="23">+3</span><span class="tree-node" data-node="222">+2</span></div></div></div><h3>Caminho atual</h3><div class="tokens" id="bt-path"></div><div class="lab-message" id="bt-message"></div>`,
      `<button class="btn icon-btn" id="bt-prev" type="button" title="Passo anterior">←</button><button class="btn primary" id="bt-next" type="button">Próximo →</button><button class="btn" id="bt-reset" type="button">Reiniciar</button>`
    );
    function render() {
      const state = states[index];
      container.querySelectorAll("[data-node]").forEach((node) => {
        node.className = "tree-node";
        if (state.nodes.includes(node.dataset.node)) node.classList.add("repeat");
      });
      if (state.pruned) container.querySelector('[data-node="222"]').classList.add("pruned");
      if (state.found) container.querySelector('[data-node="23"]').classList.add("done");
      container.querySelector("#bt-path").innerHTML = state.path.length ? state.path.map((value) => `<span class="token ${state.found ? "done" : state.pruned ? "bad" : "active"}">${value}</span>`).join("") : `<span class="token">vazio</span>`;
      container.querySelector("#bt-message").innerHTML = `<strong>Passo ${index + 1}/${states.length}:</strong> ${escapeHTML(state.action)}`;
      container.querySelector("#bt-prev").disabled = index === 0;
      container.querySelector("#bt-next").disabled = index === states.length - 1;
    }
    container.querySelector("#bt-prev").addEventListener("click", () => { index -= 1; render(); });
    container.querySelector("#bt-next").addEventListener("click", () => { index += 1; render(); });
    container.querySelector("#bt-reset").addEventListener("click", () => { index = 0; render(); });
    render();
  }

  function binarySearch(container) {
    const values = [1, 3, 5, 7, 9, 11, 13, 15];
    let target = 11;
    let left = 0;
    let right = values.length - 1;
    let finished = false;
    container.innerHTML = shell(
      "Intervalo da busca binária",
      "lista ordenada",
      `<div class="diagram"><div class="interval" id="binary-interval"></div></div><div class="lab-message" id="binary-message"></div>`,
      `<div class="field"><label for="binary-target">Procurar</label><select id="binary-target">${values.map((value) => `<option ${value === target ? "selected" : ""}>${value}</option>`).join("")}</select></div><button class="btn primary" id="binary-next" type="button">Comparar com o meio</button><button class="btn" id="binary-reset" type="button">Reiniciar</button>`
    );
    function reset() {
      left = 0;
      right = values.length - 1;
      finished = false;
      render("O intervalo inteiro ainda é candidato.");
    }
    function render(message, middle = -1) {
      container.querySelector("#binary-interval").innerHTML = values.map((value, index) => {
        const classes = ["interval-cell"];
        if (index < left || index > right) classes.push("discarded"); else classes.push("kept");
        if (index === middle) classes.push("mid");
        return `<span class="${classes.join(" ")}">${value}</span>`;
      }).join("");
      container.querySelector("#binary-message").innerHTML = `<strong>Intervalo [${left}, ${right}]:</strong> ${escapeHTML(message)}`;
      container.querySelector("#binary-next").disabled = finished;
    }
    container.querySelector("#binary-next").addEventListener("click", () => {
      const middle = Math.floor((left + right) / 2);
      const value = values[middle];
      if (value === target) {
        finished = true;
        render(`${value} é o alvo. Busca concluída.`, middle);
      } else if (value < target) {
        render(`${value} é menor que ${target}; a metade esquerda será descartada.`, middle);
        left = middle + 1;
        setTimeout(() => render("Só a metade direita permanece."), 450);
      } else {
        render(`${value} é maior que ${target}; a metade direita será descartada.`, middle);
        right = middle - 1;
        setTimeout(() => render("Só a metade esquerda permanece."), 450);
      }
    });
    container.querySelector("#binary-target").addEventListener("change", (event) => { target = Number(event.target.value); reset(); });
    container.querySelector("#binary-reset").addEventListener("click", reset);
    reset();
  }

  function greedyCoins(container) {
    const systems = {
      canonico: { label: "[1, 5, 10, 25] · valor 41", coins: [25, 10, 5, 1], amount: 41 },
      falha: { label: "[1, 3, 4] · valor 6", coins: [4, 3, 1], amount: 6 }
    };
    container.innerHTML = shell(
      "A maior moeda é sempre segura?",
      "procure o contraexemplo",
      `<div class="two-col"><div><h3>Escolha gulosa</h3><div class="tokens" id="greedy-result"></div></div><div><h3>Menor quantidade possível</h3><div class="tokens" id="optimal-result"></div></div></div><div class="lab-message" id="greedy-message"></div>`,
      `<div class="field"><label for="coin-system">Sistema fictício</label><select id="coin-system"><option value="canonico">[1, 5, 10, 25] · valor 41</option><option value="falha">[1, 3, 4] · valor 6</option></select></div><button class="btn primary" id="greedy-run" type="button">Executar comparação</button>`
    );
    function optimal(coins, amount) {
      const dp = Array(amount + 1).fill(Infinity);
      const used = Array(amount + 1).fill(null);
      dp[0] = 0;
      for (let value = 1; value <= amount; value += 1) {
        for (const coin of coins) {
          if (coin <= value && dp[value - coin] + 1 < dp[value]) {
            dp[value] = dp[value - coin] + 1;
            used[value] = coin;
          }
        }
      }
      const result = [];
      for (let value = amount; value > 0; value -= used[value]) result.push(used[value]);
      return result;
    }
    function run() {
      const item = systems[container.querySelector("#coin-system").value];
      let rest = item.amount;
      const greedy = [];
      item.coins.forEach((coin) => {
        while (coin <= rest) { greedy.push(coin); rest -= coin; }
      });
      const best = optimal(item.coins, item.amount);
      container.querySelector("#greedy-result").innerHTML = greedy.map((coin) => `<span class="token ${greedy.length === best.length ? "done" : "bad"}">${coin}</span>`).join("");
      container.querySelector("#optimal-result").innerHTML = best.map((coin) => `<span class="token done">${coin}</span>`).join("");
      const same = greedy.length === best.length;
      container.querySelector("#greedy-message").innerHTML = `<strong>${same ? "Neste sistema, funcionou." : "Contraexemplo encontrado."}</strong> O guloso usou ${greedy.length} moeda(s); o ótimo usa ${best.length}. ${same ? "Isso ainda não substitui uma prova para todos os valores." : "Logo, a regra da maior moeda não é correta para todo sistema."}`;
    }
    container.querySelector("#greedy-run").addEventListener("click", run);
    container.querySelector("#coin-system").addEventListener("change", run);
    run();
  }

  function dpTable(container) {
    let n = 6;
    let current = 0;
    let dp = [];
    container.innerHTML = shell(
      "Construindo estados menores primeiro",
      "escada 1 ou 2",
      `<p><code>dp[i]</code> = quantidade de maneiras de chegar exatamente ao degrau <code>i</code>.</p><div class="tokens" id="dp-cells"></div><div class="lab-message" id="dp-message"></div>`,
      `<div class="field"><label for="dp-n">Degrau final</label><select id="dp-n"><option>4</option><option>5</option><option selected>6</option><option>7</option><option>8</option></select></div><button class="btn primary" id="dp-next" type="button">Calcular próximo estado</button><button class="btn" id="dp-reset" type="button">Reiniciar</button>`
    );
    function reset() {
      dp = Array(n + 1).fill(null);
      dp[0] = 1;
      current = 0;
      render("Caso base: existe uma maneira de permanecer no início.");
    }
    function render(message) {
      container.querySelector("#dp-cells").innerHTML = dp.map((value, index) => `<span class="token ${index === current ? "active" : value !== null ? "done" : ""}"><small>dp[${index}]</small>${value === null ? "?" : value}</span>`).join("");
      container.querySelector("#dp-message").innerHTML = `<strong>Estado atual:</strong> ${escapeHTML(message)}`;
      container.querySelector("#dp-next").disabled = current === n;
    }
    container.querySelector("#dp-next").addEventListener("click", () => {
      current += 1;
      const fromOne = dp[current - 1];
      const fromTwo = current >= 2 ? dp[current - 2] : 0;
      dp[current] = fromOne + fromTwo;
      render(`dp[${current}] = ${fromOne} vindo de ${current - 1} + ${fromTwo} vindo de ${Math.max(0, current - 2)} = ${dp[current]}.`);
    });
    container.querySelector("#dp-n").addEventListener("change", (event) => { n = Number(event.target.value); reset(); });
    container.querySelector("#dp-reset").addEventListener("click", reset);
    reset();
  }

  function memoCalls(container) {
    container.innerHTML = shell(
      "Chamadas puras x estados memoizados",
      "Fibonacci",
      `<div class="metrics"><div class="metric-card"><span>Chamadas recursão pura</span><strong id="pure-calls"></strong></div><div class="metric-card"><span>Estados distintos</span><strong id="memo-states"></strong></div><div class="metric-card"><span>Chamadas evitadas</span><strong id="saved-calls"></strong></div></div><div class="lab-message" id="memo-message"></div>`,
      `<div class="field"><label for="memo-n">fib(n): <span id="memo-n-label">10</span></label><input id="memo-n" type="range" min="2" max="25" value="10"></div>`
    );
    const input = container.querySelector("#memo-n");
    function count(n) {
      if (n <= 1) return 1;
      return 1 + count(n - 1) + count(n - 2);
    }
    function render() {
      const n = Number(input.value);
      const pure = count(n);
      const states = n + 1;
      container.querySelector("#memo-n-label").textContent = n;
      container.querySelector("#pure-calls").textContent = pure.toLocaleString("pt-BR");
      container.querySelector("#memo-states").textContent = states.toLocaleString("pt-BR");
      container.querySelector("#saved-calls").textContent = Math.max(0, pure - states).toLocaleString("pt-BR");
      container.querySelector("#memo-message").innerHTML = `<strong>Interpretação:</strong> a recursão pura expande ${pure.toLocaleString("pt-BR")} chamadas. O cache precisa guardar apenas ${states} argumentos possíveis, de 0 a ${n}.`;
    }
    input.addEventListener("input", render);
    render();
  }

  function branchBound(container) {
    const nodes = [
      { name: "A", bound: 68, result: null },
      { name: "B", bound: 40, result: null },
      { name: "A1", bound: 62, result: 58 },
      { name: "C", bound: 55, result: null },
      { name: "A2", bound: 60, result: 60 }
    ];
    let incumbent = 50;
    let index = -1;
    let history = [];
    container.innerHTML = shell(
      "Explorar ou podar pelo limite?",
      "maximização",
      `<div class="metrics"><div class="metric-card"><span>Melhor solução atual</span><strong id="bb-incumbent">50</strong></div><div class="metric-card"><span>Próximo ramo</span><strong id="bb-current">—</strong></div><div class="metric-card"><span>Limite superior</span><strong id="bb-bound">—</strong></div></div><div class="tokens" id="bb-history"></div><div class="lab-message" id="bb-message">Clique em avaliar próximo ramo.</div>`,
      `<button class="btn primary" id="bb-next" type="button">Avaliar próximo ramo</button><button class="btn" id="bb-reset" type="button">Reiniciar</button>`
    );
    function render(message) {
      const node = nodes[index];
      container.querySelector("#bb-incumbent").textContent = incumbent;
      container.querySelector("#bb-current").textContent = node ? node.name : "—";
      container.querySelector("#bb-bound").textContent = node ? node.bound : "—";
      container.querySelector("#bb-history").innerHTML = history.map((item) => `<span class="token ${item.action === "podado" ? "bad" : "done"}"><small>${item.action}</small>${item.name}</span>`).join("") || `<span class="token">vazio</span>`;
      container.querySelector("#bb-message").innerHTML = message;
      container.querySelector("#bb-next").disabled = index === nodes.length - 1;
    }
    function reset() {
      incumbent = 50;
      index = -1;
      history = [];
      render("<strong>Início:</strong> já conhecemos uma solução de valor 50.");
    }
    container.querySelector("#bb-next").addEventListener("click", () => {
      index += 1;
      const node = nodes[index];
      if (node.bound <= incumbent) {
        history.push({ name: node.name, action: "podado" });
        render(`<strong>Podar ${node.name}.</strong> Mesmo no cenário otimista, ${node.bound} não supera ${incumbent}.`);
        return;
      }
      history.push({ name: node.name, action: "explorado" });
      if (node.result !== null && node.result > incumbent) {
        const old = incumbent;
        incumbent = node.result;
        render(`<strong>Novo incumbente.</strong> ${node.name} produziu uma solução completa ${node.result}, melhor que ${old}.`);
      } else {
        render(`<strong>Explorar ${node.name}.</strong> Seu limite ${node.bound} ainda permite superar ${incumbent}.`);
      }
    });
    container.querySelector("#bb-reset").addEventListener("click", reset);
    reset();
  }

  function paradigmQuiz(container) {
    const items = [
      { prompt: "A entrada tem n ≤ 9 e precisamos avaliar toda ordem dos elementos.", answer: "Força bruta", options: ["Força bruta", "Guloso", "DP", "Busca binária"], why: "A restrição pequena convida a estimar n! antes de procurar algo mais complexo." },
      { prompt: "A mesma função recebe os mesmos parâmetros milhares de vezes.", answer: "Memoização", options: ["Divisão e conquista", "Memoização", "Guloso", "Força bruta"], why: "Os parâmetros repetidos identificam estados que podem ser armazenados." },
      { prompt: "Construímos uma configuração parcial e retiramos a última escolha ao detectar conflito.", answer: "Backtracking", options: ["Backtracking", "Guloso", "Busca binária", "Tabulação"], why: "Escolher, explorar e desfazer é a estrutura característica." },
      { prompt: "Uma escolha local parece boa, mas ainda precisamos provar que não prejudica o futuro.", answer: "Guloso", options: ["Recursão", "Guloso", "Branch and Bound", "Força bruta"], why: "A hipótese é gulosa; a propriedade de correção ainda precisa ser demonstrada." },
      { prompt: "Em maximização, um ramo tem limite 30 e já existe solução válida 42.", answer: "Branch and Bound", options: ["BFS", "Branch and Bound", "Merge Sort", "Memoização"], why: "O limite prova que o ramo não pode melhorar o incumbente." }
    ];
    let index = 0;
    container.innerHTML = shell(
      "Qual paradigma merece investigação?",
      "síntese",
      `<p id="quiz-prompt"></p><div class="quiz-options" id="quiz-options"></div><div class="lab-message" id="quiz-message"></div>`,
      `<button class="btn" id="quiz-prev" type="button">← Anterior</button><button class="btn primary" id="quiz-next" type="button">Próxima →</button>`
    );
    function render() {
      const item = items[index];
      container.querySelector("#quiz-prompt").innerHTML = `<strong>Cenário ${index + 1}/${items.length}:</strong> ${escapeHTML(item.prompt)}`;
      container.querySelector("#quiz-options").innerHTML = item.options.map((option) => `<button class="quiz-option" type="button" data-answer="${escapeHTML(option)}">${escapeHTML(option)}</button>`).join("");
      container.querySelector("#quiz-message").textContent = "Escolha a hipótese mais compatível com o sinal apresentado.";
      container.querySelector("#quiz-prev").disabled = index === 0;
      container.querySelector("#quiz-next").disabled = index === items.length - 1;
      container.querySelectorAll("[data-answer]").forEach((button) => {
        button.addEventListener("click", () => {
          const correct = button.dataset.answer === item.answer;
          container.querySelectorAll("[data-answer]").forEach((option) => {
            option.disabled = true;
            if (option.dataset.answer === item.answer) option.classList.add("correct");
          });
          if (!correct) button.classList.add("wrong");
          container.querySelector("#quiz-message").innerHTML = `<strong>${correct ? "Hipótese coerente." : "Observe de novo o sinal principal."}</strong> ${escapeHTML(item.why)}`;
        });
      });
    }
    container.querySelector("#quiz-prev").addEventListener("click", () => { index -= 1; render(); });
    container.querySelector("#quiz-next").addEventListener("click", () => { index += 1; render(); });
    render();
  }

  const labs = {
    classifier,
    growth,
    "recursion-stack": recursionStack,
    backtracking,
    "binary-search": binarySearch,
    "greedy-coins": greedyCoins,
    "dp-table": dpTable,
    "memo-calls": memoCalls,
    "branch-bound": branchBound,
    "paradigm-quiz": paradigmQuiz
  };

  window.ParadigmLabs = {
    mount(container, name) {
      const lab = labs[name];
      if (!lab) {
        container.innerHTML = `<div class="warning">Laboratório não encontrado.</div>`;
        return;
      }
      lab(container);
    }
  };
}());
