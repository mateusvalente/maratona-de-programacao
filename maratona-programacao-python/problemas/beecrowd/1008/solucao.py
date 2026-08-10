# Relação do algoritmo com o problema
# Objetivo: Calcular o salário a partir das horas trabalhadas e do valor por hora.
# Entrada: Número do funcionário, horas inteiras e valor decimal por hora, em linhas separadas.
# Saída: Duas linhas: NUMBER = id e SALARY = U$ valor com duas casas.
#
# Passo a passo
# 1. Ler identificador, horas e valor por hora.
# 2. Multiplicar horas pelo valor.
# 3. Imprimir as duas linhas no formato exato.

# Implementação completa
numero = int(input())
horas = int(input())
valor_por_hora = float(input())

salario = horas * valor_por_hora

print(f"NUMBER = {numero}")
print(f"SALARY = U$ {salario:.2f}")
