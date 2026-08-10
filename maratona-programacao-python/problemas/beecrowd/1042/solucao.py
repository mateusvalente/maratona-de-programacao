# Relação do algoritmo com o problema
# Objetivo: Mostrar três inteiros em ordem crescente e depois na ordem original.
# Entrada: Três inteiros na mesma linha.
# Saída: Ordenados, uma linha vazia e os valores originais.
#
# Passo a passo
# 1. Guardar os três valores originais.
# 2. Comparar e trocar pares fora de ordem.
# 3. Imprimir os valores ordenados.
# 4. Imprimir linha vazia e a ordem original.

# Implementação completa
a, b, c = map(int, input().split())

original_a = a
original_b = b
original_c = c

if a > b:
    a, b = b, a
if a > c:
    a, c = c, a
if b > c:
    b, c = c, b

print(a)
print(b)
print(c)

print()

print(original_a)
print(original_b)
print(original_c)
