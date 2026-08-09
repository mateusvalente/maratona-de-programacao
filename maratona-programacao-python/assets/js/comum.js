(function (root) {
  function esc(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function rootPath() {
    return document.body.dataset.root || "";
  }

  function lessonUrl(lesson) {
    return `${rootPath()}aulas/${lesson.slug}/index.html`;
  }

  function header() {
    return `
      <header class="site-header">
        <div class="topbar">
          <a class="brand" href="${rootPath()}index.html">
            <span class="brand-mark">AC</span>
            <span>Maratona com Python</span>
          </a>
          <nav class="topnav" aria-label="Navegação principal">
            <a href="${rootPath()}index.html#aulas">Aulas</a>
            <a href="${rootPath()}index.html#listas">Listas</a>
            <a href="${rootPath()}index.html#estudos">Estudo</a>
          </nav>
        </div>
      </header>`;
  }

  function sidebar(activeId) {
    const lessons = root.COURSE_LESSONS || [];
    return `
      <aside class="sidebar">
        <p class="sidebar-title">Trilha do curso</p>
        <nav class="course-menu" aria-label="Aulas do curso">
          ${lessons.map((lesson) => `
            <a href="${lessonUrl(lesson)}" class="${lesson.id === activeId ? "active" : ""}">
              <span class="menu-number">${String(lesson.id).padStart(2, "0")}</span>
              <span>${esc(lesson.title)}</span>
            </a>`).join("")}
        </nav>
      </aside>`;
  }

  function footer() {
    return `
      <footer class="site-footer">
        <div class="site-footer-inner">
          <span>Maratona de Programação com Python 3</span>
          <span>Do primeiro print ao primeiro Accepted.</span>
        </div>
      </footer>`;
  }

  function shell(content, activeId) {
    document.body.insertAdjacentHTML("afterbegin", header());
    const host = document.querySelector("#app");
    host.className = "layout";
    host.innerHTML = `${sidebar(activeId)}<article class="main">${content}</article>`;
    document.body.insertAdjacentHTML("beforeend", footer());
    bindCopyButtons();
  }

  function bindCopyButtons() {
    document.querySelectorAll(".copy-btn").forEach((button) => {
      button.addEventListener("click", async () => {
        const code = button.closest(".code-shell")?.querySelector("code")?.textContent || "";
        try {
          await navigator.clipboard.writeText(code);
          button.textContent = "Copiado";
          window.setTimeout(() => { button.textContent = "Copiar"; }, 1300);
        } catch (_error) {
          button.textContent = "Selecione o código";
        }
      });
    });
  }

  function decorateCode() {
    document.querySelectorAll(".code-shell").forEach((shell) => {
      const head = shell.querySelector(".code-head");
      if (!head || head.querySelector(".copy-btn")) return;
      head.insertAdjacentHTML("beforeend", '<button class="copy-btn" type="button">Copiar</button>');
    });
    bindCopyButtons();
  }

  root.CourseUI = { esc, rootPath, lessonUrl, header, sidebar, footer, shell, decorateCode };
})(window);
