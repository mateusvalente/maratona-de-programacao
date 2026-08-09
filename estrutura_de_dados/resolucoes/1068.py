import sys


def esta_balanceada(expressao):
    """Verifica se os parênteses de uma expressão abrem e fecham na ordem correta."""
    pilha = []

    for caractere in expressao:
        if caractere == "(":
            # A abertura fica pendente até aparecer o fechamento correspondente.
            pilha.append(caractere)
        elif caractere == ")":
            # Fechar sem nenhuma abertura disponível invalida a expressão.
            if not pilha:
                return False
            pilha.pop()

    # Se ainda há itens na pilha, sobraram aberturas sem fechamento.
    return not pilha


# Cada linha da entrada é uma expressão; a leitura termina no fim do arquivo.
for linha in sys.stdin:
    expressao = linha.rstrip("\n")
    print("correct" if esta_balanceada(expressao) else "incorrect")
