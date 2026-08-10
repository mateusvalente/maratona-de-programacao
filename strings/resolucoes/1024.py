import sys


def criptografar(mensagem):
    """Executa, na ordem, as três fases descritas pelo enunciado."""
    # Fase 1: somente letras ASCII avançam três códigos.
    deslocada = [
        chr(ord(caractere) + 3)
        if "A" <= caractere <= "Z" or "a" <= caractere <= "z"
        else caractere
        for caractere in mensagem
    ]
    # Fase 2: a mensagem inteira é invertida.
    invertida = deslocada[::-1]
    metade = len(invertida) // 2
    # Fase 3: os caracteres da metade final recuam um código.
    return "".join(
        invertida[:metade]
        + [chr(ord(caractere) - 1) for caractere in invertida[metade:]]
    )


def main():
    # A primeira linha informa quantas mensagens devem ser transformadas.
    linhas = sys.stdin.buffer.read().decode().splitlines()
    quantidade = int(linhas[0])
    respostas = [criptografar(linhas[i]) for i in range(1, quantidade + 1)]
    # write não acrescenta quebra automaticamente; fechamos também a última linha.
    sys.stdout.write("\n".join(respostas) + "\n")


if __name__ == "__main__":
    main()
