import sys


def revisar(digito, numero):
    # Filtra o dígito e normaliza zeros à esquerda sem converter o número inteiro.
    resultado = numero.replace(digito, "").lstrip("0")
    return resultado or "0"


def main():
    respostas = []
    for linha in sys.stdin.buffer.read().decode().splitlines():
        if not linha.strip():
            continue
        digito, numero = linha.split()
        # O par 0 0 encerra a entrada.
        if digito == "0" and numero == "0":
            break
        respostas.append(revisar(digito, numero))
    sys.stdout.write("\n".join(respostas) + "\n")


if __name__ == "__main__":
    main()
