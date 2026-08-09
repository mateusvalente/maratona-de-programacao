from bisect import bisect_left


caso = 0

while True:
    n, q = map(int, input().split())

    if n == 0 and q == 0:
        break

    caso += 1

    valores = []

    for _ in range(n):
        valor = int(input())
        valores.append(valor)

    valores.sort()

    print(f"CASE# {caso}:")

    for _ in range(q):
        valor = int(input())

        pos = bisect_left(valores, valor)

        if pos < len(valores) and valores[pos] == valor:
            print(f"{valor} found at {pos + 1}")
        else:
            print(f"{valor} not found")