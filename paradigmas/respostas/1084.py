import sys

entrada = sys.stdin.buffer

while True:
    n, m = map(int, entrada.readline().split())

    if n == 0 and m == 0:
        break

    numero = entrada.readline().strip().decode()

    pilha = []
    apagados = 0

    for digito in numero:
        while pilha and apagados < m and digito > pilha[-1]:
            pilha.pop()
            apagados += 1

        if len(pilha) < n - m:
            pilha.append(digito)

    print("".join(pilha))