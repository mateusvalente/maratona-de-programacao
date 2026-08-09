# Cole aqui sua solução validada do exercício Insert a node at the head.
# Enunciado: https://www.hackerrank.com/challenges/insert-a-node-at-the-head-of-a-linked-list/problem

t = int(input())

cenario = 1

for _ in range(t):

    maximo, puxar = map(int, input().split())

    renas = []

    for _ in range(maximo):

        nome, peso, idade, altura = input().split()

        peso = int(peso)
        idade = int(idade)
        altura = float(altura)

        renas.append((nome, peso, idade, altura))

    # Ordenação:
    # 1. peso decrescente
    # 2. idade crescente
    # 3. altura crescente
    # 4. nome crescente
    renas.sort(
        key=lambda rena: (
            -rena[1],
            rena[2],
            rena[3],
            rena[0]
        )
    )

    print(f"CENARIO {{{cenario}}}")

    for i in range(puxar):
        print(f"{i + 1} - {renas[i][0]}")

    cenario += 1