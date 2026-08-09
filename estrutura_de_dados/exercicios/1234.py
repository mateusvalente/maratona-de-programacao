import sys


def transformar_sentenca(sentenca):
    usar_maiuscula = True
    resposta = []

    for caractere in sentenca:
        if caractere.isalpha():
            resposta.append(
                caractere.upper() if usar_maiuscula else caractere.lower()
            )
            usar_maiuscula = not usar_maiuscula
        else:
            resposta.append(caractere)

    return "".join(resposta)


def main():
    linhas = sys.stdin.buffer.read().decode().splitlines()
    sys.stdout.write("\n".join(map(transformar_sentenca, linhas)))


if __name__ == "__main__":
    main()
