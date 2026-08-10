# Relação do algoritmo com o problema
# Objetivo: Calcular a média ponderada de três notas com pesos 2, 3 e 5.
# Entrada: Três notas decimais, uma em cada linha.
# Saída: MEDIA = valor com uma casa decimal.
#
# Passo a passo
# 1. Ler A, B e C.
# 2. Aplicar os pesos 2, 3 e 5.
# 3. Dividir pela soma dos pesos, 10.
# 4. Formatar uma casa.

# Implementação completa
a = float(input())
b = float(input())
c = float(input())

media = (a * 2 + b * 3 + c * 5) / 10

print(f"MEDIA = {media:.1f}")
