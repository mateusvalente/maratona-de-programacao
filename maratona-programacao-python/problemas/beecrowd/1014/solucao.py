# Relação do algoritmo com o problema
# Objetivo: Calcular quantos quilômetros foram percorridos por litro de combustível.
# Entrada: Distância total inteira e combustível gasto decimal, em linhas separadas.
# Saída: Consumo com três casas decimais seguido de km/l.
#
# Passo a passo
# 1. Ler distância e combustível.
# 2. Dividir distância por litros.
# 3. Imprimir três casas e a unidade.

# Implementação completa
distancia = int(input())
combustivel = float(input())

consumo = distancia / combustivel

print(f"{consumo:.3f} km/l")
