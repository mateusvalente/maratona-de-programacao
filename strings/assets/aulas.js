const $ = (selector, root = document) => root.querySelector(selector);

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function makeStep(title, note, display, value, states = [], details = []) {
  return { title, note, display: Array.from(display), value, states, details };
}

function solve1024(values) {
  const original = Array.from(values.message || "");
  const deslocada = original.map((char) => {
    const isAsciiLetter = /[A-Za-z]/.test(char);
    return isAsciiLetter ? String.fromCodePoint(char.codePointAt(0) + 3) : char;
  });
  const invertida = [...deslocada].reverse();
  const metade = Math.floor(invertida.length / 2);
  const final = invertida.map((char, index) => (
    index >= metade ? String.fromCodePoint(char.codePointAt(0) - 1) : char
  ));

  return [
    makeStep("Mensagem original", "Nada foi transformado ainda.", original, original.join("")),
    makeStep(
      "Fase 1: letras avançam +3",
      "Espaços, números e símbolos permanecem iguais nesta fase.",
      deslocada,
      deslocada.join(""),
      deslocada.map((char, i) => char === original[i] ? "" : "changed")
    ),
    makeStep(
      "Fase 2: inverter tudo",
      "O último caractere passa a ser o primeiro, inclusive quando é um símbolo.",
      invertida,
      invertida.join(""),
      invertida.map(() => "carried")
    ),
    makeStep(
      "Fase 3: metade final recua -1",
      `O corte está no índice ${metade}. Somente os caracteres a partir dele mudam.`,
      final,
      final.join(""),
      final.map((_, i) => i >= metade ? "changed" : "")
    )
  ];
}

function solve1120(values) {
  const digit = Array.from(values.digit || "")[0] || "";
  const number = values.number || "";
  if (!/^\d$/.test(digit) || !/^\d+$/.test(number)) {
    return [makeStep(
      "Entrada inválida",
      "Use exatamente um dígito no primeiro campo e apenas dígitos no número.",
      number,
      "Corrija os campos para executar"
    )];
  }

  const chars = Array.from(number);
  const filtered = chars.filter((char) => char !== digit).join("");
  const leadingZeros = (filtered.match(/^0*/) || [""])[0].length;
  const withoutZeros = filtered.slice(leadingZeros);
  const result = withoutZeros || "0";

  return [
    makeStep("Contrato original", `O dígito defeituoso é ${digit}.`, chars, number),
    makeStep(
      "Remover todas as ocorrências",
      `Todo ${digit} aparece riscado. O valor que segue para a próxima etapa é ${filtered || "vazio"}.`,
      chars,
      filtered || "(vazio)",
      chars.map((char) => char === digit ? "removed" : "carried")
    ),
    makeStep(
      "Descartar zeros à esquerda",
      "Zeros internos ou no final continuam fazendo parte do número.",
      filtered,
      withoutZeros || "(vazio)",
      Array.from(filtered).map((_, i) => i < leadingZeros ? "removed" : "carried")
    ),
    makeStep(
      "Resultado normalizado",
      withoutZeros ? "Ainda restaram dígitos significativos." : "Nada significativo restou, então a resposta obrigatória é 0.",
      result,
      result,
      Array.from(result).map(() => "changed")
    )
  ];
}

function solve1168(values) {
  const number = values.number || "";
  const costs = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6];
  if (!/^\d+$/.test(number)) {
    return [makeStep("Entrada inválida", "O painel aceita somente algarismos de 0 a 9.", number, "Corrija o número")];
  }

  const chars = Array.from(number);
  const steps = [makeStep("Número recebido", "A soma começa em zero.", chars, "0 leds")];
  let sum = 0;
  const details = [];
  chars.forEach((char, index) => {
    const cost = costs[Number(char)];
    sum += cost;
    details.push({ label: `posição ${index}`, value: `${char} → ${cost}` });
    steps.push(makeStep(
      `Consultar o dígito ${char}`,
      `A tabela informa ${cost} LEDs. A soma parcial agora é ${sum}.`,
      chars,
      `${sum} leds`,
      chars.map((_, i) => i === index ? "active" : i < index ? "changed" : ""),
      [...details]
    ));
  });
  return steps;
}

function solve1234(values) {
  const chars = Array.from(values.sentence || "");
  const output = [...chars];
  const steps = [makeStep("Sentença original", "A próxima letra deve ser maiúscula.", chars, chars.join(""))];
  let upper = true;

  chars.forEach((char, index) => {
    const isLetter = /\p{L}/u.test(char);
    const before = upper;
    if (isLetter) {
      output[index] = upper ? char.toUpperCase() : char.toLowerCase();
      upper = !upper;
    }
    steps.push(makeStep(
      isLetter ? `Processar a letra “${char}”` : "Copiar espaço ou símbolo",
      isLetter
        ? `Ela usa ${before ? "maiúscula" : "minúscula"}; a próxima letra usará ${upper ? "maiúscula" : "minúscula"}.`
        : `“${char === " " ? "espaço" : char}” não troca o estado: a próxima letra ainda será ${upper ? "maiúscula" : "minúscula"}.`,
      output,
      output.join(""),
      output.map((_, i) => i === index ? "active" : i < index ? "changed" : "")
    ));
  });
  return steps;
}

function solve1235(values) {
  const phrase = values.phrase || "";
  const half = Math.floor(phrase.length / 2);
  const left = phrase.slice(0, half);
  const right = phrase.slice(half);
  const reversedLeft = Array.from(left).reverse().join("");
  const reversedRight = Array.from(right).reverse().join("");
  const result = reversedLeft + reversedRight;
  const splitDetails = [
    { label: "esquerda", value: left || "∅" },
    { label: "direita", value: right || "∅" },
    { label: "corte", value: `índice ${half}` }
  ];

  return [
    makeStep("Frase recebida", "Primeiro encontramos o centro da linha.", phrase, phrase),
    makeStep(
      "Separar as duas metades",
      "O corte é apenas lógico: nenhum caractere é removido.",
      phrase,
      `${left} | ${right}`,
      Array.from(phrase).map((_, i) => i < half ? "carried" : "active"),
      splitDetails
    ),
    makeStep(
      "Inverter a metade esquerda",
      "A metade direita ainda permanece como entrou.",
      reversedLeft + right,
      reversedLeft + right,
      Array.from(phrase).map((_, i) => i < half ? "changed" : ""),
      [{ label: "esquerda invertida", value: reversedLeft || "∅" }, { label: "direita original", value: right || "∅" }]
    ),
    makeStep(
      "Inverter a metade direita",
      "Agora as duas inversões locais estão prontas e podem ser concatenadas.",
      result,
      result,
      Array.from(result).map(() => "changed"),
      [{ label: "esquerda pronta", value: reversedLeft || "∅" }, { label: "direita pronta", value: reversedRight || "∅" }]
    )
  ];
}

function solve1237(values) {
  const a = values.a || "";
  const b = values.b || "";
  const rows = Array.from(a);
  const columns = Array.from(b);
  const matrix = Array.from({ length: rows.length + 1 }, () => Array(columns.length + 1).fill(0));
  const snapshots = [{ best: 0, end: 0 }];
  let best = 0;
  let end = 0;

  for (let i = 1; i <= rows.length; i += 1) {
    for (let j = 1; j <= columns.length; j += 1) {
      if (rows[i - 1] === columns[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1] + 1;
        if (matrix[i][j] > best) {
          best = matrix[i][j];
          end = i;
        }
      }
    }
    snapshots.push({ best, end });
  }

  const steps = [makeStep(
    "Matriz iniciada com zeros",
    "Cada nova linha compara um caractere da primeira string com toda a segunda string.",
    a,
    "melhor = 0"
  )];
  steps[0].matrix = { rows, columns, cells: matrix, visibleRows: 0, best: 0 };

  rows.forEach((char, index) => {
    const snapshot = snapshots[index + 1];
    const substring = a.slice(snapshot.end - snapshot.best, snapshot.end);
    const matches = columns.filter((column) => column === char).length;
    const step = makeStep(
      `Preencher a linha de “${char}”`,
      matches
        ? `Há ${matches} correspondência(s). Cada valor positivo estende a diagonal anterior.`
        : "Não há caractere igual nesta linha, portanto ela fica zerada.",
      a,
      snapshot.best ? `melhor = ${snapshot.best} (“${substring}”)` : "melhor = 0",
      rows.map((_, i) => i === index ? "active" : i < index ? "changed" : ""),
      [
        { label: "linha atual", value: char },
        { label: "melhor tamanho", value: snapshot.best },
        { label: "trecho", value: substring || "∅" }
      ]
    );
    step.matrix = { rows, columns, cells: matrix, visibleRows: index + 1, best: snapshot.best };
    steps.push(step);
  });
  return steps;
}

function solve1238(values) {
  const a = Array.from(values.a || "");
  const b = Array.from(values.b || "");
  const limit = Math.min(a.length, b.length);
  const output = [];
  const steps = [makeStep(
    "Duas entradas, uma saída vazia",
    `Podemos formar ${limit} par(es) antes que a menor string termine.`,
    [],
    "(vazia)",
    [],
    [{ label: "string A", value: a.join("") || "∅" }, { label: "string B", value: b.join("") || "∅" }]
  )];

  for (let i = 0; i < limit; i += 1) {
    output.push(a[i], b[i]);
    steps.push(makeStep(
      `Formar o par ${i + 1}`,
      `Entra “${a[i]}” de A e depois “${b[i]}” de B.`,
      output,
      output.join(""),
      output.map((_, tokenIndex) => tokenIndex >= output.length - 2 ? "active" : tokenIndex % 2 ? "carried" : "changed"),
      [{ label: "de A", value: a[i] }, { label: "de B", value: b[i] }, { label: "saída parcial", value: output.join("") }]
    ));
  }

  const remainingA = a.slice(limit);
  const remainingB = b.slice(limit);
  const remaining = remainingA.length ? remainingA : remainingB;
  const source = remainingA.length ? "A" : remainingB.length ? "B" : "nenhuma";
  output.push(...remaining);
  steps.push(makeStep(
    "Anexar a sobra",
    remaining.length ? `A string ${source} ainda tinha ${remaining.length} caractere(s).` : "As duas strings terminaram juntas; não existe sobra.",
    output,
    output.join("") || "(vazia)",
    output.map((_, i) => i >= output.length - remaining.length && remaining.length ? "active" : i % 2 ? "carried" : "changed"),
    [{ label: "sobra de A", value: remainingA.join("") || "∅" }, { label: "sobra de B", value: remainingB.join("") || "∅" }]
  ));
  return steps;
}

const SOLVERS = { solve1024, solve1120, solve1168, solve1234, solve1235, solve1237, solve1238 };

function renderTokenRow(step) {
  const row = $("#token-row");
  row.replaceChildren();
  if (!step.display.length) {
    const empty = document.createElement("span");
    empty.className = "token space";
    empty.textContent = "∅";
    row.append(empty);
    return;
  }
  step.display.forEach((char, index) => {
    const token = document.createElement("span");
    const state = step.states[index] || "";
    token.className = `token${char === " " ? " space" : ""}${state ? ` ${state}` : ""}`;
    token.textContent = char === " " ? "espaço" : char;
    token.title = `posição ${index}: ${char === " " ? "espaço" : char}`;
    row.append(token);
  });
}

function renderDetails(details) {
  const grid = $("#detail-grid");
  grid.replaceChildren();
  grid.hidden = !details.length;
  details.forEach((detail) => {
    const item = document.createElement("div");
    item.className = "detail-item";
    const value = document.createElement("strong");
    value.textContent = detail.value;
    const label = document.createElement("span");
    label.textContent = detail.label;
    item.append(value, label);
    grid.append(item);
  });
}

function renderMatrix(matrix) {
  const wrap = $("#dp-wrap");
  wrap.replaceChildren();
  wrap.hidden = !matrix;
  if (!matrix) return;

  const table = document.createElement("table");
  table.className = "dp-table";
  const head = document.createElement("tr");
  ["", "∅", ...matrix.columns].forEach((char) => {
    const cell = document.createElement("th");
    cell.textContent = char;
    head.append(cell);
  });
  table.append(head);

  for (let i = 0; i <= matrix.rows.length; i += 1) {
    const row = document.createElement("tr");
    const label = document.createElement("th");
    label.textContent = i === 0 ? "∅" : matrix.rows[i - 1];
    row.append(label);
    for (let j = 0; j <= matrix.columns.length; j += 1) {
      const cell = document.createElement("td");
      const visible = i === 0 || i <= matrix.visibleRows;
      const value = visible ? matrix.cells[i][j] : "";
      cell.textContent = value;
      if (visible && value > 0) cell.classList.add("match");
      if (visible && matrix.best > 0 && value === matrix.best) cell.classList.add("best");
      row.append(cell);
    }
    table.append(row);
  }
  wrap.append(table);
}

function initLab(lesson) {
  const state = { steps: [], index: 0 };
  const previous = $("#previous-step");
  const next = $("#next-step");

  function render() {
    const step = state.steps[state.index];
    $("#step-counter").textContent = `passo ${state.index + 1}/${state.steps.length}`;
    $("#step-title").textContent = step.title;
    $("#step-note").textContent = step.note;
    $("#step-value").textContent = step.value;
    previous.disabled = state.index === 0;
    next.disabled = state.index === state.steps.length - 1;
    renderTokenRow(step);
    renderDetails(step.details || []);
    renderMatrix(step.matrix);
  }

  function run() {
    const values = {};
    lesson.fields.forEach((field) => { values[field.key] = $(`#field-${field.key}`).value; });
    state.steps = SOLVERS[`solve${lesson.id}`](values);
    state.index = 0;
    render();
  }

  previous.addEventListener("click", () => {
    if (state.index > 0) state.index -= 1;
    render();
  });
  next.addEventListener("click", () => {
    if (state.index < state.steps.length - 1) state.index += 1;
    render();
  });
  $("#run-lab").addEventListener("click", run);
  lesson.fields.forEach((field) => $(`#field-${field.key}`).addEventListener("change", run));
  run();
}

function lessonLink(lesson, direction) {
  if (!lesson) return `<a href="../index.html">${direction === "previous" ? "←" : "→"} Índice do curso</a>`;
  const arrow = direction === "previous" ? "←" : "→";
  return `<a href="aula_${String(lesson.order).padStart(2, "0")}_${lesson.id}.html">${direction === "previous" ? arrow + " " : ""}Aula ${lesson.order}: ${escapeHtml(lesson.title)}${direction === "next" ? " " + arrow : ""}</a>`;
}

function renderLesson(lesson) {
  const lessons = window.STRING_LESSONS;
  const previous = lessons[lesson.order - 2];
  const next = lessons[lesson.order];
  document.title = `Aula ${lesson.order} | ${lesson.id} - ${lesson.title}`;
  document.body.innerHTML = `
    <main class="page">
      <nav class="topbar" aria-label="Navegação principal">
        <a href="../index.html">← Curso de Strings</a>
        <span>beecrowd ${lesson.id} · aula ${lesson.order}/${lessons.length}</span>
      </nav>

      <header class="lesson-header">
        <div>
          <p class="eyebrow">${escapeHtml(lesson.category)}</p>
          <h1>${escapeHtml(lesson.title)}</h1>
          <p class="lead">${escapeHtml(lesson.summary)}</p>
        </div>
        <span class="badge">Problema ${lesson.id}</span>
      </header>

      <section class="band two-col" aria-labelledby="problem-title">
        <div>
          <h2 id="problem-title">O desafio</h2>
          <p>${escapeHtml(lesson.problem)}</p>
          <ul class="concept-list">
            ${lesson.concepts.map(([title, text]) => `<li><strong>${escapeHtml(title)}:</strong> ${escapeHtml(text)}</li>`).join("")}
          </ul>
          <p class="fact-check"><strong>Ponto importante:</strong> ${escapeHtml(lesson.fact)}</p>
        </div>
        <figure class="source-figure">
          <img src="../assets/imagens/${lesson.id}.svg" alt="Diagrama didático do problema ${lesson.id}">
          <figcaption>${escapeHtml(lesson.figure)}</figcaption>
        </figure>
      </section>

      <section class="band two-col" aria-labelledby="algorithm-title">
        <div>
          <h2 id="algorithm-title">A ideia da solução</h2>
          <p class="lead">${escapeHtml(lesson.solution)}</p>
          <ol class="steps-list">
            ${lesson.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
          </ol>
        </div>
        <div>
          <h2>Por que funciona?</h2>
          <p>${escapeHtml(lesson.why)}</p>
          <h3>Cuidado aqui</h3>
          <p class="warning">${escapeHtml(lesson.warning)}</p>
        </div>
      </section>

      <section class="band" aria-labelledby="lab-title">
        <div class="string-lab">
          <div class="lab-head">
            <h2 id="lab-title">Experimente passo a passo</h2>
            <span class="lab-counter" id="step-counter">passo 1/1</span>
          </div>
          <div class="controls">
            ${lesson.fields.map((field) => `
              <label class="field${field.small ? " small" : ""}">
                <span>${escapeHtml(field.label)}</span>
                <input id="field-${field.key}" value="${escapeHtml(field.value)}" maxlength="${field.maxlength}" autocomplete="off">
              </label>
            `).join("")}
            <button class="btn primary" id="run-lab" type="button">Executar</button>
          </div>
          <div class="lab-body">
            <div class="lab-status">
              <div class="stage">
                <p class="stage-label">Estado visual</p>
                <div class="token-row" id="token-row" aria-live="polite"></div>
                <div class="detail-grid" id="detail-grid"></div>
                <div class="dp-wrap" id="dp-wrap"></div>
              </div>
              <div class="step-copy">
                <p class="stage-label">O que aconteceu</p>
                <h3 id="step-title"></h3>
                <p id="step-note"></p>
                <p class="stage-label">Valor atual</p>
                <div class="value-box" id="step-value"></div>
              </div>
            </div>
          </div>
          <div class="step-actions">
            <button class="btn" id="previous-step" type="button" aria-label="Passo anterior">← Anterior</button>
            <button class="btn" id="next-step" type="button">Próximo →</button>
            <a class="btn" href="../resolucoes/${lesson.id}.py">Abrir código .py</a>
          </div>
        </div>
      </section>

      <section class="band two-col" aria-labelledby="code-title">
        <div>
          <h2 id="code-title">Solução em Python</h2>
          <div class="code-shell">
            <div class="code-head"><span>Python 3</span><a href="../resolucoes/${lesson.id}.py">arquivo completo</a></div>
            <pre><code>${escapeHtml(lesson.code)}</code></pre>
          </div>
        </div>
        <div>
          <h2>Custos</h2>
          <div class="complexity">
            <div><strong>Tempo</strong><span>${escapeHtml(lesson.time)}</span></div>
            <div><strong>Memória</strong><span>${escapeHtml(lesson.memory)}</span></div>
          </div>
          <h2 style="margin-top: 24px">Para continuar</h2>
          <ul class="sources">
            <li><a href="https://judge.beecrowd.com/pt/problems/view/${lesson.id}">Enunciado no beecrowd</a></li>
            <li><a href="https://github.com/xTecna/solucoes-da-beecrowd/tree/main/problemas/strings/${lesson.id}">Arquivos originais no GitHub</a></li>
            ${lesson.study.map(([title, url]) => `<li><a href="${url}">${escapeHtml(title)}</a></li>`).join("")}
          </ul>
        </div>
      </section>

      <nav class="lesson-nav" aria-label="Navegação entre aulas">
        ${lessonLink(previous, "previous")}
        ${lessonLink(next, "next")}
      </nav>
    </main>
  `;
  initLab(lesson);
  if (window.location.hash) {
    requestAnimationFrame(() => document.querySelector(window.location.hash)?.scrollIntoView());
  }
}

const lessonId = document.body.dataset.lesson;
const currentLesson = window.STRING_LESSONS.find((lesson) => lesson.id === lessonId);
if (currentLesson) renderLesson(currentLesson);
