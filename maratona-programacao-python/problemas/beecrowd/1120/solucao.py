# Relação do algoritmo com o problema
# Objetivo: Remover de um número todas as ocorrências de um dígito defeituoso e eliminar zeros à esquerda.
# Entrada: Vários pares dígito/número; a entrada termina com 0 0.
# Saída: O número corrigido de cada caso, ou 0 se nada significativo restar.
#
# Passo a passo
# 1. Ler dígito e número como strings.
# 2. Parar no par 0 0.
# 3. Remover o dígito com replace.
# 4. Remover zeros à esquerda e tratar resultado vazio.

# Implementação completa
while True:
    digito, numero = input().split()

    if digito == "0" and numero == "0":
        break

    corrigido = numero.replace(digito, "")
    corrigido = corrigido.lstrip("0")

    if corrigido == "":
        corrigido = "0"

    print(corrigido)
