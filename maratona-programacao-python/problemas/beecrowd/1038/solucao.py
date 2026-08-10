# Relação do algoritmo com o problema
# Objetivo: Usar o código do item para escolher o preço e calcular o total.
# Entrada: Código do produto e quantidade, na mesma linha.
# Saída: Total: R$ valor com duas casas.
#
# Passo a passo
# 1. Ler código e quantidade.
# 2. Escolher o preço com if/elif.
# 3. Multiplicar pela quantidade.
# 4. Formatar o total.

# Implementação completa
codigo, quantidade = map(int, input().split())

if codigo == 1:
    preco = 4.00
elif codigo == 2:
    preco = 4.50
elif codigo == 3:
    preco = 5.00
elif codigo == 4:
    preco = 2.00
else:
    preco = 1.50

total = preco * quantidade
print(f"Total: R$ {total:.2f}")
