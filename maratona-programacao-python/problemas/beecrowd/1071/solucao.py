x = int(input())
y = int(input())

if x < y:
    menor = x
    maior = y
else:
    menor = y
    maior = x
soma = 0

for numero in range(menor + 1, maior):
    if numero % 2 != 0:
        soma += numero

print(soma)
