nome = input()
salario_fixo = float(input())
total_vendas = float(input())

comissao = total_vendas * 0.15
total = salario_fixo + comissao

print(f"TOTAL = R$ {total:.2f}")
