import math
import sys


def distancia_ponto_segmento(ponto, inicio, fim):
    """Calcula a menor distância entre um ponto e um segmento de reta."""
    px, py = ponto
    ax, ay = inicio
    bx, by = fim
    vx = bx - ax
    vy = by - ay
    comprimento_2 = vx * vx + vy * vy

    # Um segmento degenerado é apenas um ponto.
    if comprimento_2 == 0.0:
        return math.hypot(px - ax, py - ay)

    # t localiza a projeção na reta; limitá-lo a [0, 1] prende a projeção
    # ao segmento, incluindo suas duas extremidades.
    t = ((px - ax) * vx + (py - ay) * vy) / comprimento_2
    t = max(0.0, min(1.0, t))
    projecao = (ax + t * vx, ay + t * vy)
    return math.hypot(px - projecao[0], py - projecao[1])


def menor_abertura(largura, aletas):
    """Examina os dois possíveis obstáculos à ponta de cada aleta."""
    resposta = float("inf")

    for i, (inicio, ponta) in enumerate(aletas):
        parte_da_esquerda = inicio[0] == 0.0
        # Primeiro candidato: distância horizontal até a parede oposta.
        distancia_ate_haste = (
            largura - ponta[0] if parte_da_esquerda else ponta[0]
        )
        resposta = min(resposta, distancia_ate_haste)

        # Segundo candidato: distância até a próxima aleta.
        if i + 1 < len(aletas):
            resposta = min(
                resposta,
                distancia_ponto_segmento(ponta, *aletas[i + 1]),
            )

    return resposta


def main():
    # Os casos são lidos até EOF; a altura pertence ao formato, mas não entra
    # no cálculo porque as coordenadas das aletas já determinam as distâncias.
    dados = iter(sys.stdin.buffer.read().split())
    respostas = []

    for token in dados:
        quantidade = int(token)
        largura = float(next(dados))
        _altura = float(next(dados))
        aletas = []

        for i in range(quantidade):
            y_inicio = float(next(dados))
            x_ponta = float(next(dados))
            y_ponta = float(next(dados))
            x_inicio = 0.0 if i % 2 == 0 else largura
            aletas.append(((x_inicio, y_inicio), (x_ponta, y_ponta)))

        respostas.append(f"{menor_abertura(largura, aletas):.2f}")

    sys.stdout.write("\n".join(respostas))


if __name__ == "__main__":
    main()
