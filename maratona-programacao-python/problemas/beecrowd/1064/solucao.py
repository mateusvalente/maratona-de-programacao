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
