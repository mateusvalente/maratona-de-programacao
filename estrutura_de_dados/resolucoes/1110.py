from collections import deque


while True:
    quantidade = int(input())

    # O valor zero não representa um baralho: ele encerra a entrada.
    if quantidade == 0:
        break

    # O início do deque é o topo do baralho e o fim é a base.
    cartas = deque(range(1, quantidade + 1))
    descartadas = []

    while len(cartas) > 1:
        # A carta do topo sai definitivamente do baralho.
        descartadas.append(cartas.popleft())

        # A nova carta do topo é retirada e recolocada na base.
        cartas.append(cartas.popleft())

    texto_descartadas = ", ".join(map(str, descartadas))
    print(f"Discarded cards: {texto_descartadas}")
    print(f"Remaining card: {cartas[0]}")
