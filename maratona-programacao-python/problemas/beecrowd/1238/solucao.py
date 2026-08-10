# Relação do algoritmo com o problema
# Objetivo: Combinar duas strings alternando um caractere de cada e acrescentar a sobra da maior.
# Entrada: Quantidade de casos e, em cada caso, duas strings na mesma linha.
# Saída: Uma string combinada por caso.
#
# Passo a passo
# 1. Ler as duas strings.
# 2. Percorrer até o tamanho da maior.
# 3. Se existir caractere na primeira, adicionar.
# 4. Se existir na segunda, adicionar.

# Implementação completa
n = int(input())

for i in range(n):
    primeira, segunda = input().split()
    resultado = ""

    maior_tamanho = max(len(primeira), len(segunda))

    for j in range(maior_tamanho):
        if j < len(primeira):
            resultado += primeira[j]
        if j < len(segunda):
            resultado += segunda[j]

    print(resultado)
