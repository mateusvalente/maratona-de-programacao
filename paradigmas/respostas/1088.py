import sys

dados = list(map(int, sys.stdin.buffer.read().split()))

i = 0
saida = []

while i < len(dados):
    n = dados[i]
    i += 1

    if n == 0:
        break

    v = dados[i:i + n]
    i += n

    visitado = [False] * n
    ciclos = 0

    for j in range(n):
        if not visitado[j]:
            ciclos += 1
            atual = j

            while not visitado[atual]:
                visitado[atual] = True
                atual = v[atual] - 1

    if (n - ciclos) % 2 == 1:
        saida.append("Marcelo")
    else:
        saida.append("Carlos")

sys.stdout.write("\n".join(saida) + "\n")