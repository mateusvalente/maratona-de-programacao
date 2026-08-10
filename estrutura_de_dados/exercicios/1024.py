import sys


def criptografar(mensagem):
    # Fase 1: desloca somente letras; espaços e símbolos permanecem iguais.
    deslocada = [
        chr(ord(caractere) + 3)
        if "A" <= caractere <= "Z" or "a" <= caractere <= "z"
        else caractere
        for caractere in mensagem
    ]
    # Fase 2: inverte a mensagem inteira.
    invertida = deslocada[::-1]
    metade = len(invertida) // 2
    # Fase 3: recua os caracteres da metade final.
    return "".join(
        invertida[:metade]
        + [chr(ord(caractere) - 1) for caractere in invertida[metade:]]
    )


def main():
    linhas = sys.stdin.buffer.read().decode().splitlines()
    quantidade = int(linhas[0])
    respostas = [criptografar(linhas[i]) for i in range(1, quantidade + 1)]
    # write não acrescenta a quebra da última linha automaticamente.
    sys.stdout.write("\n".join(respostas) + "\n")


if __name__ == "__main__":
    main()
