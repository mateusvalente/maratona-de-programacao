# Relação do algoritmo com o problema
# Objetivo: Contar quantos entre seis valores são positivos.
# Entrada: Seis números decimais, um por linha.
# Saída: A quantidade seguida de valores positivos.
#
# Passo a passo
# 1. Iniciar contador em zero.
# 2. Repetir seis leituras.
# 3. Somar 1 quando valor > 0.
# 4. Imprimir o contador.

# Implementação completa
positivos = 0

for i in range(6):
    valor = float(input())
    if valor > 0:
        positivos += 1

print(f"{positivos} valores positivos")
