import sys


def combinar(a, b):
    limite = min(len(a), len(b))
    intercalada = "".join(a[i] + b[i] for i in range(limite))
    return intercalada + a[limite:] + b[limite:]


def main():
    linhas = sys.stdin.buffer.read().decode().splitlines()
    quantidade = int(linhas[0])
    respostas = []
    for i in range(1, quantidade + 1):
        a, b = linhas[i].split()
        respostas.append(combinar(a, b))
    sys.stdout.write("\n".join(respostas))


if __name__ == "__main__":
    main()
