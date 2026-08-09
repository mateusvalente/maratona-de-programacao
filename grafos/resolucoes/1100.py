from collections import deque
import sys


MOVIMENTOS = [
    (2, 1), (2, -1), (-2, 1), (-2, -1),
    (1, 2), (1, -2), (-1, 2), (-1, -2),
]


def para_coord(posicao):
    coluna = ord(posicao[0]) - ord("a")
    linha = int(posicao[1]) - 1
    return linha, coluna


def dentro(linha, coluna):
    return 0 <= linha < 8 and 0 <= coluna < 8


def bfs(origem, destino):
    if origem == destino:
        return 0

    inicio = para_coord(origem)
    fim = para_coord(destino)

    visitado = [[False] * 8 for _ in range(8)]
    fila = deque([(inicio[0], inicio[1], 0)])
    visitado[inicio[0]][inicio[1]] = True

    while fila:
        linha, coluna, distancia = fila.popleft()

        for dl, dc in MOVIMENTOS:
            nl = linha + dl
            nc = coluna + dc

            if not dentro(nl, nc) or visitado[nl][nc]:
                continue

            if (nl, nc) == fim:
                return distancia + 1

            visitado[nl][nc] = True
            fila.append((nl, nc, distancia + 1))

    return -1


for linha in sys.stdin:
    linha = linha.strip()
    if not linha:
        continue

    origem, destino = linha.split()
    resposta = bfs(origem, destino)
    print(f"To get from {origem} to {destino} takes {resposta} knight moves.")
