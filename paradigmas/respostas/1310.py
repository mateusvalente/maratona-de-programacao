import sys

# Lê todos os casos até EOF e acumula as respostas para uma única escrita.
dados = list(map(int, sys.stdin.buffer.read().split()))
pos = 0
saida = []

while pos < len(dados):
    n = dados[pos]
    pos += 1

    cost = dados[pos]
    pos += 1

    # curr é o melhor lucro de um intervalo que termina no dia atual;
    # best é o melhor lucro encontrado em qualquer intervalo.
    best = 0
    curr = 0

    for _ in range(n):
        profit = dados[pos] - cost
        pos += 1

        curr += profit
        best = max(best, curr)

        # Um prefixo negativo só prejudicaria qualquer intervalo futuro.
        if curr < 0:
            curr = 0

    saida.append(str(best))

# sys.stdout.write não inclui a quebra da última linha automaticamente.
sys.stdout.write("\n".join(saida) + "\n")
