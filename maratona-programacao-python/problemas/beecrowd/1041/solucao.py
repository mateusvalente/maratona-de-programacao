# Relação do algoritmo com o problema
# Objetivo: Classificar um ponto como origem, eixo ou quadrante.
# Entrada: Coordenadas X e Y decimais na mesma linha.
# Saída: Origem, Eixo X, Eixo Y ou Q1, Q2, Q3, Q4.
#
# Passo a passo
# 1. Tratar primeiro a origem.
# 2. Depois tratar os eixos.
# 3. Usar os sinais de X e Y para o quadrante.

# Implementação completa
x, y = map(float, input().split())

if x == 0 and y == 0:
    print("Origem")
elif x == 0:
    print("Eixo Y")
elif y == 0:
    print("Eixo X")
elif x > 0 and y > 0:
    print("Q1")
elif x < 0 and y > 0:
    print("Q2")
elif x < 0 and y < 0:
    print("Q3")
else:
    print("Q4")
