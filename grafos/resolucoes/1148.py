INF = 10**15


def dijkstra(origem, destino, grafo, quantidade_de_cidades):
    """Encontra o menor custo entre duas cidades com pesos não negativos."""
    distancia = [INF] * (quantidade_de_cidades + 1)
    visitado = [False] * (quantidade_de_cidades + 1)
    distancia[origem] = 0

    for _ in range(quantidade_de_cidades):
        # Escolhe, entre as cidades abertas, aquela com menor distância conhecida.
        atual = -1
        for cidade in range(1, quantidade_de_cidades + 1):
            if not visitado[cidade] and (
                atual == -1 or distancia[cidade] < distancia[atual]
            ):
                atual = cidade

        # Não existe outro vértice alcançável ou o destino já foi resolvido.
        if atual == -1 or distancia[atual] == INF:
            break

        visitado[atual] = True
        if atual == destino:
            break

        # Relaxa todas as arestas que saem da cidade escolhida.
        for vizinho in range(1, quantidade_de_cidades + 1):
            peso = grafo[atual][vizinho]
            novo_custo = distancia[atual] + peso

            if peso != INF and novo_custo < distancia[vizinho]:
                distancia[vizinho] = novo_custo

    return distancia[destino]


while True:
    cidades, acordos = map(int, input().split())

    # O par 0 0 encerra toda a entrada.
    if cidades == 0 and acordos == 0:
        break

    # A matriz guarda o tempo de cada acordo; INF significa ausência de ligação.
    grafo = [[INF] * (cidades + 1) for _ in range(cidades + 1)]
    for cidade in range(1, cidades + 1):
        grafo[cidade][cidade] = 0

    for _ in range(acordos):
        origem, destino, horas = map(int, input().split())
        grafo[origem][destino] = min(grafo[origem][destino], horas)

        # Quando também existe acordo no sentido contrário, as duas cidades
        # enviam cartas entre si sem custo.
        if grafo[destino][origem] != INF:
            grafo[origem][destino] = 0
            grafo[destino][origem] = 0

    consultas = int(input())

    for _ in range(consultas):
        origem, destino = map(int, input().split())
        resposta = dijkstra(origem, destino, grafo, cidades)

        if resposta == INF:
            print("Nao e possivel entregar a carta")
        else:
            print(resposta)

    # O enunciado exige uma linha vazia depois das respostas de cada caso.
    print()
