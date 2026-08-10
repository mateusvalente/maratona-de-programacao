N, M = 0, 0
mochila = []
blocos = []


def calculaMochila():
    # mochila[j] guarda o menor número de blocos que forma exatamente j.
    mochila = [-1 for _ in range(M + 1)]
    mochila[0] = 0

    for bloco in blocos:
        # O percurso crescente permite reutilizar o mesmo tamanho de bloco.
        for j in range(bloco, M + 1):
            if(mochila[j - bloco] != -1):
                if(mochila[j] == -1):
                    mochila[j] = mochila[j - bloco] + 1
                else:
                    mochila[j] = min(mochila[j], mochila[j - bloco] + 1)

    return mochila[M]


T = int(input())

for _ in range(T):
    N, M = map(int, input().strip().split(' '))
    # Os tamanhos disponíveis formam as transições da programação dinâmica.
    blocos = map(int, input().strip().split(' '))

    print(calculaMochila())
