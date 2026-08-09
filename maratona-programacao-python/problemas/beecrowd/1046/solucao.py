inicio, fim = map(int, input().split())

if fim > inicio:
    duracao = fim - inicio
else:
    duracao = 24 - inicio + fim

print(f"O JOGO DUROU {duracao} HORA(S)")
