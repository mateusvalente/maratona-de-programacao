# Relação do algoritmo com o problema
# Objetivo: Verificar simultaneamente várias regras envolvendo quatro inteiros.
# Entrada: A, B, C e D na mesma linha.
# Saída: Valores aceitos se todas as condições forem verdadeiras; caso contrário, Valores nao aceitos.
#
# Passo a passo
# 1. Ler os quatro inteiros.
# 2. Montar cada comparação.
# 3. Unir todas com and.
# 4. Escolher a mensagem com if/else.

# Implementação completa
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
