import sys


def flor_esta_protegida(r_cacador, x_cacador, y_cacador,
                        r_flor, x_flor, y_flor):
    if r_flor > r_cacador:
        return False

    dx = x_cacador - x_flor
    dy = y_cacador - y_flor
    limite = r_cacador - r_flor
    return dx * dx + dy * dy <= limite * limite


def main():
    valores = list(map(int, sys.stdin.buffer.read().split()))
    respostas = []

    for i in range(0, len(valores), 6):
        caso = valores[i:i + 6]
        protegida = flor_esta_protegida(*caso)
        respostas.append("RICO" if protegida else "MORTO")

    sys.stdout.write("\n".join(respostas))


if __name__ == "__main__":
    main()
