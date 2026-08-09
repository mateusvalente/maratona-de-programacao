const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const outputDirectory = path.join(root, "exercicios");
const problems = require(path.join(root, "assets", "js", "problemas.js"));

fs.mkdirSync(outputDirectory, { recursive: true });

let created = 0;
let preserved = 0;

for (const problem of problems) {
  const filePath = path.join(outputDirectory, `${problem.id}.py`);

  if (fs.existsSync(filePath)) {
    preserved += 1;
    continue;
  }

  const content = [
    `# beecrowd ${problem.id} - ${problem.title}`,
    `# Problema: https://judge.beecrowd.com/pt/problems/view/${problem.id}`,
    `# Assunto: ${problem.topic}`,
    "#",
    "# Cole sua solucao abaixo desta linha.",
    "",
  ].join("\n");

  fs.writeFileSync(filePath, content, "utf8");
  created += 1;
}

console.log(`Arquivos criados: ${created}. Arquivos existentes preservados: ${preserved}.`);
