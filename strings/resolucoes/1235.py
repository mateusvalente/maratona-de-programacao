import sys


def inverter_metades(frase):
    """Inverte cada metade separadamente, sem trocar os blocos de posição."""
    # O corte separa os dois blocos sem trocar suas posições.
    metade = len(frase) // 2
    esquerda = frase[:metade][::-1]
    direita = frase[metade:][::-1]
    return esquerda + direita


def main():
    # A primeira linha contém o número de frases.
    linhas = sys.stdin.buffer.read().decode().splitlines()
    quantidade = int(linhas[0])

    # Cada frase é independente, então aplicamos a mesma transformação a todas.
    respostas = [inverter_metades(linhas[i]) for i in range(1, quantidade + 1)]

    # join separa as respostas por linhas; o último \n encerra a saída final.
    sys.stdout.write("\n".join(respostas) + "\n")


if __name__ == "__main__":
    main()
