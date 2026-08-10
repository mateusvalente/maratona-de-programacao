N = int(input().strip())

for _ in range(N):
    QT, S = [int(x) for x in input().strip().split(' ')]

    palpites = [int(x) for x in input().strip().split(' ')]

    # Começamos considerando o primeiro aluno como o melhor.
    melhor_palpite = 0
    menor_diferenca = abs(S - palpites[0])

    # Só trocamos em uma diferença estritamente menor; assim, empates mantêm
    # o primeiro palpite, como exige o enunciado.
    for i in range(1, QT):
        if(menor_diferenca > abs(S - palpites[i])):
            melhor_palpite = i
            menor_diferenca = abs(S - palpites[i])
    
    print(melhor_palpite + 1)
