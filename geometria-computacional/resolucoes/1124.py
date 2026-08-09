import sys


def circulos_cabem(largura, comprimento, raio_1, raio_2):
    if (2 * raio_1 > largura or 2 * raio_1 > comprimento or
            2 * raio_2 > largura or 2 * raio_2 > comprimento):
        return False

    dx = largura - raio_1 - raio_2
    dy = comprimento - raio_1 - raio_2
    distancia_ao_quadrado = dx * dx + dy * dy
    raios_ao_quadrado = (raio_1 + raio_2) ** 2
    return distancia_ao_quadrado >= raios_ao_quadrado


def main():
    valores = list(map(int, sys.stdin.buffer.read().split()))
    respostas = []

    for i in range(0, len(valores), 4):
        largura, comprimento, raio_1, raio_2 = valores[i:i + 4]
        if largura == comprimento == raio_1 == raio_2 == 0:
            break
        respostas.append(
            "S" if circulos_cabem(largura, comprimento, raio_1, raio_2) else "N"
        )

    sys.stdout.write("\n".join(respostas))


if __name__ == "__main__":
    main()
