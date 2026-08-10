# Relação do algoritmo com o problema
# Objetivo: Calcular as raízes reais de uma equação do segundo grau quando elas existem.
# Entrada: Coeficientes A, B e C decimais na mesma linha.
# Saída: As duas raízes com cinco casas ou a mensagem Impossivel calcular.
#
# Passo a passo
# 1. Ler os coeficientes.
# 2. Calcular delta.
# 3. Impedir divisão por zero e raiz de negativo.
# 4. Calcular e imprimir R1 e R2.

# Implementação completa
a, b, c = map(float, input().split())

delta = b ** 2 - 4 * a * c

if a == 0 or delta < 0:
    print("Impossivel calcular")
else:
    raiz_delta = delta ** 0.5
    r1 = (-b + raiz_delta) / (2 * a)
    r2 = (-b - raiz_delta) / (2 * a)
    print(f"R1 = {r1:.5f}")
    print(f"R2 = {r2:.5f}")
