# Cole aqui sua solução validada do beecrowd 1068.
# Enunciado: https://judge.beecrowd.com/pt/problems/view/1068

import sys

for palavra in sys.stdin.read().split():

    pilha = []
    valida = True

    for caractere in palavra:

        if caractere == '(':
            pilha.append(caractere)

        elif caractere == ')':
            if len(pilha) == 0:
                valida = False
            else:
                pilha.pop()

    if len(pilha) != 0 or valida == False:
        print("incorrect")
    else:
        print("correct")