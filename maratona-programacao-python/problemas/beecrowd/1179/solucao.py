pares = []
impares = []

for i in range(15):
    valor = int(input())

    if valor % 2 == 0:
        pares.append(valor)
        if len(pares) == 5:
            for j in range(5):
                print(f"par[{j}] = {pares[j]}")
            pares = []
    else:
        impares.append(valor)
        if len(impares) == 5:
            for j in range(5):
                print(f"impar[{j}] = {impares[j]}")
            impares = []

for i in range(len(impares)):
    print(f"impar[{i}] = {impares[i]}")

for i in range(len(pares)):
    print(f"par[{i}] = {pares[i]}")
