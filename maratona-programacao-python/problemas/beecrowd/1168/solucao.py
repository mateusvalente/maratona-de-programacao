# Relação do algoritmo com o problema
# Objetivo: Somar quantos segmentos de LED são necessários para exibir cada número.
# Entrada: Quantidade de casos e depois uma sequência de dígitos por linha.
# Saída: A quantidade seguida de leds.
#
# Passo a passo
# 1. Guardar o custo de cada dígito.
# 2. Para cada caso, iniciar total em zero.
# 3. Percorrer caracteres e somar o custo.
# 4. Imprimir total.

# Implementação completa
custos = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6]

n = int(input())

for i in range(n):
    numero = input().strip()
    total = 0

    for digito in numero:
        total += custos[int(digito)]

    print(f"{total} leds")
