# Relação do algoritmo com o problema
# Objetivo: Verificar se um dos dois inteiros é múltiplo do outro.
# Entrada: Dois inteiros A e B.
# Saída: Sao Multiplos ou Nao sao Multiplos.
#
# Passo a passo
# 1. Ler A e B.
# 2. Testar B % A e A % B.
# 3. Aceitar se pelo menos um resto for zero.

# Implementação completa
a, b = map(int, input().split())

if a % b == 0 or b % a == 0:
    print("Sao Multiplos")
else:
    print("Nao sao Multiplos")
