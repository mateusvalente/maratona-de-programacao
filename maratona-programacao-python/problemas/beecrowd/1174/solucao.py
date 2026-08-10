# Relação do algoritmo com o problema
# Objetivo: Mostrar apenas as posições cujo valor é menor ou igual a 10.
# Entrada: Cem números decimais, um por linha.
# Saída: Cada posição selecionada no formato A[i] = valor com uma casa.
#
# Passo a passo
# 1. Ler cem valores.
# 2. Para cada índice, testar valor <= 10.
# 3. Imprimir apenas os selecionados.

# Implementação completa
a = []

for i in range(100):
    a.append(float(input()))

for i in range(100):
    if a[i] <= 10:
        print(f"A[{i}] = {a[i]:.1f}")
