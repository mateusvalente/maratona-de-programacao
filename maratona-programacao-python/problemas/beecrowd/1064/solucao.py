# Relação do algoritmo com o problema
# Objetivo: Contar valores positivos e calcular a média apenas deles.
# Entrada: Seis números decimais, um por linha.
# Saída: Quantidade de positivos e média com uma casa.
#
# Passo a passo
# 1. Iniciar contador e soma.
# 2. Para cada valor positivo, incrementar e acumular.
# 3. Dividir soma pela quantidade.
# 4. Imprimir uma casa.

# Implementação completa
quantidade = 0
soma = 0.0

for i in range(6):
    valor = float(input())
    if valor > 0:
        quantidade += 1
        soma += valor

media = soma / quantidade

print(f"{quantidade} valores positivos")
print(f"{media:.1f}")
