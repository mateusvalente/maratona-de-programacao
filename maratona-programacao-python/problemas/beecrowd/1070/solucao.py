# Relação do algoritmo com o problema
# Objetivo: A partir de um inteiro, imprimir os próximos seis números ímpares, incluindo-o quando for ímpar.
# Entrada: Um inteiro.
# Saída: Seis ímpares, um por linha.
#
# Passo a passo
# 1. Se o valor inicial for par, avançar uma unidade.
# 2. Repetir seis vezes.
# 3. Imprimir o ímpar atual.
# 4. Avançar duas unidades por repetição.

# Implementação completa
numero = int(input())

if numero % 2 == 0:
    numero += 1

for i in range(6):
    print(numero)
    numero += 2
