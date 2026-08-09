import math
import sys


def calcular_areas(lado):
    quadrado = lado * lado
    quarto_de_circulo = math.pi * quadrado / 4.0
    complementar = quadrado - quarto_de_circulo
    segmento = quadrado * (4.0 * math.pi - 3.0 * math.sqrt(3.0)) / 24.0

    quadriculada = 8.0 * segmento + 8.0 * complementar - 4.0 * quadrado
    pontilhada = 4.0 * complementar - 2.0 * quadriculada
    listrada = quadrado - pontilhada - quadriculada
    return listrada, pontilhada, quadriculada


def main():
    lados = map(float, sys.stdin.buffer.read().split())
    respostas = [
        f"{listrada:.3f} {pontilhada:.3f} {quadriculada:.3f}"
        for listrada, pontilhada, quadriculada in map(calcular_areas, lados)
    ]
    sys.stdout.write("\n".join(respostas))


if __name__ == "__main__":
    main()
