import sys


LEDS_POR_DIGITO = (6, 2, 5, 5, 4, 5, 6, 3, 7, 6)


def contar_leds(numero):
    return sum(LEDS_POR_DIGITO[int(digito)] for digito in numero)


def main():
    linhas = sys.stdin.buffer.read().split()
    quantidade = int(linhas[0])
    respostas = [
        f"{contar_leds(linhas[i].decode())} leds"
        for i in range(1, quantidade + 1)
    ]
    sys.stdout.write("\n".join(respostas))


if __name__ == "__main__":
    main()
