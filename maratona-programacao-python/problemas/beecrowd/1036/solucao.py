a, b, c = map(float, input().split())

delta = b ** 2 - 4 * a * c

if a == 0 or delta < 0:
    print("Impossivel calcular")
else:
    raiz_delta = delta ** 0.5
    r1 = (-b + raiz_delta) / (2 * a)
    r2 = (-b - raiz_delta) / (2 * a)
    print(f"R1 = {r1:.5f}")
    print(f"R2 = {r2:.5f}")
