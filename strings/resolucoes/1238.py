import sys


def combinar(a, b):
    """Intercala o prefixo comum e acrescenta a sobra da string maior."""
    # Intercalamos enquanto as duas strings possuem a posição i.
    limite = min(len(a), len(b))
    intercalada = "".join(
        a[i] + b[i] for i in range(limite)
    )

    # Apenas uma das duas sobras será não vazia.
    return intercalada + a[limite:] + b[limite:]


def main():
    # A primeira linha informa quantos pares devem ser combinados.
    linhas = sys.stdin.buffer.read().decode().splitlines()
    quantidade = int(linhas[0])
    respostas = []

    for i in range(1, quantidade + 1):
        a, b = linhas[i].split()
        respostas.append(combinar(a, b))

    # Uma única escrita costuma ser mais eficiente do que vários prints.
    sys.stdout.write("\n".join(respostas) + "\n")


if __name__ == "__main__":
    main()
