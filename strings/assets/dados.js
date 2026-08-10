const STRING_LESSONS = [
  {
    id: "1024",
    order: 1,
    title: "Criptografia",
    category: "Transformação em fases",
    summary: "Aplique três transformações na ordem exata, acompanhando como a mensagem muda em cada passagem.",
    problem: "Cada mensagem precisa ser criptografada sem perder espaços ou símbolos. Primeiro, somente letras avançam três posições na tabela de caracteres. Depois, toda a linha é invertida. Por fim, os caracteres da segunda metade recuam uma posição.",
    solution: "A ideia é tratar a mensagem em três rodadas separadas. O resultado de uma rodada vira a entrada da próxima; assim conseguimos enxergar exatamente qual regra está atuando e não misturamos posições antigas com posições novas.",
    why: "Depois da primeira rodada, todas as letras já receberam o deslocamento pedido. A inversão coloca cada caractere na posição correta para a última regra, e o corte no meio garante que apenas a metade final recue uma posição.",
    concepts: [
      ["String como sequência", "Cada caractere é visitado e pode ser substituído sem alterar o tamanho da mensagem."],
      ["ord e chr", "ord converte um caractere em código; chr faz o caminho de volta."],
      ["Ordem importa", "Inverter antes de deslocar a metade produziria outra resposta."]
    ],
    steps: [
      "Desloque em +3 apenas letras ASCII maiúsculas ou minúsculas.",
      "Inverta a mensagem inteira.",
      "A partir de len(mensagem) // 2, desloque cada caractere em -1."
    ],
    fields: [{ key: "message", label: "Mensagem", value: "Texto #3", maxlength: 28 }],
    figure: "As três passagens preservam a quantidade de caracteres.",
    fact: "Os limites de A-Z e a-z são testados explicitamente. Assim, espaços e símbolos não recebem +3 na primeira fase.",
    warning: "Não tente executar as três regras ao mesmo tempo: a terceira fase usa a posição do caractere depois da inversão.",
    code: `import sys


def criptografar(mensagem):
    """Executa, na ordem, as três fases descritas pelo enunciado."""
    # Fase 1: somente letras ASCII avançam três códigos.
    deslocada = [
        chr(ord(caractere) + 3)
        if "A" <= caractere <= "Z" or "a" <= caractere <= "z"
        else caractere
        for caractere in mensagem
    ]
    # Fase 2: a mensagem inteira é invertida.
    invertida = deslocada[::-1]
    metade = len(invertida) // 2
    # Fase 3: os caracteres da metade final recuam um código.
    return "".join(
        invertida[:metade]
        + [chr(ord(caractere) - 1) for caractere in invertida[metade:]]
    )


def main():
    # A primeira linha informa quantas mensagens devem ser transformadas.
    linhas = sys.stdin.buffer.read().decode().splitlines()
    quantidade = int(linhas[0])
    respostas = [criptografar(linhas[i]) for i in range(1, quantidade + 1)]

    # write não acrescenta quebra automaticamente; fechamos também a última linha.
    sys.stdout.write("\\n".join(respostas) + "\\n")


if __name__ == "__main__":
    main()`,
    time: "O(n)",
    memory: "O(n)",
    study: [
      ["Python: ord", "https://docs.python.org/3/library/functions.html#ord"],
      ["GFG: Python Strings", "https://www.geeksforgeeks.org/python/python-string/"]
    ]
  },
  {
    id: "1120",
    order: 2,
    title: "Revisão de Contrato",
    category: "Filtragem e normalização",
    summary: "Remova todas as ocorrências do dígito defeituoso e trate corretamente os zeros à esquerda.",
    problem: "A máquina de escrever adicionou um dígito que não deveria existir. O número pode ser grande demais para tipos numéricos comuns, por isso ele deve continuar como texto durante todo o processamento.",
    solution: "Podemos imaginar uma peneira: percorremos o número e deixamos passar todos os caracteres, menos o dígito quebrado. Depois limpamos os zeros que ficaram na frente e verificamos se ainda sobrou algum algarismo.",
    why: "A remoção é feita sobre o texto inteiro, então nenhuma ocorrência defeituosa escapa. Retirar zeros somente da esquerda mantém zeros significativos no meio e no fim; quando nada sobra, o número representado só pode ser zero.",
    concepts: [
      ["Filtragem", "Cada ocorrência do dígito proibido é descartada, não apenas a primeira."],
      ["Normalização", "Zeros à esquerda não fazem parte da representação final do número."],
      ["Caso vazio", "Se todos os caracteres forem removidos, ou só restarem zeros, a resposta é 0."]
    ],
    steps: [
      "Leia o número como string.",
      "Remova todas as ocorrências do dígito com replace.",
      "Retire zeros à esquerda com lstrip e use 0 se nada restar."
    ],
    fields: [
      { key: "digit", label: "Dígito defeituoso", value: "5", maxlength: 1, small: true },
      { key: "number", label: "Número do contrato", value: "5005042", maxlength: 28 }
    ],
    figure: "O filtro elimina o dígito escolhido; a normalização cuida dos zeros iniciais.",
    fact: "Manter o valor como string evita limites de tamanho e torna a remoção direta.",
    warning: "Converter para inteiro antes de remover o dígito pode falhar para números muito grandes.",
    code: `import sys


def revisar(digito, numero):
    # O número permanece como texto, mesmo quando possui muitos algarismos.
    resultado = numero.replace(digito, "").lstrip("0")
    return resultado or "0"


def main():
    respostas = []
    for linha in sys.stdin.buffer.read().decode().splitlines():
        if not linha.strip():
            continue

        digito, numero = linha.split()
        if digito == "0" and numero == "0":
            break  # O sentinela encerra a entrada e não gera resposta.

        respostas.append(revisar(digito, numero))

    sys.stdout.write("\\n".join(respostas) + "\\n")


if __name__ == "__main__":
    main()`,
    time: "O(n)",
    memory: "O(n)",
    study: [
      ["Python: str.replace", "https://docs.python.org/3/library/stdtypes.html#str.replace"],
      ["GFG: Remove Letters from a String", "https://www.geeksforgeeks.org/python/ways-to-remove-ith-character-from-string-in-python/"]
    ]
  },
  {
    id: "1168",
    order: 3,
    title: "LED",
    category: "Tabela de consulta",
    summary: "Transforme cada dígito em seu custo de segmentos e acumule a quantidade total de LEDs.",
    problem: "Um painel de sete segmentos usa uma quantidade fixa de LEDs para cada algarismo. Como a entrada pode ter até 100 dígitos, ela é percorrida como string e cada caractere consulta uma tabela de custos.",
    solution: "Em vez de redesenhar o painel toda vez, guardamos uma pequena tabela com dez posições. Ao ler um dígito, usamos esse dígito como índice, descobrimos seu custo e acrescentamos o valor à soma.",
    why: "A tabela contém exatamente o número de segmentos acesos para cada algarismo de 0 a 9. Como cada posição do número é consultada uma vez, a soma final conta todos os LEDs necessários, inclusive quando um dígito se repete.",
    concepts: [
      ["Mapeamento direto", "O índice 0 da tabela guarda o custo do dígito 0, o índice 1 guarda o custo do 1 e assim por diante."],
      ["Acumulador", "A soma parcial registra quantos LEDs já foram necessários."],
      ["Sem conversão global", "Somente cada caractere é convertido em índice; o número inteiro nunca precisa caber na memória numérica."]
    ],
    steps: [
      "Crie a tabela (6, 2, 5, 5, 4, 5, 6, 3, 7, 6).",
      "Para cada caractere, consulte LEDs_POR_DIGITO[int(caractere)].",
      "Some os custos e imprima o total seguido de leds."
    ],
    fields: [{ key: "number", label: "Número no painel", value: "115380", maxlength: 18 }],
    figure: "Os segmentos acesos determinam o custo fixo de cada dígito.",
    fact: "A tabela elimina uma sequência longa de if/elif e deixa a correspondência entre dígito e custo explícita.",
    warning: "O valor 1 usa 2 LEDs, enquanto 7 usa 3; não confunda o dígito com seu custo.",
    code: `import sys


# O índice é o algarismo; o valor é seu custo em LEDs.
LEDS_POR_DIGITO = (6, 2, 5, 5, 4, 5, 6, 3, 7, 6)

def contar_leds(numero):
    # Cada caractere consulta uma única posição da tabela.
    return sum(
        LEDS_POR_DIGITO[int(digito)]
        for digito in numero
    )


def main():
    # A leitura em buffer devolve tokens em bytes.
    linhas = sys.stdin.buffer.read().split()
    quantidade = int(linhas[0])

    respostas = [
        f"{contar_leds(linhas[i].decode())} leds"
        for i in range(1, quantidade + 1)
    ]

    # join separa as respostas; + "\\n" fecha também a linha final.
    sys.stdout.write("\\n".join(respostas) + "\\n")


if __name__ == "__main__":
    main()`,
    time: "O(n)",
    memory: "O(1) extra",
    study: [
      ["GFG: Counting Frequencies", "https://www.geeksforgeeks.org/dsa/counting-frequencies-of-array-elements/"],
      ["Python: sum", "https://docs.python.org/3/library/functions.html#sum"]
    ]
  },
  {
    id: "1234",
    order: 4,
    title: "Sentença Dançante",
    category: "Máquina de estados",
    summary: "Alterne maiúsculas e minúsculas apenas quando uma letra for encontrada; espaços não mudam o estado.",
    problem: "A primeira letra deve ficar maiúscula, a próxima minúscula e assim sucessivamente. A alternância considera somente letras: um espaço é copiado, mas não consome a próxima capitalização.",
    solution: "Durante a leitura mantemos uma pergunta simples: “a próxima letra deve ser maiúscula?”. Depois de usar a resposta em uma letra, trocamos para a outra opção. Quando aparece um espaço, apenas o copiamos e guardamos a mesma resposta para a próxima letra.",
    why: "O estado sempre descreve corretamente o tratamento da próxima letra. Como ele muda somente depois de letras, espaços e sinais não quebram a dança e todos os caracteres continuam na frase original.",
    concepts: [
      ["Estado booleano", "A variável usar_maiuscula informa como a próxima letra será escrita."],
      ["Transição condicional", "O estado só é invertido depois de processar uma letra."],
      ["Preservação", "Espaços e outros caracteres são copiados sem alteração."]
    ],
    steps: [
      "Comece com usar_maiuscula = True.",
      "Ao encontrar uma letra, aplique upper ou lower conforme o estado.",
      "Troque o estado; se não for letra, apenas copie o caractere."
    ],
    fields: [{ key: "sentence", label: "Sentença", value: "This is a dancing sentence", maxlength: 40 }],
    figure: "A chave de estado ignora espaços e troca depois de cada letra.",
    fact: "O algoritmo é uma pequena máquina de estados com apenas duas possibilidades: próxima letra maiúscula ou minúscula.",
    warning: "Usar o índice da string para decidir maiúscula/minúscula falha quando há espaços.",
    code: `import sys


def transformar_sentenca(sentenca):
    """Alterna a caixa das letras sem deixar espaços alterarem o estado."""
    usar_maiuscula = True
    resposta = []

    for caractere in sentenca:
        if caractere.isalpha():
            # O estado determina a caixa desta letra e muda para a próxima.
            resposta.append(
                caractere.upper() if usar_maiuscula else caractere.lower()
            )
            usar_maiuscula = not usar_maiuscula
        else:
            # Espaços e sinais são copiados sem consumir a alternância.
            resposta.append(caractere)

    return "".join(resposta)


def main():
    # O problema fornece sentenças até o fim do arquivo.
    linhas = sys.stdin.buffer.read().decode().splitlines()
    sys.stdout.write("\\n".join(map(transformar_sentenca, linhas)) + "\\n")


if __name__ == "__main__":
    main()`,
    time: "O(n)",
    memory: "O(n)",
    study: [
      ["Python: String Methods", "https://docs.python.org/3/library/stdtypes.html#string-methods"],
      ["GFG: State Machines", "https://www.geeksforgeeks.org/theory-of-computation/introduction-of-finite-automata/"]
    ]
  },
  {
    id: "1235",
    order: 5,
    title: "De Dentro para Fora",
    category: "Fatiamento de strings",
    summary: "Separe a linha em duas metades e inverta cada uma sem trocar suas posições.",
    problem: "A frase foi embaralhada dentro de cada metade. Para recuperá-la, localizamos o ponto central e revertemos os dois pedaços independentemente.",
    solution: "Primeiro marcamos o meio da frase, como se colocássemos uma divisória entre os dois blocos. Em seguida viramos apenas o bloco da esquerda e depois apenas o bloco da direita, mantendo cada um no seu lado.",
    why: "Cada metade foi embaralhada por uma inversão, e inverter novamente desfaz essa operação. Como os blocos não trocam de lugar, a concatenação das duas metades recuperadas forma a frase correta.",
    concepts: [
      ["Ponto de corte", "metade = len(frase) // 2 separa exatamente os dois blocos do enunciado."],
      ["Fatiamento", "frase[:metade] seleciona a esquerda; frase[metade:] seleciona a direita."],
      ["Inversão local", "[::-1] é aplicado em cada pedaço, não na frase inteira."]
    ],
    steps: [
      "Calcule o índice central.",
      "Extraia e inverta a metade esquerda.",
      "Extraia e inverta a metade direita; depois concatene."
    ],
    fields: [{ key: "phrase", label: "Frase embaralhada", value: "I ENIL SIHTHSIREBBIG S", maxlength: 40 }],
    figure: "As duas setas mostram inversões independentes; os blocos continuam no mesmo lado.",
    fact: "O enunciado garante linhas de tamanho par, então as duas metades têm o mesmo comprimento.",
    warning: "Inverter frase[::-1] troca também a posição das metades e produz uma resposta diferente.",
    code: `import sys


def inverter_metades(frase):
    """Inverte cada metade separadamente, sem trocar os blocos de posição."""
    # O corte separa os dois blocos sem trocar suas posições.
    metade = len(frase) // 2
    esquerda = frase[:metade][::-1]
    direita = frase[metade:][::-1]
    return esquerda + direita


def main():
    # A primeira linha contém o número de frases.
    linhas = sys.stdin.buffer.read().decode().splitlines()
    quantidade = int(linhas[0])

    # Cada frase é independente, então aplicamos a mesma transformação a todas.
    respostas = [inverter_metades(linhas[i]) for i in range(1, quantidade + 1)]

    # join separa as respostas por linhas; o último \\n encerra a saída final.
    sys.stdout.write("\\n".join(respostas) + "\\n")


if __name__ == "__main__":
    main()`,
    time: "O(n)",
    memory: "O(n)",
    study: [
      ["Python: Sequence Types", "https://docs.python.org/3/library/stdtypes.html#common-sequence-operations"],
      ["GFG: Reverse a String", "https://www.geeksforgeeks.org/python/reverse-string-python-5-different-ways/"]
    ]
  },
  {
    id: "1237",
    order: 6,
    title: "Comparação de Substring",
    category: "Programação dinâmica",
    summary: "Encontre o maior trecho contínuo presente nas duas strings observando diagonais em uma matriz DP.",
    problem: "Precisamos do comprimento da maior substring comum. Substring é um bloco contíguo: se houver uma interrupção, a contagem volta a zero. Isso é diferente de subsequência, que permitiria pular caracteres.",
    solution: "Comparamos cada caractere da primeira string com cada caractere da segunda. Quando dois caracteres coincidem, olhamos a comparação anterior nas duas strings e aumentamos aquela sequência em um. A matriz permite acompanhar essas sequências como diagonais crescentes.",
    why: "Uma diagonal só cresce quando os caracteres atuais são iguais e os anteriores também faziam parte do mesmo trecho. Ao encontrar uma diferença, a célula fica zero e impede saltos. O maior número visto na matriz é exatamente o tamanho da maior substring comum.",
    concepts: [
      ["Estado da DP", "dp[i][j] guarda o tamanho do sufixo comum que termina exatamente nos caracteres i e j."],
      ["Diagonal", "Quando os caracteres são iguais, a célula recebe a diagonal anterior mais 1."],
      ["Reinício", "Quando são diferentes, a célula vale 0 porque a continuidade foi quebrada."]
    ],
    steps: [
      "Crie uma linha de zeros para representar a linha anterior da matriz.",
      "Para cada par de caracteres iguais, use anterior[j - 1] + 1.",
      "Guarde o maior valor encontrado; ele é o comprimento da resposta."
    ],
    fields: [
      { key: "a", label: "Primeira string", value: "abcdef", maxlength: 12 },
      { key: "b", label: "Segunda string", value: "zcdemf", maxlength: 12 }
    ],
    figure: "A diagonal 1, 2, 3 representa a substring comum cde.",
    fact: "A recorrência e a complexidade O(n·m) foram validadas na referência de Longest Common Substring do GeeksforGeeks.",
    warning: "Não use o algoritmo de maior subsequência comum: ele aceita saltos e resolve outro problema.",
    code: `import sys


def maior_substring_comum(a, b):
    # Mantemos b como a menor string para economizar memória.
    if len(b) > len(a):
        a, b = b, a

    # anterior representa a linha anterior da tabela de DP.
    anterior = [0] * (len(b) + 1)
    melhor = 0
    for caractere_a in a:
        atual = [0] * (len(b) + 1)
        for j, caractere_b in enumerate(b, start=1):
            if caractere_a == caractere_b:
                # Uma coincidência estende a diagonal anterior.
                atual[j] = anterior[j - 1] + 1
                melhor = max(melhor, atual[j])
        anterior = atual
    return melhor


def main():
    # Cada caso ocupa duas linhas e a entrada termina em EOF.
    linhas = sys.stdin.buffer.read().decode().splitlines()
    respostas = []

    for i in range(0, len(linhas) - 1, 2):
        respostas.append(str(maior_substring_comum(linhas[i], linhas[i + 1])))

    sys.stdout.write("\\n".join(respostas) + "\\n")


if __name__ == "__main__":
    main()`,
    time: "O(n · m)",
    memory: "O(m)",
    study: [
      ["GFG: Longest Common Substring", "https://www.geeksforgeeks.org/dsa/longest-common-substring-dp-29/"],
      ["GFG: Dynamic Programming", "https://www.geeksforgeeks.org/dsa/dynamic-programming/"]
    ]
  },
  {
    id: "1238",
    order: 7,
    title: "Combinador",
    category: "Intercalação",
    summary: "Consuma um caractere de cada string alternadamente e anexe a sobra da maior no final.",
    problem: "Duas strings devem ser combinadas preservando a ordem interna de ambas. Formamos pares enquanto as duas ainda têm caracteres; quando uma termina, copiamos de uma vez o trecho restante da outra.",
    solution: "Pense em um zíper: pegamos o primeiro caractere de A, depois o primeiro de B, então o segundo de A e o segundo de B. Esse pareamento continua até a menor string terminar; a parte sem parceiro é colocada inteira no final.",
    why: "Os índices avançam juntos, por isso os caracteres de cada string mantêm sua ordem. O limite da menor entrada evita acessos inexistentes, e acrescentar as duas possíveis sobras garante que nenhum caractere seja perdido.",
    concepts: [
      ["Dois índices sincronizados", "Na parte comum, a mesma posição i é lida nas duas strings."],
      ["Limite seguro", "min(len(a), len(b)) impede acesso além da string menor."],
      ["Sobra", "Os slices a[limite:] e b[limite:] preservam tudo o que ainda não foi consumido."]
    ],
    steps: [
      "Calcule o tamanho da menor string.",
      "Para cada índice nessa faixa, acrescente a[i] e depois b[i].",
      "Anexe as sobras; somente uma delas será não vazia."
    ],
    fields: [
      { key: "a", label: "String A", value: "aaaa", maxlength: 18 },
      { key: "b", label: "String B", value: "bbbbbb", maxlength: 18 }
    ],
    figure: "As colunas viram pares; os caracteres sem parceiro formam a sobra.",
    fact: "A ordem relativa dos caracteres de cada entrada nunca muda.",
    warning: "Parar quando a menor string termina sem anexar a sobra perde caracteres da entrada maior.",
    code: `import sys


def combinar(a, b):
    """Intercala o prefixo comum e acrescenta a sobra da string maior."""
    # Intercalamos enquanto as duas strings possuem a posição i.
    limite = min(len(a), len(b))
    intercalada = "".join(
        a[i] + b[i] for i in range(limite)
    )
    # Apenas uma das duas sobras será não vazia.
    return intercalada + a[limite:] + b[limite:]


def main():
    # A primeira linha informa quantos pares devem ser combinados.
    linhas = sys.stdin.buffer.read().decode().splitlines()
    quantidade = int(linhas[0])
    respostas = []

    for i in range(1, quantidade + 1):
        a, b = linhas[i].split()
        respostas.append(combinar(a, b))

    # Uma única escrita costuma ser mais eficiente do que vários prints.
    sys.stdout.write("\\n".join(respostas) + "\\n")


if __name__ == "__main__":
    main()`,
    time: "O(n + m)",
    memory: "O(n + m)",
    study: [
      ["GFG: Alternatively Merge Strings", "https://www.geeksforgeeks.org/dsa/alternatively-merge-two-strings-in-java/"],
      ["Python: str.join", "https://docs.python.org/3/library/stdtypes.html#str.join"]
    ]
  }
];

window.STRING_LESSONS = STRING_LESSONS;
