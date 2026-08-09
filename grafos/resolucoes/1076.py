def dfs(v, grafo, visitado):
    visitado[v] = True
    movimentos = 0

    for vizinho in grafo[v]:
        if not visitado[vizinho]:
            movimentos += 1
            movimentos += dfs(vizinho, grafo, visitado)

    return movimentos


t = int(input())

for _ in range(t):
    origem = int(input())
    vertices, arestas = map(int, input().split())

    grafo = [[] for _ in range(vertices)]

    for _ in range(arestas):
        a, b = map(int, input().split())
        grafo[a].append(b)
        grafo[b].append(a)

    visitado = [False] * vertices
    arestas_da_busca = dfs(origem, grafo, visitado)

    print(arestas_da_busca * 2)
