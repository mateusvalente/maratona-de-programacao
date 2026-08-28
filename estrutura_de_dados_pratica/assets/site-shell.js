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

  const moduleCatalog = [
    {
      key: "fundamentos",
      directory: "fundamentos/",
      name: "Fundamentos",
      unit: "Unidade 1",
      icon: "fa-layer-group",
      indexPath: "index.html#modulos",
      description: "teoria e prática em C++17",
      lessons: [
        { path: "tipos-abstratos-de-dados.html", title: "Tipos Abstratos de Dados", short: "TAD", icon: "fa-file-contract" },
        { path: "dados-registros-e-estruturas.html", title: "Dados, registros e estruturas", short: "Dados e registros", icon: "fa-address-card" },
        { path: "estrutura-estatica-dinamica.html", title: "Memória estática × dinâmica", short: "Estática × dinâmica", icon: "fa-memory" },
        { path: "alocacao-desalocao-dinamica.html", title: "Ponteiros e memória dinâmica", short: "Ponteiros e alocação", icon: "fa-location-dot" },
        { path: "complexidade-de-algotimo.html", title: "Complexidade de algoritmos", short: "Complexidade", icon: "fa-chart-line" },
        { path: "exercicios-de-fundamentos.html", title: "Exercícios de fundamentos", short: "Exercícios", icon: "fa-code" },
      ],
    },
    {
      key: "listas_encadeadas",
      directory: "listas_encadeadas/",
      name: "Listas encadeadas",
      unit: "Unidade 2",
      icon: "fa-link",
      indexPath: "listas_encadeadas/index.html",
      description: "estruturas lineares e prática guiada",
      lessons: [
        { path: "index.html", title: "Visão geral do módulo", short: "Visão geral", icon: "fa-table-cells-large" },
        { path: "aulas/aula_01_fundamentos.html", title: "Fundamentos de estruturas lineares", short: "Fundamentos", icon: "fa-shapes" },
        { path: "aulas/aula_02_pilha.html", title: "Pilha", short: "Pilha", icon: "fa-layer-group" },
        { path: "aulas/aula_03_fila.html", title: "Fila", short: "Fila", icon: "fa-people-line" },
        { path: "aulas/aula_04_deque.html", title: "Deque", short: "Deque", icon: "fa-arrows-left-right" },
        { path: "aulas/aula_05_lista_simplesmente_encadeada.html", title: "Lista simplesmente encadeada", short: "Lista simples", icon: "fa-link" },
        { path: "aulas/aula_06_lista_duplamente_encadeada.html", title: "Lista duplamente encadeada", short: "Lista dupla", icon: "fa-code-branch" },
        { path: "aulas/aula_07_ordenacao.html", title: "Ordenação", short: "Ordenação", icon: "fa-arrow-down-wide-short" },
        { path: "exercicios.html", title: "Exercícios práticos", short: "Exercícios", icon: "fa-code" },
      ],
    },
  ];

  function normalizedPath(url) {
    return decodeURIComponent(url.pathname).replace(/\\/g, "/").replace(/\/+$/, "").toLowerCase();
  }

  function isProjectHomePage() {
    const current = normalizedPath(window.location);
    const home = normalizedPath(new URL("index.html", projectRoot));
    const root = normalizedPath(projectRoot);
    return current === home || current === root;
  }

  function relativeProjectPath() {
    const projectPath = normalizedPath(projectRoot);
    return normalizedPath(window.location).slice(projectPath.length).replace(/^\//, "") || "index.html";
  }

  function currentModule() {
    const relative = relativeProjectPath();
    return moduleCatalog.find(module => relative.startsWith(module.directory)) || moduleCatalog[0];
  }

  function sidebarTemplate(module) {
    const relative = relativeProjectPath();
    const localPath = relative.slice(module.directory.length) || "index.html";
    const currentLesson = module.lessons.find(lesson => lesson.path.toLowerCase() === localPath);
    const currentTitle = currentLesson
      ? currentLesson.short
      : document.title.split("·")[0].trim();

    const lessonLinks = module.lessons.map((lesson, index) => {
      const active = lesson.path.toLowerCase() === localPath;
      return [
        '<a class="edp-sidebar-lesson',
        active ? ' is-active' : '',
        '" href="',
        projectHref(module.directory + lesson.path),
        '"',
        active ? ' aria-current="page"' : '',
        ' title="',
        lesson.title,
        '"><span class="edp-sidebar-order">',
        String(index + 1).padStart(2, "0"),
        '</span><i class="fa-solid ',
        lesson.icon,
        '" aria-hidden="true"></i><span class="edp-sidebar-link-copy">',
        lesson.short,
        '</span></a>',
      ].join("");
    }).join("");

    const moduleHref = projectHref(module.indexPath);

    return [
      '<aside class="edp-course-sidebar" id="edp-course-sidebar" data-edp-shell-part="sidebar" aria-label="Conteúdo do módulo ', module.name, '">',
        '<div class="edp-sidebar-head">',
          '<a class="edp-sidebar-module" href="', moduleHref, '" title="', module.name, '">',
            '<span class="edp-sidebar-module-mark"><i class="fa-solid ', module.icon, '" aria-hidden="true"></i></span>',
            '<span class="edp-sidebar-module-copy"><small>', module.unit, '</small><strong>', module.name, '</strong></span>',
          '</a>',
          '<button class="edp-sidebar-collapse" type="button" aria-label="Recolher menu lateral" aria-expanded="true"><i class="fa-solid fa-angles-left" aria-hidden="true"></i></button>',
        '</div>',
        '<div class="edp-sidebar-content">',
          '<div class="edp-sidebar-trail">',
            '<button class="edp-sidebar-back" type="button" aria-label="Voltar para a página anterior" title="Voltar"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i></button>',
            '<nav class="edp-sidebar-breadcrumb" aria-label="Breadcrumb">',
              '<a href="', projectHref("index.html"), '">Início</a><i class="fa-solid fa-chevron-right" aria-hidden="true"></i>',
              '<a href="', moduleHref, '">', module.name, '</a><i class="fa-solid fa-chevron-right" aria-hidden="true"></i>',
              '<span aria-current="page">', currentTitle, '</span>',
            '</nav>',
          '</div>',
          '<div class="edp-sidebar-shortcuts">',
            '<a href="', projectHref("index.html"), '" title="Menu principal"><i class="fa-solid fa-house" aria-hidden="true"></i><span>Menu principal</span></a>',
            '<a href="', moduleHref, '" title="Início do módulo"><i class="fa-solid fa-table-cells-large" aria-hidden="true"></i><span>Início do módulo</span></a>',
          '</div>',
          '<div class="edp-sidebar-group">',
            '<p class="edp-sidebar-group-title">', module.unit, ' · ', module.name, '</p>',
            '<nav class="edp-sidebar-lessons" aria-label="Conteúdos de ', module.name, '">', lessonLinks, '</nav>',
          '</div>',
          '<div class="edp-sidebar-group edp-sidebar-page-group">',
            '<p class="edp-sidebar-group-title">Nesta página</p>',
            '<nav class="edp-sidebar-page-links" aria-label="Seções desta página"></nav>',
          '</div>',
        '</div>',
        '<div class="edp-sidebar-foot"><i class="fa-solid fa-book-open" aria-hidden="true"></i><span><strong>', module.lessons.length, ' conteúdos</strong><small>', module.description, '</small></span></div>',
      '</aside>',
      '<button class="edp-sidebar-mobile-toggle" type="button" aria-controls="edp-course-sidebar" aria-expanded="false"><i class="fa-solid fa-bars-staggered" aria-hidden="true"></i><span>Conteúdo</span></button>',
      '<button class="edp-sidebar-backdrop" type="button" tabindex="-1" aria-label="Fechar menu lateral"></button>',
    ].join("");
  }

  function mountPageSectionLinks(sidebar) {
    const target = sidebar.querySelector(".edp-sidebar-page-links");
    const group = sidebar.querySelector(".edp-sidebar-page-group");
    const sourceLinks = [...document.querySelectorAll(".lesson-jump a[href^='#']")];

    if (!sourceLinks.length) {
      group.hidden = true;
      return;
    }

    sourceLinks.forEach(source => {
      const link = document.createElement("a");
      link.href = source.getAttribute("href");
      link.textContent = source.textContent.trim();
      target.appendChild(link);
    });
  }

  function initializeSidebar(sidebar, module) {
    const mobileToggle = document.querySelector(".edp-sidebar-mobile-toggle");
    const backdrop = document.querySelector(".edp-sidebar-backdrop");
    const collapse = sidebar.querySelector(".edp-sidebar-collapse");
    const back = sidebar.querySelector(".edp-sidebar-back");
    const mobileQuery = window.matchMedia("(max-width: 900px)");
    let collapsed = false;

    try {
      collapsed = localStorage.getItem("edp-sidebar-collapsed") === "true";
    } catch {
      collapsed = false;
    }

    function setCollapsed(nextCollapsed) {
      collapsed = nextCollapsed;
      document.body.classList.toggle("edp-sidebar-collapsed", collapsed);
      collapse.setAttribute("aria-expanded", String(!collapsed));
      collapse.setAttribute("aria-label", collapsed ? "Expandir menu lateral" : "Recolher menu lateral");
      collapse.querySelector("i").className = collapsed
        ? "fa-solid fa-angles-right"
        : "fa-solid fa-angles-left";
      try {
        localStorage.setItem("edp-sidebar-collapsed", String(collapsed));
      } catch {
        // O recolhimento continua funcional sem persistência.
      }
    }

    function setMobileOpen(open) {
      document.body.classList.toggle("edp-sidebar-mobile-open", open);
      mobileToggle.setAttribute("aria-expanded", String(open));
      mobileToggle.querySelector("i").className = open
        ? "fa-solid fa-xmark"
        : "fa-solid fa-bars-staggered";
    }

    setCollapsed(collapsed);
    mountPageSectionLinks(sidebar);

    collapse.addEventListener("click", () => {
      if (mobileQuery.matches) {
        setMobileOpen(false);
      } else {
        setCollapsed(!collapsed);
      }
    });

    mobileToggle.addEventListener("click", () => {
      setMobileOpen(!document.body.classList.contains("edp-sidebar-mobile-open"));
    });
    backdrop.addEventListener("click", () => setMobileOpen(false));
    sidebar.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        if (mobileQuery.matches) setMobileOpen(false);
      });
    });
    back.addEventListener("click", () => {
      if (document.referrer) {
        window.history.back();
      } else {
        window.location.href = projectHref(module.indexPath);
      }
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") setMobileOpen(false);
    });
    mobileQuery.addEventListener("change", () => setMobileOpen(false));
  }

  function mountSidebar() {
    if (isProjectHomePage() || document.querySelector('[data-edp-shell-part="sidebar"]')) return;

    const module = currentModule();
    const host = document.createElement("div");
    host.innerHTML = sidebarTemplate(module);
    [...host.children].forEach(element => document.body.appendChild(element));
    document.body.classList.add("edp-has-sidebar");
    initializeSidebar(document.getElementById("edp-course-sidebar"), module);
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
    mountSidebar();
    initializeStickyNavigation(header);
  }

  loadShellAssets();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountShell, { once: true });
  } else {
    mountShell();
  }
}());
