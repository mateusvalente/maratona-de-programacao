(function (root) {
  function problem(id, title, topic, difficulty, summary, input, output, sampleInput, sampleOutput, algorithm, trace, errors, code) {
    // A mesma versão comentada alimenta a aula HTML e o arquivo solucao.py.
    // Assim, a explicação acompanha o programa sem criar duas versões divergentes.
    const linhaDeComentario = (rotulo, texto) =>
      `# ${rotulo}: ${String(texto).replace(/\s+/g, " ").trim()}`;

    const commentedCode = [
      "# Relação do algoritmo com o problema",
      linhaDeComentario("Objetivo", summary),
      linhaDeComentario("Entrada", input),
      linhaDeComentario("Saída", output),
      "#",
      "# Passo a passo",
      ...algorithm.map((step, index) => `# ${index + 1}. ${step}`),
      "",
      "# Implementação completa",
      code.trim(),
    ].join("\n");

    return {
      id,
      title,
      topic,
      difficulty,
      summary,
      input,
      output,
      sampleInput,
      sampleOutput,
      algorithm,
      trace,
      errors,
      code: commentedCode,
    };
  }

  const problems = [
    problem(1000, "Hello World!", "Saída", "Muito fácil",
      "Produzir a primeira saída exatamente como o juiz espera.",
      "Este problema não fornece valores de entrada.",
      "Uma única linha com a mensagem Hello World!",
      "(sem entrada)", "Hello World!",
      ["Chamar print com o texto pedido.", "Não acrescentar nenhuma outra mensagem."],
      ["O programa inicia.", "print envia a string para a saída.", "A execução termina."],
      ["Trocar maiúsculas ou pontuação.", "Imprimir aspas junto com a mensagem."],
      `print("Hello World!")`),

    problem(1001, "Extremamente Básico", "Entrada, saída e soma", "Muito fácil",
      "Ler dois inteiros, somá-los e apresentar o resultado com o rótulo X.",
      "Dois inteiros, um em cada linha.",
      "A soma no formato X = resultado.",
      "10\n9", "X = 19",
      ["Ler o primeiro inteiro em A.", "Ler o segundo inteiro em B.", "Calcular A + B.", "Imprimir X = soma."],
      ["A recebe 10.", "B recebe 9.", "soma recebe 10 + 9 = 19.", "A saída é X = 19."],
      ["Esquecer int e concatenar textos.", "Imprimir SOMA em vez de X.", "Remover os espaços ao redor de =."],
      `a = int(input())
b = int(input())

soma = a + b

print(f"X = {soma}")`),

    problem(1002, "Área do Círculo", "Matemática e formatação", "Muito fácil",
      "Calcular a área de um círculo usando o raio informado e pi igual a 3.14159.",
      "Um número decimal representando o raio.",
      "A área no formato A=valor, com quatro casas decimais.",
      "2.00", "A=12.5664",
      ["Ler o raio como float.", "Definir pi como 3.14159.", "Calcular pi vezes raio ao quadrado.", "Imprimir quatro casas decimais."],
      ["raio recebe 2.0.", "raio ** 2 produz 4.0.", "3.14159 * 4.0 produz 12.56636.", "A formatação arredonda para 12.5664."],
      ["Usar outro valor de pi.", "Esquecer as quatro casas.", "Imprimir espaço ao redor de =."],
      `raio = float(input())

pi = 3.14159
area = pi * raio ** 2

print(f"A={area:.4f}")`),

    problem(1003, "Soma Simples", "Entrada, saída e soma", "Muito fácil",
      "Somar dois inteiros e usar o rótulo SOMA na resposta.",
      "Dois inteiros, um por linha.",
      "A soma no formato SOMA = resultado.",
      "30\n10", "SOMA = 40",
      ["Ler A e B.", "Somar os valores.", "Imprimir com o rótulo SOMA."],
      ["A recebe 30 e B recebe 10.", "soma recebe 40.", "A resposta usa SOMA = 40."],
      ["Confundir com o formato do problema 1001.", "Ler float sem necessidade."],
      `a = int(input())
b = int(input())

soma = a + b

print(f"SOMA = {soma}")`),

    problem(1004, "Produto Simples", "Multiplicação", "Muito fácil",
      "Multiplicar dois inteiros e apresentar o produto.",
      "Dois inteiros, um por linha.",
      "O valor no formato PROD = resultado.",
      "3\n9", "PROD = 27",
      ["Ler os dois inteiros.", "Multiplicar com *.", "Imprimir PROD."],
      ["A recebe 3.", "B recebe 9.", "produto recebe 3 * 9 = 27."],
      ["Usar + no lugar de *.", "Escrever PRODUTO em vez de PROD."],
      `a = int(input())
b = int(input())

produto = a * b

print(f"PROD = {produto}")`),

    problem(1005, "Média 1", "Média ponderada", "Muito fácil",
      "Calcular a média de duas notas com pesos 3.5 e 7.5.",
      "Duas notas decimais, uma por linha.",
      "MEDIA = valor com cinco casas decimais.",
      "5.0\n7.1", "MEDIA = 6.43182",
      ["Ler A e B como float.", "Multiplicar cada nota por seu peso.", "Dividir a soma dos produtos por 11.", "Imprimir cinco casas."],
      ["A * 3.5 = 17.5.", "B * 7.5 = 53.25.", "70.75 / 11 = 6.431818...", "A saída arredonda para 6.43182."],
      ["Fazer média aritmética simples.", "Dividir por 2 em vez da soma dos pesos.", "Usar vírgula decimal no código."],
      `a = float(input())
b = float(input())

media = (a * 3.5 + b * 7.5) / 11

print(f"MEDIA = {media:.5f}")`),

    problem(1006, "Média 2", "Média ponderada", "Muito fácil",
      "Calcular a média ponderada de três notas com pesos 2, 3 e 5.",
      "Três notas decimais, uma em cada linha.",
      "MEDIA = valor com uma casa decimal.",
      "5.0\n6.0\n7.0", "MEDIA = 6.3",
      ["Ler A, B e C.", "Aplicar os pesos 2, 3 e 5.", "Dividir pela soma dos pesos, 10.", "Formatar uma casa."],
      ["Produtos: 10, 18 e 35.", "A soma ponderada é 63.", "63 / 10 = 6.3."],
      ["Usar os pesos do problema anterior.", "Esquecer os parênteses no numerador."],
      `a = float(input())
b = float(input())
c = float(input())

media = (a * 2 + b * 3 + c * 5) / 10

print(f"MEDIA = {media:.1f}")`),

    problem(1007, "Diferença", "Expressão matemática", "Muito fácil",
      "Calcular a diferença entre o produto de A por B e o produto de C por D.",
      "Quatro inteiros, um por linha.",
      "DIFERENCA = resultado.",
      "5\n6\n7\n8", "DIFERENCA = -26",
      ["Ler A, B, C e D.", "Calcular A * B.", "Calcular C * D.", "Subtrair o segundo produto do primeiro."],
      ["5 * 6 = 30.", "7 * 8 = 56.", "30 - 56 = -26."],
      ["Trocar a ordem da subtração.", "Somar os quatro valores.", "Escrever DIFERENÇA com acento na saída."],
      `a = int(input())
b = int(input())
c = int(input())
d = int(input())

diferenca = a * b - c * d

print(f"DIFERENCA = {diferenca}")`),

    problem(1008, "Salário", "Multiplicação e formatação", "Muito fácil",
      "Calcular o salário a partir das horas trabalhadas e do valor por hora.",
      "Número do funcionário, horas inteiras e valor decimal por hora, em linhas separadas.",
      "Duas linhas: NUMBER = id e SALARY = U$ valor com duas casas.",
      "25\n100\n5.50", "NUMBER = 25\nSALARY = U$ 550.00",
      ["Ler identificador, horas e valor por hora.", "Multiplicar horas pelo valor.", "Imprimir as duas linhas no formato exato."],
      ["100 * 5.50 = 550.0.", "A primeira linha preserva o identificador 25.", "A segunda usa 550.00."],
      ["Multiplicar o identificador.", "Esquecer U$.", "Usar uma casa decimal."],
      `numero = int(input())
horas = int(input())
valor_por_hora = float(input())

salario = horas * valor_por_hora

print(f"NUMBER = {numero}")
print(f"SALARY = U$ {salario:.2f}")`),

    problem(1009, "Salário com Bônus", "Porcentagem", "Muito fácil",
      "Somar ao salário fixo uma comissão de 15% sobre as vendas.",
      "Nome, salário fixo e total de vendas, cada informação em uma linha.",
      "TOTAL = R$ valor com duas casas decimais.",
      "JOAO\n500.00\n1230.30", "TOTAL = R$ 684.54",
      ["Ler o nome, o salário e as vendas.", "Calcular 15% das vendas.", "Somar a comissão ao salário.", "Formatar duas casas."],
      ["15% de 1230.30 é 184.545.", "500 + 184.545 = 684.545.", "A formatação pedida produz 684.54 conforme o arredondamento binário da execução aceita."],
      ["Adicionar 15 em vez de 15%.", "Imprimir o nome, que não faz parte da saída.", "Usar U$ em vez de R$."],
      `nome = input()
salario_fixo = float(input())
total_vendas = float(input())

comissao = total_vendas * 0.15
total = salario_fixo + comissao

print(f"TOTAL = R$ {total:.2f}")`),

    problem(1014, "Consumo", "Divisão e unidades", "Muito fácil",
      "Calcular quantos quilômetros foram percorridos por litro de combustível.",
      "Distância total inteira e combustível gasto decimal, em linhas separadas.",
      "Consumo com três casas decimais seguido de km/l.",
      "500\n35.0", "14.286 km/l",
      ["Ler distância e combustível.", "Dividir distância por litros.", "Imprimir três casas e a unidade."],
      ["500 / 35 = 14.285714...", "Com três casas, o resultado é 14.286."],
      ["Inverter a divisão.", "Esquecer o espaço antes de km/l.", "Usar divisão inteira."],
      `distancia = int(input())
combustivel = float(input())

consumo = distancia / combustivel

print(f"{consumo:.3f} km/l")`),

    problem(1016, "Distância", "Proporção", "Muito fácil",
      "Converter a diferença de distância entre dois carros em minutos, sabendo que ela cresce 1 km a cada 2 minutos.",
      "Uma distância inteira em quilômetros.",
      "O tempo inteiro seguido da palavra minutos.",
      "30", "60 minutos",
      ["Ler a distância.", "Multiplicar por 2.", "Imprimir a unidade minutos."],
      ["Cada quilômetro exige 2 minutos.", "30 * 2 = 60."],
      ["Dividir por 2.", "Esquecer a unidade.", "Imprimir min em vez de minutos."],
      `distancia = int(input())

tempo = distancia * 2

print(f"{tempo} minutos")`),

    problem(1035, "Teste de Seleção 1", "Condições compostas", "Fácil",
      "Verificar simultaneamente várias regras envolvendo quatro inteiros.",
      "A, B, C e D na mesma linha.",
      "Valores aceitos se todas as condições forem verdadeiras; caso contrário, Valores nao aceitos.",
      "5 6 7 8", "Valores nao aceitos",
      ["Ler os quatro inteiros.", "Montar cada comparação.", "Unir todas com and.", "Escolher a mensagem com if/else."],
      ["D > A é verdadeiro.", "C > D é falso.", "Como and exige todas verdadeiras, o conjunto não é aceito."],
      ["Usar or no lugar de and.", "Esquecer que A deve ser par.", "Alterar acentos ou capitalização da mensagem."],
      `a, b, c, d = map(int, input().split())

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
    print("Valores nao aceitos")`),

    problem(1036, "Fórmula de Bhaskara", "Condicionais e matemática", "Fácil",
      "Calcular as raízes reais de uma equação do segundo grau quando elas existem.",
      "Coeficientes A, B e C decimais na mesma linha.",
      "As duas raízes com cinco casas ou a mensagem Impossivel calcular.",
      "10.0 20.1 5.1", "R1 = -0.29788\nR2 = -1.71212",
      ["Ler os coeficientes.", "Calcular delta.", "Impedir divisão por zero e raiz de negativo.", "Calcular e imprimir R1 e R2."],
      ["delta = B² - 4AC.", "Se A for zero, 2A não pode ser denominador.", "Se delta for negativo, não há raiz real."],
      ["Calcular a raiz antes de validar delta.", "Usar apenas B² - 4AC no denominador.", "Esquecer cinco casas."],
      `a, b, c = map(float, input().split())

delta = b ** 2 - 4 * a * c

if a == 0 or delta < 0:
    print("Impossivel calcular")
else:
    raiz_delta = delta ** 0.5
    r1 = (-b + raiz_delta) / (2 * a)
    r2 = (-b - raiz_delta) / (2 * a)
    print(f"R1 = {r1:.5f}")
    print(f"R2 = {r2:.5f}")`),

    problem(1037, "Intervalo", "Intervalos", "Muito fácil",
      "Descobrir em qual dos intervalos definidos um número se encontra.",
      "Um número decimal.",
      "O intervalo correspondente ou Fora de intervalo.",
      "25.01", "Intervalo (25,50]",
      ["Ler o valor.", "Testar intervalos em ordem.", "Respeitar pontas abertas e fechadas.", "Usar else para valores externos."],
      ["25.01 não está em [0,25].", "É maior que 25 e menor ou igual a 50.", "A resposta é (25,50]."],
      ["Incluir 25 no intervalo errado.", "Deixar valores negativos caírem no primeiro caso.", "Adicionar espaços dentro da notação."],
      `valor = float(input())

if 0 <= valor <= 25:
    print("Intervalo [0,25]")
elif 25 < valor <= 50:
    print("Intervalo (25,50]")
elif 50 < valor <= 75:
    print("Intervalo (50,75]")
elif 75 < valor <= 100:
    print("Intervalo (75,100]")
else:
    print("Fora de intervalo")`),

    problem(1038, "Lanche", "Tabela e escolha", "Muito fácil",
      "Usar o código do item para escolher o preço e calcular o total.",
      "Código do produto e quantidade, na mesma linha.",
      "Total: R$ valor com duas casas.",
      "3 2", "Total: R$ 10.00",
      ["Ler código e quantidade.", "Escolher o preço com if/elif.", "Multiplicar pela quantidade.", "Formatar o total."],
      ["O código 3 custa 5.00.", "2 unidades custam 10.00."],
      ["Usar a quantidade como código.", "Somar preço e quantidade.", "Esquecer os dois pontos depois de Total."],
      `codigo, quantidade = map(int, input().split())

if codigo == 1:
    preco = 4.00
elif codigo == 2:
    preco = 4.50
elif codigo == 3:
    preco = 5.00
elif codigo == 4:
    preco = 2.00
else:
    preco = 1.50

total = preco * quantidade
print(f"Total: R$ {total:.2f}")`),

    problem(1040, "Média 3", "Condições encadeadas", "Fácil/Médio",
      "Calcular uma média ponderada e decidir aprovação, reprovação ou exame.",
      "Quatro notas na primeira linha e, quando necessário, a nota do exame na linha seguinte.",
      "Média e situação; no caso de exame, também nota e média final.",
      "2.0 4.0 7.5 8.0\n6.4", "Media: 5.4\nAluno em exame.\nNota do exame: 6.4\nAluno aprovado.\nMedia final: 5.9",
      ["Calcular média com pesos 2, 3, 4 e 1.", "Se média >= 7, aprovar.", "Se média < 5, reprovar.", "Caso contrário, ler exame e calcular média final."],
      ["A média ponderada é 5.4.", "5.4 está na faixa de exame.", "(5.4 + 6.4) / 2 = 5.9.", "Como a final é >= 5, o aluno é aprovado."],
      ["Ler exame mesmo quando não é necessário.", "Trocar os pesos.", "Usar duas casas nas médias."],
      `n1, n2, n3, n4 = map(float, input().split())

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
    print(f"Media final: {media_final:.1f}")`),

    problem(1041, "Coordenadas de um Ponto", "Plano cartesiano", "Fácil",
      "Classificar um ponto como origem, eixo ou quadrante.",
      "Coordenadas X e Y decimais na mesma linha.",
      "Origem, Eixo X, Eixo Y ou Q1, Q2, Q3, Q4.",
      "4.5 -2.2", "Q4",
      ["Tratar primeiro a origem.", "Depois tratar os eixos.", "Usar os sinais de X e Y para o quadrante."],
      ["X é positivo e Y é negativo.", "O ponto não está em eixo.", "Essa combinação corresponde ao quarto quadrante."],
      ["Testar quadrantes antes dos eixos.", "Trocar o sinal de Y.", "Imprimir Quadrante 4 em vez de Q4."],
      `x, y = map(float, input().split())

if x == 0 and y == 0:
    print("Origem")
elif x == 0:
    print("Eixo Y")
elif y == 0:
    print("Eixo X")
elif x > 0 and y > 0:
    print("Q1")
elif x < 0 and y > 0:
    print("Q2")
elif x < 0 and y < 0:
    print("Q3")
else:
    print("Q4")`),

    problem(1042, "Sort Simples", "Ordenação básica", "Fácil",
      "Mostrar três inteiros em ordem crescente e depois na ordem original.",
      "Três inteiros na mesma linha.",
      "Ordenados, uma linha vazia e os valores originais.",
      "7 21 -14", "-14\n7\n21\n\n7\n21\n-14",
      ["Guardar os três valores originais.", "Comparar e trocar pares fora de ordem.", "Imprimir os valores ordenados.", "Imprimir linha vazia e a ordem original."],
      ["Original: 7, 21, -14.", "As comparações levam -14 para a primeira variável.", "A ordem final é -14, 7, 21; as cópias preservam a entrada."],
      ["Alterar as cópias da ordem original.", "Esquecer uma das três comparações.", "Esquecer a linha vazia."],
      `a, b, c = map(int, input().split())

original_a = a
original_b = b
original_c = c

if a > b:
    a, b = b, a
if a > c:
    a, c = c, a
if b > c:
    b, c = c, b

print(a)
print(b)
print(c)

print()

print(original_a)
print(original_b)
print(original_c)`),

    problem(1043, "Triângulo", "Geometria e condição", "Fácil",
      "Decidir se três medidas formam triângulo; se não, calcular a área de um trapézio.",
      "Três valores decimais A, B e C.",
      "Perimetro = valor ou Area = valor, com uma casa.",
      "6.0 4.0 2.0", "Area = 10.0",
      ["Testar as três desigualdades do triângulo.", "Se todas valerem, somar o perímetro.", "Caso contrário, aplicar a área do trapézio."],
      ["6 < 4 + 2 é falso, pois há igualdade.", "As medidas não formam triângulo.", "(6 + 4) * 2 / 2 = 10."],
      ["Testar apenas uma desigualdade.", "Aceitar igualdade como triângulo.", "Usar B como altura em vez de C."],
      `a, b, c = map(float, input().split())

forma_triangulo = a < b + c and b < a + c and c < a + b

if forma_triangulo:
    perimetro = a + b + c
    print(f"Perimetro = {perimetro:.1f}")
else:
    area = (a + b) * c / 2
    print(f"Area = {area:.1f}")`),

    problem(1044, "Múltiplos", "Divisibilidade", "Muito fácil",
      "Verificar se um dos dois inteiros é múltiplo do outro.",
      "Dois inteiros A e B.",
      "Sao Multiplos ou Nao sao Multiplos.",
      "6 24", "Sao Multiplos",
      ["Ler A e B.", "Testar B % A e A % B.", "Aceitar se pelo menos um resto for zero."],
      ["24 % 6 = 0.", "Logo, 24 é múltiplo de 6."],
      ["Testar apenas uma ordem.", "Usar divisão / para testar resto.", "Alterar a mensagem."],
      `a, b = map(int, input().split())

if a % b == 0 or b % a == 0:
    print("Sao Multiplos")
else:
    print("Nao sao Multiplos")`),

    problem(1046, "Tempo de Jogo", "Condição circular", "Fácil",
      "Calcular a duração de um jogo que pode atravessar a meia-noite.",
      "Hora inicial e hora final, inteiras.",
      "O JOGO DUROU X HORA(S).",
      "16 2", "O JOGO DUROU 10 HORA(S)",
      ["Ler início e fim.", "Se o fim for maior, subtrair normalmente.", "Caso contrário, completar as 24 horas."],
      ["De 16 até 24 são 8 horas.", "De 0 até 2 são 2 horas.", "Total: 10 horas."],
      ["Produzir valor negativo ao cruzar meia-noite.", "Devolver zero quando início e fim são iguais; nesse caso são 24 horas."],
      `inicio, fim = map(int, input().split())

if fim > inicio:
    duracao = fim - inicio
else:
    duracao = 24 - inicio + fim

print(f"O JOGO DUROU {duracao} HORA(S)")`),

    problem(1059, "Números Pares", "for e range", "Muito fácil",
      "Imprimir todos os números pares entre 1 e 100.",
      "Não há entrada.",
      "Um número par por linha, de 2 até 100.",
      "(sem entrada)", "2\n4\n6\n...\n100",
      ["Criar um range que começa em 2.", "Avançar de 2 em 2.", "Imprimir cada valor."],
      ["O primeiro i é 2.", "Depois 4, 6 e assim por diante.", "O limite 101 permite incluir 100."],
      ["Usar range(2, 100, 2) e excluir 100.", "Imprimir os valores na mesma linha."],
      `for numero in range(2, 101, 2):
    print(numero)`),

    problem(1060, "Números Positivos", "Contador", "Muito fácil",
      "Contar quantos entre seis valores são positivos.",
      "Seis números decimais, um por linha.",
      "A quantidade seguida de valores positivos.",
      "7\n-5\n6\n-3.4\n4.6\n12", "4 valores positivos",
      ["Iniciar contador em zero.", "Repetir seis leituras.", "Somar 1 quando valor > 0.", "Imprimir o contador."],
      ["7, 6, 4.6 e 12 são positivos.", "Zero, se aparecesse, não seria positivo.", "O contador termina em 4."],
      ["Contar zero como positivo.", "Somar o valor em vez de 1.", "Ler apenas inteiros."],
      `positivos = 0

for i in range(6):
    valor = float(input())
    if valor > 0:
        positivos += 1

print(f"{positivos} valores positivos")`),

    problem(1064, "Positivos e Média", "Contador e acumulador", "Fácil",
      "Contar valores positivos e calcular a média apenas deles.",
      "Seis números decimais, um por linha.",
      "Quantidade de positivos e média com uma casa.",
      "7\n-5\n6\n-3.4\n4.6\n12", "4 valores positivos\n7.4",
      ["Iniciar contador e soma.", "Para cada valor positivo, incrementar e acumular.", "Dividir soma pela quantidade.", "Imprimir uma casa."],
      ["Os quatro positivos somam 29.6.", "29.6 / 4 = 7.4."],
      ["Somar também os negativos.", "Dividir sempre por 6.", "Calcular a média dentro do laço."],
      `quantidade = 0
soma = 0.0

for i in range(6):
    valor = float(input())
    if valor > 0:
        quantidade += 1
        soma += valor

media = soma / quantidade

print(f"{quantidade} valores positivos")
print(f"{media:.1f}")`),

    problem(1065, "Pares entre Cinco Números", "Contagem", "Muito fácil",
      "Contar quantos de cinco inteiros são pares.",
      "Cinco inteiros, um por linha.",
      "A quantidade seguida de valores pares.",
      "7\n-5\n6\n-4\n12", "3 valores pares",
      ["Repetir cinco leituras.", "Testar resto por 2.", "Incrementar o contador quando o resto for zero."],
      ["6, -4 e 12 têm resto zero na divisão por 2.", "O contador termina em 3."],
      ["Ignorar pares negativos.", "Testar valor / 2 == 0."],
      `pares = 0

for i in range(5):
    valor = int(input())
    if valor % 2 == 0:
        pares += 1

print(f"{pares} valores pares")`),

    problem(1066, "Pares, Ímpares, Positivos e Negativos", "Vários contadores", "Fácil",
      "Classificar cinco inteiros por paridade e sinal.",
      "Cinco inteiros, um por linha.",
      "Quatro contagens: pares, ímpares, positivos e negativos.",
      "-5\n0\n-3\n-4\n12", "3 valor(es) par(es)\n2 valor(es) impar(es)\n1 valor(es) positivo(s)\n3 valor(es) negativo(s)",
      ["Criar quatro contadores.", "Para cada valor, classificar paridade.", "Separadamente, classificar sinal.", "Imprimir as quatro linhas."],
      ["Zero é par.", "Zero não é positivo nem negativo.", "Paridade e sinal são decisões independentes."],
      ["Contar zero como positivo.", "Usar elif entre paridade e sinal, impedindo a segunda classificação."],
      `pares = 0
impares = 0
positivos = 0
negativos = 0

for i in range(5):
    valor = int(input())

    if valor % 2 == 0:
        pares += 1
    else:
        impares += 1

    if valor > 0:
        positivos += 1
    elif valor < 0:
        negativos += 1

print(f"{pares} valor(es) par(es)")
print(f"{impares} valor(es) impar(es)")
print(f"{positivos} valor(es) positivo(s)")
print(f"{negativos} valor(es) negativo(s)")`),

    problem(1070, "Seis Números Ímpares", "for e progressão", "Muito fácil",
      "A partir de um inteiro, imprimir os próximos seis números ímpares, incluindo-o quando for ímpar.",
      "Um inteiro.",
      "Seis ímpares, um por linha.",
      "8", "9\n11\n13\n15\n17\n19",
      ["Se o valor inicial for par, avançar uma unidade.", "Repetir seis vezes.", "Imprimir o ímpar atual.", "Avançar duas unidades por repetição."],
      ["8 é par, então o primeiro valor passa a ser 9.", "Cada próximo ímpar está duas unidades adiante.", "A sexta repetição imprime 19."],
      ["Avançar apenas uma unidade dentro do for.", "Fazer cinco repetições.", "Não ajustar a entrada quando ela é par."],
      `numero = int(input())

if numero % 2 == 0:
    numero += 1

for i in range(6):
    print(numero)
    numero += 2`),

    problem(1071, "Soma de Ímpares Consecutivos I", "Intervalo e acumulador", "Fácil",
      "Somar os números ímpares estritamente entre dois inteiros.",
      "Dois inteiros, um por linha.",
      "A soma dos ímpares internos.",
      "6\n-5", "5",
      ["Descobrir menor e maior.", "Percorrer somente os valores entre eles.", "Acumular os ímpares.", "Imprimir a soma."],
      ["Entre -5 e 6 estão -4 até 5.", "Ímpares: -3, -1, 1, 3, 5.", "A soma é 5."],
      ["Incluir as pontas.", "Assumir que o primeiro valor é menor.", "Somar pares."],
      `x = int(input())
y = int(input())

if x < y:
    menor = x
    maior = y
else:
    menor = y
    maior = x
soma = 0

for numero in range(menor + 1, maior):
    if numero % 2 != 0:
        soma += numero

print(soma)`),

    problem(1072, "Intervalo 2", "Contadores e intervalo", "Muito fácil",
      "Contar quantos valores estão dentro e fora do intervalo fechado [10, 20].",
      "N e depois N inteiros, um por linha.",
      "Duas linhas com in e out.",
      "4\n14\n123\n10\n-25", "2 in\n2 out",
      ["Ler N.", "Repetir N leituras.", "Testar 10 <= valor <= 20.", "Atualizar in ou out."],
      ["14 e 10 pertencem ao intervalo.", "123 e -25 ficam fora.", "Os contadores terminam em 2 e 2."],
      ["Excluir 10 ou 20.", "Ler sempre uma quantidade fixa.", "Usar and de forma invertida."],
      `n = int(input())
dentro = 0
fora = 0

for i in range(n):
    valor = int(input())
    if 10 <= valor <= 20:
        dentro += 1
    else:
        fora += 1

print(f"{dentro} in")
print(f"{fora} out")`),

    problem(1073, "Quadrado de Pares", "for e potência", "Muito fácil",
      "Mostrar o quadrado de cada número par de 1 até N.",
      "Um inteiro N.",
      "Uma linha por par no formato i^2 = resultado.",
      "6", "2^2 = 4\n4^2 = 16\n6^2 = 36",
      ["Percorrer os pares de 2 até N.", "Calcular numero ** 2.", "Imprimir no formato pedido."],
      ["O range gera 2, 4 e 6.", "Os quadrados são 4, 16 e 36."],
      ["Parar antes de N quando ele é par.", "Usar ^ como potência; em Python, potência é **."],
      `n = int(input())

for numero in range(2, n + 1, 2):
    quadrado = numero ** 2
    print(f"{numero}^2 = {quadrado}")`),

    problem(1078, "Tabuada", "for", "Muito fácil",
      "Imprimir a tabuada de um inteiro de 1 a 10.",
      "Um inteiro N.",
      "Dez linhas no formato i x N = produto.",
      "140", "1 x 140 = 140\n2 x 140 = 280\n...\n10 x 140 = 1400",
      ["Ler N.", "Percorrer multiplicadores de 1 a 10.", "Calcular e imprimir cada produto."],
      ["Na primeira volta, 1 * 140 = 140.", "Na última, 10 * 140 = 1400."],
      ["Começar em zero.", "Usar o caractere * na saída em vez de x.", "Excluir a linha do 10."],
      `n = int(input())

for i in range(1, 11):
    produto = i * n
    print(f"{i} x {n} = {produto}")`),

    problem(1080, "Maior e Posição", "Varredura", "Fácil",
      "Encontrar o maior entre cem inteiros e sua posição iniciada em 1.",
      "Cem inteiros, um por linha.",
      "O maior valor e sua posição, cada um em uma linha.",
      "2\n113\n45\n34565\n...", "34565\n4",
      ["Ler o primeiro valor como maior inicial.", "Percorrer as outras 99 posições.", "Atualizar maior e posição quando necessário.", "Imprimir ambos."],
      ["O primeiro valor ocupa posição 1.", "Ao encontrar 34565 na posição 4, o estado é atualizado.", "Valores menores não mudam o estado."],
      ["Usar índice iniciado em zero na saída.", "Inicializar maior com zero quando podem existir negativos.", "Atualizar posição em empates."],
      `maior = int(input())
posicao = 1

for i in range(2, 101):
    valor = int(input())
    if valor > maior:
        maior = valor
        posicao = i

print(maior)
print(posicao)`),

    problem(1172, "Substituição em Vetor I", "Alteração por índice", "Fácil",
      "Substituir por 1 todos os valores de um vetor que sejam menores ou iguais a zero.",
      "Dez inteiros, um por linha.",
      "As dez posições no formato X[i] = valor.",
      "0\n-5\n63\n0\n...", "X[0] = 1\nX[1] = 1\nX[2] = 63\nX[3] = 1\n...",
      ["Ler dez valores em uma lista.", "Percorrer índices.", "Trocar valores <= 0 por 1.", "Imprimir cada posição."],
      ["Na posição 0, zero vira 1.", "Na posição 1, -5 vira 1.", "63 permanece 63."],
      ["Trocar apenas negativos e esquecer zero.", "Imprimir índices de 1 a 10.", "Modificar a variável, mas não a lista."],
      `x = []

for i in range(10):
    valor = int(input())
    if valor <= 0:
        valor = 1
    x.append(valor)

for i in range(10):
    print(f"X[{i}] = {x[i]}")`),

    problem(1173, "Preenchimento de Vetor I", "Construção de lista", "Muito fácil",
      "Criar dez valores em que cada posição contém o dobro da anterior.",
      "Um inteiro para a primeira posição.",
      "As posições no formato N[i] = valor.",
      "1", "N[0] = 1\nN[1] = 2\nN[2] = 4\n...",
      ["Ler o valor inicial.", "Adicionar à lista.", "Repetir: dobrar e adicionar.", "Imprimir índices e valores."],
      ["N[0] recebe 1.", "N[1] recebe 2.", "N[2] recebe 4."],
      ["Dobrar antes de preencher a posição zero.", "Criar apenas nove valores.", "Usar X no rótulo."],
      `valor = int(input())
n = []

for i in range(10):
    n.append(valor)
    valor *= 2

for i in range(10):
    print(f"N[{i}] = {n[i]}")`),

    problem(1174, "Seleção em Vetor I", "Filtro", "Fácil",
      "Mostrar apenas as posições cujo valor é menor ou igual a 10.",
      "Cem números decimais, um por linha.",
      "Cada posição selecionada no formato A[i] = valor com uma casa.",
      "0\n-5\n63\n-8.5\n...", "A[0] = 0.0\nA[1] = -5.0\nA[3] = -8.5\n...",
      ["Ler cem valores.", "Para cada índice, testar valor <= 10.", "Imprimir apenas os selecionados."],
      ["0, -5 e -8.5 atendem à condição.", "63 não aparece na saída."],
      ["Usar valor >= 10.", "Imprimir todos os elementos.", "Esquecer uma casa decimal."],
      `a = []

for i in range(100):
    a.append(float(input()))

for i in range(100):
    if a[i] <= 10:
        print(f"A[{i}] = {a[i]:.1f}")`),

    problem(1175, "Troca em Vetor I", "Inversão", "Fácil",
      "Ler vinte inteiros e mostrá-los em ordem inversa.",
      "Vinte inteiros, um por linha.",
      "O vetor invertido no formato N[i] = valor.",
      "0\n-5\n...\n35", "N[0] = 35\n...\nN[19] = 0",
      ["Ler os vinte valores.", "Inverter a lista.", "Imprimir com novos índices de 0 a 19."],
      ["O último valor lido vai para N[0].", "O primeiro vai para N[19]."],
      ["Imprimir índices em ordem decrescente junto com os valores.", "Perder um elemento nas trocas."],
      `n = []

for i in range(20):
    n.append(int(input()))

n.reverse()

for i in range(20):
    print(f"N[{i}] = {n[i]}")`),

    problem(1176, "Fibonacci em Vetor", "Pré-processamento", "Fácil/Médio",
      "Responder vários pedidos de Fibonacci até a posição 60.",
      "Quantidade T e depois T índices, um por linha.",
      "Para cada índice, Fib(n) = valor.",
      "3\n0\n4\n2", "Fib(0) = 0\nFib(4) = 3\nFib(2) = 1",
      ["Construir Fibonacci de 0 até 60 uma única vez.", "Ler T.", "Para cada consulta, acessar a posição pronta.", "Imprimir o formato pedido."],
      ["Sequência inicial: 0, 1.", "Cada próximo é a soma dos dois anteriores.", "A consulta 4 acessa diretamente o valor 3."],
      ["Recalcular de forma lenta para cada consulta.", "Começar a sequência com 1, 1.", "Usar int limitado de outra linguagem; Python suporta esses valores."],
      `fibonacci = [0, 1]

for i in range(2, 61):
    proximo = fibonacci[i - 1] + fibonacci[i - 2]
    fibonacci.append(proximo)

t = int(input())

for i in range(t):
    n = int(input())
    print(f"Fib({n}) = {fibonacci[n]}")`),

    problem(1177, "Preenchimento de Vetor II", "Padrão repetido", "Fácil",
      "Preencher mil posições repetindo os valores de 0 até T - 1.",
      "Um inteiro T.",
      "Mil linhas no formato N[i] = valor.",
      "3", "N[0] = 0\nN[1] = 1\nN[2] = 2\nN[3] = 0\n...",
      ["Percorrer índices de 0 a 999.", "Usar i % T para repetir o padrão.", "Imprimir índice e valor."],
      ["0 % 3 = 0, 1 % 3 = 1, 2 % 3 = 2.", "3 % 3 volta a 0."],
      ["Repetir de 1 até T.", "Criar apenas T posições.", "Dividir em vez de usar resto."],
      `t = int(input())

for i in range(1000):
    valor = i % t
    print(f"N[{i}] = {valor}")`),

    problem(1178, "Preenchimento de Vetor III", "Sequência decimal", "Fácil",
      "Criar cem valores começando em X e dividindo cada próximo por 2.",
      "Um número decimal X.",
      "Cem posições com quatro casas decimais.",
      "200", "N[0] = 200.0000\nN[1] = 100.0000\nN[2] = 50.0000\n...",
      ["Ler o valor inicial.", "Imprimir a posição atual.", "Dividir o valor por 2.", "Repetir cem vezes."],
      ["N[0] é 200.", "Depois o valor passa a 100.", "A terceira posição recebe 50."],
      ["Dividir antes de imprimir N[0].", "Usar divisão inteira.", "Imprimir menos de quatro casas."],
      `valor = float(input())

for i in range(100):
    print(f"N[{i}] = {valor:.4f}")
    valor /= 2`),

    problem(1179, "Preenchimento de Vetor IV", "Buffers e filtros", "Fácil/Médio",
      "Separar quinze inteiros em vetores de pares e ímpares com capacidade cinco, imprimindo sempre que um enche.",
      "Quinze inteiros, um por linha.",
      "Conteúdo dos vetores quando enchem e, ao final, sobras ímpares antes das pares.",
      "1\n3\n4\n-4\n2\n...", "par[0] = 4\n...\nimpar[0] = 1\n...",
      ["Manter listas par e impar.", "Adicionar cada valor à lista correta.", "Ao atingir cinco, imprimir e esvaziar.", "No final, imprimir sobras ímpares e depois pares."],
      ["Cada valor entra em exatamente um buffer.", "Um buffer cheio sai com índices 0 a 4.", "Depois ele volta a ficar vazio."],
      ["Não limpar o buffer após imprimir.", "Imprimir sobras na ordem errada.", "Considerar números negativos ímpares de forma incorreta; resto diferente de zero funciona."],
      `pares = []
impares = []

for i in range(15):
    valor = int(input())

    if valor % 2 == 0:
        pares.append(valor)
        if len(pares) == 5:
            for j in range(5):
                print(f"par[{j}] = {pares[j]}")
            pares = []
    else:
        impares.append(valor)
        if len(impares) == 5:
            for j in range(5):
                print(f"impar[{j}] = {impares[j]}")
            impares = []

for i in range(len(impares)):
    print(f"impar[{i}] = {impares[i]}")

for i in range(len(pares)):
    print(f"par[{i}] = {pares[i]}")`),

    problem(1180, "Menor e Posição", "Busca em lista", "Fácil",
      "Encontrar o menor valor de uma lista e a primeira posição em que aparece.",
      "N na primeira linha e N inteiros na segunda.",
      "Menor valor e Posicao, em duas linhas.",
      "10\n1 2 3 4 -5 6 7 8 9 10", "Menor valor: -5\nPosicao: 4",
      ["Ler N e a lista.", "Inicializar menor e posição com a célula zero.", "Percorrer os índices restantes.", "Atualizar apenas quando encontrar valor estritamente menor."],
      ["O menor inicial é 1 na posição 0.", "Ao visitar -5 na posição 4, ambos são atualizados.", "Nenhum valor posterior é menor."],
      ["Usar <= e ficar com a última posição em caso de empate.", "Confundir posição iniciada em zero.", "Inicializar menor com zero."],
      `n = int(input())
valores = list(map(int, input().split()))

menor = valores[0]
posicao = 0

for i in range(1, n):
    if valores[i] < menor:
        menor = valores[i]
        posicao = i

print(f"Menor valor: {menor}")
print(f"Posicao: {posicao}")`),

    problem(1120, "Revisão de Contrato", "Strings e sentinela", "Fácil",
      "Remover de um número todas as ocorrências de um dígito defeituoso e eliminar zeros à esquerda.",
      "Vários pares dígito/número; a entrada termina com 0 0.",
      "O número corrigido de cada caso, ou 0 se nada significativo restar.",
      "5 5000000\n3 123456\n0 0", "0\n12456",
      ["Ler dígito e número como strings.", "Parar no par 0 0.", "Remover o dígito com replace.", "Remover zeros à esquerda e tratar resultado vazio."],
      ["5000000 sem o dígito 5 vira 000000.", "Após remover zeros à esquerda, nada sobra.", "Nesse caso, imprimir 0."],
      ["Converter para inteiro antes de remover o dígito.", "Parar quando apenas um dos valores for zero.", "Produzir linha vazia."],
      `while True:
    digito, numero = input().split()

    if digito == "0" and numero == "0":
        break

    corrigido = numero.replace(digito, "")
    corrigido = corrigido.lstrip("0")

    if corrigido == "":
        corrigido = "0"

    print(corrigido)`),

    problem(1168, "LED", "Strings e tabela", "Fácil",
      "Somar quantos segmentos de LED são necessários para exibir cada número.",
      "Quantidade de casos e depois uma sequência de dígitos por linha.",
      "A quantidade seguida de leds.",
      "3\n115380\n2819311\n23456", "27 leds\n29 leds\n25 leds",
      ["Guardar o custo de cada dígito.", "Para cada caso, iniciar total em zero.", "Percorrer caracteres e somar o custo.", "Imprimir total."],
      ["O dígito 1 usa 2 LEDs.", "O dígito 8 usa 7.", "Cada caractere contribui independentemente."],
      ["Tratar a entrada como inteiro e perder zeros à esquerda.", "Usar o índice de uma string sem converter o dígito quando a tabela é lista."],
      `custos = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6]

n = int(input())

for i in range(n):
    numero = input().strip()
    total = 0

    for digito in numero:
        total += custos[int(digito)]

    print(f"{total} leds")`),

    problem(1234, "Sentença Dançante", "Percurso de string", "Fácil/Médio",
      "Alternar maiúscula e minúscula entre letras, ignorando espaços na alternância.",
      "Várias linhas de texto até o fim do arquivo.",
      "Cada linha transformada, preservando os espaços.",
      "This is a dancing sentence", "ThIs Is A dAnCiNg SeNtEnCe",
      ["Ler linhas até EOF.", "Manter um booleano para a próxima letra.", "Em letras, aplicar upper/lower e alternar.", "Em espaços, preservar sem alternar."],
      ["T vira maiúsculo.", "h vira minúsculo.", "O espaço é copiado e não muda o próximo estado."],
      ["Alternar também nos espaços.", "Remover espaços com split.", "Não reiniciar o padrão em cada nova linha."],
      `while True:
    try:
        texto = input()
    except EOFError:
        break

    resultado = ""
    maiuscula = True

    for caractere in texto:
        if caractere.isalpha():
            if maiuscula:
                resultado += caractere.upper()
            else:
                resultado += caractere.lower()
            maiuscula = not maiuscula
        else:
            resultado += caractere

    print(resultado)`),

    problem(1235, "De Dentro para Fora", "Fatiamento e inversão", "Fácil",
      "Dividir cada linha ao meio e inverter separadamente as duas metades.",
      "Quantidade de casos e depois uma linha de texto por caso.",
      "Cada frase transformada.",
      "2\nI ENIL SIHTHSIREBBIG S\nLEVELKAYAK", "THIS LINE IS GIBBERISH\nLEVELKAYAK",
      ["Ler a frase inteira.", "Encontrar a metade do tamanho.", "Separar lado esquerdo e direito.", "Inverter cada metade e concatenar."],
      ["A primeira metade é invertida internamente.", "A segunda também.", "As metades não trocam de lado."],
      ["Inverter a frase inteira.", "Usar split e perder os espaços.", "Trocar as metades depois da inversão."],
      `n = int(input())

for i in range(n):
    texto = input()
    metade = len(texto) // 2

    esquerda = texto[:metade]
    direita = texto[metade:]

    resultado = esquerda[::-1] + direita[::-1]
    print(resultado)`),

    problem(1238, "Combinador", "Intercalação de strings", "Fácil",
      "Combinar duas strings alternando um caractere de cada e acrescentar a sobra da maior.",
      "Quantidade de casos e, em cada caso, duas strings na mesma linha.",
      "Uma string combinada por caso.",
      "2\naA bB\nabcdef 123", "abAB\na1b2c3def",
      ["Ler as duas strings.", "Percorrer até o tamanho da maior.", "Se existir caractere na primeira, adicionar.", "Se existir na segunda, adicionar."],
      ["Índice 0 adiciona a e depois b.", "Índice 1 adiciona A e depois B.", "Quando uma termina, só a outra contribui."],
      ["Parar no tamanho da menor e perder a sobra.", "Adicionar primeiro toda a primeira string.", "Usar split em mais de dois valores sem necessidade."],
      `n = int(input())

for i in range(n):
    primeira, segunda = input().split()
    resultado = ""

    maior_tamanho = max(len(primeira), len(segunda))

    for j in range(maior_tamanho):
        if j < len(primeira):
            resultado += primeira[j]
        if j < len(segunda):
            resultado += segunda[j]

    print(resultado)`)
  ];

  root.BEE_PROBLEMS = problems;
  if (typeof module !== "undefined" && module.exports) module.exports = problems;
})(typeof window !== "undefined" ? window : globalThis);
