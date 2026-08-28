(function initializeStackLab() {
  "use strict";

  const itemsContainer = document.querySelector("#stack-items");
  const valueInput = document.querySelector("#stack-value");
  const sizeOutput = document.querySelector("#stack-size");
  const operationOutput = document.querySelector("#stack-operation");
  const messageOutput = document.querySelector("#stack-message");
  const statusBox = document.querySelector(".lab-contract-status");

  if (!itemsContainer || !valueInput || !sizeOutput || !operationOutput || !messageOutput || !statusBox) return;

  const initialValues = ["ler enunciado", "planejar", "codificar"];
  let stack = [...initialValues];

  function setStatus(operation, message, isError = false) {
    operationOutput.textContent = operation;
    messageOutput.textContent = message;
    statusBox.classList.toggle("is-error", isError);
  }

  function renderStack() {
    const fragment = document.createDocumentFragment();

    [...stack].reverse().forEach((value, index) => {
      const item = document.createElement("div");
      item.className = "stack-item";
      item.textContent = value;
      if (index === 0) item.setAttribute("data-stack-top", "");
      fragment.appendChild(item);
    });

    itemsContainer.replaceChildren(fragment);
    sizeOutput.textContent = String(stack.length);
  }

  function pushValue() {
    const value = valueInput.value.trim();
    if (!value) {
      setStatus("empilhar(valor)", "Informe um valor antes de empilhar.", true);
      valueInput.focus();
      return;
    }

    stack.push(value);
    renderStack();
    setStatus("empilhar(valor)", `“${value}” agora é o topo. A pós-condição foi atendida.`);
    valueInput.value = "";
    valueInput.focus();
  }

  function popValue() {
    if (stack.length === 0) {
      setStatus("desempilhar() bloqueado", "Pré-condição violada: não é possível desempilhar uma pilha vazia.", true);
      return;
    }

    const removed = stack.pop();
    renderStack();
    const nextTop = stack.length ? ` O novo topo é “${stack.at(-1)}”.` : " A pilha ficou vazia.";
    setStatus("desempilhar()", `“${removed}” foi removido.${nextTop}`);
  }

  function peekValue() {
    if (stack.length === 0) {
      setStatus("topo() bloqueado", "Pré-condição violada: uma pilha vazia não possui topo.", true);
      return;
    }

    setStatus("topo()", `O topo é “${stack.at(-1)}”. Nenhum elemento foi removido.`);
  }

  function resetStack() {
    stack = [...initialValues];
    renderStack();
    setStatus("pilha criada", "O topo atual é “codificar”.");
    valueInput.value = "testar";
  }

  document.querySelectorAll("[data-stack-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.stackAction;
      if (action === "push") pushValue();
      if (action === "pop") popValue();
      if (action === "peek") peekValue();
      if (action === "reset") resetStack();
    });
  });

  valueInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") pushValue();
  });

  renderStack();
}());
