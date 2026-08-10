# Relação do algoritmo com o problema
# Objetivo: Somar ao salário fixo uma comissão de 15% sobre as vendas.
# Entrada: Nome, salário fixo e total de vendas, cada informação em uma linha.
# Saída: TOTAL = R$ valor com duas casas decimais.
#
# Passo a passo
# 1. Ler o nome, o salário e as vendas.
# 2. Calcular 15% das vendas.
# 3. Somar a comissão ao salário.
# 4. Formatar duas casas.

# Implementação completa
nome = input()
salario_fixo = float(input())
total_vendas = float(input())

comissao = total_vendas * 0.15
total = salario_fixo + comissao

print(f"TOTAL = R$ {total:.2f}")
