# Relação do algoritmo com o problema
# Objetivo: Decidir se três medidas formam triângulo; se não, calcular a área de um trapézio.
# Entrada: Três valores decimais A, B e C.
# Saída: Perimetro = valor ou Area = valor, com uma casa.
#
# Passo a passo
# 1. Testar as três desigualdades do triângulo.
# 2. Se todas valerem, somar o perímetro.
# 3. Caso contrário, aplicar a área do trapézio.

# Implementação completa
a, b, c = map(float, input().split())

forma_triangulo = a < b + c and b < a + c and c < a + b

if forma_triangulo:
    perimetro = a + b + c
    print(f"Perimetro = {perimetro:.1f}")
else:
    area = (a + b) * c / 2
    print(f"Area = {area:.1f}")
