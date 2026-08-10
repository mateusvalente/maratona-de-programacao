# Relação do algoritmo com o problema
# Objetivo: Contar quantos de cinco inteiros são pares.
# Entrada: Cinco inteiros, um por linha.
# Saída: A quantidade seguida de valores pares.
#
# Passo a passo
# 1. Repetir cinco leituras.
# 2. Testar resto por 2.
# 3. Incrementar o contador quando o resto for zero.

# Implementação completa
pares = 0

for i in range(5):
    valor = int(input())
    if valor % 2 == 0:
        pares += 1

print(f"{pares} valores pares")
