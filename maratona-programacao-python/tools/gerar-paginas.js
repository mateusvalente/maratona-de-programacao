const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const lessons = require(path.join(root, "assets", "js", "dados.js"));
const problems = require(path.join(root, "assets", "js", "problemas.js"));
const lists = require(path.join(root, "assets", "js", "listas.js"));

function htmlDocument(title, bodyAttributes, styles, scripts) {
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${title} — Maratona de Programação com Python 3">
  <title>${title} | Maratona com Python</title>
${styles.map((href) => `  <link rel="stylesheet" href="${href}">`).join("\n")}
</head>
<body ${bodyAttributes}>
  <main id="app"><p>Carregando aula...</p></main>
${scripts.map((src) => `  <script src="${src}"></script>`).join("\n")}
</body>
</html>
`;
}

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
}

for (const lesson of lessons) {
  const directory = path.join(root, "aulas", lesson.slug);
  const html = htmlDocument(
    `Aula ${String(lesson.id).padStart(2, "0")} — ${lesson.title}`,
    `data-root="../../" data-lesson="${lesson.id}"`,
    ["../../assets/css/curso.css"],
    ["../../assets/js/dados.js", "../../assets/js/comum.js", "../../assets/js/aula.js"]
  );
  write(path.join(directory, "index.html"), html);
}

for (const list of lists) {
  const directory = path.join(root, "listas", list.slug);
  const html = htmlDocument(
    `Lista ${String(list.id).padStart(2, "0")} — ${list.title}`,
    `data-root="../../" data-list="${list.id}"`,
    ["../../assets/css/curso.css"],
    ["../../assets/js/dados.js", "../../assets/js/problemas.js", "../../assets/js/listas.js", "../../assets/js/comum.js", "../../assets/js/lista.js"]
  );
  write(path.join(directory, "index.html"), html);
}

for (const problem of problems) {
  const directory = path.join(root, "problemas", "beecrowd", String(problem.id));
  const html = htmlDocument(
    `beecrowd ${problem.id} — ${problem.title}`,
    `data-root="../../../" data-problem="${problem.id}"`,
    ["../../../assets/css/curso.css"],
    ["../../../assets/js/dados.js", "../../../assets/js/problemas.js", "../../../assets/js/comum.js", "../../../assets/js/problema.js"]
  );
  write(path.join(directory, "index.html"), html);
  write(path.join(directory, "solucao.py"), `${problem.code.trim()}\n`);
}

console.log(`Geradas ${lessons.length} aulas, ${lists.length} listas e ${problems.length} problemas.`);
