import sys


def criptografar(mensagem):
    deslocada = [
        chr(ord(caractere) + 3)
        if "A" <= caractere <= "Z" or "a" <= caractere <= "z"
        else caractere
        for caractere in mensagem
    ]
    invertida = deslocada[::-1]
    metade = len(invertida) // 2
    return "".join(
        invertida[:metade]
        + [chr(ord(caractere) - 1) for caractere in invertida[metade:]]
    )


def main():
    linhas = sys.stdin.buffer.read().decode().splitlines()
    quantidade = int(linhas[0])
    respostas = [criptografar(linhas[i]) for i in range(1, quantidade + 1)]
    sys.stdout.write("\n".join(respostas))


if __name__ == "__main__":
    main()
