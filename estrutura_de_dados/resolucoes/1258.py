class Camiseta:
    """Agrupa os quatro dados de cada inscrição em um único objeto."""

    def __init__(self, nome, cor, tamanho):
        self.nome = nome
        self.cor = cor
        self.tamanho = tamanho


def comparar(a, b):
    """Compara duas camisetas segundo a ordem exigida pelo enunciado."""
    # Primeiro: cor em ordem alfabética.
    if a.cor != b.cor:
        return -1 if a.cor < b.cor else 1

    # Segundo: tamanho decrescente (P vem depois de M e G).
    if a.tamanho != b.tamanho:
        return -1 if a.tamanho > b.tamanho else 1

    # Terceiro: nome em ordem alfabética.
    if a.nome != b.nome:
        return -1 if a.nome < b.nome else 1
    return 0


def particionar(valores, inicio, fim):
    """Posiciona o último item e devolve seu índice; fim é exclusivo."""
    pivo = valores[fim - 1]
    posicao_dos_menores = inicio

    # Tudo antes de posicao_dos_menores já é menor que o pivô.
    for indice in range(inicio, fim - 1):
        if comparar(valores[indice], pivo) < 0:
            valores[posicao_dos_menores], valores[indice] = (
                valores[indice],
                valores[posicao_dos_menores],
            )
            posicao_dos_menores += 1

    # Coloca o pivô entre os grupos menor e maior/igual.
    valores[posicao_dos_menores], valores[fim - 1] = (
        valores[fim - 1],
        valores[posicao_dos_menores],
    )
    return posicao_dos_menores


def quicksort(valores, inicio, fim):
    """Ordena, in-place, o intervalo semiaberto [inicio, fim)."""
    if fim - inicio <= 1:
        return

    posicao_do_pivo = particionar(valores, inicio, fim)
    quicksort(valores, inicio, posicao_do_pivo)
    quicksort(valores, posicao_do_pivo + 1, fim)


primeiro_caso = True

while True:
    quantidade = int(input())
    if quantidade == 0:
        break

    # O beecrowd pede uma linha vazia entre casos, mas não antes do primeiro.
    if not primeiro_caso:
        print()
    primeiro_caso = False

    camisetas = []
    for _ in range(quantidade):
        nome = input()
        cor, tamanho = input().split()
        camisetas.append(Camiseta(nome, cor, tamanho))

    quicksort(camisetas, 0, len(camisetas))

    for camiseta in camisetas:
        print(camiseta.cor, camiseta.tamanho, camiseta.nome)
