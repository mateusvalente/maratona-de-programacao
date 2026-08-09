import sys


def circulos_cabem(largura, comprimento, raio_1, raio_2):
    """Testa se os dois círculos podem ficar sem ultrapassar o retângulo."""
    # Antes de posicioná-los, cada círculo precisa caber isoladamente.
    if (2 * raio_1 > largura or 2 * raio_1 > comprimento or
            2 * raio_2 > largura or 2 * raio_2 > comprimento):
        return False

    # Colocamos os centros em cantos opostos, posição que maximiza a distância.
    dx = largura - raio_1 - raio_2
    dy = comprimento - raio_1 - raio_2
    distancia_ao_quadrado = dx * dx + dy * dy
    raios_ao_quadrado = (raio_1 + raio_2) ** 2
    # Não há sobreposição quando a distância é pelo menos a soma dos raios.
    return distancia_ao_quadrado >= raios_ao_quadrado


def main():
    # A entrada contém grupos de quatro inteiros e termina com 0 0 0 0.
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
