const { spawn } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const base = path.resolve(__dirname, "..");
const outputDirectory = path.join(base, "artifacts");
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "paradigmas-chrome-"));
const port = 9237;

const pages = [
  ["index-mobile-real.png", "index.html"],
  ["aula-dp-mobile-real.png", "aulas/07-programacao-dinamica/index.html"],
  ["exercicios-mobile-real.png", "exercicios/index.html"],
  ["resolucoes-mobile-real.png", "resolucoes/index.html"],
  ["resolucao-1084-mobile-real.png", "resolucoes/beecrowd-1084/index.html"]
];

const chrome = spawn(chromePath, [
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`,
  "--no-first-run",
  "about:blank"
], { stdio: "ignore" });

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function waitForDebugger() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (response.ok) return;
    } catch (_error) {
      // O navegador ainda está iniciando.
    }
    await delay(100);
  }
  throw new Error("Chrome DevTools não ficou disponível.");
}

async function openTarget(url) {
  const response = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(url)}`, { method: "PUT" });
  return response.json();
}

async function capture(name, relativePage) {
  const url = `file:///${path.join(base, relativePage).replaceAll("\\", "/").replaceAll(" ", "%20")}`;
  const target = await openTarget(url);
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  const pending = new Map();
  let sequence = 0;

  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (!message.id || !pending.has(message.id)) return;
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message)); else resolve(message.result);
  });

  function send(method, params = {}) {
    sequence += 1;
    socket.send(JSON.stringify({ id: sequence, method, params }));
    return new Promise((resolve, reject) => pending.set(sequence, { resolve, reject }));
  }

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
    screenWidth: 390,
    screenHeight: 844
  });
  await send("Page.navigate", { url });
  await delay(700);

  const metrics = await send("Runtime.evaluate", {
    expression: "JSON.stringify({innerWidth, clientWidth: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth})",
    returnByValue: true
  });
  const screenshot = await send("Page.captureScreenshot", { format: "png", fromSurface: true });
  fs.writeFileSync(path.join(outputDirectory, name), screenshot.data, "base64");
  console.log(`${name}: ${metrics.result.value}`);
  socket.close();
  await fetch(`http://127.0.0.1:${port}/json/close/${target.id}`);
}

(async () => {
  try {
    fs.mkdirSync(outputDirectory, { recursive: true });
    await waitForDebugger();
    for (const [name, page] of pages) await capture(name, page);
  } finally {
    chrome.kill();
    await delay(100);
    fs.rmSync(profile, { recursive: true, force: true });
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
