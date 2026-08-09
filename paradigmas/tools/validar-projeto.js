const fs = require("fs");
const path = require("path");

const base = path.resolve(__dirname, "..");
const errors = [];
const stats = { html: 0, js: 0, css: 0, py: 0 };

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const files = walk(base);
files.forEach((file) => {
  const extension = path.extname(file).slice(1).toLowerCase();
  if (Object.hasOwn(stats, extension)) stats[extension] += 1;
  if (extension !== "html") return;
  const html = fs.readFileSync(file, "utf8");
  const references = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
  references.forEach((reference) => {
    if (/^(?:https?:|#|mailto:|javascript:)/.test(reference)) return;
    const target = reference.split("#")[0].split("?")[0];
    if (!target) return;
    const resolved = path.resolve(path.dirname(file), decodeURIComponent(target));
    if (!fs.existsSync(resolved)) errors.push(`Link ausente: ${path.relative(base, file)} -> ${reference}`);
  });
  if (!html.includes('lang="pt-BR"')) errors.push(`Idioma ausente: ${path.relative(base, file)}`);
  if (!html.includes('meta name="viewport"')) errors.push(`Viewport ausente: ${path.relative(base, file)}`);
});

const answerFiles = walk(path.join(base, "respostas"));
const answerPythonFiles = answerFiles.filter((file) => path.extname(file).toLowerCase() === ".py");

const lessonPages = fs.readdirSync(path.join(base, "aulas"), { withFileTypes: true }).filter((entry) => entry.isDirectory());
if (lessonPages.length !== 10) errors.push(`Esperadas 10 aulas; encontradas ${lessonPages.length}.`);

const exerciseSource = fs.readFileSync(path.join(base, "assets", "js", "exercicios.js"), "utf8");
const keys = [...exerciseSource.matchAll(/"?key"?\s*:\s*"([^"]+)"/g)].map((match) => match[1]);
keys.forEach((key) => {
  const file = path.join(base, "questoes", `${key}.py`);
  if (!fs.existsSync(file)) errors.push(`Arquivo de tentativa ausente: questoes/${key}.py`);
});

const solutionSource = fs.readFileSync(path.join(base, "assets", "js", "resolucoes.js"), "utf8");
const solutionKeys = [...solutionSource.matchAll(/"?key"?\s*:\s*"([^"]+)"/g)].map((match) => match[1]);
solutionKeys.forEach((key) => {
  const page = path.join(base, "resolucoes", key, "index.html");
  if (!fs.existsSync(page)) errors.push(`Aula de resolução ausente: resolucoes/${key}/index.html`);
});

const externalExercises = [...exerciseSource.matchAll(/"?platform"?\s*:\s*"([^"]+)"/g)]
  .map((match) => match[1])
  .filter((platform) => platform !== "beecrowd");
if (externalExercises.length) errors.push(`Plataformas não beecrowd encontradas: ${[...new Set(externalExercises)].join(", ")}`);

console.log(`HTML: ${stats.html}`);
console.log(`JavaScript: ${stats.js}`);
console.log(`CSS: ${stats.css}`);
console.log(`Arquivos .py de tentativa: ${stats.py}`);
console.log(`Aulas: ${lessonPages.length}`);
console.log(`Exercícios catalogados: ${keys.length}`);
console.log(`Aulas de resolução: ${solutionKeys.length}`);
console.log(`Respostas .py detectadas: ${answerPythonFiles.length}`);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("Estrutura e links locais validados.");
