# Relação do algoritmo com o problema
# Objetivo: Criar dez valores em que cada posição contém o dobro da anterior.
# Entrada: Um inteiro para a primeira posição.
# Saída: As posições no formato N[i] = valor.
#
# Passo a passo
# 1. Ler o valor inicial.
# 2. Adicionar à lista.
# 3. Repetir: dobrar e adicionar.
# 4. Imprimir índices e valores.

# Implementação completa
valor = int(input())
n = []

for i in range(10):
    n.append(valor)
    valor *= 2

for i in range(10):
    print(f"N[{i}] = {n[i]}")
