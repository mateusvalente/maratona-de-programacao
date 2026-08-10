import sys


def transformar_sentenca(sentenca):
    # O booleano guarda a caixa esperada para a próxima letra.
    usar_maiuscula = True
    resposta = []

    for caractere in sentenca:
        if caractere.isalpha():
            resposta.append(
                caractere.upper() if usar_maiuscula else caractere.lower()
            )
            usar_maiuscula = not usar_maiuscula
        else:
            # Espaços e símbolos não alteram o estado.
            resposta.append(caractere)

    return "".join(resposta)


def main():
    linhas = sys.stdin.buffer.read().decode().splitlines()
    sys.stdout.write("\n".join(map(transformar_sentenca, linhas)) + "\n")


if __name__ == "__main__":
    main()
