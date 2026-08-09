from collections import deque
import heapq
import sys


def classificar(operacoes):
    """Simula as três estruturas e classifica quais reproduzem as remoções."""
    pilha = []
    fila = deque()
    prioridade = []  # heapq é min-heap; valores negativos simulam uma max-heap.

    pode_ser_pilha = True
    pode_ser_fila = True
    pode_ser_prioridade = True

    for tipo, valor in operacoes:
        if tipo == 1:
            # Toda inserção é reproduzida nas candidatas que ainda são possíveis.
            if pode_ser_pilha:
                pilha.append(valor)
            if pode_ser_fila:
                fila.append(valor)
            if pode_ser_prioridade:
                heapq.heappush(prioridade, -valor)
            continue

        # Na remoção, o valor observado precisa ser exatamente o que a estrutura
        # candidata retiraria naquele momento.
        if pode_ser_pilha and (not pilha or pilha.pop() != valor):
            pode_ser_pilha = False
        if pode_ser_fila and (not fila or fila.popleft() != valor):
            pode_ser_fila = False
        if pode_ser_prioridade and (
            not prioridade or -heapq.heappop(prioridade) != valor
        ):
            pode_ser_prioridade = False

    candidatas = sum((pode_ser_pilha, pode_ser_fila, pode_ser_prioridade))
    if candidatas == 0:
        return "impossible"
    if candidatas > 1:
        return "not sure"
    if pode_ser_pilha:
        return "stack"
    if pode_ser_fila:
        return "queue"
    return "priority queue"


# Os casos aparecem até EOF. Usar um iterador facilita consumir exatamente
# a quantidade de operações declarada em cada caso.
dados = iter(map(int, sys.stdin.buffer.read().split()))

while True:
    try:
        quantidade = next(dados)
    except StopIteration:
        break

    operacoes = [(next(dados), next(dados)) for _ in range(quantidade)]
    print(classificar(operacoes))
