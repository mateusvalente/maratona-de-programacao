import sys

entrada = sys.stdin.buffer

while True:
    linha = entrada.readline()

    if not linha:
        break

    if not linha.strip():
        continue

    a, b = map(int, linha.split())

    partidas = []
    pontos = 0

    for _ in range(a):
        x, y = map(int, entrada.readline().split())

        if x - y <= 0:
            partidas.append(abs(x - y))
        else:
            pontos += 3

    partidas.sort()

    for diferenca in partidas:
        if b != 0 and b - (diferenca + 1) >= 0:
            b -= diferenca + 1
            pontos += 3

        elif b - diferenca >= 0:
            b -= diferenca
            pontos += 1

    print(pontos)