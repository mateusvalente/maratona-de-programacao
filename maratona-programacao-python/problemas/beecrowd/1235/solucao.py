n = int(input())

for i in range(n):
    texto = input()
    metade = len(texto) // 2

    esquerda = texto[:metade]
    direita = texto[metade:]

    resultado = esquerda[::-1] + direita[::-1]
    print(resultado)
