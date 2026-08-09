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
