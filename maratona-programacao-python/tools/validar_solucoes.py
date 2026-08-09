import builtins
import io
import json
import sys
from contextlib import redirect_stdout


def execute(code, raw_input):
    lines = iter(raw_input.splitlines())
    original_input = builtins.input

    def fake_input(prompt=None):
        try:
            return next(lines)
        except StopIteration as error:
            raise EOFError from error

    output = io.StringIO()
    builtins.input = fake_input
    try:
        with redirect_stdout(output):
            exec(compile(code, "solucao.py", "exec"), {"__name__": "__main__"})
    finally:
        builtins.input = original_input
    return output.getvalue().replace("\r\n", "\n").rstrip()


def exact(expected):
    return lambda output: output == expected.replace("\r\n", "\n").rstrip()


special = {
    1059: ("", exact("\n".join(str(value) for value in range(2, 101, 2)))),
    1078: ("2\n", exact("\n".join(f"{i} x 2 = {i * 2}" for i in range(1, 11)))),
    1080: (
        "\n".join(str(9999 if i == 73 else i) for i in range(100)) + "\n",
        exact("9999\n74"),
    ),
    1172: (
        "0\n-5\n63\n0\n1\n2\n3\n4\n5\n6\n",
        exact("X[0] = 1\nX[1] = 1\nX[2] = 63\nX[3] = 1\nX[4] = 1\nX[5] = 2\nX[6] = 3\nX[7] = 4\nX[8] = 5\nX[9] = 6"),
    ),
    1173: (
        "1\n",
        exact("\n".join(f"N[{i}] = {2 ** i}" for i in range(10))),
    ),
    1174: (
        "\n".join(str(i * 5 if i < 3 else 11) for i in range(100)) + "\n",
        exact("A[0] = 0.0\nA[1] = 5.0\nA[2] = 10.0"),
    ),
    1175: (
        "\n".join(str(i) for i in range(20)) + "\n",
        exact("\n".join(f"N[{i}] = {19 - i}" for i in range(20))),
    ),
    1177: (
        "3\n",
        lambda output: output.startswith("N[0] = 0\nN[1] = 1\nN[2] = 2\nN[3] = 0")
        and output.endswith("N[999] = 0")
        and len(output.splitlines()) == 1000,
    ),
    1178: (
        "200\n",
        lambda output: output.startswith("N[0] = 200.0000\nN[1] = 100.0000\nN[2] = 50.0000")
        and len(output.splitlines()) == 100,
    ),
    1179: (
        "\n".join(str(i) for i in range(1, 16)) + "\n",
        lambda output: "impar[0] = 1" in output
        and "par[4] = 10" in output
        and "impar[2] = 15" in output
        and output.endswith("par[1] = 14"),
    ),
}


problems = json.load(sys.stdin)
failures = []

for problem in problems:
    problem_id = problem["id"]
    if problem_id in special:
        raw_input, validator = special[problem_id]
    else:
        raw_input = "" if problem["sampleInput"] == "(sem entrada)" else problem["sampleInput"] + "\n"
        if "..." in raw_input or "..." in problem["sampleOutput"]:
            failures.append(f"{problem_id}: exemplo incompleto e sem teste especial")
            continue
        validator = exact(problem["sampleOutput"])

    try:
        output = execute(problem["code"], raw_input)
    except Exception as error:
        failures.append(f"{problem_id}: exceção {type(error).__name__}: {error}")
        continue

    if not validator(output):
        failures.append(f"{problem_id}: saída inesperada: {output!r}")

if failures:
    print(f"VALIDAÇÃO FALHOU ({len(failures)})")
    for failure in failures:
        print(f"- {failure}")
    raise SystemExit(1)

print(f"Python validado: {len(problems)} soluções executadas com sucesso.")
