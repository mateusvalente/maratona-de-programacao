# Relação do algoritmo com o problema
# Objetivo: Calcular uma média ponderada e decidir aprovação, reprovação ou exame.
# Entrada: Quatro notas na primeira linha e, quando necessário, a nota do exame na linha seguinte.
# Saída: Média e situação; no caso de exame, também nota e média final.
#
# Passo a passo
# 1. Calcular média com pesos 2, 3, 4 e 1.
# 2. Se média >= 7, aprovar.
# 3. Se média < 5, reprovar.
# 4. Caso contrário, ler exame e calcular média final.

# Implementação completa
n1, n2, n3, n4 = map(float, input().split())

media = (n1 * 2 + n2 * 3 + n3 * 4 + n4) / 10
print(f"Media: {media:.1f}")

if media >= 7:
    print("Aluno aprovado.")
elif media < 5:
    print("Aluno reprovado.")
else:
    print("Aluno em exame.")
    exame = float(input())
    print(f"Nota do exame: {exame:.1f}")
    media_final = (media + exame) / 2
    if media_final >= 5:
        print("Aluno aprovado.")
    else:
        print("Aluno reprovado.")
    print(f"Media final: {media_final:.1f}")
