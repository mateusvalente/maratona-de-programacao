# Relação do algoritmo com o problema
# Objetivo: Calcular a média de duas notas com pesos 3.5 e 7.5.
# Entrada: Duas notas decimais, uma por linha.
# Saída: MEDIA = valor com cinco casas decimais.
#
# Passo a passo
# 1. Ler A e B como float.
# 2. Multiplicar cada nota por seu peso.
# 3. Dividir a soma dos produtos por 11.
# 4. Imprimir cinco casas.

# Implementação completa
a = float(input())
b = float(input())

media = (a * 3.5 + b * 7.5) / 11

print(f"MEDIA = {media:.5f}")
