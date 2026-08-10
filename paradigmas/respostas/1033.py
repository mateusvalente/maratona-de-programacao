# b é o módulo do caso atual e limita os valores durante as multiplicações.
b = 0


class Matriz:
    def __init__(self, n, m):
        self.n = n
        self.m = m
        self.M = [[0 for _ in range(m)] for _ in range(n)]

    def __mul__(self, outra):
        global b
        # (n x m) multiplicada por (m x p) produz uma matriz (n x p).
        resposta = Matriz(self.n, outra.m)

        for i in range(self.n):
            for j in range(outra.m):
                for k in range(self.m):
                    resposta.M[i][j] += self.M[i][k] * outra.M[k][j]
                    resposta.M[i][j] %= b

        return resposta


def potencia(base, expoente):
    # Exponenciação rápida reduz expoentes pares pela metade.
    if(expoente == 1):
        return base
    elif(expoente % 2):
        return base * potencia(base, expoente - 1)
    else:
        # Calculamos a metade uma única vez e reutilizamos o resultado.
        pot = potencia(base, expoente // 2)
        return pot * pot


T = 1
while True:
    try:
        n, b = [int(x) for x in input().strip().split(' ')]

        # O par 0 0 encerra a entrada.
        if(n == 0 and b == 0):
            break

        # A é a transição da recorrência; a terceira coluna representa o +1.
        A = Matriz(3, 3)
        A.M[0][0] = 1
        A.M[0][1] = 1
        A.M[0][2] = 1
        A.M[1][0] = 1
        A.M[2][2] = 1

        # B guarda o estado base usado para iniciar a recorrência.
        B = Matriz(3, 1)
        B.M[0][0] = 1
        B.M[1][0] = 1
        B.M[2][0] = 1

        if(n < 2):
            print(f'Case {T}: {n} {b} 1')
        else:
            An1 = potencia(A, n - 1)
            R = An1 * B

            print(f'Case {T}: {n} {b} {R.M[0][0]}')

        T += 1
    except EOFError:
        break
