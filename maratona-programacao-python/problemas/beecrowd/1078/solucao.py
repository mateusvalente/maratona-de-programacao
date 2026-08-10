# Relação do algoritmo com o problema
# Objetivo: Imprimir a tabuada de um inteiro de 1 a 10.
# Entrada: Um inteiro N.
# Saída: Dez linhas no formato i x N = produto.
#
# Passo a passo
# 1. Ler N.
# 2. Percorrer multiplicadores de 1 a 10.
# 3. Calcular e imprimir cada produto.

# Implementação completa
n = int(input())

for i in range(1, 11):
    produto = i * n
    print(f"{i} x {n} = {produto}")
