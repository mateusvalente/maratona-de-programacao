# Relação do algoritmo com o problema
# Objetivo: Substituir por 1 todos os valores de um vetor que sejam menores ou iguais a zero.
# Entrada: Dez inteiros, um por linha.
# Saída: As dez posições no formato X[i] = valor.
#
# Passo a passo
# 1. Ler dez valores em uma lista.
# 2. Percorrer índices.
# 3. Trocar valores <= 0 por 1.
# 4. Imprimir cada posição.

# Implementação completa
x = []

for i in range(10):
    valor = int(input())
    if valor <= 0:
        valor = 1
    x.append(valor)

for i in range(10):
    print(f"X[{i}] = {x[i]}")
