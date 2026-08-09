import math
import sys


def lado_do_quadrado(lado_do_pentagono):
    return (
        lado_do_pentagono
        * math.sin(math.radians(108.0))
        / math.sin(math.radians(63.0))
    )


def main():
    entradas = map(float, sys.stdin.buffer.read().split())
    respostas = [f"{lado_do_quadrado(valor):.10f}" for valor in entradas]
    sys.stdout.write("\n".join(respostas))


if __name__ == "__main__":
    main()
