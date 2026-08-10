# Relação do algoritmo com o problema
# Objetivo: Calcular a área de um círculo usando o raio informado e pi igual a 3.14159.
# Entrada: Um número decimal representando o raio.
# Saída: A área no formato A=valor, com quatro casas decimais.
#
# Passo a passo
# 1. Ler o raio como float.
# 2. Definir pi como 3.14159.
# 3. Calcular pi vezes raio ao quadrado.
# 4. Imprimir quatro casas decimais.

# Implementação completa
raio = float(input())

pi = 3.14159
area = pi * raio ** 2

print(f"A={area:.4f}")
