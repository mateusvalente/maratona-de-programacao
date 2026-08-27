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

  function headerTemplate() {
    return `
      <header class="mv-site-header top-navigation" data-global-shell="header">
        <div class="mv-topbar">
          <a class="mv-brand" href="${siteHref("index.html")}" aria-label="Página inicial do Curso de Inverno de Programação">
            <span class="mv-brand-mark" aria-hidden="true">&lt;/&gt;</span>
            <span class="mv-brand-copy"><strong>maratona<span>.dev</span></strong><small>Curso de Inverno · Uniube</small></span>
          </a>
          <nav class="mv-topnav" aria-label="Navegação principal">
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
    headerHost.innerHTML = headerTemplate().trim();
    const globalHeader = headerHost.firstElementChild;
    document.body.insertBefore(globalHeader, contentElement || null);

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
    initializeMatrix(matrixCanvas);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountGlobalShell, { once: true });
  } else {
    mountGlobalShell();
  }
}());
