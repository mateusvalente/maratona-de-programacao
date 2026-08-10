# Relação do algoritmo com o problema
# Objetivo: Mostrar o quadrado de cada número par de 1 até N.
# Entrada: Um inteiro N.
# Saída: Uma linha por par no formato i^2 = resultado.
#
# Passo a passo
# 1. Percorrer os pares de 2 até N.
# 2. Calcular numero ** 2.
# 3. Imprimir no formato pedido.

# Implementação completa
n = int(input())

for numero in range(2, n + 1, 2):
    quadrado = numero ** 2
    print(f"{numero}^2 = {quadrado}")
