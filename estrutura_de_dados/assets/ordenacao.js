const sortLab = document.querySelector("[data-sort-lab]");

if (sortLab) {
  const initial = JSON.parse(sortLab.dataset.initial || "[8, 3, 6, 2, 7]");
  const track = sortLab.querySelector("[data-sort-track]");
  const message = sortLab.querySelector("[data-sort-message]");
  const stepOutput = sortLab.querySelector("[data-sort-step]");
  let algorithm = "insertion";
  let steps = [];
  let stepIndex = 0;
  let timer = null;

  function snapshot(values, active, sorted, text) {
    return { values: [...values], active: [...active], sorted: [...sorted], text };
  }

  function insertionSteps(source) {
    const values = [...source];
    const result = [snapshot(values, [], [0], "O primeiro elemento já forma uma região ordenada.")];

    for (let i = 1; i < values.length; i += 1) {
      let j = i;
      result.push(snapshot(values, [j - 1, j], range(i), `Compare ${values[j]} com ${values[j - 1]}.`));
      while (j > 0 && values[j] < values[j - 1]) {
        [values[j - 1], values[j]] = [values[j], values[j - 1]];
        result.push(snapshot(values, [j - 1, j], range(j - 1), "Troca feita: o elemento ainda caminha para sua posição na parte ordenada."));
        j -= 1;
        if (j > 0) result.push(snapshot(values, [j - 1, j], range(j), `Compare novamente: ${values[j]} e ${values[j - 1]}.`));
      }
      result.push(snapshot(values, [], range(i + 1), `Os índices 0 até ${i} estão ordenados.`));
    }
    return result;
  }

  function selectionSteps(source) {
    const values = [...source];
    const result = [snapshot(values, [], [], "Procure o menor valor para ocupar a primeira posição.")];

    for (let i = 0; i < values.length - 1; i += 1) {
      let min = i;
      for (let j = i + 1; j < values.length; j += 1) {
        result.push(snapshot(values, [min, j], range(i), `Compare o menor atual (${values[min]}) com ${values[j]}.`));
        if (values[j] < values[min]) min = j;
      }
      if (min !== i) {
        [values[i], values[min]] = [values[min], values[i]];
        result.push(snapshot(values, [i, min], range(i + 1), `O menor valor restante foi colocado no índice ${i}.`));
      } else {
        result.push(snapshot(values, [i], range(i + 1), `O índice ${i} já continha o menor valor restante.`));
      }
    }
    result.push(snapshot(values, [], range(values.length), "Todos os elementos estão ordenados."));
    return result;
  }

  function bubbleSteps(source) {
    const values = [...source];
    const result = [snapshot(values, [], [], "Compare pares vizinhos da esquerda para a direita.")];

    for (let end = values.length - 1; end > 0; end -= 1) {
      let changed = false;
      for (let j = 0; j < end; j += 1) {
        result.push(snapshot(values, [j, j + 1], range(values.length, end + 1), `Compare ${values[j]} e ${values[j + 1]}.`));
        if (values[j] > values[j + 1]) {
          [values[j], values[j + 1]] = [values[j + 1], values[j]];
          changed = true;
          result.push(snapshot(values, [j, j + 1], range(values.length, end + 1), "A ordem estava invertida; os vizinhos foram trocados."));
        }
      }
      result.push(snapshot(values, [], range(values.length, end), `O índice ${end} recebeu seu valor definitivo.`));
      if (!changed) {
        result.push(snapshot(values, [], range(values.length), "Nenhuma troca ocorreu: a sequência já está ordenada."));
        break;
      }
    }
    if (result[result.length - 1].sorted.length !== values.length) {
      result.push(snapshot(values, [], range(values.length), "Todos os elementos estão ordenados."));
    }
    return result;
  }

  function range(end, start = 0) {
    return Array.from({ length: Math.max(0, end - start) }, (_, index) => index + start);
  }

  function buildSteps() {
    if (algorithm === "selection") return selectionSteps(initial);
    if (algorithm === "bubble") return bubbleSteps(initial);
    return insertionSteps(initial);
  }

  function render() {
    const state = steps[stepIndex];
    track.replaceChildren();

    state.values.forEach((value, index) => {
      const cell = document.createElement("div");
      cell.className = "sort-cell";
      if (state.active.includes(index)) cell.classList.add("active");
      if (state.sorted.includes(index)) cell.classList.add("sorted");
      cell.style.setProperty("--bar-height", `${value * 12}px`);

      const indexLabel = document.createElement("span");
      indexLabel.className = "sort-index";
      indexLabel.textContent = `índice ${index}`;
      const valueLabel = document.createElement("strong");
      valueLabel.className = "sort-value";
      valueLabel.textContent = value;
      cell.append(indexLabel, valueLabel);
      track.appendChild(cell);
    });

    stepOutput.textContent = `passo ${stepIndex + 1}/${steps.length}`;
    message.textContent = state.text;
  }

  function reset() {
    window.clearInterval(timer);
    timer = null;
    steps = buildSteps();
    stepIndex = 0;
    render();
  }

  function next() {
    if (stepIndex < steps.length - 1) {
      stepIndex += 1;
      render();
    } else {
      window.clearInterval(timer);
      timer = null;
    }
  }

  sortLab.addEventListener("click", (event) => {
    const algorithmButton = event.target.closest("button[data-algorithm]");
    if (algorithmButton) {
      algorithm = algorithmButton.dataset.algorithm;
      sortLab.querySelectorAll("button[data-algorithm]").forEach((button) => button.classList.toggle("active", button === algorithmButton));
      reset();
      return;
    }

    const action = event.target.closest("button[data-sort-action]")?.dataset.sortAction;
    if (action === "reset") reset();
    if (action === "next") next();
    if (action === "play") {
      if (timer) return;
      timer = window.setInterval(next, 700);
    }
  });

  reset();
}
