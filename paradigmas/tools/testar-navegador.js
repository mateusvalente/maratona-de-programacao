const { spawn } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const base = path.resolve(__dirname, "..");
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "paradigmas-test-"));
const port = 9238;
const lessonSlugs = [
  "01-introducao-paradigmas", "02-forca-bruta", "03-recursao", "04-backtracking",
  "05-divisao-conquista", "06-guloso", "07-programacao-dinamica", "08-memoizacao",
  "09-branch-and-bound", "10-comparando-paradigmas"
];

const chrome = spawn(chromePath, [
  "--headless=new", "--disable-gpu", `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`, "--no-first-run", "about:blank"
], { stdio: "ignore" });

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function waitForDebugger() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (response.ok) return;
    } catch (_error) {
      // Aguarda a inicialização.
    }
    await delay(100);
  }
  throw new Error("Chrome DevTools não ficou disponível.");
}

async function createSession(url) {
  const response = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(url)}`, { method: "PUT" });
  const target = await response.json();
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
    const operation = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) operation.reject(new Error(message.error.message)); else operation.resolve(message.result);
  });
  function send(method, params = {}) {
    sequence += 1;
    socket.send(JSON.stringify({ id: sequence, method, params }));
    return new Promise((resolve, reject) => pending.set(sequence, { resolve, reject }));
  }
  return { target, socket, send };
}

function fileUrl(relativePage) {
  return `file:///${path.join(base, relativePage).replaceAll("\\", "/").replaceAll(" ", "%20")}`;
}

async function inspect(relativePage, label) {
  const url = fileUrl(relativePage);
  const session = await createSession(url);
  await session.send("Page.enable");
  await session.send("Runtime.enable");
  await session.send("Page.addScriptToEvaluateOnNewDocument", {
    source: "window.__courseErrors=[];addEventListener('error',e=>__courseErrors.push(e.message));addEventListener('unhandledrejection',e=>__courseErrors.push(String(e.reason)));"
  });
  await session.send("Emulation.setDeviceMetricsOverride", {
    width: 390, height: 844, deviceScaleFactor: 1, mobile: true, screenWidth: 390, screenHeight: 844
  });
  await session.send("Page.navigate", { url });
  await delay(450);
  const result = await session.send("Runtime.evaluate", {
    expression: `(() => {
      const lab = document.querySelector('#lesson-lab .lab');
      const button = document.querySelector('#lesson-lab button:not(:disabled)');
      const range = document.querySelector('#lesson-lab input[type=range]');
      if (button) button.click();
      if (range) { range.value = range.max; range.dispatchEvent(new Event('input', { bubbles: true })); }
      return JSON.stringify({
        title: document.title,
        lab: Boolean(lab),
        loading: document.body.textContent.includes('Carregando aula'),
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        errors: window.__courseErrors
      });
    })()`,
    returnByValue: true
  });
  const data = JSON.parse(result.result.value);
  const failures = [];
  if (!data.lab) failures.push("laboratório ausente");
  if (data.loading) failures.push("página permaneceu carregando");
  if (data.scrollWidth !== data.clientWidth) failures.push(`overflow ${data.scrollWidth}/${data.clientWidth}`);
  if (data.errors.length) failures.push(`erros: ${data.errors.join("; ")}`);
  console.log(`${label}: ${failures.length ? `FALHOU — ${failures.join(", ")}` : "OK"}`);
  session.socket.close();
  await fetch(`http://127.0.0.1:${port}/json/close/${session.target.id}`);
  return failures;
}

(async () => {
  const failures = [];
  try {
    await waitForDebugger();
    for (const slug of lessonSlugs) {
      const result = await inspect(`aulas/${slug}/index.html`, slug);
      failures.push(...result.map((failure) => `${slug}: ${failure}`));
    }
  } finally {
    chrome.kill();
    await delay(100);
    fs.rmSync(profile, { recursive: true, force: true });
  }
  if (failures.length) throw new Error(failures.join("\n"));
})().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
