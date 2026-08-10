# Relação do algoritmo com o problema
# Objetivo: Dividir cada linha ao meio e inverter separadamente as duas metades.
# Entrada: Quantidade de casos e depois uma linha de texto por caso.
# Saída: Cada frase transformada.
#
# Passo a passo
# 1. Ler a frase inteira.
# 2. Encontrar a metade do tamanho.
# 3. Separar lado esquerdo e direito.
# 4. Inverter cada metade e concatenar.

# Implementação completa
n = int(input())

for i in range(n):
    texto = input()
    metade = len(texto) // 2

    esquerda = texto[:metade]
    direita = texto[metade:]

    resultado = esquerda[::-1] + direita[::-1]
    print(resultado)
