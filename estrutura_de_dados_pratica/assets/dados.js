(function initializeRecordsLab() {
  "use strict";

  const form = document.querySelector("#record-form");
  const nameInput = document.querySelector("#student-name");
  const ageInput = document.querySelector("#student-age");
  const gradeInput = document.querySelector("#student-grade");
  const preview = document.querySelector("#record-preview");
  const table = document.querySelector("#record-table");
  const count = document.querySelector("#record-count");
  const status = document.querySelector("#collection-status");

  if (!form || !nameInput || !ageInput || !gradeInput || !preview || !table || !count || !status) return;

  const initialRecords = [
    { id: 101, name: "Ana", age: 19, grade: 8.7 },
    { id: 102, name: "Bia", age: 21, grade: 9.2 },
    { id: 103, name: "Caio", age: 18, grade: 7.4 },
  ];
  let records = initialRecords.map((record) => ({ ...record }));
  let nextId = 104;
  let foundId = null;

  function formatGrade(value) {
    return Number(value).toFixed(1);
  }

  function updatePreview() {
    const name = nameInput.value.trim() || "?";
    const age = ageInput.value || "?";
    const grade = gradeInput.value === "" ? "?" : formatGrade(gradeInput.value);
    preview.textContent = `Aluno{${nextId}, "${name}", ${age}, ${grade}}`;
  }

  function createCell(value) {
    const cell = document.createElement("span");
    cell.textContent = String(value);
    return cell;
  }

  function renderRecords() {
    const fragment = document.createDocumentFragment();
    const header = document.createElement("div");
    header.className = "record-row header-row";
    ["mat.", "nome", "idade", "média"].forEach((label) => header.appendChild(createCell(label)));
    fragment.appendChild(header);

    records.forEach((record) => {
      const row = document.createElement("div");
      row.className = "record-row";
      if (record.id === foundId) row.classList.add("is-found");
      row.appendChild(createCell(record.id));
      row.appendChild(createCell(record.name));
      row.appendChild(createCell(record.age));
      row.appendChild(createCell(formatGrade(record.grade)));
      fragment.appendChild(row);
    });

    table.replaceChildren(fragment);
    count.textContent = `${records.length} ${records.length === 1 ? "registro" : "registros"}`;
  }

  function setStatus(message, isError = false) {
    status.textContent = message;
    status.classList.toggle("is-error", isError);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const age = Number(ageInput.value);
    const grade = Number(gradeInput.value);

    if (!name || !Number.isInteger(age) || age < 1 || age > 120 || !Number.isFinite(grade) || grade < 0 || grade > 10) {
      setStatus("Revise os campos: idade deve ser inteira e a média deve estar entre 0 e 10.", true);
      return;
    }

    const added = { id: nextId, name, age, grade };
    records.push(added);
    nextId += 1;
    foundId = added.id;
    renderRecords();
    updatePreview();
    setStatus(`Registro ${added.id} criado e inserido no final do vetor.`);
  });

  document.querySelectorAll("[data-record-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.recordAction;

      if (action === "sort") {
        records.sort((a, b) => b.grade - a.grade);
        foundId = null;
        renderRecords();
        setStatus("Os mesmos registros foram reorganizados pela média, da maior para a menor.");
      }

      if (action === "find") {
        const found = records.find((record) => record.id === 102);
        foundId = found ? found.id : null;
        renderRecords();
        setStatus(found ? `Matrícula 102 encontrada: ${found.name}, média ${formatGrade(found.grade)}.` : "Matrícula 102 não encontrada.", !found);
      }

      if (action === "reset") {
        records = initialRecords.map((record) => ({ ...record }));
        nextId = 104;
        foundId = null;
        nameInput.value = "Davi";
        ageInput.value = "20";
        gradeInput.value = "7.9";
        renderRecords();
        updatePreview();
        setStatus("A estrutura voltou a conter os três registros iniciais.");
      }
    });
  });

  [nameInput, ageInput, gradeInput].forEach((input) => input.addEventListener("input", updatePreview));
  renderRecords();
  updatePreview();
}());
