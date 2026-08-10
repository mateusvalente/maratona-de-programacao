# Relação do algoritmo com o problema
# Objetivo: Ler vinte inteiros e mostrá-los em ordem inversa.
# Entrada: Vinte inteiros, um por linha.
# Saída: O vetor invertido no formato N[i] = valor.
#
# Passo a passo
# 1. Ler os vinte valores.
# 2. Inverter a lista.
# 3. Imprimir com novos índices de 0 a 19.

# Implementação completa
n = []

for i in range(20):
    n.append(int(input()))

n.reverse()

for i in range(20):
    print(f"N[{i}] = {n[i]}")
