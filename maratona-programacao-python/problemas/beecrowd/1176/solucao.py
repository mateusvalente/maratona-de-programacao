fibonacci = [0, 1]

for i in range(2, 61):
    proximo = fibonacci[i - 1] + fibonacci[i - 2]
    fibonacci.append(proximo)

t = int(input())

for i in range(t):
    n = int(input())
    print(f"Fib({n}) = {fibonacci[n]}")
