(function initializeDataStructuresShell() {
  "use strict";

  if (window.__dataStructuresShellLoaded) return;
  window.__dataStructuresShellLoaded = true;

  const shellScript = document.currentScript || document.querySelector("script[data-edp-shell]");
  const projectRoot = new URL("../", shellScript ? shellScript.src : document.baseURI);
  const projectHref = (path = "") => new URL(path, projectRoot).href;

  function ensureStylesheet(selector, href, attributes = {}) {
    if (document.querySelector(selector)) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    Object.entries(attributes).forEach(([name, value]) => link.setAttribute(name, value));
    document.head.appendChild(link);
  }

  function loadShellAssets() {
    ensureStylesheet(
      'link[href*="family=DM+Mono"]',
      "https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap",
    );
    ensureStylesheet(
      'link[href*="font-awesome"], link[href*="fontawesome"]',
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css",
      { crossorigin: "anonymous", referrerpolicy: "no-referrer" },
    );
    ensureStylesheet(
      "link[data-edp-shell-style]",
      projectHref("assets/site-shell.css"),
      { "data-edp-shell-style": "" },
    );
  }

  function headerTemplate() {
    return `
      <header class="edp-site-header top-navigation" data-edp-shell-part="header">
        <div class="edp-topbar">
          <a class="edp-brand" href="${projectHref("index.html")}" aria-label="Página inicial de Estruturas de Dados na Prática">
            <span class="edp-brand-mark" aria-hidden="true">C++</span>
            <span class="edp-brand-copy">
              <strong>estruturas<span>.dev</span></strong>
              <small>Estruturas de Dados · C++17</small>
            </span>
          </a>

          <nav class="edp-topnav" aria-label="Navegação principal">
            <a class="edp-nav-home" href="${projectHref("index.html")}"><i class="fa-solid fa-house" aria-hidden="true"></i><span>Início</span></a>
            <a href="${projectHref("index.html#diagrama")}">Diagrama</a>
            <a href="${projectHref("index.html#exemplos")}">Exemplos</a>
            <a href="${projectHref("tipos-abstratos-de-dados.html")}">TAD</a>
            <a href="${projectHref("dados-registros-e-estruturas.html")}">Dados</a>

            <span class="edp-topnav-contact" aria-label="Contato e repositórios de Mateus Valente">
              <a href="mailto:mateus.sousa.valente@gmail.com" aria-label="Enviar e-mail para Mateus Valente" title="E-mail"><i class="fa-solid fa-envelope" aria-hidden="true"></i></a>
              <a href="https://br.linkedin.com/in/mateus-valente-b6978a173" target="_blank" rel="noreferrer" aria-label="Abrir o LinkedIn de Mateus Valente" title="LinkedIn"><i class="fa-brands fa-linkedin-in" aria-hidden="true"></i></a>
              <a href="https://github.com/mateusvalente" target="_blank" rel="noreferrer" aria-label="Abrir o GitHub de Mateus Valente" title="GitHub"><i class="fa-brands fa-github" aria-hidden="true"></i></a>
              <a class="edp-nav-course-repo" href="https://github.com/mateusvalente/maratona-de-programacao" target="_blank" rel="noreferrer" aria-label="Abrir o repositório do curso" title="Repositório do curso"><i class="fa-solid fa-code-branch" aria-hidden="true"></i></a>
            </span>

            <a class="edp-nav-profile" href="https://mateusvalente.dev" target="_blank" rel="noreferrer">Portfólio <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
          </nav>
        </div>
      </header>`;
  }

  function footerTemplate() {
    return `
      <footer class="edp-site-footer" data-edp-shell-part="footer">
        <div class="edp-footer-inner">
          <div class="edp-footer-identity">
            <strong>Estruturas de Dados na Prática</strong>
            <small>Teoria, implementação e memória · C++17</small>
          </div>

          <nav class="edp-footer-contact-grid" aria-label="Contato e repositórios">
            <a href="mailto:mateus.sousa.valente@gmail.com">
              <i class="edp-footer-service-icon fa-solid fa-envelope" aria-hidden="true"></i><span><small>Fale por e-mail</small><strong>E-mail</strong></span><i class="edp-footer-contact-arrow fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
            </a>
            <a href="https://br.linkedin.com/in/mateus-valente-b6978a173" target="_blank" rel="noreferrer">
              <i class="edp-footer-service-icon fa-brands fa-linkedin-in" aria-hidden="true"></i><span><small>Perfil profissional</small><strong>LinkedIn</strong></span><i class="edp-footer-contact-arrow fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
            </a>
            <a href="https://github.com/mateusvalente" target="_blank" rel="noreferrer">
              <i class="edp-footer-service-icon fa-brands fa-github" aria-hidden="true"></i><span><small>Código e projetos</small><strong>GitHub principal</strong></span><i class="edp-footer-contact-arrow fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
            </a>
            <a href="https://github.com/mateusvalente/maratona-de-programacao" target="_blank" rel="noreferrer">
              <i class="edp-footer-service-icon fa-solid fa-code-branch" aria-hidden="true"></i><span><small>Material deste curso</small><strong>Repositório do curso</strong></span><i class="edp-footer-contact-arrow fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
            </a>
          </nav>

          <p class="edp-footer-legal">Material de autoria do Professor Mestre Mateus de Sousa Valente, dos cursos de TI da Uniube. Todos os direitos reservados &copy; 2026.</p>
        </div>
      </footer>`;
  }

  function createElementFromTemplate(template) {
    const host = document.createElement("div");
    host.innerHTML = template.trim();
    return host.firstElementChild;
  }

  function initializeStickyNavigation(navigation) {
    const navigationStart = navigation.getBoundingClientRect().top + window.scrollY;

    function updateNavigationState() {
      navigation.classList.toggle("is-stuck", window.scrollY >= navigationStart);
    }

    window.addEventListener("scroll", updateNavigationState, { passive: true });
    updateNavigationState();
  }

  function mountShell() {
    if (document.querySelector('[data-edp-shell-part="header"]')) return;

    const main = document.querySelector("main");
    if (main && !main.id) main.id = "conteudo-pagina";

    if (main && !document.querySelector(".edp-skip-link")) {
      const skipLink = document.createElement("a");
      skipLink.className = "edp-skip-link";
      skipLink.href = `#${main.id}`;
      skipLink.textContent = "Ir para o conteúdo";
      document.body.prepend(skipLink);
    }

    const header = createElementFromTemplate(headerTemplate());
    document.body.insertBefore(header, main || document.body.firstChild);
    document.body.appendChild(createElementFromTemplate(footerTemplate()));
    initializeStickyNavigation(header);
  }

  loadShellAssets();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountShell, { once: true });
  } else {
    mountShell();
  }
}());
