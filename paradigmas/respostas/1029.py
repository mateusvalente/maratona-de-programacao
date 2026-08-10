# F memoriza Fibonacci; CF memoriza o total de nós da árvore de chamadas.
F = [-1 for _ in range(40)]
CF = [-1 for _ in range(40)]

F[0] = 0
F[1] = 1

CF[0] = 1
CF[1] = 1

def calcula(n):
    # O estado só é expandido na primeira vez em que aparece.
    if(F[n] == -1):
        result1, num_calls1 = calcula(n - 1)
        result2, num_calls2 = calcula(n - 2)
        F[n] = result1 + result2
        # As duas subárvores mais 1 para a chamada calcula(n).
        CF[n] = num_calls1 + num_calls2 + 1
    return (F[n], CF[n])

# A memória permanece entre os casos e reaproveita resultados anteriores.
N = int(input())

for _ in range(N):
    X = int(input())
    result, num_calls = calcula(X)
    # O enunciado não conta a chamada inicial; por isso subtraímos 1.
    print(f'fib({X}) = {num_calls - 1} calls = {result}')
