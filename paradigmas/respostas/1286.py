import sys

# O formato possui muitos inteiros; o buffer oferece leitura direta em bytes.
entrada = sys.stdin.buffer

while True:
    n = int(entrada.readline())

    if n == 0:
        break

    pizzas = int(entrada.readline())

    # dp[c] é o maior tempo economizado usando, no máximo, c pizzas.
    dp = [0] * (pizzas + 1)

    for _ in range(n):
        tempo, quantidade = map(int, entrada.readline().split())

        # Percorre de trás para frente porque cada pedido só pode ser escolhido
        # uma vez; avançar permitiria reutilizar o pedido na mesma rodada.
        for capacidade in range(pizzas, quantidade - 1, -1):
            dp[capacidade] = max(
                dp[capacidade],
                dp[capacidade - quantidade] + tempo
            )

    print(f"{dp[pizzas]} min.")
