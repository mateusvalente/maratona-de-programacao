# Relação do algoritmo com o problema
# Objetivo: Calcular a duração de um jogo que pode atravessar a meia-noite.
# Entrada: Hora inicial e hora final, inteiras.
# Saída: O JOGO DUROU X HORA(S).
#
# Passo a passo
# 1. Ler início e fim.
# 2. Se o fim for maior, subtrair normalmente.
# 3. Caso contrário, completar as 24 horas.

# Implementação completa
inicio, fim = map(int, input().split())

if fim > inicio:
    duracao = fim - inicio
else:
    duracao = 24 - inicio + fim

print(f"O JOGO DUROU {duracao} HORA(S)")
