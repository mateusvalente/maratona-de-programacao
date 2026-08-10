import sys


# O índice é o algarismo e o valor é a quantidade de segmentos acesos.
LEDS_POR_DIGITO = (6, 2, 5, 5, 4, 5, 6, 3, 7, 6)


def contar_leds(numero):
    """Soma o custo de LEDs de todos os caracteres do número."""
    return sum(LEDS_POR_DIGITO[int(digito)] for digito in numero)


def main():
    # buffer.read().split() lê os tokens de uma vez, útil em entradas grandes.
    linhas = sys.stdin.buffer.read().split()
    quantidade = int(linhas[0])
    respostas = [
        f"{contar_leds(linhas[i].decode())} leds"
        for i in range(1, quantidade + 1)
    ]
    # A quebra final deixa a saída no formato convencional dos juízes.
    sys.stdout.write("\n".join(respostas) + "\n")


if __name__ == "__main__":
    main()
