import sys


def flor_esta_protegida(r_cacador, x_cacador, y_cacador,
                        r_flor, x_flor, y_flor):
    """Testa se o círculo da flor está inteiramente dentro do círculo protetor."""
    # Um círculo maior nunca cabe dentro de outro menor.
    if r_flor > r_cacador:
        return False

    # A distância entre centros pode ser, no máximo, a diferença dos raios.
    # Comparamos valores ao quadrado para evitar uma raiz quadrada desnecessária.
    dx = x_cacador - x_flor
    dy = y_cacador - y_flor
    limite = r_cacador - r_flor
    return dx * dx + dy * dy <= limite * limite


def main():
    # Cada caso possui seis inteiros e a entrada termina em EOF.
    valores = list(map(int, sys.stdin.buffer.read().split()))
    respostas = []

    for i in range(0, len(valores), 6):
        caso = valores[i:i + 6]
        protegida = flor_esta_protegida(*caso)
        respostas.append("RICO" if protegida else "MORTO")

    # Acumular as respostas reduz chamadas repetidas de escrita.
    sys.stdout.write("\n".join(respostas) + "\n")


if __name__ == "__main__":
    main()
