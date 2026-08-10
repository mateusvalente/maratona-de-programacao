# Relação do algoritmo com o problema
# Objetivo: Contar quantos valores estão dentro e fora do intervalo fechado [10, 20].
# Entrada: N e depois N inteiros, um por linha.
# Saída: Duas linhas com in e out.
#
# Passo a passo
# 1. Ler N.
# 2. Repetir N leituras.
# 3. Testar 10 <= valor <= 20.
# 4. Atualizar in ou out.

# Implementação completa
n = int(input())
dentro = 0
fora = 0

for i in range(n):
    valor = int(input())
    if 10 <= valor <= 20:
        dentro += 1
    else:
        fora += 1

print(f"{dentro} in")
print(f"{fora} out")
