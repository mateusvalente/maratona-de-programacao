# bisect_left faz busca binária e devolve a primeira posição possível.
from bisect import bisect_left


# O contador produz o cabeçalho CASE# pedido pelo enunciado.
caso = 0

while True:
    n, q = map(int, input().split())

    # O par 0 0 encerra a entrada.
    if n == 0 and q == 0:
        break

    caso += 1

    valores = []

    for _ in range(n):
        valor = int(input())
        valores.append(valor)

    # A ordenação é o pré-processamento necessário para todas as consultas.
    valores.sort()

    print(f"CASE# {caso}:")

    for _ in range(q):
        valor = int(input())

        # Procuramos a primeira ocorrência, não apenas qualquer ocorrência.
        pos = bisect_left(valores, valor)

        # O ponto de inserção ainda precisa ser validado.
        if pos < len(valores) and valores[pos] == valor:
            print(f"{valor} found at {pos + 1}")
        else:
            print(f"{valor} not found")
