quantidade_de_cenarios = int(input())

for numero_do_cenario in range(1, quantidade_de_cenarios + 1):
    quantidade_de_renas, quantidade_escolhida = map(int, input().split())
    renas = []

    for _ in range(quantidade_de_renas):
        nome, peso, idade, altura = input().split()

        # Cada tupla funciona como um registro: os quatro campos da rena
        # permanecem juntos durante toda a ordenação.
        renas.append((nome, int(peso), int(idade), float(altura)))

    # As tuplas-chave são comparadas campo a campo:
    # peso decrescente, idade crescente, altura crescente e nome crescente.
    renas.sort(
        key=lambda rena: (
            -rena[1],
            rena[2],
            rena[3],
            rena[0],
        )
    )

    print(f"CENARIO {{{numero_do_cenario}}}")

    # A lista já está no ranking correto; basta imprimir o prefixo solicitado.
    for posicao, rena in enumerate(renas[:quantidade_escolhida], start=1):
        print(f"{posicao} - {rena[0]}")
