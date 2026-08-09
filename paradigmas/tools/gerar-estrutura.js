const fs = require("fs");
const path = require("path");
const vm = require("vm");

const base = path.resolve(__dirname, "..");
const lessons = [
  [1, "01-introducao-paradigmas", "O que é um paradigma algorítmico?"],
  [2, "02-forca-bruta", "Busca exaustiva e força bruta"],
  [3, "03-recursao", "Recursão"],
  [4, "04-backtracking", "Backtracking"],
  [5, "05-divisao-conquista", "Divisão e conquista"],
  [6, "06-guloso", "Algoritmos gulosos"],
  [7, "07-programacao-dinamica", "Programação dinâmica"],
  [8, "08-memoizacao", "Memoização"],
  [9, "09-branch-and-bound", "Introdução a Branch and Bound"],
  [10, "10-comparando-paradigmas", "Comparando os paradigmas"]
];
const paradigms = [
  "forca-bruta", "recursao", "backtracking", "divisao-conquista",
  "guloso", "programacao-dinamica", "memoizacao", "branch-and-bound",
  "pre-processamento", "iteracao"
];

function ensure(directory) {
  fs.mkdirSync(directory, { recursive: true });
}

function write(file, content) {
  ensure(path.dirname(file));
  fs.writeFileSync(file, content, "utf8");
}

lessons.forEach(([number, slug, title]) => {
  write(path.join(base, "aulas", slug, "index.html"), `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Aula ${String(number).padStart(2, "0")} — ${title} — Paradigmas Algorítmicos com Python 3">
  <title>Aula ${String(number).padStart(2, "0")} — ${title} | Paradigmas</title>
  <link rel="stylesheet" href="../../assets/css/curso.css">
</head>
<body data-root="../../" data-lesson="${number}">
  <main id="app"><p>Carregando aula...</p></main>
  <script src="../../assets/js/conteudo.js"></script>
  <script src="../../assets/js/comum.js"></script>
  <script src="../../assets/js/interativos.js"></script>
  <script src="../../assets/js/aula.js"></script>
</body>
</html>
`);
});

paradigms.forEach((paradigm) => {
  write(path.join(base, "exercicios", paradigm, "index.html"), `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Exercícios recomendados de ${paradigm} sem soluções antecipadas.">
  <title>Exercícios de ${paradigm} | Paradigmas</title>
  <link rel="stylesheet" href="../../assets/css/curso.css">
</head>
<body data-root="../../" data-paradigm="${paradigm}">
  <main id="app"><p>Carregando catálogo...</p></main>
  <script src="../../assets/js/conteudo.js"></script>
  <script src="../../assets/js/exercicios.js"></script>
  <script src="../../assets/js/status-respostas.js"></script>
  <script src="../../assets/js/resolucoes.js"></script>
  <script src="../../assets/js/comum.js"></script>
  <script src="../../assets/js/catalogo.js"></script>
</body>
</html>
`);
});

const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(base, "assets", "js", "exercicios.js"), "utf8"), context);
const exercises = context.window.PARADIGM_EXERCISES;

vm.runInContext(fs.readFileSync(path.join(base, "assets", "js", "resolucoes.js"), "utf8"), context);
const solutions = context.window.PARADIGM_SOLUTIONS;

solutions.forEach((solution) => {
  write(path.join(base, "resolucoes", solution.key, "index.html"), `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Resolução explicada do beecrowd ${solution.id} — ${solution.title}.">
  <title>${solution.id} — ${solution.title} | Resolução explicada</title>
  <link rel="stylesheet" href="../../assets/css/curso.css">
</head>
<body data-root="../../" data-solution="${solution.key}">
  <main id="app"><p>Carregando resolução...</p></main>
  <script src="../../assets/js/conteudo.js"></script>
  <script src="../../assets/js/resolucoes.js"></script>
  <script src="../../assets/js/comum.js"></script>
  <script src="../../assets/js/resolucao.js"></script>
</body>
</html>
`);
});

ensure(path.join(base, "questoes"));
ensure(path.join(base, "respostas"));
exercises.forEach((exercise) => {
  const file = path.join(base, "questoes", `${exercise.key}.py`);
  if (fs.existsSync(file)) return;
  write(file, `# ${exercise.platform} ${exercise.id} - ${exercise.title}
# Enunciado: ${exercise.url}
# Status: tentativa ainda não validada

# Escreva ou cole sua solução abaixo desta linha.

`);
});

const validKeys = new Set(exercises.map((exercise) => exercise.key));
const exercisesById = new Map();
exercises.forEach((exercise) => {
  const matches = exercisesById.get(exercise.id) || [];
  matches.push(exercise.key);
  exercisesById.set(exercise.id, matches);
});
const validated = fs.readdirSync(path.join(base, "respostas"), { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".py") && fs.statSync(path.join(base, "respostas", entry.name)).size > 0)
  .map((entry) => path.basename(entry.name, path.extname(entry.name)))
  .map((name) => {
    if (validKeys.has(name)) return name;
    const matches = exercisesById.get(name) || [];
    return matches.length === 1 ? matches[0] : null;
  })
  .filter(Boolean)
  .sort();
write(
  path.join(base, "assets", "js", "status-respostas.js"),
  `// Gerado a partir dos arquivos presentes em respostas/.\nwindow.VALIDATED_ANSWERS = ${JSON.stringify(validated, null, 2)};\n`
);

console.log(`Aulas: ${lessons.length}`);
console.log(`Páginas por paradigma: ${paradigms.length}`);
console.log(`Arquivos de tentativa: ${exercises.length}`);
console.log(`Aulas de resolução: ${solutions.length}`);
console.log(`Respostas validadas detectadas: ${validated.length}`);
