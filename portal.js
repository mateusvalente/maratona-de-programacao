const playlistItems = document.querySelectorAll(".playlist-item");
const playlistVideo = document.querySelector("#playlist-video");
const playlistLabel = document.querySelector("#playlist-label");
const playlistTitle = document.querySelector("#playlist-title");
const playlistDriveLink = document.querySelector("#playlist-drive-link");
const guideDownloadButton = document.querySelector("#open-guide-download");
const guideDownloadDialog = document.querySelector("#guide-download-dialog");

if (guideDownloadButton && guideDownloadDialog) {
  guideDownloadButton.addEventListener("click", () => {
    if (typeof guideDownloadDialog.showModal === "function") {
      guideDownloadDialog.showModal();
      return;
    }

    guideDownloadDialog.setAttribute("open", "");
  });

  guideDownloadDialog.addEventListener("click", (event) => {
    if (event.target === guideDownloadDialog) guideDownloadDialog.close();
  });

  guideDownloadDialog.querySelectorAll(".download-option").forEach((option) => {
    option.addEventListener("click", () => guideDownloadDialog.close());
  });

}

playlistItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.classList.contains("is-active")) return;

    playlistItems.forEach((playlistItem) => {
      playlistItem.classList.remove("is-active");
      playlistItem.setAttribute("aria-pressed", "false");
    });

    item.classList.add("is-active");
    item.setAttribute("aria-pressed", "true");

    const { label, title, src, href } = item.dataset;
    playlistVideo.src = src;
    playlistVideo.title = `Videoaula: ${title}`;
    playlistLabel.textContent = label;
    playlistTitle.textContent = title;
    playlistDriveLink.href = href;
  });
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const matrixCanvas = document.querySelector("#matrix-background");

if (matrixCanvas) {
  const matrixContext = matrixCanvas.getContext("2d");
  const matrixGlyphs = "01{}[]<>/=+*-_PYTHONALGORITMO";
  const pointer = {
    x: -1000,
    y: -1000,
    active: false,
    glow: 0,
    lastMoveAt: 0,
  };
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

    const glowHoldTime = 70;
    const glowTarget = pointer.active && timestamp - pointer.lastMoveAt < glowHoldTime ? 1 : 0;
    const glowEase = glowTarget > pointer.glow ? 0.58 : 0.32;
    pointer.glow += (glowTarget - pointer.glow) * glowEase;
    if (pointer.glow < 0.01) pointer.glow = 0;

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
        const highlightedBrightness = Math.min(
          1,
          baseBrightness + pointer.glow * (0.42 + intensity * 0.42),
        );
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

const typingCode = document.querySelector("#typing-code");
const terminalResult = document.querySelector("#terminal-result");
const terminalStatus = document.querySelector("#terminal-status");

if (typingCode && terminalResult && terminalStatus) {
  const sampleCode = [
    "def aprender_programacao() -> list:",
    "    \"\"\"Transforma desafios em aprendizado.\"\"\"",
    "    etapas = [",
    "        \"entender o problema\",",
    "        \"planejar o algoritmo\",",
    "        \"escrever o codigo\",",
    "        \"testar e evoluir\",",
    "    ]",
    "    return etapas",
    "",
    "for etapa in aprender_programacao():",
    "    print(f\"> {etapa}\")",
  ].join("\n");
  let typingTimer = 0;

  function escapeTerminalToken(token) {
    return token
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  function highlightPython(source) {
    const tokenPattern = /(\"\"\"[\s\S]*?(?:\"\"\"|$)|f?\"(?:\\.|[^\"\\])*(?:\"|$)|#[^\n]*|\b(?:def|return|for|in)\b|\b(?:list|str|int|float|bool)\b|\b(?:True|False|None)\b|->|\b[A-Za-z_]\w*(?=\s*\()|[()[\]{},:])/g;
    let highlightedCode = "";
    let lastTokenEnd = 0;

    for (const match of source.matchAll(tokenPattern)) {
      const token = match[0];
      highlightedCode += escapeTerminalToken(source.slice(lastTokenEnd, match.index));

      let tokenClass = "py-punctuation";
      if (token.startsWith('"""')) tokenClass = "py-docstring";
      else if (token.startsWith('"') || token.startsWith('f"')) tokenClass = "py-string";
      else if (token.startsWith("#")) tokenClass = "py-comment";
      else if (["def", "return", "for", "in"].includes(token)) tokenClass = "py-keyword";
      else if (["list", "str", "int", "float", "bool"].includes(token)) tokenClass = "py-type";
      else if (["True", "False", "None"].includes(token)) tokenClass = "py-keyword";
      else if (token === "->") tokenClass = "py-operator";
      else if (/^[A-Za-z_]\w*$/.test(token)) tokenClass = "py-function";

      highlightedCode += `<span class="${tokenClass}">${escapeTerminalToken(token)}</span>`;
      lastTokenEnd = match.index + token.length;
    }

    return highlightedCode + escapeTerminalToken(source.slice(lastTokenEnd));
  }

  function showAcceptedResult() {
    terminalResult.classList.add("is-visible");
    terminalStatus.textContent = "status: accepted";
  }

  function startTerminalTyping() {
    window.clearTimeout(typingTimer);
    terminalResult.classList.remove("is-visible");
    terminalStatus.textContent = "status: digitando...";

    if (reducedMotion.matches) {
      typingCode.innerHTML = highlightPython(sampleCode);
      showAcceptedResult();
      return;
    }

    let characterIndex = 0;
    typingCode.innerHTML = "";

    function typeNextCharacter() {
      typingCode.innerHTML = highlightPython(sampleCode.slice(0, characterIndex + 1));
      const currentCharacter = sampleCode[characterIndex];
      characterIndex += 1;

      if (characterIndex < sampleCode.length) {
        const delay = currentCharacter === "\n" ? 105 : 22 + Math.random() * 34;
        typingTimer = window.setTimeout(typeNextCharacter, delay);
        return;
      }

      typingTimer = window.setTimeout(() => {
        showAcceptedResult();
        typingTimer = window.setTimeout(startTerminalTyping, 4200);
      }, 520);
    }

    typeNextCharacter();
  }

  reducedMotion.addEventListener("change", startTerminalTyping);
  startTerminalTyping();
}
