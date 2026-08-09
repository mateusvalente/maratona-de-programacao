INF = 10**15


while True:
    n, e = map(int, input().split())

    if n == 0 and e == 0:
        break

    dist = [[INF] * n for _ in range(n)]

    for i in range(n):
        dist[i][i] = 0

    estradas = {}

    for _ in range(e):
        x, y, h = map(int, input().split())
        x -= 1
        y -= 1

        if (y, x) in estradas:
            dist[x][y] = 0
            dist[y][x] = 0
        else:
            estradas[(x, y)] = h
            dist[x][y] = min(dist[x][y], h)

    for k in range(n):
        for i in range(n):
            for j in range(n):
                novo = dist[i][k] + dist[k][j]
                if novo < dist[i][j]:
                    dist[i][j] = novo

    consultas = int(input())

    for _ in range(consultas):
        origem, destino = map(int, input().split())
        origem -= 1
        destino -= 1

        if dist[origem][destino] == INF:
            print("Nao e possivel entregar a carta")
        else:
            print(dist[origem][destino])

    print()
