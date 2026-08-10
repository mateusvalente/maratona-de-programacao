# Relação do algoritmo com o problema
# Objetivo: Calcular a diferença entre o produto de A por B e o produto de C por D.
# Entrada: Quatro inteiros, um por linha.
# Saída: DIFERENCA = resultado.
#
# Passo a passo
# 1. Ler A, B, C e D.
# 2. Calcular A * B.
# 3. Calcular C * D.
# 4. Subtrair o segundo produto do primeiro.

# Implementação completa
a = int(input())
b = int(input())
c = int(input())
d = int(input())

diferenca = a * b - c * d

print(f"DIFERENCA = {diferenca}")
