import sys


def inverter_metades(frase):
    metade = len(frase) // 2
    return frase[:metade][::-1] + frase[metade:][::-1]


def main():
    linhas = sys.stdin.buffer.read().decode().splitlines()
    quantidade = int(linhas[0])
    respostas = [inverter_metades(linhas[i]) for i in range(1, quantidade + 1)]
    sys.stdout.write("\n".join(respostas))


if __name__ == "__main__":
    main()
