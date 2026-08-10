import sys


def revisar(digito, numero):
    """Remove o dígito defeituoso e normaliza os zeros à esquerda."""
    # Manter o número como texto permite processar valores arbitrariamente grandes.
    resultado = numero.replace(digito, "").lstrip("0")
    return resultado or "0"


def main():
    respostas = []
    for linha in sys.stdin.buffer.read().decode().splitlines():
        if not linha.strip():
            continue
        digito, numero = linha.split()
        # O par 0 0 encerra a entrada sem produzir resposta.
        if digito == "0" and numero == "0":
            break
        respostas.append(revisar(digito, numero))
    # write não inclui "\n" por conta própria.
    sys.stdout.write("\n".join(respostas) + "\n")


if __name__ == "__main__":
    main()
