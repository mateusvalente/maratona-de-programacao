a, b, c, d = map(int, input().split())

condicoes = (
    b > c
    and d > a
    and c + d > a + b
    and c > 0
    and d > 0
    and a % 2 == 0
)

if condicoes:
    print("Valores aceitos")
else:
    print("Valores nao aceitos")
