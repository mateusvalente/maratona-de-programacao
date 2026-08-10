# Relação do algoritmo com o problema
# Objetivo: Somar os números ímpares estritamente entre dois inteiros.
# Entrada: Dois inteiros, um por linha.
# Saída: A soma dos ímpares internos.
#
# Passo a passo
# 1. Descobrir menor e maior.
# 2. Percorrer somente os valores entre eles.
# 3. Acumular os ímpares.
# 4. Imprimir a soma.

# Implementação completa
x = int(input())
y = int(input())

if x < y:
    menor = x
    maior = y
else:
    menor = y
    maior = x
soma = 0

for numero in range(menor + 1, maior):
    if numero % 2 != 0:
        soma += numero

print(soma)
