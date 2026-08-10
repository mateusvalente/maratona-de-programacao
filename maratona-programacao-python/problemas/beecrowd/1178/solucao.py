# Relação do algoritmo com o problema
# Objetivo: Criar cem valores começando em X e dividindo cada próximo por 2.
# Entrada: Um número decimal X.
# Saída: Cem posições com quatro casas decimais.
#
# Passo a passo
# 1. Ler o valor inicial.
# 2. Imprimir a posição atual.
# 3. Dividir o valor por 2.
# 4. Repetir cem vezes.

# Implementação completa
valor = float(input())

for i in range(100):
    print(f"N[{i}] = {valor:.4f}")
    valor /= 2
