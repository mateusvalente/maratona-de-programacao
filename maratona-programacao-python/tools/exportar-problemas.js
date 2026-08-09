const path = require("path");

const root = path.resolve(__dirname, "..");
const problems = require(path.join(root, "assets", "js", "problemas.js"));
process.stdout.write(JSON.stringify(problems));
