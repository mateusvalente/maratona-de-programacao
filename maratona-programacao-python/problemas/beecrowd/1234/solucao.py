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
