const lab = document.querySelector("[data-structure-lab]");

if (lab) {
  const mode = lab.dataset.mode;
  const initialValues = JSON.parse(lab.dataset.initial || "[]");
  let nextCellId = 1;
  let cells = initialValues.map((value) => createCell(value));
  let enteringId = null;
  let enterDirection = "right";
  let lastEntered = null;
  let lastRemoved = null;

  const track = lab.querySelector("[data-track]");
  const sizeOutput = lab.querySelector("[data-size]");
  const lastAction = lab.querySelector("[data-last-action]");
  const currentState = lab.querySelector("[data-current-state]");
  const history = lab.querySelector("[data-history]");
  const input = lab.querySelector("[data-value]");
  const events = [];

  const modeClass = {
    stack: "stack",
    queue: "queue",
    deque: "deque",
    single: "single",
    double: "double"
  }[mode];

  track.classList.add(modeClass);

  const movementBoard = document.createElement("div");
  movementBoard.className = "movement-board";
  movementBoard.innerHTML = `
    <section class="movement-column">
      <h3>Quem entrou</h3>
      <div class="movement-slot" data-entered-slot>Nenhuma célula nesta operação.</div>
    </section>
    <section class="movement-column">
      <h3>Quem saiu</h3>
      <div class="movement-slot" data-removed-slot>Nenhuma célula nesta operação.</div>
    </section>
    <section class="movement-column">
      <h3>Quem permaneceu</h3>
      <div class="movement-slot remaining-cells" data-remaining-slot></div>
    </section>`;
  lab.querySelector(".visual-stage").after(movementBoard);

  const enteredSlot = movementBoard.querySelector("[data-entered-slot]");
  const removedSlot = movementBoard.querySelector("[data-removed-slot]");
  const remainingSlot = movementBoard.querySelector("[data-remaining-slot]");

  function createCell(value) {
    const id = `C${String(nextCellId).padStart(2, "0")}`;
    nextCellId += 1;
    return { id, value: String(value) };
  }

  function labels(index) {
    const last = cells.length - 1;
    if (mode === "stack") return index === last ? "topo" : index === 0 ? "base" : "";
    if (mode === "queue" || mode === "deque") {
      if (cells.length === 1) return "front / back";
      if (index === 0) return "front";
      if (index === last) return "back";
    }
    if (mode === "single" || mode === "double") {
      if (cells.length === 1) return "head / tail";
      if (index === 0) return "head";
      if (index === last) return "tail";
    }
    return "";
  }

  function pointerFields(index) {
    if (mode === "stack") {
      return [{ name: "next", value: index > 0 ? cells[index - 1].id : "None" }];
    }

    const prev = index > 0 ? cells[index - 1].id : "None";
    const next = index < cells.length - 1 ? cells[index + 1].id : "None";

    if (mode === "deque" || mode === "double") {
      return [
        { name: "prev", value: prev },
        { name: "next", value: next }
      ];
    }

    return [{ name: "next", value: next }];
  }

  function buildCellElement(cell, index) {
    const node = document.createElement("div");
    node.className = "node";
    node.dataset.cellId = cell.id;

    if (cell.id === enteringId) {
      node.classList.add(`enter-from-${enterDirection}`);
    }

    const idField = document.createElement("div");
    idField.className = "cell-id";
    idField.textContent = `id da célula: ${cell.id}`;

    const valueField = document.createElement("div");
    valueField.className = "cell-value";
    const valueLabel = document.createElement("span");
    valueLabel.textContent = "valor";
    const value = document.createElement("strong");
    value.textContent = cell.value;
    valueField.append(valueLabel, value);

    const links = pointerFields(index);
    const linksField = document.createElement("div");
    linksField.className = "cell-links";
    linksField.style.setProperty("--link-count", links.length);
    links.forEach((link) => {
      const pointer = document.createElement("span");
      pointer.textContent = `${link.name}: ${link.value}`;
      linksField.appendChild(pointer);
    });

    node.append(idField, valueField, linksField);

    const positionLabel = labels(index);
    if (positionLabel) {
      const small = document.createElement("small");
      small.textContent = positionLabel;
      node.appendChild(small);
    }

    return node;
  }

  function buildMovementCell(cell, removed = false) {
    const element = document.createElement("div");
    element.className = removed ? "movement-cell removed" : "movement-cell";

    const id = document.createElement("strong");
    id.textContent = `id: ${cell.id}`;
    const value = document.createElement("span");
    value.textContent = `valor: ${cell.value}`;
    const state = document.createElement("small");
    state.textContent = removed ? "fora da estrutura" : "nova célula";

    element.append(id, value, state);
    return element;
  }

  function renderMovement() {
    enteredSlot.replaceChildren();
    removedSlot.replaceChildren();
    remainingSlot.replaceChildren();

    if (lastEntered) enteredSlot.appendChild(buildMovementCell(lastEntered));
    else enteredSlot.textContent = "Nenhuma célula nesta operação.";

    if (lastRemoved) removedSlot.appendChild(buildMovementCell(lastRemoved, true));
    else removedSlot.textContent = "Nenhuma célula nesta operação.";

    if (!cells.length) {
      remainingSlot.textContent = "Estrutura vazia.";
    } else {
      cells.forEach((cell) => {
        const item = document.createElement("code");
        item.textContent = `${cell.id}(${cell.value})`;
        remainingSlot.appendChild(item);
      });
    }
  }

  function render() {
    track.innerHTML = "";
    sizeOutput.textContent = `tamanho: ${cells.length}`;
    currentState.textContent = cells.length
      ? cells.map((cell) => `${cell.id}(${cell.value})`).join(" → ")
      : "[]";

    if (!cells.length) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = "A estrutura está vazia";
      track.appendChild(empty);
      renderMovement();
      return;
    }

    const indexes = mode === "stack"
      ? cells.map((_, index) => index).reverse()
      : cells.map((_, index) => index);

    indexes.forEach((index, position) => {
      const wrap = document.createElement("div");
      wrap.className = "node-wrap";
      wrap.appendChild(buildCellElement(cells[index], index));

      if (position < indexes.length - 1) {
        const arrow = document.createElement("span");
        arrow.className = "arrow";
        if (mode === "stack") arrow.textContent = "↓";
        else if (mode === "double" || mode === "deque") arrow.textContent = "⇄";
        else arrow.textContent = "→";
        wrap.appendChild(arrow);
      }

      track.appendChild(wrap);
    });

    renderMovement();

    if (enteringId) {
      const animatedId = enteringId;
      window.setTimeout(() => {
        if (enteringId === animatedId) enteringId = null;
      }, 650);
    }
  }

  function record(message) {
    lastAction.textContent = message;
    events.unshift(message);
    events.splice(6);
    history.innerHTML = "";
    events.forEach((event) => {
      const item = document.createElement("li");
      item.textContent = event;
      history.appendChild(item);
    });
  }

  function readValue() {
    const value = input.value.trim();
    if (!value) {
      input.focus();
      record("Digite um valor antes de inserir.");
      return null;
    }
    input.value = "";
    input.focus();
    return value;
  }

  function startOperation() {
    lastEntered = null;
    lastRemoved = null;
    enteringId = null;
  }

  function insertAt(side, direction, description) {
    const value = readValue();
    if (value === null) return false;

    const cell = createCell(value);
    if (side === "front") cells.unshift(cell);
    else cells.push(cell);

    lastEntered = cell;
    enteringId = cell.id;
    enterDirection = direction;
    record(`${description}: entrou ${cell.id}, com valor ${cell.value}.`);
    return true;
  }

  function removeFrom(side, description) {
    if (!cells.length) {
      record("Nada saiu: a estrutura já está vazia.");
      return false;
    }

    const cell = side === "front" ? cells.shift() : cells.pop();
    lastRemoved = cell;
    record(`${description}: saiu ${cell.id}, que guardava ${cell.value}.`);
    return true;
  }

  function inspect(side, name) {
    if (!cells.length) {
      record(`${name}: a estrutura está vazia.`);
      return;
    }
    const cell = side === "front" ? cells[0] : cells[cells.length - 1];
    record(`${name} = ${cell.id}, valor ${cell.value}. Nada foi removido.`);
  }

  function run(action) {
    startOperation();
    let changed = true;

    switch (action) {
      case "push":
        changed = insertAt("back", "top", "push no topo");
        break;
      case "pop":
        changed = removeFrom("back", "pop no topo");
        break;
      case "top":
        inspect("back", "top");
        break;
      case "enqueue":
        changed = insertAt("back", "right", "push/enqueue no back");
        break;
      case "dequeue":
        changed = removeFrom("front", "pop/dequeue no front");
        break;
      case "append-left":
        changed = insertAt("front", "left", "push no front");
        break;
      case "append-right":
        changed = insertAt("back", "right", "push no back");
        break;
      case "pop-left":
        changed = removeFrom("front", "pop no front");
        break;
      case "pop-right":
        changed = removeFrom("back", "pop no back");
        break;
      case "front":
        inspect("front", mode === "single" || mode === "double" ? "head" : "front");
        break;
      case "back":
        inspect("back", mode === "single" || mode === "double" ? "tail" : "back");
        break;
      case "push-front":
        changed = insertAt("front", "left", "push no head");
        break;
      case "push-back":
        changed = insertAt("back", "right", "push no tail");
        break;
      case "pop-front":
        changed = removeFrom("front", "pop no head");
        break;
      case "pop-back":
        changed = removeFrom("back", "pop no tail");
        break;
      default:
        changed = false;
        record("Operação desconhecida.");
    }

    if (changed !== false || action === "top" || action === "front" || action === "back") {
      render();
    } else {
      renderMovement();
    }
  }

  lab.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (button) run(button.dataset.action);
  });

  input?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const defaultAction = lab.querySelector("button[data-default]");
      if (defaultAction) run(defaultAction.dataset.action);
    }
  });

  render();
  record("Estado inicial: cada valor recebeu uma célula com ID próprio.");
}

