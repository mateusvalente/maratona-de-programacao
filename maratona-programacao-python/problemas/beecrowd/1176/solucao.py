# Relação do algoritmo com o problema
# Objetivo: Responder vários pedidos de Fibonacci até a posição 60.
# Entrada: Quantidade T e depois T índices, um por linha.
# Saída: Para cada índice, Fib(n) = valor.
#
# Passo a passo
# 1. Construir Fibonacci de 0 até 60 uma única vez.
# 2. Ler T.
# 3. Para cada consulta, acessar a posição pronta.
# 4. Imprimir o formato pedido.

# Implementação completa
fibonacci = [0, 1]

for i in range(2, 61):
    proximo = fibonacci[i - 1] + fibonacci[i - 2]
    fibonacci.append(proximo)

t = int(input())

for i in range(t):
    n = int(input())
    print(f"Fib({n}) = {fibonacci[n]}")
