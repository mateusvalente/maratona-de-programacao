valor = int(input())
n = []

for i in range(10):
    n.append(valor)
    valor *= 2

for i in range(10):
    print(f"N[{i}] = {n[i]}")
