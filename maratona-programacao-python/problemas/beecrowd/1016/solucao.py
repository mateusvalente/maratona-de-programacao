# Relação do algoritmo com o problema
# Objetivo: Converter a diferença de distância entre dois carros em minutos, sabendo que ela cresce 1 km a cada 2 minutos.
# Entrada: Uma distância inteira em quilômetros.
# Saída: O tempo inteiro seguido da palavra minutos.
#
# Passo a passo
# 1. Ler a distância.
# 2. Multiplicar por 2.
# 3. Imprimir a unidade minutos.

# Implementação completa
distancia = int(input())

tempo = distancia * 2

print(f"{tempo} minutos")
