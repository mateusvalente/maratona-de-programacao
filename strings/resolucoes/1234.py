import sys


def transformar_sentenca(sentenca):
    """Alterna a caixa das letras sem deixar espaços alterarem o estado."""
    usar_maiuscula = True
    resposta = []

    for caractere in sentenca:
        if caractere.isalpha():
            # O estado determina a caixa desta letra e muda para a próxima.
            resposta.append(
                caractere.upper() if usar_maiuscula else caractere.lower()
            )
            usar_maiuscula = not usar_maiuscula
        else:
            # Espaços e sinais são copiados sem consumir a alternância.
            resposta.append(caractere)

    return "".join(resposta)


def main():
    # O problema fornece sentenças até o fim do arquivo.
    linhas = sys.stdin.buffer.read().decode().splitlines()
    sys.stdout.write("\n".join(map(transformar_sentenca, linhas)) + "\n")


if __name__ == "__main__":
    main()
