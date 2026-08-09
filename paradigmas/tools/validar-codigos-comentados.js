const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const base = path.resolve(__dirname, "..");
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(base, "assets", "js", "resolucoes.js"), "utf8"), context);

const payload = context.window.PARADIGM_SOLUTIONS.map((solution) => ({
  id: solution.id,
  original: fs.readFileSync(path.join(base, "respostas", `${solution.id}.py`), "utf8"),
  commented: solution.commentedCode.join("\n")
}));

const python = [
  "import ast, json, sys",
  "items = json.load(sys.stdin)",
  "failed = []",
  "for item in items:",
  "    try:",
  "        original = ast.dump(ast.parse(item['original']), include_attributes=False)",
  "        commented = ast.dump(ast.parse(item['commented']), include_attributes=False)",
  "        if original != commented:",
  "            failed.append(item['id'] + ': árvore sintática diferente')",
  "    except SyntaxError as error:",
  "        failed.append(item['id'] + ': ' + str(error))",
  "print('\\n'.join(failed))",
  "sys.exit(1 if failed else 0)"
].join("\n");

const encodedPython = Buffer.from(python, "utf8").toString("base64");
const command = `$code = [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String('${encodedPython}')); python -c $code`;
const result = spawnSync("powershell.exe", ["-NoProfile", "-Command", command], {
  input: JSON.stringify(payload),
  encoding: "utf8"
});

if (result.status !== 0) {
  process.stderr.write(result.stdout || result.stderr || String(result.error));
  process.exit(result.status || 1);
}

console.log(`${payload.length} códigos comentados preservam a árvore sintática dos originais.`);
