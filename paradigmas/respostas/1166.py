import math


def is_perfect_square(num):
    # Testa quadrado perfeito com raiz inteira, sem erro de ponto flutuante.
    root = math.isqrt(num)
    return root * root == num


def max_balls(n):
    # Coloca bolas em ordem usando a primeira haste válida disponível.
    rods = [0] * n
    ball = 1

    while True:
        placed = False

        for i in range(n):
            # Uma haste vazia aceita a bola; nas demais, a soma com o topo
            # precisa formar um quadrado perfeito.
            if rods[i] == 0 or is_perfect_square(rods[i] + ball):
                rods[i] = ball
                placed = True
                break

        # Se nenhuma haste aceita a bola atual, o processo termina.
        if not placed:
            break

        ball += 1

    return ball - 1


t = int(input())

for _ in range(t):
    n = int(input())
    print(max_balls(n))
