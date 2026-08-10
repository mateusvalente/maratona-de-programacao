# Relação do algoritmo com o problema
# Objetivo: Preencher mil posições repetindo os valores de 0 até T - 1.
# Entrada: Um inteiro T.
# Saída: Mil linhas no formato N[i] = valor.
#
# Passo a passo
# 1. Percorrer índices de 0 a 999.
# 2. Usar i % T para repetir o padrão.
# 3. Imprimir índice e valor.

# Implementação completa
t = int(input())

for i in range(1000):
    valor = i % t
    print(f"N[{i}] = {valor}")
