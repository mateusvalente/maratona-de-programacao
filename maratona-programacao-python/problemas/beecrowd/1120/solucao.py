while True:
    digito, numero = input().split()

    if digito == "0" and numero == "0":
        break

    corrigido = numero.replace(digito, "")
    corrigido = corrigido.lstrip("0")

    if corrigido == "":
        corrigido = "0"

    print(corrigido)
