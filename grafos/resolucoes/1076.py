def dfs(vertice, grafo, visitado):
    """Visita o componente e devolve quantas arestas descobriram vértices novos."""
    visitado[vertice] = True
    arestas_da_busca = 0

    # A DFS segue cada vizinho ainda não visitado e aprofunda a busca.
    for vizinho in grafo[vertice]:
        if not visitado[vizinho]:
            # Esta aresta entra na árvore da DFS porque alcançou um vértice novo.
            arestas_da_busca += 1
            arestas_da_busca += dfs(vizinho, grafo, visitado)

    return arestas_da_busca


# O primeiro valor informa quantos labirintos serão processados.
quantidade_de_casos = int(input())

for _ in range(quantidade_de_casos):
    origem = int(input())
    vertices, arestas = map(int, input().split())

    # Cada posição guarda somente os vizinhos do respectivo vértice.
    grafo = [[] for _ in range(vertices)]

    for _ in range(arestas):
        a, b = map(int, input().split())
        # O labirinto é um grafo não direcionado, então registramos os dois sentidos.
        grafo[a].append(b)
        grafo[b].append(a)

    visitado = [False] * vertices
    arestas_da_busca = dfs(origem, grafo, visitado)

    # Para sair da origem e voltar a ela, cada aresta da árvore é percorrida
    # uma vez na ida e outra na volta.
    print(arestas_da_busca * 2)
