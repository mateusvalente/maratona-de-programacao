from collections import deque
import sys


# Os oito deslocamentos possíveis de um cavalo: duas casas em um eixo
# e uma casa no outro eixo.
MOVIMENTOS = (
    (2, 1), (2, -1), (-2, 1), (-2, -1),
    (1, 2), (1, -2), (-1, 2), (-1, -2),
)


def para_coordenada(posicao):
    """Converte uma casa como 'a1' para índices de linha e coluna entre 0 e 7."""
    coluna = ord(posicao[0]) - ord("a")
    linha = int(posicao[1]) - 1
    return linha, coluna


def esta_no_tabuleiro(linha, coluna):
    """Informa se a coordenada pertence ao tabuleiro 8 x 8."""
    return 0 <= linha < 8 and 0 <= coluna < 8


def bfs(origem, destino):
    """Calcula o menor número de movimentos entre duas casas com BFS."""
    inicio = para_coordenada(origem)
    fim = para_coordenada(destino)

    # A fila mantém as casas por camadas de distância.
    fila = deque([(inicio[0], inicio[1], 0)])
    visitado = [[False] * 8 for _ in range(8)]
    visitado[inicio[0]][inicio[1]] = True

    while fila:
        linha, coluna, distancia = fila.popleft()

        # A primeira retirada do destino ocorre pelo menor caminho possível.
        if (linha, coluna) == fim:
            return distancia

        for delta_linha, delta_coluna in MOVIMENTOS:
            nova_linha = linha + delta_linha
            nova_coluna = coluna + delta_coluna

            if (
                esta_no_tabuleiro(nova_linha, nova_coluna)
                and not visitado[nova_linha][nova_coluna]
            ):
                # Marcar ao entrar na fila impede que a mesma casa seja enfileirada
                # várias vezes por caminhos diferentes.
                visitado[nova_linha][nova_coluna] = True
                fila.append((nova_linha, nova_coluna, distancia + 1))

    return -1  # Não ocorre em um tabuleiro comum, mas completa o contrato da função.


# O problema fornece pares de casas até o fim do arquivo.
for linha_de_entrada in sys.stdin:
    linha_de_entrada = linha_de_entrada.strip()
    if not linha_de_entrada:
        continue

    origem, destino = linha_de_entrada.split()
    resposta = bfs(origem, destino)
    print(f"To get from {origem} to {destino} takes {resposta} knight moves.")
