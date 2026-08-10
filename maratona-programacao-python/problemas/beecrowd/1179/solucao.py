# Relação do algoritmo com o problema
# Objetivo: Separar quinze inteiros em vetores de pares e ímpares com capacidade cinco, imprimindo sempre que um enche.
# Entrada: Quinze inteiros, um por linha.
# Saída: Conteúdo dos vetores quando enchem e, ao final, sobras ímpares antes das pares.
#
# Passo a passo
# 1. Manter listas par e impar.
# 2. Adicionar cada valor à lista correta.
# 3. Ao atingir cinco, imprimir e esvaziar.
# 4. No final, imprimir sobras ímpares e depois pares.

# Implementação completa
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
