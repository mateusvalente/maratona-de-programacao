const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const problems = require(path.join(root, "assets", "js", "problemas.js"));
const lessons = require(path.join(root, "assets", "js", "dados.js"));
const lists = require(path.join(root, "assets", "js", "listas.js"));
const failures = [];

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function normalize(text) {
  return text.replace(/\r\n/g, "\n").trimEnd();
}

const allFiles = walk(root);
const htmlFiles = allFiles.filter((file) => file.endsWith(".html"));
const markdownFiles = allFiles.filter((file) => file.endsWith(".md"));

if (lessons.length !== 20) failures.push(`Esperadas 20 aulas; encontradas ${lessons.length}.`);
if (lists.length !== 6) failures.push(`Esperadas 6 listas; encontradas ${lists.length}.`);
if (problems.length !== 47) failures.push(`Esperados 47 problemas; encontrados ${problems.length}.`);
if (markdownFiles.length) failures.push(`Arquivos Markdown encontrados: ${markdownFiles.join(", ")}`);

for (const file of htmlFiles) {
  const source = fs.readFileSync(file, "utf8");
  const references = [...source.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
  for (const reference of references) {
    if (/^(?:https?:|mailto:|#|data:)/.test(reference)) continue;
    const localPart = decodeURIComponent(reference.split("#")[0].split("?")[0]);
    const target = path.resolve(path.dirname(file), localPart);
    if (!fs.existsSync(target)) {
      failures.push(`Link local ausente em ${path.relative(root, file)}: ${reference}`);
    }
  }
}

if (process.env.RUN_PYTHON_FROM_NODE === "1") {
const tests = {
  1000: ["", "Hello World!"],
  1001: ["10\n9\n", "X = 19"],
  1002: ["2.00\n", "A=12.5664"],
  1003: ["30\n10\n", "SOMA = 40"],
  1004: ["3\n9\n", "PROD = 27"],
  1005: ["5.0\n7.1\n", "MEDIA = 6.43182"],
  1006: ["5.0\n6.0\n7.0\n", "MEDIA = 6.3"],
  1007: ["5\n6\n7\n8\n", "DIFERENCA = -26"],
  1008: ["25\n100\n5.50\n", "NUMBER = 25\nSALARY = U$ 550.00"],
  1009: ["JOAO\n500.00\n1230.30\n", "TOTAL = R$ 684.54"],
  1014: ["500\n35.0\n", "14.286 km/l"],
  1016: ["30\n", "60 minutos"],
  1035: ["2 3 2 6\n", "Valores aceitos"],
  1036: ["10.0 20.1 5.1\n", "R1 = -0.29788\nR2 = -1.71212"],
  1037: ["25.01\n", "Intervalo (25,50]"],
  1038: ["3 2\n", "Total: R$ 10.00"],
  1040: ["2.0 4.0 7.5 8.0\n6.4\n", "Media: 5.4\nAluno em exame.\nNota do exame: 6.4\nAluno aprovado.\nMedia final: 5.9"],
  1041: ["4.5 -2.2\n", "Q4"],
  1042: ["7 21 -14\n", "-14\n7\n21\n\n7\n21\n-14"],
  1043: ["6.0 4.0 2.0\n", "Area = 10.0"],
  1044: ["6 24\n", "Sao Multiplos"],
  1046: ["16 2\n", "O JOGO DUROU 10 HORA(S)"],
  1059: ["", Array.from({ length: 50 }, (_, i) => (i + 1) * 2).join("\n")],
  1060: ["7\n-5\n6\n-3.4\n4.6\n12\n", "4 valores positivos"],
  1064: ["7\n-5\n6\n-3.4\n4.6\n12\n", "4 valores positivos\n7.4"],
  1065: ["7\n-5\n6\n-4\n12\n", "3 valores pares"],
  1066: ["-5\n0\n-3\n-4\n12\n", "3 valor(es) par(es)\n2 valor(es) impar(es)\n1 valor(es) positivo(s)\n3 valor(es) negativo(s)"],
  1070: ["8\n", "9\n11\n13\n15\n17\n19"],
  1071: ["6\n-5\n", "5"],
  1072: ["4\n14\n123\n10\n-25\n", "2 in\n2 out"],
  1073: ["6\n", "2^2 = 4\n4^2 = 16\n6^2 = 36"],
  1078: ["2\n", Array.from({ length: 10 }, (_, i) => `${i + 1} x 2 = ${(i + 1) * 2}`).join("\n")],
  1080: [Array.from({ length: 100 }, (_, i) => i === 73 ? 9999 : i).join("\n") + "\n", "9999\n74"],
  1172: ["0\n-5\n63\n0\n1\n2\n3\n4\n5\n6\n", "X[0] = 1\nX[1] = 1\nX[2] = 63\nX[3] = 1\nX[4] = 1\nX[5] = 2\nX[6] = 3\nX[7] = 4\nX[8] = 5\nX[9] = 6"],
  1173: ["1\n", Array.from({ length: 10 }, (_, i) => `N[${i}] = ${2 ** i}`).join("\n")],
  1174: [Array.from({ length: 100 }, (_, i) => i < 3 ? i * 5 : 11).join("\n") + "\n", "A[0] = 0.0\nA[1] = 5.0\nA[2] = 10.0"],
  1175: [Array.from({ length: 20 }, (_, i) => i).join("\n") + "\n", Array.from({ length: 20 }, (_, i) => `N[${i}] = ${19 - i}`).join("\n")],
  1176: ["3\n0\n4\n2\n", "Fib(0) = 0\nFib(4) = 3\nFib(2) = 1"],
  1177: ["3\n", (output) => output.startsWith("N[0] = 0\nN[1] = 1\nN[2] = 2\nN[3] = 0") && output.endsWith("N[999] = 0")],
  1178: ["200\n", (output) => output.startsWith("N[0] = 200.0000\nN[1] = 100.0000\nN[2] = 50.0000") && output.split("\n").length === 100],
  1179: [Array.from({ length: 15 }, (_, i) => i + 1).join("\n") + "\n", (output) => output.includes("impar[0] = 1") && output.includes("par[4] = 10") && output.includes("impar[2] = 15") && output.endsWith("par[1] = 14")],
  1180: ["10\n1 2 3 4 -5 6 7 8 9 10\n", "Menor valor: -5\nPosicao: 4"],
  1120: ["5 5000000\n3 123456\n0 0\n", "0\n12456"],
  1168: ["3\n115380\n2819311\n23456\n", "27 leds\n29 leds\n25 leds"],
  1234: ["This is a dancing sentence\n", "ThIs Is A dAnCiNg SeNtEnCe"],
  1235: ["2\nI ENIL SIHTHSIREBBIG S\nLEVELKAYAK\n", "THIS LINE IS GIBBERISH\nLEVELKAYAK"],
  1238: ["2\naA bB\nabcdef 123\n", "abAB\na1b2c3def"]
};

for (const problem of problems) {
  const test = tests[problem.id];
  if (!test) {
    failures.push(`Problema ${problem.id} sem teste automatizado.`);
    continue;
  }
  const file = path.join(root, "problemas", "beecrowd", String(problem.id), "solucao.py");
  const result = spawnSync("python", [file], { input: test[0], encoding: "utf8", timeout: 5000 });
  if (result.error || result.status !== 0) {
    failures.push(`Problema ${problem.id} falhou ao executar: ${result.error?.message || result.stderr}`);
    continue;
  }
  const output = normalize(result.stdout);
  const accepted = typeof test[1] === "function" ? test[1](output) : output === normalize(test[1]);
  if (!accepted) failures.push(`Problema ${problem.id}: saída inesperada. Recebido: ${JSON.stringify(output)}`);
}
}

if (failures.length) {
  console.error(`VALIDAÇÃO FALHOU (${failures.length})`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Estrutura validada: ${htmlFiles.length} HTML, ${lessons.length} aulas, ${lists.length} listas, ${problems.length} páginas de problemas e links locais íntegros.`);
