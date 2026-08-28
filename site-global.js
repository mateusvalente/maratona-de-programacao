(function initializeSiteGlobal() {
  "use strict";

  if (window.__maratonaSiteGlobalLoaded) return;
  window.__maratonaSiteGlobalLoaded = true;

  const siteScript = document.currentScript || document.querySelector("script[data-site-global]");
  const siteRoot = new URL("./", siteScript ? siteScript.src : document.baseURI);
  const siteHref = (path = "") => new URL(path, siteRoot).href;

  function ensureStylesheet(selector, href, attributes = {}) {
    if (document.querySelector(selector)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    Object.entries(attributes).forEach(([name, value]) => link.setAttribute(name, value));
    document.head.appendChild(link);
  }

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
    "link[data-site-shell]",
    siteHref("site-shell.css"),
    { "data-site-shell": "" },
  );

  const measurementId = "G-8ZHFY5QQQG";
  const googleTagSource = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId);

  if (!document.querySelector(`script[src="${googleTagSource}"]`)) {
    const googleTagScript = document.createElement("script");
    googleTagScript.async = true;
    googleTagScript.src = googleTagSource;
    document.head.appendChild(googleTagScript);
  }

  const moduleCatalog = [
    { key: "iniciante", path: "maratona-programacao-python/", name: "Módulo iniciante", short: "Iniciante", icon: "fa-terminal" },
    { key: "estruturas", path: "estrutura_de_dados/", name: "Estruturas de dados", short: "Estruturas", icon: "fa-layer-group" },
    { key: "strings", path: "strings/", name: "Strings", short: "Strings", icon: "fa-font" },
    { key: "grafos", path: "grafos/", name: "Grafos", short: "Grafos", icon: "fa-diagram-project" },
    { key: "geometria", path: "geometria-computacional/", name: "Geometria computacional", short: "Geometria", icon: "fa-draw-polygon" },
    { key: "paradigmas", path: "paradigmas/", name: "Paradigmas algorítmicos", short: "Paradigmas", icon: "fa-code-branch" },
  ];

  const staticLessons = {
    iniciante: [
      ["aula-01-introducao", "O que é Maratona de Programação"], ["aula-02-maratona-sbc-icpc", "Maratona SBC e ICPC"],
      ["aula-03-como-funciona", "Como funciona uma competição"], ["aula-04-estrategias", "Estratégias de competição"],
      ["aula-05-tipos-de-problemas", "Tipos de problemas"], ["aula-06-vereditos", "Erros e vereditos"],
      ["aula-07-boca", "BOCA e submissões"], ["aula-08-linguagens", "Linguagens de programação"],
      ["aula-09-python-basico", "Primeiros passos com Python"], ["aula-10-input-output", "Input e output"],
      ["aula-11-primeiros-problemas", "Primeiros problemas do beecrowd"], ["aula-12-if", "Decisões com if"],
      ["aula-13-for", "Repetição com for"], ["aula-14-while", "Repetição com while"],
      ["aula-15-listas", "Listas e vetores"], ["aula-16-strings", "Strings"],
      ["aula-17-funcoes", "Funções"], ["aula-18-matematica-estatistica", "Matemática e estatística"],
      ["aula-19-match-case", "Match/case"], ["aula-20-dicionarios-conjuntos", "Dicionários e conjuntos"],
    ],
    estruturas: [
      ["aula_01_fundamentos.html", "Fundamentos"], ["aula_02_pilha.html", "Pilha"], ["aula_03_fila.html", "Fila"],
      ["aula_04_deque.html", "Deque"], ["aula_05_lista_simplesmente_encadeada.html", "Lista simplesmente encadeada"],
      ["aula_06_lista_duplamente_encadeada.html", "Lista duplamente encadeada"], ["aula_07_ordenacao.html", "Ordenação"],
    ],
    strings: [["aula_01_1024.html", "1024 · Criptografia"], ["aula_02_1120.html", "1120 · Revisão de Contrato"], ["aula_03_1168.html", "1168 · LED"], ["aula_04_1234.html", "1234 · Sentença Dançante"], ["aula_05_1235.html", "1235 · De Dentro para Fora"], ["aula_06_1237.html", "1237 · Comparação de Substring"], ["aula_07_1238.html", "1238 · Combinador"]],
    grafos: [["aula_01_teoria_grafos_matriz_lista.html", "Teoria, matriz e lista"], ["aula_02_bfs_dfs_animados.html", "BFS e DFS animados"], ["aula_03_dfs_exemplo_beecrowd_1076.html", "DFS · beecrowd 1076"], ["aula_04_bfs_movimento_cavalo.html", "BFS · movimento do cavalo"], ["aula_05_grafos_ponderados.html", "Grafos ponderados"], ["aula_06_dijkstra.html", "Dijkstra"], ["aula_07_beecrowd_1148_casos_completos (1).html", "beecrowd 1148"]],
    geometria: [["aula_01_1039.html", "1039 · Flores de Fogo"], ["aula_02_1124.html", "1124 · Elevador"], ["aula_03_1137.html", "1137 · Cocircular"], ["aula_04_1223.html", "1223 · Tobogã"], ["aula_05_1291.html", "1291 · Área do segmento"], ["aula_06_1292.html", "1292 · Circunferência"]],
    paradigmas: [["01-introducao-paradigmas", "O que é um paradigma?"], ["02-forca-bruta", "Força bruta"], ["03-recursao", "Recursão"], ["04-backtracking", "Backtracking"], ["05-divisao-conquista", "Divisão e conquista"], ["06-guloso", "Algoritmos gulosos"], ["07-programacao-dinamica", "Programação dinâmica"], ["08-memoizacao", "Memoização"], ["09-branch-and-bound", "Branch and Bound"], ["10-comparando-paradigmas", "Comparando paradigmas"]],
  };

  // Nem todas as páginas do módulo iniciante carregam os catálogos locais.
  // Estes resumos mantêm a navegação completa e idêntica em qualquer rota.
  const staticProblemLists = [
    { id: 1, slug: "lista-01-entrada-saida-matematica", title: "Entrada, saída e matemática" },
    { id: 2, slug: "lista-02-condicionais", title: "Condicionais" },
    { id: 3, slug: "lista-03-repeticao", title: "Repetição" },
    { id: 4, slug: "lista-04-listas", title: "Listas e vetores" },
    { id: 5, slug: "lista-05-revisao", title: "Revisão da primeira etapa" },
    { id: 6, slug: "lista-06-matematica-estatistica", title: "Matemática e estatística" },
  ];
  const staticProblemIds = [
    1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1014, 1016,
    1035, 1036, 1037, 1038, 1040, 1041, 1042, 1043, 1044, 1046,
    1059, 1060, 1064, 1065, 1066, 1070, 1071, 1072, 1073, 1078,
    1080, 1120, 1168, 1172, 1173, 1174, 1175, 1176, 1177, 1178, 1179, 1180,
    1234, 1235, 1238,
  ];

  function escapeHTML(value) {
    return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  }

  function relativePagePath() {
    const rootPath = decodeURIComponent(siteRoot.pathname).replace(/\\/g, "/");
    return decodeURIComponent(window.location.pathname).replace(/\\/g, "/").slice(rootPath.length).replace(/^\//, "");
  }

  function siteContext() {
    const relative = relativePagePath();
    const module = moduleCatalog.find((item) => relative.startsWith(item.path));
    return {
      relative,
      module: module || { key: "portal", path: "", name: "Portal do curso", short: "Portal", icon: "fa-house" },
      moduleHref: siteHref(module ? `${module.path}index.html` : "index.html"),
    };
  }

  function currentCategory(context) {
    const local = context.relative.slice(context.module.path.length);
    if (local.startsWith("aulas/")) return "Aulas";
    if (local.startsWith("listas/")) return "Listas";
    if (local.startsWith("problemas/")) return "Problemas";
    if (local.startsWith("exercicios/")) return "Exercícios";
    if (local.startsWith("resolucoes/")) return "Resoluções";
    if (local.startsWith("questoes/")) return "Tentativas";
    return "Visão geral";
  }

  function hierarchySections(context) {
    if (context.module.key === "portal") {
      return [{ label: "Módulos", icon: "fa-graduation-cap", items: moduleCatalog.map((item) => ({ label: item.name, href: siteHref(`${item.path}index.html`), icon: item.icon })) }];
    }

    const key = context.module.key;
    const lessonBase = key === "iniciante" ? `${context.module.path}aulas/` : key === "paradigmas" ? `${context.module.path}aulas/` : `${context.module.path}aulas/`;
    const lessons = (staticLessons[key] || []).map(([slug, label], index) => ({
      label,
      number: String(index + 1).padStart(2, "0"),
      href: siteHref(key === "iniciante" || key === "paradigmas" ? `${lessonBase}${slug}/index.html` : `${lessonBase}${slug}`),
    }));
    const sections = [{ label: "Aulas", icon: "fa-book-open", items: lessons }];

    if (key === "iniciante") {
      const lists = Array.isArray(window.PROBLEM_LISTS) && window.PROBLEM_LISTS.length ? window.PROBLEM_LISTS : staticProblemLists;
      sections.push({ label: "Listas", icon: "fa-list-check", items: lists.map((item) => ({ label: item.title, number: String(item.id).padStart(2, "0"), href: siteHref(`${context.module.path}listas/${item.slug}/index.html`) })) });
      const problems = Array.isArray(window.BEE_PROBLEMS) && window.BEE_PROBLEMS.length
        ? window.BEE_PROBLEMS
        : staticProblemIds.map((id) => ({ id, title: "Problema resolvido" }));
      sections.push({ label: "Problemas", icon: "fa-laptop-code", items: problems.map((item) => ({ label: `${item.id} · ${item.title}`, href: siteHref(`${context.module.path}problemas/beecrowd/${item.id}/index.html`) })) });
    }

    if (key === "estruturas") {
      const resolutions = [["resolucao_01_beecrowd_1068.html", "1068 · Balanço de Parênteses"], ["resolucao_02_beecrowd_1110.html", "1110 · Jogando Cartas Fora"], ["resolucao_03_beecrowd_1258.html", "1258 · Camisetas"], ["resolucao_04_beecrowd_1340.html", "1340 · Eu Posso Adivinhar"], ["resolucao_05_beecrowd_1766.html", "1766 · Lista de Papai Noel"]];
      sections.push({ label: "Resoluções", icon: "fa-circle-check", items: resolutions.map(([file, label]) => ({ label, href: siteHref(`${context.module.path}aulas/${file}`) })) });
    }

    if (key === "paradigmas") {
      sections.push({ label: "Prática", icon: "fa-flask", items: [
        { label: "Catálogo de exercícios", href: siteHref(`${context.module.path}exercicios/index.html`) },
        { label: "Resoluções explicadas", href: siteHref(`${context.module.path}resolucoes/index.html`) },
        { label: "Arquivos para tentativas", href: siteHref(`${context.module.path}questoes/index.html`) },
      ] });
    }
    return sections;
  }

  function breadcrumbParts(context) {
    const category = currentCategory(context);
    const heading = document.querySelector("main h1, #app h1, h1");
    const pageTitle = heading ? heading.textContent.trim() : document.title.split("|")[0].trim();
    const parts = [{ label: "Portal", href: siteHref("index.html") }];
    if (context.module.key !== "portal") parts.push({ label: context.module.short, href: context.moduleHref });
    if (category !== "Visão geral") parts.push({ label: category });
    if (pageTitle && pageTitle !== context.module.name && category !== "Visão geral") parts.push({ label: pageTitle });
    return parts;
  }

  function sidebarTemplate(context) {
    const currentPath = decodeURIComponent(window.location.pathname);
    const parts = breadcrumbParts(context);
    const breadcrumb = parts.map((part, index) => {
      const content = part.href ? `<a href="${part.href}">${escapeHTML(part.label)}</a>` : `<span aria-current="page">${escapeHTML(part.label)}</span>`;
      return `${index ? '<i class="fa-solid fa-chevron-right" aria-hidden="true"></i>' : ""}${content}`;
    }).join("");
    const category = currentCategory(context);
    const groups = hierarchySections(context).map((section, sectionIndex) => {
      const open = section.label === category || (category === "Visão geral" && sectionIndex === 0);
      const items = section.items.map((item) => {
        const active = decodeURIComponent(new URL(item.href).pathname) === currentPath;
        return `<li><a class="${active ? "is-current" : ""}" href="${item.href}"${active ? ' aria-current="page"' : ""}>${item.number ? `<span>${item.number}</span>` : `<i class="fa-solid ${item.icon || "fa-file-code"}" aria-hidden="true"></i>`}<strong>${escapeHTML(item.label)}</strong></a></li>`;
      }).join("");
      return `<details class="mv-sidebar-group" ${open ? "open" : ""}><summary><i class="fa-solid ${section.icon}" aria-hidden="true"></i><span>${escapeHTML(section.label)}</span><small>${section.items.length}</small><i class="fa-solid fa-chevron-down" aria-hidden="true"></i></summary><ol>${items || '<li class="mv-sidebar-empty">Conteúdo em preparação.</li>'}</ol></details>`;
    }).join("");

    return `
      <div class="mv-sidebar-overlay" data-sidebar-close aria-hidden="true"></div>
      <aside class="mv-course-sidebar" id="menu-do-curso" aria-label="Hierarquia do curso">
        <div class="mv-sidebar-toolbar">
          <button class="mv-sidebar-collapse" type="button" data-sidebar-collapse aria-label="Recolher menu lateral" title="Recolher menu">
            <i class="fa-solid fa-angles-left" aria-hidden="true"></i><span>Trilha do curso</span>
          </button>
          <button class="mv-sidebar-mobile-close" type="button" data-sidebar-close aria-label="Fechar menu"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>
        </div>
        <div class="mv-sidebar-content">
          <div class="mv-sidebar-breadcrumb-row">
            <button class="mv-sidebar-back" type="button" data-sidebar-back aria-label="Voltar à página anterior" title="Voltar"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i></button>
            <nav class="mv-sidebar-breadcrumb" aria-label="Breadcrumb">${breadcrumb}</nav>
          </div>
          <div class="mv-sidebar-shortcuts">
            <a href="${siteHref("index.html")}"><i class="fa-solid fa-house" aria-hidden="true"></i><span>Menu principal</span></a>
            <a href="${context.moduleHref}"><i class="fa-solid ${context.module.icon}" aria-hidden="true"></i><span>Início do módulo</span></a>
          </div>
          <div class="mv-sidebar-module"><small>Módulo atual</small><strong>${escapeHTML(context.module.name)}</strong></div>
          <nav class="mv-sidebar-tree" aria-label="Conteúdo do módulo">${groups}</nav>
        </div>
      </aside>
      <button class="mv-sidebar-slider" type="button" data-sidebar-open aria-controls="menu-do-curso" aria-expanded="false">
        <i class="fa-solid fa-bars" aria-hidden="true"></i><span>Trilha</span><i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
      </button>`;
  }

  function headerTemplate(context) {
    return `
      <header class="mv-site-header top-navigation" data-global-shell="header">
        <div class="mv-topbar">
          <a class="mv-brand" href="${siteHref("index.html")}" aria-label="Página inicial do Curso de Inverno de Programação">
            <span class="mv-brand-mark" aria-hidden="true">&lt;/&gt;</span>
            <span class="mv-brand-copy"><strong>maratona<span>.dev</span></strong><small>Curso de Inverno · Uniube</small></span>
          </a>
          <nav class="mv-topnav" aria-label="Navegação principal">
            <button class="mv-header-menu" type="button" data-sidebar-open aria-controls="menu-do-curso" aria-expanded="false"><i class="fa-solid fa-bars" aria-hidden="true"></i><span>Menu</span></button>
            <a class="mv-header-module" href="${context.moduleHref}" title="Ir para o início de ${escapeHTML(context.module.name)}"><i class="fa-solid ${context.module.icon}" aria-hidden="true"></i><span>${escapeHTML(context.module.short)}</span></a>
            <a href="${siteHref("index.html#modulos")}">Módulos</a>
            <a href="${siteHref("index.html#videoaulas")}">Videoaulas</a>
            <a href="${siteHref("index.html#metodologia")}">Como estudar</a>
            <a href="${siteHref("index.html#fontes")}">Fontes</a>
            <span class="mv-topnav-contact" aria-label="Contato e repositórios de Mateus Valente">
              <a href="mailto:mateus.sousa.valente@gmail.com" aria-label="Enviar e-mail para Mateus Valente" title="E-mail"><i class="fa-solid fa-envelope" aria-hidden="true"></i></a>
              <a href="https://br.linkedin.com/in/mateus-valente-b6978a173" target="_blank" rel="noreferrer" aria-label="Abrir o LinkedIn de Mateus Valente" title="LinkedIn"><i class="fa-brands fa-linkedin-in" aria-hidden="true"></i></a>
              <a href="https://github.com/mateusvalente" target="_blank" rel="noreferrer" aria-label="Abrir o GitHub principal de Mateus Valente" title="GitHub principal"><i class="fa-brands fa-github" aria-hidden="true"></i></a>
              <a class="mv-nav-marathon-repo" href="https://github.com/mateusvalente/maratona-de-programacao" target="_blank" rel="noreferrer" aria-label="Abrir o repositório da Maratona de Programação" title="Repositório da maratona"><i class="fa-solid fa-code-branch" aria-hidden="true"></i></a>
            </span>
            <a class="mv-nav-profile" href="https://mateusvalente.dev" target="_blank" rel="noreferrer">Portfólio <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
          </nav>
        </div>
      </header>`;
  }

  function footerTemplate() {
    return `
      <footer class="mv-site-footer" data-global-shell="footer">
        <div class="mv-footer-inner">
          <div class="mv-footer-identity">
            <strong>maratona.mateusvalente.dev</strong>
            <small>Curso de Inverno de Programação · Uniube</small>
          </div>
          <nav class="mv-footer-contact-grid" aria-label="Contato e repositórios">
            <a href="mailto:mateus.sousa.valente@gmail.com">
              <i class="mv-footer-service-icon fa-solid fa-envelope" aria-hidden="true"></i><span><small>Fale por e-mail</small><strong>E-mail</strong></span><i class="mv-footer-contact-arrow fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
            </a>
            <a href="https://br.linkedin.com/in/mateus-valente-b6978a173" target="_blank" rel="noreferrer">
              <i class="mv-footer-service-icon fa-brands fa-linkedin-in" aria-hidden="true"></i><span><small>Perfil profissional</small><strong>LinkedIn</strong></span><i class="mv-footer-contact-arrow fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
            </a>
            <a href="https://github.com/mateusvalente" target="_blank" rel="noreferrer">
              <i class="mv-footer-service-icon fa-brands fa-github" aria-hidden="true"></i><span><small>Código e projetos</small><strong>GitHub principal</strong></span><i class="mv-footer-contact-arrow fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
            </a>
            <a href="https://github.com/mateusvalente/maratona-de-programacao" target="_blank" rel="noreferrer">
              <i class="mv-footer-service-icon fa-solid fa-code-branch" aria-hidden="true"></i><span><small>Material deste curso</small><strong>Repositório da maratona</strong></span><i class="mv-footer-contact-arrow fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
            </a>
          </nav>
          <p class="mv-footer-legal">Material de autoria do Professor Mestre Mateus de Sousa Valente, dos cursos de TI da Uniube. Todos os direitos reservados &copy; 2026.</p>
        </div>
      </footer>`;
  }

  function removeLegacyShell(root = document) {
    const legacySelector = [
      "header.site-header",
      "footer:not(.mv-site-footer)",
      "nav.module-nav",
      "a.skip-link",
    ].join(",");
    if (root.matches && root.matches(legacySelector)) {
      root.remove();
      return;
    }
    root.querySelectorAll(legacySelector).forEach((element) => element.remove());
  }

  function findContentTarget() {
    const main = document.querySelector("main");
    if (!main) return "";
    if (!main.id) main.id = "conteudo-pagina";
    return `#${main.id}`;
  }

  function initializeStickyNavigation(navigation) {
    const navigationStart = navigation.getBoundingClientRect().top + window.scrollY;
    function updateNavigationState() {
      navigation.classList.toggle("is-stuck", window.scrollY >= navigationStart);
    }
    window.addEventListener("scroll", updateNavigationState, { passive: true });
    updateNavigationState();
  }

  function initializeCourseSidebar(sidebar, context) {
    const mobileQuery = window.matchMedia("(max-width: 820px)");
    const storedCollapsed = window.localStorage.getItem("maratona-sidebar-collapsed");
    let desktopExpanded = storedCollapsed === null ? window.innerWidth > 1180 : storedCollapsed !== "true";

    function syncSidebar(open) {
      const isMobile = mobileQuery.matches;
      const expanded = isMobile ? open : desktopExpanded;
      sidebar.classList.toggle("is-open", isMobile && open);
      sidebar.classList.toggle("is-collapsed", !isMobile && !desktopExpanded);
      document.body.classList.toggle("mv-sidebar-expanded", !isMobile && desktopExpanded);
      document.body.classList.toggle("mv-sidebar-collapsed", !isMobile && !desktopExpanded);
      document.body.classList.toggle("mv-sidebar-mobile-open", isMobile && open);
      document.querySelectorAll("[data-sidebar-open]").forEach((button) => button.setAttribute("aria-expanded", String(expanded)));
      const collapseButton = sidebar.querySelector("[data-sidebar-collapse]");
      if (collapseButton) {
        collapseButton.setAttribute("aria-label", desktopExpanded ? "Recolher menu lateral" : "Expandir menu lateral");
        collapseButton.querySelector("i").className = `fa-solid ${desktopExpanded ? "fa-angles-left" : "fa-angles-right"}`;
      }
    }

    document.querySelectorAll("[data-sidebar-open]").forEach((button) => button.addEventListener("click", () => {
      if (mobileQuery.matches) syncSidebar(true);
      else {
        desktopExpanded = true;
        window.localStorage.setItem("maratona-sidebar-collapsed", "false");
        syncSidebar(false);
      }
    }));
    document.querySelectorAll("[data-sidebar-close]").forEach((button) => button.addEventListener("click", () => syncSidebar(false)));
    sidebar.querySelector("[data-sidebar-collapse]")?.addEventListener("click", () => {
      if (mobileQuery.matches) return syncSidebar(false);
      desktopExpanded = !desktopExpanded;
      window.localStorage.setItem("maratona-sidebar-collapsed", String(!desktopExpanded));
      syncSidebar(false);
    });
    sidebar.querySelector("[data-sidebar-back]")?.addEventListener("click", () => {
      if (window.history.length > 1) window.history.back();
      else window.location.href = context.moduleHref;
    });
    sidebar.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      if (mobileQuery.matches) syncSidebar(false);
    }));
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && document.body.classList.contains("mv-sidebar-mobile-open")) syncSidebar(false);
    });
    mobileQuery.addEventListener("change", () => syncSidebar(false));
    syncSidebar(false);
  }

  function initializeMatrix(matrixCanvas) {
    if (matrixCanvas.dataset.matrixReady === "true") return;
    matrixCanvas.dataset.matrixReady = "true";

    const matrixContext = matrixCanvas.getContext("2d");
    if (!matrixContext) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const matrixGlyphs = "01{}[]<>/=+*-_PYTHONALGORITMO";
    const pointer = { x: -1000, y: -1000, active: false, glow: 0, lastMoveAt: 0 };
    let matrixWidth = 0;
    let matrixHeight = 0;
    let matrixFontSize = 17;
    let matrixDrops = [];
    let matrixSpeeds = [];
    let matrixFrame = 0;
    let lastMatrixFrame = 0;

    function resizeMatrix() {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      matrixWidth = window.innerWidth;
      matrixHeight = window.innerHeight;
      matrixFontSize = matrixWidth < 620 ? 14 : 17;
      matrixCanvas.width = Math.floor(matrixWidth * pixelRatio);
      matrixCanvas.height = Math.floor(matrixHeight * pixelRatio);
      matrixCanvas.style.width = `${matrixWidth}px`;
      matrixCanvas.style.height = `${matrixHeight}px`;
      matrixContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      const columnCount = Math.ceil(matrixWidth / matrixFontSize);
      const visibleRows = Math.ceil(matrixHeight / matrixFontSize);
      matrixDrops = Array.from({ length: columnCount }, () => Math.random() * (visibleRows + 24) - 24);
      matrixSpeeds = Array.from({ length: columnCount }, () => 0.35 + Math.random() * 0.75);
    }

    function randomGlyph() {
      return matrixGlyphs[Math.floor(Math.random() * matrixGlyphs.length)];
    }

    function drawStaticMatrix() {
      matrixContext.clearRect(0, 0, matrixWidth, matrixHeight);
      matrixContext.font = `500 ${matrixFontSize}px "DM Mono", monospace`;
      for (let x = 0; x < matrixWidth; x += matrixFontSize * 2) {
        for (let y = matrixFontSize; y < matrixHeight; y += matrixFontSize * 4) {
          matrixContext.fillStyle = "rgba(97, 227, 165, 0.1)";
          matrixContext.fillText(randomGlyph(), x, y);
        }
      }
    }

    function drawMatrix(timestamp) {
      matrixFrame = window.requestAnimationFrame(drawMatrix);
      if (document.hidden || timestamp - lastMatrixFrame < 38) return;
      lastMatrixFrame = timestamp;
      const glowTarget = pointer.active && timestamp - pointer.lastMoveAt < 60 ? 1 : 0;
      const glowEase = glowTarget > pointer.glow ? 0.64 : 0.48;
      pointer.glow += (glowTarget - pointer.glow) * glowEase;
      if (pointer.glow < 0.012) pointer.glow = 0;

      matrixContext.fillStyle = "rgba(12, 17, 20, 0.14)";
      matrixContext.fillRect(0, 0, matrixWidth, matrixHeight);
      matrixContext.font = `500 ${matrixFontSize}px "DM Mono", monospace`;

      matrixDrops.forEach((drop, column) => {
        const originalX = column * matrixFontSize;
        const originalY = drop * matrixFontSize;
        const pointerRadius = 38;
        const distance = Math.hypot(originalX - pointer.x, originalY - pointer.y);
        const insidePointerField = pointer.glow > 0 && distance < pointerRadius;
        const baseBrightness = 0.14 + matrixSpeeds[column] * 0.17;

        if (insidePointerField) {
          const intensity = 1 - distance / pointerRadius;
          const highlightedBrightness = Math.min(1, baseBrightness + pointer.glow * (0.42 + intensity * 0.42));
          matrixContext.fillStyle = `rgba(116, 255, 187, ${highlightedBrightness})`;
        } else {
          matrixContext.fillStyle = `rgba(97, 227, 165, ${baseBrightness})`;
        }

        matrixContext.fillText(randomGlyph(), originalX, originalY);
        matrixDrops[column] += matrixSpeeds[column];
        if (originalY > matrixHeight + matrixFontSize && Math.random() > 0.965) {
          matrixDrops[column] = -Math.random() * 18;
          matrixSpeeds[column] = 0.35 + Math.random() * 0.75;
        }
      });
    }

    function startMatrix() {
      window.cancelAnimationFrame(matrixFrame);
      resizeMatrix();
      if (reducedMotion.matches) {
        drawStaticMatrix();
        return;
      }
      matrixContext.fillStyle = "#0c1114";
      matrixContext.fillRect(0, 0, matrixWidth, matrixHeight);
      matrixFrame = window.requestAnimationFrame(drawMatrix);
    }

    window.addEventListener("pointermove", (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
      pointer.lastMoveAt = performance.now();
    }, { passive: true });
    window.addEventListener("pointerout", (event) => {
      if (!event.relatedTarget) pointer.active = false;
    });

    let matrixResizeFrame = 0;
    window.addEventListener("resize", () => {
      window.cancelAnimationFrame(matrixResizeFrame);
      matrixResizeFrame = window.requestAnimationFrame(startMatrix);
    }, { passive: true });
    reducedMotion.addEventListener("change", startMatrix);
    startMatrix();
  }

  function mountGlobalShell() {
    const context = siteContext();
    document.body.classList.add("mv-portal-theme");
    removeLegacyShell();

    let matrixCanvas = document.querySelector("#matrix-background");
    if (!matrixCanvas) {
      matrixCanvas = document.createElement("canvas");
      matrixCanvas.id = "matrix-background";
      matrixCanvas.setAttribute("aria-hidden", "true");
      document.body.prepend(matrixCanvas);
    }

    const contentTarget = findContentTarget();
    if (contentTarget && !document.querySelector(".mv-skip-link")) {
      const skipLink = document.createElement("a");
      skipLink.className = "mv-skip-link";
      skipLink.href = contentTarget;
      skipLink.textContent = "Ir para o conteúdo";
      document.body.insertBefore(skipLink, matrixCanvas.nextSibling);
    }

    let contentElement = document.querySelector("main") || document.querySelector("#app") || document.body.firstElementChild;
    while (contentElement && contentElement.parentElement !== document.body) {
      contentElement = contentElement.parentElement;
    }
    const headerHost = document.createElement("div");
    headerHost.innerHTML = headerTemplate(context).trim();
    const globalHeader = headerHost.firstElementChild;
    document.body.insertBefore(globalHeader, contentElement || null);

    const sidebarHost = document.createElement("div");
    sidebarHost.innerHTML = sidebarTemplate(context).trim();
    const sidebarElements = [...sidebarHost.children];
    sidebarElements.forEach((element) => document.body.insertBefore(element, contentElement || null));
    const courseSidebar = document.querySelector(".mv-course-sidebar");

    const footerHost = document.createElement("div");
    footerHost.innerHTML = footerTemplate().trim();
    document.body.appendChild(footerHost.firstElementChild);

    const legacyObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) removeLegacyShell(node);
      }));
    });
    legacyObserver.observe(document.body, { childList: true, subtree: true });

    initializeStickyNavigation(globalHeader);
    initializeCourseSidebar(courseSidebar, context);
    initializeMatrix(matrixCanvas);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountGlobalShell, { once: true });
  } else {
    mountGlobalShell();
  }
}());
