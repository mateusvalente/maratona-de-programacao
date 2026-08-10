# Relação do algoritmo com o problema
# Objetivo: Alternar maiúscula e minúscula entre letras, ignorando espaços na alternância.
# Entrada: Várias linhas de texto até o fim do arquivo.
# Saída: Cada linha transformada, preservando os espaços.
#
# Passo a passo
# 1. Ler linhas até EOF.
# 2. Manter um booleano para a próxima letra.
# 3. Em letras, aplicar upper/lower e alternar.
# 4. Em espaços, preservar sem alternar.

# Implementação completa
while True:
    try:
        texto = input()
    except EOFError:
        break

    resultado = ""
    maiuscula = True

    for caractere in texto:
        if caractere.isalpha():
            if maiuscula:
                resultado += caractere.upper()
            else:
                resultado += caractere.lower()
            maiuscula = not maiuscula
        else:
            resultado += caractere

    print(resultado)
