(function () {
  "use strict";

  function escapeHTML(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function rootPath() {
    return document.body.dataset.root || "";
  }

  function lessonHref(lesson) {
    return `${rootPath()}aulas/${lesson.slug}/index.html`;
  }

  function header() {
    const root = rootPath();
    return `
      <header class="site-header">
        <div class="topbar">
          <a class="brand" href="${root}index.html"><span class="brand-mark">PA</span><span>Paradigmas Algorítmicos</span></a>
          <nav class="topnav" aria-label="Navegação principal">
            <a href="${root}index.html#aulas">Aulas</a>
            <a href="${root}exercicios/index.html">Exercícios</a>
            <a href="${root}resolucoes/index.html">Resoluções</a>
            <a href="${root}index.html#estudos">Estudo</a>
          </nav>
        </div>
      </header>`;
  }

  function sidebar(activeNumber) {
    const root = rootPath();
    const links = window.PARADIGM_LESSONS.map((lesson) => `
      <a class="${lesson.number === activeNumber ? "active" : ""}" href="${lessonHref(lesson)}">
        <span class="menu-number">${String(lesson.number).padStart(2, "0")}</span>
        <span>${escapeHTML(lesson.title)}</span>
      </a>`).join("");

    return `
      <aside class="sidebar">
        <p class="sidebar-title">Trilha teórica</p>
        <nav class="course-menu" aria-label="Aulas de paradigmas">${links}</nav>
        <nav class="sidebar-extra" aria-label="Materiais">
          <a href="${root}exercicios/index.html">Catálogo de exercícios</a>
          <a href="${root}resolucoes/index.html">Resoluções explicadas</a>
          <a href="${root}questoes/index.html">Arquivos para tentativas</a>
        </nav>
      </aside>`;
  }

  function footer() {
    return `
      <footer class="site-footer">
        <div class="site-footer-inner">
          <span>Maratona de Programação com Python 3</span>
          <span>Paradigmas e técnicas de resolução de problemas</span>
        </div>
      </footer>`;
  }

  function codeBlock(code) {
    const source = Array.isArray(code.source) ? code.source.join("\n") : code.source;
    return `
      <div class="code-shell">
        <div class="code-head"><span>${escapeHTML(code.title)}</span><button class="copy-btn" type="button" title="Copiar código">Copiar</button></div>
        <pre><code>${escapeHTML(source)}</code></pre>
        ${code.note ? `<div class="code-note">${escapeHTML(code.note)}</div>` : ""}
      </div>`;
  }

  function initCopyButtons() {
    document.querySelectorAll(".copy-btn").forEach((button) => {
      button.addEventListener("click", async () => {
        const code = button.closest(".code-shell").querySelector("code").textContent;
        try {
          await navigator.clipboard.writeText(code);
          button.textContent = "Copiado";
          setTimeout(() => { button.textContent = "Copiar"; }, 1400);
        } catch (_error) {
          button.textContent = "Selecione o código";
        }
      });
    });
  }

  window.CourseUI = {
    escapeHTML,
    rootPath,
    lessonHref,
    header,
    sidebar,
    footer,
    codeBlock,
    initCopyButtons
  };
}());
