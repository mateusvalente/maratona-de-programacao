# Relação do algoritmo com o problema
# Objetivo: Descobrir em qual dos intervalos definidos um número se encontra.
# Entrada: Um número decimal.
# Saída: O intervalo correspondente ou Fora de intervalo.
#
# Passo a passo
# 1. Ler o valor.
# 2. Testar intervalos em ordem.
# 3. Respeitar pontas abertas e fechadas.
# 4. Usar else para valores externos.

# Implementação completa
valor = float(input())

if 0 <= valor <= 25:
    print("Intervalo [0,25]")
elif 25 < valor <= 50:
    print("Intervalo (25,50]")
elif 50 < valor <= 75:
    print("Intervalo (50,75]")
elif 75 < valor <= 100:
    print("Intervalo (75,100]")
else:
    print("Fora de intervalo")
