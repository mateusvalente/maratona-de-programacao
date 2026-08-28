(function initializeFoundationExercises() {
  "use strict";

  const storageKey = document.body.dataset.exerciseStorage || "edp-foundation-exercises-v1";

  function loadProgress() {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || {};
    } catch {
      return {};
    }
  }

  function saveProgress(progress) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(progress));
    } catch {
      // A página continua funcional quando o armazenamento está bloqueado.
    }
  }

  function copyText(text, button) {
    const done = () => {
      const original = button.innerHTML;
      button.innerHTML = '<i class="fa-solid fa-check"></i> Copiado';
      window.setTimeout(() => { button.innerHTML = original; }, 1400);
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done);
      return;
    }

    const area = document.createElement("textarea");
    area.value = text;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
    done();
  }

  function highlightCppCode() {
    document.querySelectorAll("pre code").forEach(code => {
      code.classList.add("language-cpp");
      if (window.hljs) window.hljs.highlightElement(code);
    });
  }

  function mount() {
    const cards = [...document.querySelectorAll(".exercise-card[data-exercise]")];
    const label = document.getElementById("progress-label");
    const fill = document.getElementById("progress-fill");
    const track = document.querySelector(".progress-track");
    const reset = document.getElementById("reset-progress");
    const progress = loadProgress();

    function refreshProgress() {
      const completed = cards.filter(card => card.querySelector('input[type="checkbox"]').checked).length;
      const percentage = cards.length ? (completed / cards.length) * 100 : 0;
      label.textContent = completed + " de " + cards.length + " concluídos";
      fill.style.width = percentage + "%";
      track.setAttribute("aria-valuenow", String(completed));
    }

    cards.forEach(card => {
      const id = card.dataset.exercise;
      const checkbox = card.querySelector('input[type="checkbox"]');
      checkbox.checked = Boolean(progress[id]);
      card.classList.toggle("is-done", checkbox.checked);

      checkbox.addEventListener("change", () => {
        progress[id] = checkbox.checked;
        card.classList.toggle("is-done", checkbox.checked);
        saveProgress(progress);
        refreshProgress();
      });
    });

    reset.addEventListener("click", () => {
      cards.forEach(card => {
        card.querySelector('input[type="checkbox"]').checked = false;
        card.classList.remove("is-done");
        progress[card.dataset.exercise] = false;
      });
      saveProgress(progress);
      refreshProgress();
    });

    document.querySelectorAll("[data-filter]").forEach(button => {
      button.addEventListener("click", () => {
        document.querySelectorAll("[data-filter]").forEach(item => item.classList.remove("is-active"));
        button.classList.add("is-active");
        const filter = button.dataset.filter;
        cards.forEach(card => {
          card.hidden = filter !== "todos" && card.dataset.category !== filter;
        });
      });
    });

    document.querySelectorAll(".solution-code").forEach(block => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "copy-code";
      button.innerHTML = '<i class="fa-regular fa-copy"></i> Copiar';
      button.addEventListener("click", () => copyText(block.querySelector("code").textContent, button));
      block.appendChild(button);
    });

    highlightCppCode();

    document.querySelectorAll(".check-quiz").forEach(button => {
      button.addEventListener("click", () => {
        const card = button.closest(".exercise-card");
        const fields = [...card.querySelectorAll("select[data-answer]")];
        let correct = 0;

        fields.forEach(field => {
          const matches = field.value === field.dataset.answer;
          field.classList.toggle("is-correct", matches);
          field.classList.toggle("is-wrong", Boolean(field.value) && !matches);
          if (matches) correct += 1;
        });

        card.querySelector(".quiz-feedback").textContent = correct === fields.length
          ? "Tudo certo: você reconheceu as quatro classes."
          : correct + " de " + fields.length + " respostas corretas.";
      });
    });

    refreshProgress();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount, { once: true });
  } else {
    mount();
  }
}());
