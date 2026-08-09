maior = int(input())
posicao = 1

for i in range(2, 101):
    valor = int(input())
    if valor > maior:
        maior = valor
        posicao = i

print(maior)
print(posicao)
