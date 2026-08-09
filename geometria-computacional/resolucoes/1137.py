import math
import sys


EPSILON = 1e-7


def circuncirculo(a, b, c):
    ax, ay = a
    bx, by = b
    cx, cy = c
    determinante = 2.0 * (
        ax * (by - cy) + bx * (cy - ay) + cx * (ay - by)
    )

    if math.isclose(determinante, 0.0, abs_tol=EPSILON):
        return None

    a2 = ax * ax + ay * ay
    b2 = bx * bx + by * by
    c2 = cx * cx + cy * cy
    centro_x = (
        a2 * (by - cy) + b2 * (cy - ay) + c2 * (ay - by)
    ) / determinante
    centro_y = (
        a2 * (cx - bx) + b2 * (ax - cx) + c2 * (bx - ax)
    ) / determinante
    raio_2 = (ax - centro_x) ** 2 + (ay - centro_y) ** 2
    return centro_x, centro_y, raio_2


def esta_no_circulo(ponto, circulo):
    x, y = ponto
    centro_x, centro_y, raio_2 = circulo
    distancia_2 = (x - centro_x) ** 2 + (y - centro_y) ** 2
    return math.isclose(
        distancia_2, raio_2, rel_tol=EPSILON, abs_tol=EPSILON
    )


def maior_quantidade_cocircular(pontos):
    quantidade = len(pontos)
    if quantidade <= 2:
        return quantidade

    melhor = 2
    for i in range(quantidade):
        for j in range(i + 1, quantidade):
            for k in range(j + 1, quantidade):
                circulo = circuncirculo(pontos[i], pontos[j], pontos[k])
                if circulo is None:
                    continue

                atual = 3
                for m in range(k + 1, quantidade):
                    if esta_no_circulo(pontos[m], circulo):
                        atual += 1
                melhor = max(melhor, atual)

    return melhor


def main():
    dados = iter(sys.stdin.buffer.read().split())
    respostas = []

    for token in dados:
        quantidade = int(token)
        if quantidade == 0:
            break
        pontos = [
            (float(next(dados)), float(next(dados)))
            for _ in range(quantidade)
        ]
        respostas.append(str(maior_quantidade_cocircular(pontos)))

    sys.stdout.write("\n".join(respostas))


if __name__ == "__main__":
    main()
