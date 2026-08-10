# Fatoriais de 8! até 1!, em ordem decrescente.
fatorial = [40320, 5040, 720, 120, 24, 6, 2, 1]

N = int(input())

resultado = 0
for f in fatorial:
    # A escolha gulosa usa o maior número possível de parcelas f.
    resultado += N//f
    # O restante segue para o próximo fatorial menor.
    N %= f

print(resultado)
