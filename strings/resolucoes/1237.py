import sys


def maior_substring_comum(a, b):
    """Calcula a maior substring comum com DP de memória otimizada."""
    # b será a menor string para reduzir a memória para O(min(n, m)).
    if len(b) > len(a):
        a, b = b, a

    # anterior representa a linha anterior da tabela de programação dinâmica.
    anterior = [0] * (len(b) + 1)
    melhor = 0

    for caractere_a in a:
        atual = [0] * (len(b) + 1)
        for j, caractere_b in enumerate(b, start=1):
            if caractere_a == caractere_b:
                # A coincidência estende a diagonal; diferenças permanecem zero
                # porque uma substring não pode pular caracteres.
                atual[j] = anterior[j - 1] + 1
                melhor = max(melhor, atual[j])
        anterior = atual

    return melhor


def main():
    # Cada caso possui duas linhas e a entrada termina em EOF.
    linhas = sys.stdin.buffer.read().decode().splitlines()
    respostas = []
    for i in range(0, len(linhas) - 1, 2):
        respostas.append(str(maior_substring_comum(linhas[i], linhas[i + 1])))
    sys.stdout.write("\n".join(respostas) + "\n")


if __name__ == "__main__":
    main()
