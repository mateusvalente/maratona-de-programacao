# Relação do algoritmo com o problema
# Objetivo: Encontrar o menor valor de uma lista e a primeira posição em que aparece.
# Entrada: N na primeira linha e N inteiros na segunda.
# Saída: Menor valor e Posicao, em duas linhas.
#
# Passo a passo
# 1. Ler N e a lista.
# 2. Inicializar menor e posição com a célula zero.
# 3. Percorrer os índices restantes.
# 4. Atualizar apenas quando encontrar valor estritamente menor.

# Implementação completa
n = int(input())
valores = list(map(int, input().split()))

menor = valores[0]
posicao = 0

for i in range(1, n):
    if valores[i] < menor:
        menor = valores[i]
        posicao = i

print(f"Menor valor: {menor}")
print(f"Posicao: {posicao}")
