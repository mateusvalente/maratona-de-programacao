def calcula_fatorial(n):
    if n == 0 or n == 1:
        return 1

    fatorial = n
    i = n - 1

    while i > 0:
        fatorial *= i
        i -= 1

    return fatorial


while True:
    try:
        n1, n2 = map(int, input().split())

        fatorial1 = calcula_fatorial(n1)
        fatorial2 = calcula_fatorial(n2)

        resultado = fatorial1 + fatorial2

        print(resultado)

    except EOFError:
        break