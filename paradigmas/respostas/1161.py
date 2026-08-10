def calcula_fatorial(n):
    # Calcula n! iterativamente; por definição, 0! e 1! valem 1.
    if n == 0 or n == 1:
        return 1

    fatorial = n
    i = n - 1

    # Multiplica n por todos os antecessores até 1.
    while i > 0:
        fatorial *= i
        i -= 1

    return fatorial


while True:
    try:
        # Cada linha é um caso, e a entrada termina em EOF.
        n1, n2 = map(int, input().split())

        fatorial1 = calcula_fatorial(n1)
        fatorial2 = calcula_fatorial(n2)

        resultado = fatorial1 + fatorial2

        print(resultado)

    except EOFError:
        break
