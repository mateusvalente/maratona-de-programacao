import sys

# buffer evita o custo de camadas extras de entrada em casos grandes.
entrada = sys.stdin.buffer

while True:
    n, m = map(int, entrada.readline().split())

    # O par 0 0 encerra a entrada.
    if n == 0 and m == 0:
        break

    numero = entrada.readline().strip().decode()

    # A pilha mantém o maior prefixo possível em ordem monotônica.
    pilha = []
    apagados = 0

    for digito in numero:
        # Um dígito maior substitui dígitos menores anteriores enquanto ainda
        # houver remoções disponíveis.
        while pilha and apagados < m and digito > pilha[-1]:
            pilha.pop()
            apagados += 1

        # A resposta precisa terminar com exatamente n - m algarismos.
        if len(pilha) < n - m:
            pilha.append(digito)

    print("".join(pilha))
