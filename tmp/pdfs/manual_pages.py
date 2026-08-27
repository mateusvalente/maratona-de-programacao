PAGES = [
    {
        "chapter": "ANTES DE CODIFICAR",
        "title": "Fluxo de resolução no dia da maratona",
        "summary": "Um roteiro curto para transformar o enunciado em uma submissão testável, sem começar pelo código no impulso.",
        "when": "Use em todo problema, sobretudo quando a técnica ainda não está clara.",
        "complexity": "Meta: reduzir retrabalho",
        "code": '''def resolver_problema():
    # 1. Reescreva a pergunta em uma frase.
    entrada = identificar_entrada_e_limites()
    saida = identificar_saida_exata()

    # 2. Faça a solução simples e estime seu custo.
    ideia = modelar_casos_pequenos_no_papel()
    custo = estimar_complexidade(ideia, entrada)

    # 3. Escolha a técnica que cabe nos limites.
    algoritmo = escolher_algoritmo(ideia, custo)

    # 4. Prove o ponto central antes de implementar.
    justificar_corretude(algoritmo)

    # 5. Teste mínimo, extremo, empate e formato.
    return implementar_testar_submeter(algoritmo, saida)''',
        "insight": "Se a ideia não pode ser explicada em poucas frases e testada manualmente, o código provavelmente ainda está prematuro.",
        "pitfall": "Não associe a letra do problema à dificuldade. Faça uma leitura rápida do conjunto e escolha por evidência.",
    },
    {
        "chapter": "COMPLEXIDADE",
        "title": "Restrições são pistas de algoritmo",
        "summary": "Estime quantos estados, pares, arestas ou transições serão executados. A ordem de grandeza elimina soluções inviáveis.",
        "when": "Antes de implementar e sempre que aparecer TLE.",
        "complexity": "O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ)",
        "code": '''# Estimativas úteis, não leis absolutas:
# n <= 10       -> permutações pequenas / backtracking
# n <= 25       -> alguns 2**n com poda
# n <= 2_000    -> talvez O(n**2)
# n <= 100_000  -> procure O(n) ou O(n log n)

def estimar(n, casos=1):
    candidatos = {
        "linear": casos * n,
        "n_log_n": casos * n * max(1, n.bit_length()),
        "quadratico": casos * n * n,
    }
    return candidatos

# Conte também o trabalho dentro de cada estado.
# O(V + E) descreve DFS/BFS com lista.
# O(V²) aparece ao varrer uma matriz por vértice.''',
        "insight": "Conte a quantidade de casos. Um O(n²) pequeno repetido centenas de vezes pode deixar de caber.",
        "pitfall": "Número de laços não basta: duas chamadas recursivas por nível podem gerar O(2ⁿ) sem nenhum for visível.",
    },
    {
        "chapter": "PYTHON COMPETITIVO",
        "title": "Esqueleto de submissão e entrada rápida",
        "summary": "Separe leitura, solução e escrita. Isso facilita testes locais e evita misturar formato com o algoritmo.",
        "when": "Entradas grandes ou problemas com muitos casos.",
        "complexity": "Leitura O(qtd. de tokens)",
        "code": '''import sys


def solve(tokens):
    it = iter(tokens)
    n = int(next(it))
    valores = [int(next(it)) for _ in range(n)]

    # Coloque aqui apenas a lógica do problema.
    resposta = sum(valores)
    return [str(resposta)]


def main():
    tokens = sys.stdin.buffer.read().split()
    saida = solve(tokens)
    sys.stdout.write("\\n".join(saida) + "\\n")


if __name__ == "__main__":
    main()''',
        "insight": "buffer.read().split() é excelente para tokens. Para preservar espaços internos, use splitlines() e trate cada linha.",
        "pitfall": "Não use leitura em bloco sem entender o formato. Frases, linhas vazias e EOF podem exigir outra estratégia.",
    },
    {
        "chapter": "ENTRADA",
        "title": "Três formatos: T casos, sentinela e EOF",
        "summary": "Reconhecer o encerramento evita consumir tokens demais, imprimir casos inexistentes ou entrar em laço infinito.",
        "when": "Sempre confira a primeira e a última linha do enunciado.",
        "complexity": "O(total da entrada)",
        "code": '''# 1) Quantidade declarada
t = int(input())
for _ in range(t):
    processar(input())

# 2) Sentinela: o valor final não é um caso
while True:
    n = int(input())
    if n == 0:
        break
    processar(n)

# 3) Até EOF, uma linha por caso
import sys
for linha in sys.stdin:
    if linha.strip():
        processar(linha.rstrip("\\n"))

# 4) Pares de linhas até EOF
linhas = sys.stdin.buffer.read().decode().splitlines()
for i in range(0, len(linhas) - 1, 2):
    processar(linhas[i], linhas[i + 1])''',
        "insight": "Sentinela encerra e não gera saída. EOF significa que a ausência de dados encerra a leitura.",
        "pitfall": "strip() remove todos os espaços das pontas. Em strings, prefira rstrip('\\n') quando espaços forem significativos.",
    },
    {
        "chapter": "SAÍDA",
        "title": "Formatação exata e escrita em bloco",
        "summary": "Juízes comparam texto. Rótulos, casas decimais, linhas vazias e índices iniciando em 1 fazem parte da solução.",
        "when": "WA com lógica correta ou saídas muito numerosas.",
        "complexity": "O(tamanho da saída)",
        "code": '''import sys

saida = []
for caso in range(1, 4):
    valor = 12.34567
    saida.append(f"Caso {caso}: {valor:.2f}")

# Linha vazia entre casos, mas não antes do primeiro:
blocos = [
    "\\n".join([f"CENARIO {{{i}}}", "1 - Nome"])
    for i in range(1, 4)
]

sys.stdout.write("\\n".join(saida) + "\\n")
sys.stdout.write("\\n\\n".join(blocos) + "\\n")

# Índice interno 0 -> posição pedida pelo enunciado
indice = 0
print(indice + 1)''',
        "insight": "Monte uma amostra à mão e compare caractere por caractere com a saída oficial.",
        "pitfall": "Arredonde apenas na impressão. Arredondar valores intermediários pode mudar decisões.",
    },
    {
        "chapter": "LÓGICA",
        "title": "Condições, intervalos e bordas",
        "summary": "Muitos WAs nascem em desigualdades, ordem de testes e limites inclusivos. Escreva os intervalos antes do if.",
        "when": "Classificação por faixas, geometria, validação e simulações.",
        "complexity": "O(1) por decisão",
        "code": '''def classificar(x):
    if 0 <= x <= 25:
        return "[0,25]"
    if 25 < x <= 50:
        return "(25,50]"
    if 50 < x <= 75:
        return "(50,75]"
    if 75 < x <= 100:
        return "(75,100]"
    return "Fora de intervalo"


def divisivel(a, b):
    # Evite divisão por zero antes do módulo.
    return b != 0 and a % b == 0


def cabe(diametro, largura, altura):
    # Tangência é permitida: use <=.
    return diametro <= largura and diametro <= altura''',
        "insight": "Teste exatamente nas bordas e depois um valor imediatamente antes e depois.",
        "pitfall": "Um elif amplo colocado cedo pode capturar casos que deveriam chegar a uma condição mais específica.",
    },
    {
        "chapter": "LAÇOS",
        "title": "for, range e índices",
        "summary": "Use for quando a quantidade de repetições ou a coleção já é conhecida. Escolha entre percorrer valores e posições.",
        "when": "Casos de teste, listas, matrizes, contagens e construção de respostas.",
        "complexity": "O(n) para uma passagem",
        "code": '''# Repetir exatamente t vezes
t = int(input())
for caso in range(1, t + 1):
    print(f"Caso {caso}")

# Percorrer valores
valores = [8, 3, 10]
for valor in valores:
    print(valor)

# Percorrer índice e valor
for indice, valor in enumerate(valores):
    print(indice, valor)

# Intervalo semiaberto: início entra, fim não entra
for i in range(2, 8, 2):
    print(i)  # 2, 4, 6

# Matriz: dois laços, um por dimensão
matriz = [[1, 2], [3, 4]]
for linha in range(len(matriz)):
    for coluna in range(len(matriz[linha])):
        processar(matriz[linha][coluna])''',
        "insight": "range(início, fim) nunca inclui fim. Essa regra reduz dúvidas sobre limites e tamanhos.",
        "pitfall": "Não use índice quando só precisa do valor. Menos índices significam menos oportunidades de acessar posição inválida.",
    },
    {
        "chapter": "LAÇOS",
        "title": "while, break e continue",
        "summary": "Use while quando a parada depende do estado. break encerra o laço; continue pula apenas a repetição atual.",
        "when": "Sentinelas, simulações, busca por condição e processos de tamanho desconhecido.",
        "complexity": "Depende de quantas vezes o estado avança",
        "code": '''# Sentinela
while True:
    n = int(input())
    if n == 0:
        break
    processar(n)

# Estado que precisa avançar em toda repetição
i = 0
while i < 10:
    i += 1  # atualize antes de um possível continue

    if i % 2 == 0:
        continue

    print(i)

# Busca com saída antecipada
encontrado = False
for valor in [3, 8, 12]:
    if valor == 8:
        encontrado = True
        break

print("sim" if encontrado else "não")''',
        "insight": "Escreva qual variável aproxima o laço da parada. Se nenhuma muda, existe risco de laço infinito.",
        "pitfall": "continue antes da atualização do estado pode repetir a mesma situação para sempre.",
    },
    {
        "chapter": "VARREDURA",
        "title": "Contador, acumulador e melhor posição",
        "summary": "Uma passagem resolve frequência, soma, mínimo, máximo e posição quando o estado representa o prefixo já lido.",
        "when": "Listas, estatísticas, melhor palpite e validações sequenciais.",
        "complexity": "Tempo O(n), memória O(1)",
        "code": '''def analisar(valores, alvo):
    soma = 0
    quantidade_pares = 0
    melhor_indice = 0
    menor_distancia = abs(valores[0] - alvo)

    for i, valor in enumerate(valores):
        soma += valor

        if valor % 2 == 0:
            quantidade_pares += 1

        distancia = abs(valor - alvo)
        # Estrita preserva o primeiro em empate.
        if distancia < menor_distancia:
            menor_distancia = distancia
            melhor_indice = i

    return soma, quantidade_pares, melhor_indice + 1''',
        "insight": "Diga em português o que cada variável significa após processar o prefixo. Essa frase é o invariante.",
        "pitfall": "Inicializar mínimo com 0 costuma ser errado. Use o primeiro elemento ou infinito.",
    },
    {
        "chapter": "LISTAS",
        "title": "Frequência e pré-processamento",
        "summary": "Quando várias consultas usam os mesmos dados, prepare uma estrutura uma vez e reduza o custo por pergunta.",
        "when": "Contagens, consultas repetidas, alfabetos pequenos e tabelas de custo.",
        "complexity": "Construção O(n), consulta O(1)",
        "code": '''def frequencias_minusculas(texto):
    freq = [0] * 26
    for ch in texto.lower():
        if "a" <= ch <= "z":
            freq[ord(ch) - ord("a")] += 1
    return freq


LEDS = (6, 2, 5, 5, 4, 5, 6, 3, 7, 6)


def contar_leds(numero):
    # O caractere vira índice da tabela.
    return sum(LEDS[int(digito)] for digito in numero)


freq = frequencias_minusculas("Maratona")
print(freq[0])
print(contar_leds("115380"))''',
        "insight": "Lista indexada é ótima quando o domínio é pequeno e contínuo, como 0..9 ou a..z.",
        "pitfall": "Não confunda o valor com seu custo. O dígito 1 consulta a posição 1 da tabela.",
    },
    {
        "chapter": "MAPAS E CONJUNTOS",
        "title": "Dicionário para mapear; set para pertencer",
        "summary": "Escolha pela pergunta: qual valor corresponde à chave, quantas vezes apareceu ou o item já foi visto?",
        "when": "Frequências gerais, deduplicação, interseção e existência.",
        "complexity": "O(1) médio por operação",
        "code": '''def contar(valores):
    freq = {}
    for valor in valores:
        freq[valor] = freq.get(valor, 0) + 1
    return freq


visitados = set()
for valor in [4, 2, 4, 7]:
    if valor in visitados:
        print("repetido", valor)
    visitados.add(valor)

a = {1, 2, 3}
b = {3, 4}
print(a | b)   # união
print(a & b)   # interseção
print(a - b)   # diferença
print(a ^ b)   # diferença simétrica
print(contar("banana"))''',
        "insight": "Se precisa preservar duplicatas e ordem, set sozinho não serve. Use lista ou combine estruturas.",
        "pitfall": "mapa[chave] falha se a chave não existir. get(chave, padrão) é adequado para contadores.",
    },
    {
        "chapter": "ORDENAÇÃO",
        "title": "Chaves compostas e critérios mistos",
        "summary": "Tuplas são comparadas da esquerda para a direita. Negue campos numéricos que precisam ser decrescentes.",
        "when": "Rankings, registros e desempates em cascata.",
        "complexity": "O(n log n)",
        "code": '''# (nome, peso, idade, altura)
renas = [
    ("Rudolph", 50, 100, 1.12),
    ("Vixen", 50, 110, 1.42),
    ("Cupid", 50, 107, 1.45),
    ("Donner", 30, 106, 1.23),
]

# peso desc.; idade, altura e nome crescentes
renas.sort(key=lambda r: (-r[1], r[2], r[3], r[0]))

for posicao, rena in enumerate(renas, start=1):
    print(f"{posicao} - {rena[0]}")

# sort() altera a lista e devolve None.
# sorted(iterável) cria uma nova lista.
# A ordenação do Python é estável.''',
        "insight": "Um critério posterior só decide quando todos os anteriores empataram. A tupla codifica a prioridade.",
        "pitfall": "reverse=True inverte todos os critérios. Para misturar sentidos, construa a chave campo a campo.",
    },
    {
        "chapter": "BUSCA BINÁRIA",
        "title": "Primeira ocorrência com bisect_left",
        "summary": "Ordene uma vez e responda muitas consultas descartando metade do intervalo a cada comparação.",
        "when": "Dados ordenados, consultas repetidas e posição mais à esquerda.",
        "complexity": "Ordenação O(n log n); consulta O(log n)",
        "code": '''from bisect import bisect_left


def primeira_posicao(valores, alvo):
    # Pré-condição: valores está ordenado.
    pos = bisect_left(valores, alvo)

    # O ponto de inserção precisa ser validado.
    if pos < len(valores) and valores[pos] == alvo:
        return pos
    return -1


valores = [4, 2, 4, 9, 1]
valores.sort()

indice = primeira_posicao(valores, 4)
print(indice + 1 if indice != -1 else "not found")''',
        "insight": "O intervalo mantido precisa conter todas as posições ainda possíveis. Atualize as bordas sem repetir o meio.",
        "pitfall": "Busca binária não funciona com descarte de metades se a sequência não estiver ordenada pela mesma chave.",
    },
    {
        "chapter": "PILHA",
        "title": "Pendências e parênteses balanceados",
        "summary": "A pilha guarda aberturas ainda não fechadas. Um fechamento consome a abertura mais recente: comportamento LIFO.",
        "when": "Delimitadores, desfazer operações, expressões e DFS iterativa.",
        "complexity": "Tempo O(n), memória O(n)",
        "code": '''import sys


def esta_balanceada(expressao):
    pilha = []

    for caractere in expressao:
        if caractere == "(":
            pilha.append(caractere)
        elif caractere == ")":
            # Fechamento sem abertura correspondente.
            if not pilha:
                return False
            pilha.pop()

    # Aberturas restantes também invalidam.
    return not pilha


for linha in sys.stdin:
    ok = esta_balanceada(linha.rstrip("\\n"))
    print("correct" if ok else "incorrect")''',
        "insight": "Há duas falhas independentes: fechar cedo demais e terminar com aberturas sobrando.",
        "pitfall": "Contar apenas quantidades não valida a ordem. A expressão ')(' tem contagens iguais e continua incorreta.",
    },
    {
        "chapter": "FILA E DEQUE",
        "title": "Simulação eficiente nas duas pontas",
        "summary": "deque permite retirar do início e inserir no fim em O(1), ideal para filas e simulações de rotação.",
        "when": "BFS, cartas, janelas, rodízio e ordem de chegada.",
        "complexity": "O(1) amortizado nas extremidades",
        "code": '''from collections import deque


def jogar_cartas(n):
    cartas = deque(range(1, n + 1))
    descartadas = []

    while len(cartas) > 1:
        # Topo está no front.
        descartadas.append(cartas.popleft())

        # Novo topo vai para a base.
        cartas.append(cartas.popleft())

    return descartadas, cartas[0]


descartadas, restante = jogar_cartas(7)
print("Discarded cards:", ", ".join(map(str, descartadas)))
print("Remaining card:", restante)''',
        "insight": "Defina qual ponta representa front/topo e qual representa back/base antes da simulação.",
        "pitfall": "list.pop(0) desloca os demais elementos e custa O(n). Use deque.popleft() para fila.",
    },
    {
        "chapter": "FILA DE PRIORIDADE",
        "title": "heapq e simulação de max-heap",
        "summary": "O heap entrega repetidamente o menor elemento. Armazene negativos quando o problema exige retirar o maior.",
        "when": "Dijkstra, eventos, melhores candidatos e classificação de estruturas.",
        "complexity": "push/pop O(log n), topo O(1)",
        "code": '''import heapq


maiores_primeiro = []

for valor in [2, 7, 4]:
    heapq.heappush(maiores_primeiro, -valor)

while maiores_primeiro:
    maior = -heapq.heappop(maiores_primeiro)
    print(maior)


# Dijkstra usa a min-heap diretamente:
fila = [(0, "origem")]
distancia, vertice = heapq.heappop(fila)

# Tuplas são ordenadas pelo primeiro campo;
# empates avançam para o campo seguinte.''',
        "insight": "Heap mantém apenas a propriedade necessária para obter o extremo; não produz lista totalmente ordenada.",
        "pitfall": "Ao usar negativos, negue tanto na inserção quanto na remoção. Misturar sinais gera comparações incoerentes.",
    },
    {
        "chapter": "STRINGS",
        "title": "Transformar em fases e normalizar",
        "summary": "Strings são imutáveis. Construa listas de caracteres, aplique as regras na ordem e una apenas no final.",
        "when": "Criptografia simples, filtros, reversões e números textuais.",
        "complexity": "Tempo O(n), memória O(n)",
        "code": '''def criptografar(mensagem):
    deslocada = [
        chr(ord(ch) + 3)
        if "A" <= ch <= "Z" or "a" <= ch <= "z"
        else ch
        for ch in mensagem
    ]

    invertida = deslocada[::-1]
    metade = len(invertida) // 2

    return "".join(
        invertida[:metade]
        + [chr(ord(ch) - 1) for ch in invertida[metade:]]
    )


def revisar(digito, numero):
    filtrado = numero.replace(digito, "").lstrip("0")
    return filtrado or "0"''',
        "insight": "Separar fases impede que uma regra use posições antigas quando deveria usar o resultado atualizado.",
        "pitfall": "Não converta números enormes para int se o trabalho é textual. Mantenha a entrada como string.",
    },
    {
        "chapter": "STRINGS",
        "title": "Máquina de estados e intercalação",
        "summary": "Guarde o mínimo de memória sobre o prefixo: por exemplo, como a próxima letra deve ser escrita.",
        "when": "Alternância, parsers simples, padrões e construção de saída.",
        "complexity": "Tempo O(n), memória O(n) para a resposta",
        "code": '''def sentenca_dancante(texto):
    usar_maiuscula = True
    resposta = []

    for ch in texto:
        if ch.isalpha():
            resposta.append(
                ch.upper() if usar_maiuscula else ch.lower()
            )
            usar_maiuscula = not usar_maiuscula
        else:
            resposta.append(ch)

    return "".join(resposta)


def combinar(a, b):
    limite = min(len(a), len(b))
    prefixo = "".join(a[i] + b[i] for i in range(limite))
    return prefixo + a[limite:] + b[limite:]''',
        "insight": "Espaços são copiados, mas não mudam o estado. A transição ocorre apenas quando uma letra é consumida.",
        "pitfall": "Usar o índice absoluto para alternar caixa falha quando espaços e sinais não devem contar.",
    },
    {
        "chapter": "STRINGS + DP",
        "title": "Maior substring comum",
        "summary": "dp representa o sufixo comum que termina exatamente no par atual. Uma diferença zera a continuidade.",
        "when": "Maior trecho contíguo comum entre duas strings.",
        "complexity": "Tempo O(n·m), memória O(min(n,m))",
        "code": '''def maior_substring_comum(a, b):
    if len(b) > len(a):
        a, b = b, a

    anterior = [0] * (len(b) + 1)
    melhor = 0

    for caractere_a in a:
        atual = [0] * (len(b) + 1)

        for j, caractere_b in enumerate(b, start=1):
            if caractere_a == caractere_b:
                # Estende a diagonal anterior.
                atual[j] = anterior[j - 1] + 1
                melhor = max(melhor, atual[j])

        anterior = atual

    return melhor''',
        "insight": "Substring é contígua; divergência vale zero. Subsequência permitiria saltos e usa outra transição.",
        "pitfall": "Uma linha atualizada no lugar pode sobrescrever a diagonal necessária. Use linha anterior separada.",
    },
    {
        "chapter": "GRAFOS",
        "title": "Lista e matriz de adjacência",
        "summary": "As duas estruturas representam o mesmo grafo, mas alteram memória e custo para encontrar vizinhos.",
        "when": "Lista para grafos esparsos; matriz para consulta direta e V pequeno.",
        "complexity": "Lista O(V+E); matriz O(V²) de memória",
        "code": '''vertices = 5
arestas = [(0, 1), (0, 3), (1, 4)]

# Lista: guarda somente vizinhos.
grafo = [[] for _ in range(vertices)]
for a, b in arestas:
    grafo[a].append(b)
    grafo[b].append(a)  # remova se for direcionado

# Matriz: consulta de aresta em O(1).
adj = [[False] * vertices for _ in range(vertices)]
for a, b in arestas:
    adj[a][b] = True
    adj[b][a] = True

print(grafo[0])
print(adj[0][4])

# Ponderado: grafo[a].append((b, peso))''',
        "insight": "Em grafo ponderado, armazene (vizinho, peso) na lista ou o peso/INF na matriz.",
        "pitfall": "Em grafo direcionado, adicionar a aresta inversa muda o problema. Confirme o sentido.",
    },
    {
        "chapter": "DFS",
        "title": "Busca em profundidade e árvore de descoberta",
        "summary": "Marque antes de aprofundar. Cada aresta usada para alcançar um vértice novo pertence à árvore da DFS.",
        "when": "Componentes, exploração, ciclos, conectividade e árvores.",
        "complexity": "O(V+E) com lista de adjacência",
        "code": '''def dfs(vertice, grafo, visitado):
    visitado[vertice] = True
    arestas_da_busca = 0

    for vizinho in grafo[vertice]:
        if not visitado[vizinho]:
            arestas_da_busca += 1
            arestas_da_busca += dfs(
                vizinho, grafo, visitado
            )

    return arestas_da_busca


grafo = [[1], [0, 2, 3], [1], [1]]
visitado = [False] * len(grafo)
descobertas = dfs(0, grafo, visitado)

# Ida e volta por cada aresta da árvore.
print(descobertas * 2)''',
        "insight": "A ordem depende dos vizinhos, mas a cobertura não. Conte descobertas quando duplicatas não devem contar.",
        "pitfall": "Profundidade muito grande pode causar RecursionError. Considere pilha explícita.",
    },
    {
        "chapter": "BFS",
        "title": "Menor número de passos em grafo sem peso",
        "summary": "A fila processa por camadas. A primeira retirada do destino ocorre com a menor quantidade de arestas.",
        "when": "Tabuleiros, labirintos e menor caminho com arestas de custo igual.",
        "complexity": "O(V+E)",
        "code": '''from collections import deque


def bfs(origem, destino, grafo):
    fila = deque([(origem, 0)])
    visitado = {origem}

    while fila:
        vertice, distancia = fila.popleft()

        if vertice == destino:
            return distancia

        for vizinho in grafo[vertice]:
            if vizinho not in visitado:
                # Marque ao entrar para evitar duplicatas.
                visitado.add(vizinho)
                fila.append((vizinho, distancia + 1))

    return -1''',
        "insight": "Para grades, vértices são coordenadas e arestas são movimentos válidos dentro dos limites.",
        "pitfall": "Marcar apenas ao retirar pode enfileirar o mesmo vértice muitas vezes.",
    },
    {
        "chapter": "DIJKSTRA",
        "title": "Menor custo com pesos não negativos",
        "summary": "Retire a menor estimativa, ignore entradas antigas e relaxe arestas que podem melhorar um vizinho.",
        "when": "Rotas e custos diferentes, desde que nenhum peso seja negativo.",
        "complexity": "O((V+E) log V) com heap",
        "code": '''import heapq


def dijkstra(grafo, origem):
    infinito = float("inf")
    dist = [infinito] * len(grafo)
    dist[origem] = 0
    fila = [(0, origem)]

    while fila:
        distancia_atual, v = heapq.heappop(fila)

        if distancia_atual != dist[v]:
            continue  # entrada antiga

        for vizinho, peso in grafo[v]:
            novo = distancia_atual + peso
            if novo < dist[vizinho]:
                dist[vizinho] = novo
                heapq.heappush(fila, (novo, vizinho))

    return dist''',
        "insight": "Relaxar pergunta se chegar ao vizinho passando pelo atual custa menos que a melhor estimativa.",
        "pitfall": "BFS minimiza arestas, não soma de pesos. Dijkstra não é correto com pesos negativos.",
    },
    {
        "chapter": "GEOMETRIA",
        "title": "Distância ao quadrado e tolerância",
        "summary": "Evite raiz quando apenas compara distâncias. Em float, use tolerância em vez de igualdade exata.",
        "when": "Círculos, pontos cocirculares, colisões e ordenação por distância.",
        "complexity": "O(1) por teste",
        "code": '''import math


EPS = 1e-7


def distancia2(a, b):
    dx = a[0] - b[0]
    dy = a[1] - b[1]
    return dx * dx + dy * dy


def mesma_distancia(d1, d2):
    return math.isclose(
        d1, d2, rel_tol=EPS, abs_tol=EPS
    )


centro = (0.0, 0.0)
ponto = (3.0, 4.0)
raio = 5.0

print(distancia2(centro, ponto) <= raio * raio)
print(mesma_distancia(distancia2(centro, ponto), 25.0))''',
        "insight": "Ao elevar desigualdade ao quadrado, confirme que os dois lados são não negativos.",
        "pitfall": "Não use == para seno, divisão, circuncentro ou projeção em ponto flutuante.",
    },
    {
        "chapter": "GEOMETRIA",
        "title": "Contenção e separação de círculos",
        "summary": "Traduza o desenho para desigualdades entre distância dos centros e soma ou diferença dos raios.",
        "when": "Círculo dentro de círculo e dois círculos dentro de retângulo.",
        "complexity": "O(1) por caso",
        "code": '''def circulo_dentro(r1, x1, y1, r2, x2, y2):
    if r2 > r1:
        return False

    dx = x1 - x2
    dy = y1 - y2
    limite = r1 - r2
    return dx * dx + dy * dy <= limite * limite


def dois_circulos_no_retangulo(largura, altura, r1, r2):
    # Cada círculo precisa caber isoladamente.
    for raio in (r1, r2):
        if 2 * raio > largura or 2 * raio > altura:
            return False

    # Cantos opostos maximizam a separação.
    dx = largura - r1 - r2
    dy = altura - r1 - r2
    return dx * dx + dy * dy >= (r1 + r2) ** 2''',
        "insight": "Dentro: distância <= diferença dos raios. Separados: distância >= soma dos raios.",
        "pitfall": "Tangência normalmente conta como válida; observe se o sinal correto é <= ou >=.",
    },
    {
        "chapter": "GEOMETRIA",
        "title": "Distância de ponto a segmento",
        "summary": "Projete na reta e limite t a [0,1]. A resposta pode cair na perpendicular ou em uma extremidade.",
        "when": "Obstáculos, corredores, aletas e distância a uma aresta finita.",
        "complexity": "O(1) por segmento",
        "code": '''import math


def distancia_ponto_segmento(p, a, b):
    px, py = p
    ax, ay = a
    bx, by = b
    vx, vy = bx - ax, by - ay
    comprimento2 = vx * vx + vy * vy

    if comprimento2 == 0.0:
        return math.hypot(px - ax, py - ay)

    t = ((px - ax) * vx + (py - ay) * vy) / comprimento2
    t = max(0.0, min(1.0, t))

    qx = ax + t * vx
    qy = ay + t * vy
    return math.hypot(px - qx, py - qy)''',
        "insight": "t < 0 escolhe A; t > 1 escolhe B; entre 0 e 1 usa o pé da perpendicular.",
        "pitfall": "Distância à reta infinita pode ser menor que a distância ao segmento real.",
    },
    {
        "chapter": "BACKTRACKING",
        "title": "Escolher, explorar e desfazer",
        "summary": "A candidata parcial vive em caminho. Depois de visitar um ramo, restaure o estado antes da próxima escolha.",
        "when": "Permutações, configurações, caminhos e busca com poda.",
        "complexity": "Geralmente exponencial; depende das podas",
        "code": '''def gerar(caminho, letras, tamanho, respostas):
    if len(caminho) == tamanho:
        respostas.append(caminho.copy())
        return

    for letra in letras:
        caminho.append(letra)  # escolher

        # Poda: continue apenas se ainda puder servir.
        if valida_parcialmente(caminho):
            gerar(caminho, letras, tamanho, respostas)

        caminho.pop()          # desfazer


def valida_parcialmente(caminho):
    return "BB" not in "".join(caminho)


respostas = []
gerar([], ["A", "B"], 3, respostas)''',
        "insight": "copy() registra o estado atual. Sem cópia, as respostas podem apontar para a mesma lista mutável.",
        "pitfall": "Poda por intuição pode eliminar a solução correta. Abandone somente com prova de inviabilidade.",
    },
    {
        "chapter": "GULOSO",
        "title": "Pilha monotônica para maximizar um número",
        "summary": "Um dígito maior substitui dígitos menores anteriores enquanto ainda houver remoções disponíveis.",
        "when": "Subsequência ótima preservando ordem e problemas de próximo maior.",
        "complexity": "Tempo O(n), memória O(n)",
        "code": '''def maior_numero(numero, remover):
    manter = len(numero) - remover
    pilha = []

    for digito in numero:
        while (
            pilha
            and remover > 0
            and digito > pilha[-1]
        ):
            pilha.pop()
            remover -= 1

        pilha.append(digito)

    # Se ainda restam remoções, saem do final.
    return "".join(pilha[:manter])


print(maior_numero("375931", 2))''',
        "insight": "Em números do mesmo tamanho, a primeira posição diferente decide o maior. Isso sustenta a troca.",
        "pitfall": "Guloso exige prova. Moedas [1,3,4] e valor 6 refutam a regra 'usar sempre a maior moeda'.",
    },
    {
        "chapter": "PROGRAMAÇÃO DINÂMICA",
        "title": "Troco ilimitado: mínimo de blocos",
        "summary": "dp[soma] guarda a menor quantidade de blocos para formar exatamente soma. Ordem crescente permite reutilização.",
        "when": "Cada tipo pode ser usado várias vezes e o objetivo é alcançar uma soma.",
        "complexity": "O(n·alvo) de tempo, O(alvo) de memória",
        "code": '''def minimo_blocos(blocos, alvo):
    infinito = alvo + 1
    dp = [infinito] * (alvo + 1)
    dp[0] = 0

    for bloco in blocos:
        # Crescente: reutiliza o bloco atual.
        for soma in range(bloco, alvo + 1):
            dp[soma] = min(
                dp[soma],
                dp[soma - bloco] + 1,
            )

    if dp[alvo] == infinito:
        return -1
    return dp[alvo]


print(minimo_blocos([1, 3, 4], 6))  # 2''',
        "insight": "Antes da fórmula, escreva: dp[s] = menor número de blocos que forma exatamente s.",
        "pitfall": "Use marcador de inalcançável. Somar 1 a um estado inexistente não cria solução válida.",
    },
    {
        "chapter": "PROGRAMAÇÃO DINÂMICA",
        "title": "Mochila 0/1 e direção do laço",
        "summary": "Cada item entra no máximo uma vez. Capacidades decrescentes impedem reutilização na mesma rodada.",
        "when": "Selecionar subconjunto com limite de capacidade e valor máximo.",
        "complexity": "O(n·capacidade) de tempo, O(capacidade) de memória",
        "code": '''def mochila_01(itens, capacidade_maxima):
    # item = (peso, valor)
    dp = [0] * (capacidade_maxima + 1)

    for peso, valor in itens:
        for capacidade in range(
            capacidade_maxima,
            peso - 1,
            -1,
        ):
            dp[capacidade] = max(
                dp[capacidade],
                dp[capacidade - peso] + valor,
            )

    return dp[capacidade_maxima]


pedidos = [(2, 10), (3, 14), (4, 16)]
print(mochila_01(pedidos, 5))''',
        "insight": "Crescente permite reutilização ilimitada; decrescente usa cada item uma vez na DP comprimida.",
        "pitfall": "Trocar a direção do laço muda o problema resolvido, mesmo que a fórmula pareça idêntica.",
    },
    {
        "chapter": "PROGRAMAÇÃO DINÂMICA",
        "title": "Kadane: melhor intervalo consecutivo",
        "summary": "atual é o melhor intervalo que termina agora. Prefixo negativo só prejudica o futuro e pode ser descartado.",
        "when": "Maior soma de subarray, lucro por período e ganho líquido consecutivo.",
        "complexity": "Tempo O(n), memória O(1)",
        "code": '''def maior_lucro(receitas, custo_diario):
    melhor = 0
    atual = 0

    for receita in receitas:
        lucro = receita - custo_diario
        atual += lucro
        melhor = max(melhor, atual)

        if atual < 0:
            atual = 0

    return melhor


receitas = [4, 8, 10, 3, 7]
print(maior_lucro(receitas, 5))

# Se o segmento não pode ser vazio,
# adapte a inicialização.''',
        "insight": "Uma tabela DP inteira foi comprimida em duas variáveis porque apenas o passo anterior importa.",
        "pitfall": "melhor = 0 aceita a escolha vazia. Verifique se o enunciado permite resposta zero.",
    },
    {
        "chapter": "MEMOIZAÇÃO",
        "title": "Recursão com cache de estados",
        "summary": "Calcule cada estado uma vez. A chave precisa conter todos os parâmetros que alteram a resposta.",
        "when": "Subproblemas sobrepostos e formulação top-down natural.",
        "complexity": "O(estados × transições)",
        "code": '''from functools import cache


@cache
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)


def fib_manual(n, memo):
    if n <= 1:
        return n
    if n in memo:
        return memo[n]

    memo[n] = (
        fib_manual(n - 1, memo)
        + fib_manual(n - 2, memo)
    )
    return memo[n]


print(fib(35))
print(fib_manual(35, {}))''',
        "insight": "Memoização reduz recomputação, mas não elimina a pilha. Bottom-up pode ser mais seguro em profundidade grande.",
        "pitfall": "Separe o cache entre casos quando a resposta também depende de dados globais da instância.",
    },
    {
        "chapter": "DIVISÃO E CONQUISTA",
        "title": "Exponenciação rápida",
        "summary": "Expoentes pares reutilizam a mesma metade. O número de multiplicações cai para O(log expoente).",
        "when": "Potências modulares, matrizes de recorrência e n muito grande.",
        "complexity": "O(log expoente)",
        "code": '''def potencia_modular(base, expoente, modulo):
    resultado = 1
    base %= modulo

    while expoente > 0:
        if expoente % 2 == 1:
            resultado = (
                resultado * base
            ) % modulo

        base = (base * base) % modulo
        expoente //= 2

    return resultado


print(potencia_modular(
    3, 10**18, 1_000_000_007
))

# Para matrizes, use multiplicação matricial
# e matriz identidade como resultado inicial.''',
        "insight": "Uma recorrência linear pode virar transformação de estado e potência de matriz, como no módulo de paradigmas.",
        "pitfall": "Aplique módulo durante as multiplicações para controlar os números e preservar o resto final.",
    },
    {
        "chapter": "SUBMISSÃO",
        "title": "Diagnóstico por veredito e checklist final",
        "summary": "O veredito reduz o espaço do erro. Corrija uma hipótese por vez e reproduza localmente um caso mínimo.",
        "when": "Nos minutos finais e após toda submissão que não recebeu Accepted.",
        "complexity": "Processo de depuração",
        "code": '''def antes_de_submeter():
    assert arquivo_e_linguagem_corretos()
    assert leitura_respeita_o_formato()
    assert indices_e_bordas_testados()
    assert tipos_numericos_seguros()
    assert complexidade_cabe_nos_limites()
    assert saida_exatamente_formatada()


# CE: sintaxe, nome, indentação, versão.
# RE: índice, zero, fila vazia, recursão.
# TLE: complexidade, I/O, estados repetidos.
# MLE: matriz grande, cópias, cache.
# WA: interpretação, borda, formato, sentido.

casos = [
    "menor", "maior", "empate",
    "borda inclusiva", "sem caminho",
    "sentinela/EOF", "formatação",
]''',
        "insight": "Accepted exige algoritmo correto e protocolo exato de entrada/saída. Formato também faz parte da solução.",
        "pitfall": "Não altere tudo ao mesmo tempo. Crie um caso que falha, explique o esperado e só então mude o código.",
    },
]
