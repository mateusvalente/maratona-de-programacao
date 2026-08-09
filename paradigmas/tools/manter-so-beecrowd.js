const fs = require("fs");
const path = require("path");
const vm = require("vm");

const base = path.resolve(__dirname, "..");
const dataFile = path.join(base, "assets", "js", "exercicios.js");
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(dataFile, "utf8"), context);

const overrides = {
  "beecrowd-1025": {
    primary: "divisao-conquista",
    paradigms: ["divisao-conquista", "pre-processamento"]
  },
  "beecrowd-1033": {
    primary: "divisao-conquista",
    paradigms: ["divisao-conquista", "recursao"]
  },
  "beecrowd-1055": {
    primary: "guloso",
    paradigms: ["guloso"]
  },
  "beecrowd-1088": {
    primary: "pre-processamento",
    paradigms: ["pre-processamento"]
  },
  "beecrowd-1153": {
    primary: "iteracao",
    paradigms: ["iteracao", "recursao"]
  },
  "beecrowd-1161": {
    primary: "iteracao",
    paradigms: ["iteracao", "recursao"]
  },
  "beecrowd-1166": {
    primary: "guloso",
    paradigms: ["guloso"]
  }
};

const allExercises = context.window.PARADIGM_EXERCISES;
const removed = allExercises.filter((exercise) => exercise.platform !== "beecrowd");
const exercises = allExercises
  .filter((exercise) => exercise.platform === "beecrowd")
  .map((exercise) => ({ ...exercise, ...(overrides[exercise.key] || {}) }));

const labels = {
  ...context.window.PARADIGM_LABELS,
  iteracao: "Iteração direta"
};

const source = `window.PARADIGM_LABELS = ${JSON.stringify(labels, null, 2)};\n\nwindow.PARADIGM_EXERCISES = ${JSON.stringify(exercises, null, 2)};\n`;
fs.writeFileSync(dataFile, source, "utf8");

const questionsDirectory = path.join(base, "questoes");
removed.forEach((exercise) => {
  const file = path.resolve(questionsDirectory, `${exercise.key}.py`);
  if (path.dirname(file) !== questionsDirectory) throw new Error(`Caminho inesperado: ${file}`);
  if (fs.existsSync(file)) fs.unlinkSync(file);
});

console.log(`Problemas beecrowd mantidos: ${exercises.length}`);
console.log(`Problemas de outras plataformas removidos: ${removed.length}`);
