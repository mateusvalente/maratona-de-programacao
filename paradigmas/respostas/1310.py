import sys

dados = list(map(int, sys.stdin.buffer.read().split()))
pos = 0
saida = []

while pos < len(dados):
    n = dados[pos]
    pos += 1

    cost = dados[pos]
    pos += 1

    best = 0
    curr = 0

    for _ in range(n):
        profit = dados[pos] - cost
        pos += 1

        curr += profit
        best = max(best, curr)

        if curr < 0:
            curr = 0

    saida.append(str(best))

sys.stdout.write("\n".join(saida) + "\n")