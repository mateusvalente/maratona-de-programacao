# Relação do algoritmo com o problema
# Objetivo: Encontrar o maior entre cem inteiros e sua posição iniciada em 1.
# Entrada: Cem inteiros, um por linha.
# Saída: O maior valor e sua posição, cada um em uma linha.
#
# Passo a passo
# 1. Ler o primeiro valor como maior inicial.
# 2. Percorrer as outras 99 posições.
# 3. Atualizar maior e posição quando necessário.
# 4. Imprimir ambos.

# Implementação completa
maior = int(input())
posicao = 1

for i in range(2, 101):
    valor = int(input())
    if valor > maior:
        maior = valor
        posicao = i

print(maior)
print(posicao)
