custos = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6]

n = int(input())

for i in range(n):
    numero = input().strip()
    total = 0

    for digito in numero:
        total += custos[int(digito)]

    print(f"{total} leds")
