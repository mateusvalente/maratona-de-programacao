const exerciseLabs = document.querySelectorAll("[data-exercise-lab]");

function copy(value) {
  return JSON.parse(JSON.stringify(value));
}

function make(tag, className, content) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (content !== undefined) element.textContent = content;
  return element;
}

function setText(root, selector, value) {
  const element = root.querySelector(selector);
  if (element) element.textContent = value ?? "";
}

function setResult(element, text, invalid = false) {
  if (!element) return;
  element.hidden = !text;
  element.textContent = text || "";
  element.classList.toggle("invalid", invalid);
}

function createPlayer(lab, buildSteps, renderState) {
  const badge = lab.querySelector("[data-player-badge]");
  const explanation = lab.querySelector("[data-player-explanation]");
  const previousButton = lab.querySelector('[data-player="previous"]');
  const nextButton = lab.querySelector('[data-player="next"]');
  const playButton = lab.querySelector('[data-player="play"]');
  const resetButton = lab.querySelector('[data-player="reset"]');
  const speed = lab.querySelector("[data-player-speed]");
  let steps = [];
  let index = 0;
  let timer = null;

  function delay() {
    return Math.max(180, 1550 - Number(speed?.value || 750));
  }

  function stop() {
    window.clearInterval(timer);
    timer = null;
    if (playButton) playButton.textContent = "Executar";
  }

  function render() {
    const state = steps[index];
    if (!state) return;
    badge.textContent = `passo ${index}/${steps.length - 1}`;
    explanation.textContent = state.text;
    previousButton.disabled = index === 0;
    nextButton.disabled = index === steps.length - 1;
    renderState(state, index, steps);
  }

  function previous() {
    stop();
    if (index > 0) index -= 1;
    render();
  }

  function next(fromTimer = false) {
    if (!fromTimer) stop();
    if (index < steps.length - 1) {
      index += 1;
      render();
    }
    if (index === steps.length - 1) stop();
  }

  function play() {
    if (timer) {
      stop();
      return;
    }
    if (index === steps.length - 1) index = 0;
    render();
    playButton.textContent = "Pausar";
    timer = window.setInterval(() => next(true), delay());
  }

  function rebuild() {
    stop();
    steps = buildSteps();
    index = 0;
    render();
  }

  previousButton?.addEventListener("click", previous);
  nextButton?.addEventListener("click", () => next(false));
  playButton?.addEventListener("click", play);
  resetButton?.addEventListener("click", rebuild);
  speed?.addEventListener("input", () => {
    if (!timer) return;
    stop();
    play();
  });

  rebuild();
  return { rebuild };
}

function init1068(lab) {
  const expressionInput = lab.querySelector("[data-expression-input]");
  const tape = lab.querySelector("[data-expression-tape]");
  const stackView = lab.querySelector("[data-parenthesis-stack]");
  const result = lab.querySelector("[data-expression-result]");
  let expression = expressionInput.value;

  function buildSteps() {
    const stack = [];
    let valid = true;
    const steps = [{
      expression,
      stack: [],
      cursor: null,
      processed: 0,
      entered: "ninguém",
      removed: "ninguém",
      operation: "início",
      valid,
      final: false,
      text: "A pilha começa vazia. Percorreremos a expressão da esquerda para a direita."
    }];

    Array.from(expression).forEach((character, index) => {
      let entered = "ninguém";
      let removed = "ninguém";
      let operation = "ignorar";
      let text = `O caractere ${JSON.stringify(character)} não altera a pilha.`;

      if (character === "(") {
        const item = { id: `P${index + 1}`, value: character };
        stack.push(item);
        entered = `${item.id} = (`;
        operation = "push";
        text = "Encontramos '(': fazemos push para registrar uma abertura ainda sem fechamento.";
      } else if (character === ")") {
        operation = "pop";
        if (stack.length === 0) {
          valid = false;
          operation = "erro: pop vazio";
          text = "Encontramos ')', mas a pilha está vazia. Este fechamento não possui abertura correspondente.";
        } else {
          const item = stack.pop();
          removed = `${item.id} = (`;
          text = "Encontramos ')': o pop consome a abertura mais recente, formando um par.";
        }
      }

      steps.push({
        expression,
        stack: copy(stack),
        cursor: index,
        processed: index + 1,
        entered,
        removed,
        operation,
        valid,
        final: false,
        text
      });
    });

    const balanced = valid && stack.length === 0;
    steps.push({
      expression,
      stack: copy(stack),
      cursor: null,
      processed: expression.length,
      entered: "ninguém",
      removed: "ninguém",
      operation: "verificação final",
      valid: balanced,
      final: true,
      text: balanced
        ? "Não houve fechamento antecipado e a pilha terminou vazia: a saída é correct."
        : stack.length
          ? "Ainda existem aberturas na pilha: faltaram fechamentos e a saída é incorrect."
          : "Um fechamento apareceu sem abertura correspondente: a saída é incorrect."
    });
    return steps;
  }

  function render(state) {
    tape.replaceChildren();
    Array.from(state.expression).forEach((character, index) => {
      const token = make("span", "token", character === " " ? "·" : character);
      if (index < state.processed) token.classList.add("processed");
      if (index === state.cursor) token.classList.add("current");
      if (!state.valid && index === state.cursor && character === ")") token.classList.add("error");
      tape.appendChild(token);
    });

    stackView.replaceChildren();
    if (!state.stack.length) {
      stackView.appendChild(make("div", "empty-structure", "pilha vazia"));
    } else {
      state.stack.forEach((item, index) => {
        const row = make("div", "stack-item");
        if (index === state.stack.length - 1) row.classList.add("top");
        row.append(make("span", "", `${item.id}: ${item.value}`), make("small", "", index === state.stack.length - 1 ? "topo" : "aguardando"));
        stackView.appendChild(row);
      });
    }

    setText(lab, "[data-expression-character]", state.cursor === null ? "fim" : JSON.stringify(state.expression[state.cursor]));
    setText(lab, "[data-expression-operation]", state.operation);
    setText(lab, "[data-expression-valid]", state.valid ? "continua possível" : "já é inválida");
    setText(lab, "[data-movement-entered]", state.entered);
    setText(lab, "[data-movement-removed]", state.removed);
    setText(lab, "[data-movement-remaining]", state.stack.length ? state.stack.map((item) => item.id).join(" → ") : "pilha vazia");
    setResult(result, state.final ? (state.valid ? "Saída: correct" : "Saída: incorrect") : "", !state.valid);
  }

  const player = createPlayer(lab, buildSteps, render);
  lab.querySelector('[data-config-action="expression"]')?.addEventListener("click", () => {
    expression = expressionInput.value;
    player.rebuild();
  });
  lab.querySelectorAll("[data-expression-example]").forEach((button) => {
    button.addEventListener("click", () => {
      lab.querySelectorAll("[data-expression-example]").forEach((item) => item.classList.toggle("active", item === button));
      expressionInput.value = button.dataset.expressionExample;
      expression = expressionInput.value;
      player.rebuild();
    });
  });
}

function init1110(lab) {
  const numberInput = lab.querySelector("[data-card-count]");
  const cardTrack = lab.querySelector("[data-card-track]");
  const discardTrack = lab.querySelector("[data-discard-track]");
  const result = lab.querySelector("[data-card-result]");
  let count = Number(numberInput.value);

  function buildSteps() {
    const cards = Array.from({ length: count }, (_, index) => index + 1);
    const discarded = [];
    const steps = [{
      cards: [...cards],
      discarded: [],
      moved: null,
      removed: null,
      final: cards.length <= 1,
      text: "A carta 1 está no topo, à esquerda; a carta n está no fundo, à direita."
    }];

    while (cards.length > 1) {
      const removed = cards.shift();
      discarded.push(removed);
      steps.push({
        cards: [...cards],
        discarded: [...discarded],
        moved: null,
        removed,
        final: false,
        text: `Descartamos a carta ${removed}, que estava no topo da fila.`
      });

      const moved = cards.shift();
      cards.push(moved);
      steps.push({
        cards: [...cards],
        discarded: [...discarded],
        moved,
        removed: null,
        final: cards.length === 1,
        text: `A carta ${moved} saiu do topo e foi colocada no fundo.`
      });
    }

    steps.push({
      cards: [...cards],
      discarded: [...discarded],
      moved: null,
      removed: null,
      final: true,
      text: `Restou somente a carta ${cards[0]}; a simulação termina.`
    });
    return steps;
  }

  function cardElement(value, classes = []) {
    const card = make("div", "playing-card");
    classes.forEach((className) => card.classList.add(className));
    card.append(make("small", "", "carta"), make("strong", "", value), make("small", "", `#${value}`));
    return card;
  }

  function render(state) {
    cardTrack.replaceChildren();
    state.cards.forEach((value, index) => {
      const classes = [];
      if (index === 0) classes.push("front");
      if (index === state.cards.length - 1) classes.push("back");
      if (value === state.moved) classes.push("moved");
      cardTrack.appendChild(cardElement(value, classes));
    });
    if (!state.cards.length) cardTrack.appendChild(make("div", "empty-structure", "sem cartas"));

    discardTrack.replaceChildren();
    state.discarded.forEach((value) => discardTrack.appendChild(cardElement(value, ["discarded"])));
    if (!state.discarded.length) discardTrack.appendChild(make("span", "empty-structure", "nenhuma carta descartada"));

    setText(lab, "[data-card-top]", state.cards[0] ?? "nenhuma");
    setText(lab, "[data-card-moved]", state.moved === null ? "ninguém" : `carta ${state.moved}`);
    setText(lab, "[data-movement-entered]", state.moved === null ? "ninguém" : `carta ${state.moved} entrou no fundo`);
    setText(lab, "[data-movement-removed]", state.removed === null ? "ninguém" : `carta ${state.removed}`);
    setText(lab, "[data-movement-remaining]", state.cards.join(", "));
    setResult(result, state.final && state.cards.length === 1
      ? `Discarded cards: ${state.discarded.join(", ")} | Remaining card: ${state.cards[0]}`
      : "");
  }

  const player = createPlayer(lab, buildSteps, render);
  lab.querySelector('[data-config-action="cards"]')?.addEventListener("click", () => {
    const requested = Number(numberInput.value);
    count = Math.min(50, Math.max(1, Number.isFinite(requested) ? requested : 7));
    numberInput.value = count;
    player.rebuild();
  });
}

const shirtSample = [
  { id: "C1", nome: "Marcos", cor: "vermelho", tamanho: "M" },
  { id: "C2", nome: "Ana", cor: "branco", tamanho: "M" },
  { id: "C3", nome: "Caio", cor: "branco", tamanho: "P" },
  { id: "C4", nome: "Bia", cor: "vermelho", tamanho: "G" },
  { id: "C5", nome: "Davi", cor: "branco", tamanho: "M" }
];

function compareShirts(a, b) {
  if (a.cor !== b.cor) {
    return {
      result: a.cor < b.cor ? -1 : 1,
      criterion: 0,
      text: `Cor decide: ${a.cor} ${a.cor < b.cor ? "vem antes de" : "vem depois de"} ${b.cor}.`
    };
  }
  if (a.tamanho !== b.tamanho) {
    return {
      result: a.tamanho > b.tamanho ? -1 : 1,
      criterion: 1,
      text: `As cores empatam; tamanho é decrescente: ${a.tamanho} ${a.tamanho > b.tamanho ? "vem antes de" : "vem depois de"} ${b.tamanho}.`
    };
  }
  if (a.nome !== b.nome) {
    return {
      result: a.nome < b.nome ? -1 : 1,
      criterion: 2,
      text: `Cor e tamanho empatam; o nome em ordem crescente decide entre ${a.nome} e ${b.nome}.`
    };
  }
  return { result: 0, criterion: 2, text: "Os três campos são iguais; comp retorna 0." };
}

function init1258(lab) {
  const track = lab.querySelector("[data-shirt-track]");
  const result = lab.querySelector("[data-shirt-result]");

  function buildSteps() {
    const records = copy(shirtSample);
    const placed = new Set();
    const steps = [];

    function snapshot(text, extra = {}) {
      steps.push({
        records: copy(records),
        placed: [...placed],
        rangeStart: null,
        rangeEnd: null,
        pivotId: null,
        currentId: null,
        boundaryIndex: null,
        detail: null,
        final: false,
        text,
        ...extra
      });
    }

    snapshot("Começamos com objetos Camiseta ainda na ordem de entrada.");

    function partition(start, end) {
      const pivot = records[end - 1];
      let i = start;
      snapshot(`A partição escolhe ${pivot.id} (${pivot.nome}) como pivô, o último item do intervalo.`, {
        rangeStart: start,
        rangeEnd: end - 1,
        pivotId: pivot.id,
        boundaryIndex: i
      });

      for (let j = start; j < end; j += 1) {
        const detail = compareShirts(records[j], pivot);
        snapshot(detail.text, {
          rangeStart: start,
          rangeEnd: end - 1,
          pivotId: pivot.id,
          currentId: records[j].id,
          boundaryIndex: i,
          detail
        });

        if (detail.result < 0) {
          const movedId = records[j].id;
          [records[j], records[i]] = [records[i], records[j]];
          i += 1;
          snapshot(`${movedId} é menor que o pivô pelo comparador; ele vai para a região à esquerda.`, {
            rangeStart: start,
            rangeEnd: end - 1,
            pivotId: pivot.id,
            currentId: movedId,
            boundaryIndex: i
          });
        }
      }

      const detail = compareShirts(pivot, records[i]);
      snapshot(`Terminou a varredura. Agora comparamos o pivô com o item da posição i = ${i}. ${detail.text}`, {
        rangeStart: start,
        rangeEnd: end - 1,
        pivotId: pivot.id,
        currentId: records[i].id,
        boundaryIndex: i,
        detail
      });

      if (detail.result < 0) {
        [records[end - 1], records[i]] = [records[i], records[end - 1]];
      }
      placed.add(pivot.id);
      snapshot(`O pivô ${pivot.id} terminou na posição ${i}; as próximas chamadas tratam os dois lados.`, {
        rangeStart: start,
        rangeEnd: end - 1,
        pivotId: pivot.id,
        boundaryIndex: i
      });
      return i;
    }

    function quickSort(start, end) {
      if (end > start) {
        const pivotPosition = partition(start, end);
        quickSort(start, pivotPosition);
        quickSort(pivotPosition + 1, end);
      }
    }

    quickSort(0, records.length);
    snapshot("Todas as partições terminaram. Os objetos estão em cor crescente, tamanho decrescente e nome crescente.", {
      placed: records.map((record) => record.id),
      final: true
    });
    return steps;
  }

  function render(state) {
    track.replaceChildren();
    state.records.forEach((record, index) => {
      const card = make("div", "record-card");
      if (record.id === state.pivotId) card.classList.add("pivot");
      if (record.id === state.currentId) card.classList.add("current");
      if (index === state.boundaryIndex) card.classList.add("boundary");
      if (state.placed.includes(record.id)) card.classList.add("placed");
      if (state.rangeStart !== null && (index < state.rangeStart || index > state.rangeEnd)) card.classList.add("outside");
      card.append(
        make("strong", "", `${record.id} · ${record.nome}`),
        make("span", "", `cor: ${record.cor}`),
        make("span", "", `tamanho: ${record.tamanho}`),
        make("span", "", `índice: ${index}`)
      );
      track.appendChild(card);
    });

    lab.querySelectorAll("[data-shirt-criterion]").forEach((row) => {
      const index = Number(row.dataset.shirtCriterion);
      row.classList.toggle("active", state.detail?.criterion === index);
      row.classList.toggle("decided", state.detail?.criterion === index && state.detail.result !== 0);
    });
    setText(lab, "[data-qsort-range]", state.rangeStart === null ? "nenhum" : `[${state.rangeStart}, ${state.rangeEnd}]`);
    setText(lab, "[data-qsort-pivot]", state.pivotId || "nenhum");
    setText(lab, "[data-qsort-i]", state.boundaryIndex === null ? "-" : state.boundaryIndex);
    setText(lab, "[data-movement-entered]", state.currentId || "ninguém");
    setText(lab, "[data-movement-removed]", state.pivotId || "nenhum pivô ativo");
    setText(lab, "[data-movement-remaining]", state.records.map((record) => record.id).join(" → "));
    setResult(result, state.final
      ? state.records.map((record) => `${record.cor} ${record.tamanho} ${record.nome}`).join(" | ")
      : "");
  }

  createPlayer(lab, buildSteps, render);
}

const classifierScenarios = {
  stack: {
    label: "resultado: stack",
    operations: [[1, 1], [1, 3], [1, 2], [2, 2], [2, 3], [2, 1]]
  },
  queue: {
    label: "resultado: queue",
    operations: [[1, 1], [1, 3], [1, 2], [2, 1], [2, 3], [2, 2]]
  },
  priority: {
    label: "resultado: priority queue",
    operations: [[1, 1], [1, 3], [1, 2], [2, 3], [2, 2], [2, 1]]
  },
  unsure: {
    label: "resultado: not sure",
    operations: [[1, 1], [1, 2], [1, 3], [2, 3]]
  },
  impossible: {
    label: "resultado: impossible",
    operations: [[1, 1], [1, 2], [2, 7]]
  }
};

function classifierConclusion(candidates) {
  const active = Object.entries(candidates).filter(([, candidate]) => candidate.active).map(([name]) => name);
  if (active.length === 0) return "impossible";
  if (active.length > 1) return "not sure";
  return { stack: "stack", queue: "queue", priority: "priority queue" }[active[0]];
}

function init1340(lab) {
  const operationRow = lab.querySelector("[data-operation-row]");
  const result = lab.querySelector("[data-classifier-result]");
  let scenarioName = "stack";

  function buildSteps() {
    const operations = classifierScenarios[scenarioName].operations;
    const candidates = {
      stack: { active: true, items: [] },
      queue: { active: true, items: [] },
      priority: { active: true, items: [] }
    };
    const steps = [{
      operations: copy(operations),
      operationIndex: null,
      candidates: copy(candidates),
      actuals: {},
      expected: null,
      final: false,
      conclusion: null,
      text: "As três estruturas começam como candidatas. A mesma entrada será simulada em todas."
    }];

    operations.forEach(([option, value], operationIndex) => {
      const actuals = {};
      if (option === 1) {
        Object.values(candidates).forEach((candidate) => {
          if (candidate.active) candidate.items.push(value);
        });
        steps.push({
          operations: copy(operations),
          operationIndex,
          candidates: copy(candidates),
          actuals,
          expected: value,
          final: false,
          conclusion: null,
          text: `Operação 1 ${value}: inserimos ${value} em toda estrutura que ainda é candidata.`
        });
        return;
      }

      Object.entries(candidates).forEach(([name, candidate]) => {
        if (!candidate.active) return;
        let actual = null;
        if (candidate.items.length) {
          if (name === "stack") actual = candidate.items.pop();
          if (name === "queue") actual = candidate.items.shift();
          if (name === "priority") {
            const maximum = Math.max(...candidate.items);
            candidate.items.splice(candidate.items.indexOf(maximum), 1);
            actual = maximum;
          }
        }
        actuals[name] = actual;
        if (actual !== value) candidate.active = false;
      });

      const eliminated = Object.entries(actuals)
        .filter(([name, actual]) => actual !== value && !candidates[name].active)
        .map(([name]) => ({ stack: "pilha", queue: "fila", priority: "prioridade" }[name]));
      steps.push({
        operations: copy(operations),
        operationIndex,
        candidates: copy(candidates),
        actuals,
        expected: value,
        final: false,
        conclusion: null,
        text: eliminated.length
          ? `Operação 2 ${value}: eliminamos ${eliminated.join(" e ")} porque removeram outro valor ou estavam vazias.`
          : `Operação 2 ${value}: todas as candidatas ativas conseguiram remover ${value}.`
      });
    });

    const conclusion = classifierConclusion(candidates);
    steps.push({
      operations: copy(operations),
      operationIndex: operations.length,
      candidates: copy(candidates),
      actuals: {},
      expected: null,
      final: true,
      conclusion,
      text: conclusion === "not sure"
        ? "Mais de uma estrutura continua possível; não há informação suficiente para decidir."
        : conclusion === "impossible"
          ? "Todas as estruturas foram eliminadas; a sequência é impossível."
          : `Somente uma candidata sobreviveu: ${conclusion}.`
    });
    return steps;
  }

  function renderCandidate(state, name, selector) {
    const panel = lab.querySelector(selector);
    const candidate = state.candidates[name];
    panel.classList.toggle("eliminated", !candidate.active);
    setText(panel, "[data-candidate-status]", candidate.active ? "ainda possível" : "eliminada");
    const items = panel.querySelector("[data-candidate-items]");
    items.replaceChildren();
    const displayItems = name === "priority" ? [...candidate.items].sort((a, b) => b - a) : candidate.items;
    displayItems.forEach((value, index) => {
      const item = make("span", "candidate-item", value);
      const isNext = name === "stack"
        ? index === displayItems.length - 1
        : index === 0;
      if (isNext) item.classList.add("next-out");
      items.appendChild(item);
    });
    if (!displayItems.length) items.appendChild(make("span", "empty-structure", "vazia"));
    const actual = Object.prototype.hasOwnProperty.call(state.actuals, name) ? state.actuals[name] : undefined;
    setText(panel, "[data-candidate-action]", actual === undefined
      ? "nenhuma remoção neste passo"
      : actual === null
        ? "tentou remover, mas estava vazia"
        : `removeu ${actual}; esperado ${state.expected}`);
  }

  function render(state) {
    operationRow.replaceChildren();
    state.operations.forEach(([option, value], index) => {
      const token = make("span", "operation-token", `${option} ${value}`);
      if (state.operationIndex !== null && index < state.operationIndex) token.classList.add("processed");
      if (index === state.operationIndex) token.classList.add("current");
      operationRow.appendChild(token);
    });

    renderCandidate(state, "stack", '[data-candidate="stack"]');
    renderCandidate(state, "queue", '[data-candidate="queue"]');
    renderCandidate(state, "priority", '[data-candidate="priority"]');
    const activeNames = Object.entries(state.candidates)
      .filter(([, candidate]) => candidate.active)
      .map(([name]) => ({ stack: "pilha", queue: "fila", priority: "prioridade" }[name]));
    setText(lab, "[data-movement-entered]", state.expected === null ? "nenhum" : state.expected);
    setText(lab, "[data-movement-removed]", Object.entries(state.actuals).length
      ? Object.entries(state.actuals).map(([name, value]) => `${name}: ${value ?? "vazia"}`).join(" | ")
      : "nenhuma remoção");
    setText(lab, "[data-movement-remaining]", activeNames.length ? activeNames.join(", ") : "nenhuma candidata");
    setResult(result, state.final ? `Saída: ${state.conclusion}` : "", state.conclusion === "impossible");
  }

  const player = createPlayer(lab, buildSteps, render);
  lab.querySelectorAll("[data-classifier-scenario]").forEach((button) => {
    button.addEventListener("click", () => {
      scenarioName = button.dataset.classifierScenario;
      lab.querySelectorAll("[data-classifier-scenario]").forEach((item) => item.classList.toggle("active", item === button));
      player.rebuild();
    });
  });
}

const reindeerSample = [
  { id: "R1", nome: "Luna", peso: 90, idade: 5, altura: 1.55 },
  { id: "R2", nome: "Cometa", peso: 110, idade: 8, altura: 1.7 },
  { id: "R3", nome: "Brisa", peso: 110, idade: 5, altura: 1.72 },
  { id: "R4", nome: "Nina", peso: 110, idade: 5, altura: 1.65 },
  { id: "R5", nome: "Aurora", peso: 110, idade: 5, altura: 1.65 },
  { id: "R6", nome: "Trovao", peso: 100, idade: 4, altura: 1.6 }
];

function reindeerKey(reindeer) {
  return [-reindeer.peso, reindeer.idade, reindeer.altura, reindeer.nome];
}

function compareReindeer(a, b) {
  if (a.peso !== b.peso) {
    return { result: a.peso > b.peso ? -1 : 1, criterion: 0, text: `Peso decide: ${a.peso} kg contra ${b.peso} kg; o maior vem primeiro.` };
  }
  if (a.idade !== b.idade) {
    return { result: a.idade < b.idade ? -1 : 1, criterion: 1, text: `Os pesos empatam. Idade decide: ${a.idade} contra ${b.idade}; a menor vem primeiro.` };
  }
  if (a.altura !== b.altura) {
    return { result: a.altura < b.altura ? -1 : 1, criterion: 2, text: `Peso e idade empatam. Altura decide: ${a.altura.toFixed(2)} contra ${b.altura.toFixed(2)}; a menor vem primeiro.` };
  }
  if (a.nome !== b.nome) {
    return { result: a.nome < b.nome ? -1 : 1, criterion: 3, text: `Os três números empatam. Nome decide em ordem crescente: ${a.nome} contra ${b.nome}.` };
  }
  return { result: 0, criterion: 3, text: "Todos os critérios empatam; a ordem estável preserva a posição original." };
}

function init1766(lab) {
  const tableBody = lab.querySelector("[data-reindeer-body]");
  const result = lab.querySelector("[data-reindeer-result]");
  const pull = 3;

  function buildSteps() {
    const records = copy(reindeerSample);
    const steps = [{
      records: copy(records),
      activeIds: [],
      sortedPrefix: 1,
      detail: null,
      currentId: null,
      final: false,
      text: "Primeiro transformamos cada rena em uma chave de quatro campos. A primeira posição forma um prefixo ordenado."
    }];

    for (let i = 1; i < records.length; i += 1) {
      let j = i;
      const currentId = records[j].id;
      steps.push({
        records: copy(records),
        activeIds: [currentId],
        sortedPrefix: i,
        detail: null,
        currentId,
        final: false,
        text: `${records[j].nome} entra na região já ordenada; compararemos sua chave com quem está à esquerda.`
      });

      while (j > 0) {
        const detail = compareReindeer(records[j], records[j - 1]);
        steps.push({
          records: copy(records),
          activeIds: [records[j - 1].id, records[j].id],
          sortedPrefix: j,
          detail,
          currentId,
          final: false,
          text: detail.text
        });
        if (detail.result >= 0) break;
        const displacedId = records[j - 1].id;
        [records[j - 1], records[j]] = [records[j], records[j - 1]];
        j -= 1;
        steps.push({
          records: copy(records),
          activeIds: [currentId, displacedId],
          sortedPrefix: j,
          detail,
          currentId,
          final: false,
          text: `${records[j].nome} deve vir antes; as duas posições foram trocadas na visualização didática.`
        });
      }

      steps.push({
        records: copy(records),
        activeIds: [currentId],
        sortedPrefix: i + 1,
        detail: null,
        currentId,
        final: false,
        text: `O prefixo de 0 até ${i} está ordenado pelos quatro critérios.`
      });
    }

    steps.push({
      records: copy(records),
      activeIds: [],
      sortedPrefix: records.length,
      detail: null,
      currentId: null,
      final: true,
      text: `O ranking terminou. Como puxar = ${pull}, somente os ${pull} primeiros nomes são impressos.`
    });
    return steps;
  }

  function render(state) {
    tableBody.replaceChildren();
    state.records.forEach((record, index) => {
      const row = document.createElement("tr");
      if (state.activeIds.includes(record.id)) row.classList.add("active");
      if (index < state.sortedPrefix) row.classList.add("sorted-prefix");
      if (state.final && index < pull) row.classList.add("selected");
      const key = reindeerKey(record);
      [
        index + 1,
        record.nome,
        record.peso,
        record.idade,
        record.altura.toFixed(2)
      ].forEach((value) => row.appendChild(make("td", "", value)));
      const keyCell = document.createElement("td");
      keyCell.appendChild(make("code", "", `(${key[0]}, ${key[1]}, ${key[2].toFixed(2)}, ${JSON.stringify(key[3])})`));
      row.appendChild(keyCell);
      tableBody.appendChild(row);
    });

    lab.querySelectorAll("[data-reindeer-criterion]").forEach((row) => {
      const index = Number(row.dataset.reindeerCriterion);
      row.classList.toggle("active", state.detail?.criterion === index);
      row.classList.toggle("decided", state.detail?.criterion === index && state.detail.result !== 0);
    });
    setText(lab, "[data-movement-entered]", state.currentId || "nenhuma rena em inserção");
    setText(lab, "[data-movement-removed]", state.activeIds.length === 2 ? state.activeIds.join(" × ") : "nenhuma comparação");
    setText(lab, "[data-movement-remaining]", state.records.map((record) => record.nome).join(" → "));
    setResult(result, state.final
      ? `CENARIO {1} | ${state.records.slice(0, pull).map((record, index) => `${index + 1} - ${record.nome}`).join(" | ")}`
      : "");
  }

  createPlayer(lab, buildSteps, render);
}

exerciseLabs.forEach((lab) => {
  const exercise = lab.dataset.exerciseLab;
  if (exercise === "1068") init1068(lab);
  if (exercise === "1110") init1110(lab);
  if (exercise === "1258") init1258(lab);
  if (exercise === "1340") init1340(lab);
  if (exercise === "1766") init1766(lab);
});
