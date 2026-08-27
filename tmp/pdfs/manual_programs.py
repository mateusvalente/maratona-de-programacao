from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]


def load(relative_path):
    return (ROOT / relative_path).read_text(encoding="utf-8").strip()


PAGES = [
    {
        "chapter": "FUNDAMENTOS · 01",
        "title": "Entrada, cálculo e print com casas decimais",
        "summary": "Programa completo que lê dois valores, calcula resultados e controla exatamente a apresentação decimal.",
        "when": "Entrada: dois números. Saída: soma, média e produto com 2 casas.",
        "complexity": "Tempo O(1) · memória O(1)",
        "code": '''import sys


def main():
    # split separa a linha; map converte cada parte para float.
    a, b = map(float, input().split())

    # Os cálculos usam a precisão original dos valores.
    soma = a + b
    media = soma / 2.0
    produto = a * b

    # :.2f arredonda apenas na apresentação e sempre mostra 2 casas.
    print(f"Soma = {soma:.2f}")
    print(f"Media = {media:.2f}")
    print(f"Produto = {produto:.2f}")

    # O juiz normalmente espera uma quebra após a última linha.
    # print já acrescenta essa quebra automaticamente.


if __name__ == "__main__":
    main()''',
        "insight": "input() devolve texto; a conversão define quais operações podem ser feitas. A f-string separa cálculo de formatação.",
        "pitfall": "Não arredonde antes de terminar os cálculos. Confira maiúsculas, rótulos, espaços e número de casas exigidos.",
    },
    {
        "chapter": "FUNDAMENTOS · 02",
        "title": "T casos com if, elif e else",
        "summary": "Programa completo que processa uma quantidade declarada de notas e classifica cada caso por intervalos.",
        "when": "Entrada: T e uma nota por caso. Saída: classificação por linha.",
        "complexity": "Tempo O(T) · memória O(1)",
        "code": '''def classificar(nota):
    # A ordem impede que um intervalo capture outro.
    if 90 <= nota <= 100:
        return "A"
    elif 70 <= nota < 90:
        return "B"
    elif 60 <= nota < 70:
        return "C"
    elif 0 <= nota < 60:
        return "D"
    else:
        return "nota invalida"


def main():
    # A primeira linha informa quantos casos virão.
    quantidade = int(input())

    for caso in range(1, quantidade + 1):
        nota = int(input())
        conceito = classificar(nota)
        print(f"Caso {caso}: {conceito}")


if __name__ == "__main__":
    main()''',
        "insight": "for range(1, T + 1) produz casos numerados de 1 a T. A função devolve a decisão; o main cuida do protocolo.",
        "pitfall": "Teste 0, 59, 60, 69, 70, 89, 90 e 100. Bordas inclusivas são fonte frequente de WA.",
    },
    {
        "chapter": "FUNDAMENTOS · 03",
        "title": "while, sentinela, break e continue",
        "summary": "Programa completo que lê valores até zero, ignora negativos e acumula somente os positivos válidos.",
        "when": "Entrada: inteiros até aparecer 0. Saída: quantidade e soma.",
        "complexity": "Tempo O(n) · memória O(1)",
        "code": '''def main():
    quantidade = 0
    soma = 0

    while True:
        valor = int(input())

        # Zero encerra a entrada e não é processado.
        if valor == 0:
            break

        # Negativos são ignorados nesta regra.
        if valor < 0:
            continue

        # Só valores positivos chegam até aqui.
        quantidade += 1
        soma += valor

    print(f"Quantidade: {quantidade}")
    print(f"Soma: {soma}")


if __name__ == "__main__":
    main()''',
        "insight": "break encerra o laço inteiro. continue pula apenas o restante da repetição atual e volta à leitura.",
        "pitfall": "Em laços com índice, atualize o estado antes de um possível continue; caso contrário o mesmo estado pode repetir para sempre.",
    },
    {
        "chapter": "FUNDAMENTOS · 04",
        "title": "Leitura até EOF preservando a linha",
        "summary": "Programa completo que recebe frases até o fim do arquivo e conta letras, dígitos e espaços em cada uma.",
        "when": "Entrada: número desconhecido de linhas. Saída: três contagens por linha.",
        "complexity": "Tempo O(total de caracteres) · memória O(1) extra",
        "code": '''import sys


def analisar(texto):
    letras = 0
    digitos = 0
    espacos = 0

    for caractere in texto:
        if caractere.isalpha():
            letras += 1
        elif caractere.isdigit():
            digitos += 1
        elif caractere == " ":
            espacos += 1

    return letras, digitos, espacos


def main():
    # O for termina naturalmente quando o arquivo acaba.
    for linha in sys.stdin:
        # Remove apenas a quebra, preservando outros espaços.
        texto = linha.rstrip("\\n")
        l, d, e = analisar(texto)
        print(l, d, e)


if __name__ == "__main__":
    main()''',
        "insight": "EOF não é um valor da entrada: é a ausência de outra linha. for linha in sys.stdin expressa esse formato diretamente.",
        "pitfall": "strip() também remove espaços significativos das pontas. Use rstrip('\\n') quando o conteúdo completo da linha importa.",
    },
    {
        "chapter": "FUNDAMENTOS · 05",
        "title": "Entrada e saída rápidas em bloco",
        "summary": "Programa completo para muitos tokens: lê tudo como bytes, consome com iterador e escreve todas as respostas de uma vez.",
        "when": "Entrada: T listas numéricas. Saída: soma de cada lista.",
        "complexity": "Tempo O(total de tokens) · memória O(total da entrada)",
        "code": '''import sys


def main():
    # read().split() é rápido quando espaços e linhas são equivalentes.
    dados = iter(sys.stdin.buffer.read().split())
    quantidade_de_casos = int(next(dados))
    respostas = []

    for _ in range(quantidade_de_casos):
        tamanho = int(next(dados))
        soma = 0

        for _ in range(tamanho):
            soma += int(next(dados))

        # Guardamos texto para uma única escrita no final.
        respostas.append(str(soma))

    sys.stdout.write("\\n".join(respostas) + "\\n")


if __name__ == "__main__":
    main()''',
        "insight": "O iterador consome exatamente os tokens do caso atual. join reduz milhares de chamadas de escrita.",
        "pitfall": "Essa técnica perde a distinção entre linhas. Não a use quando frases, linhas vazias ou espaços internos fazem parte do dado.",
    },
    {
        "chapter": "FUNDAMENTOS · 06",
        "title": "for, range, enumerate e matriz",
        "summary": "Programa completo que lê uma matriz, percorre valores e índices e encontra a posição do maior elemento.",
        "when": "Entrada: linhas, colunas e matriz. Saída: soma e posição do máximo.",
        "complexity": "Tempo O(linhas·colunas) · memória O(linhas·colunas)",
        "code": '''def main():
    linhas, colunas = map(int, input().split())
    matriz = [
        list(map(int, input().split()))
        for _ in range(linhas)
    ]

    soma = 0
    maior = matriz[0][0]
    melhor_linha = 0
    melhor_coluna = 0

    for i, linha in enumerate(matriz):
        for j, valor in enumerate(linha):
            soma += valor

            if valor > maior:
                maior = valor
                melhor_linha = i
                melhor_coluna = j

    print(f"Soma: {soma}")
    print(f"Maior: {maior}")
    print(f"Posicao: {melhor_linha + 1} {melhor_coluna + 1}")


if __name__ == "__main__":
    main()''',
        "insight": "enumerate entrega posição e valor. Índices internos começam em 0; a saída pode exigir conversão para base 1.",
        "pitfall": "Não assuma matriz não vazia sem conferir as restrições. Cada linha também precisa conter a quantidade declarada de colunas.",
    },
    {
        "chapter": "FUNDAMENTOS · 07",
        "title": "Varredura de lista com melhor resposta",
        "summary": "Programa completo que encontra o palpite mais próximo e preserva o primeiro participante quando há empate.",
        "when": "Entrada: T casos, alvo e palpites. Saída: posição vencedora.",
        "complexity": "Tempo O(total de palpites) · memória O(n)",
        "code": load("paradigmas/respostas/1547.py"),
        "insight": "A melhor resposta começa no primeiro elemento. A comparação estrita atualiza apenas quando a nova distância é realmente menor.",
        "pitfall": "Trocar <= por < altera o desempate. A posição impressa é índice + 1.",
    },
    {
        "chapter": "FUNDAMENTOS · 08",
        "title": "Funções, math e estatística básica",
        "summary": "Programa completo que decompõe cálculos em funções e imprime distância, média e mediana.",
        "when": "Entrada: dois pontos e uma lista. Saída: medidas com 3 casas.",
        "complexity": "Tempo O(n log n) pela ordenação · memória O(n)",
        "code": '''import math


def distancia(x1, y1, x2, y2):
    # hypot calcula sqrt(dx² + dy²).
    return math.hypot(x1 - x2, y1 - y2)


def media(valores):
    return sum(valores) / len(valores)


def mediana(valores):
    ordenados = sorted(valores)
    n = len(ordenados)
    meio = n // 2

    if n % 2 == 1:
        return ordenados[meio]
    return (ordenados[meio - 1] + ordenados[meio]) / 2


def main():
    x1, y1, x2, y2 = map(float, input().split())
    n = int(input())
    valores = list(map(float, input().split()))
    assert len(valores) == n

    print(f"Distancia: {distancia(x1, y1, x2, y2):.3f}")
    print(f"Media: {media(valores):.3f}")
    print(f"Mediana: {mediana(valores):.3f}")


if __name__ == "__main__":
    main()''',
        "insight": "Funções separam contratos pequenos: parâmetros entram, return devolve o resultado e print fica no programa principal.",
        "pitfall": "math.sin recebe radianos. Quando o enunciado fornece graus, converta com math.radians(angulo).",
    },
    {
        "chapter": "FUNDAMENTOS · 09",
        "title": "Dicionário e set para frequências",
        "summary": "Programa completo que conta palavras, remove duplicatas e responde consultas de ocorrência.",
        "when": "Entrada: palavras e consultas. Saída: frequência ou zero.",
        "complexity": "Tempo O(n+q) médio · memória O(n)",
        "code": '''def main():
    n, q = map(int, input().split())
    palavras = input().split()
    assert len(palavras) == n

    frequencia = {}
    unicas = set()

    for palavra in palavras:
        frequencia[palavra] = frequencia.get(palavra, 0) + 1
        unicas.add(palavra)

    print(f"Distintas: {len(unicas)}")

    for _ in range(q):
        consulta = input().strip()
        print(frequencia.get(consulta, 0))


if __name__ == "__main__":
    main()''',
        "insight": "O dicionário associa palavra à contagem. O set responde pertencimento e quantidade de valores distintos.",
        "pitfall": "set não preserva duplicatas. A ordem de iteração não deve ser usada como regra de saída, salvo garantia explícita.",
    },
    {
        "chapter": "FUNDAMENTOS · 10",
        "title": "Ordenação com múltiplos critérios",
        "summary": "Programa completo que ordena registros por peso decrescente, idade, altura e nome crescentes.",
        "when": "Entrada: cenários de renas. Saída: prefixo do ranking.",
        "complexity": "Tempo O(n log n) · memória O(n)",
        "code": load("estrutura_de_dados/resolucoes/1766.py"),
        "insight": "A chave é uma tupla comparada em cascata. O sinal negativo transforma apenas o peso em ordem decrescente.",
        "pitfall": "reverse=True inverteria todos os critérios. A tupla permite misturar sentidos e desempates corretamente.",
    },
    {
        "chapter": "FUNDAMENTOS · 11",
        "title": "Busca binária da primeira ocorrência",
        "summary": "Programa completo que ordena mármores uma vez e usa bisect_left em cada consulta.",
        "when": "Entrada: vários casos com valores e consultas. Saída: primeira posição.",
        "complexity": "O(n log n + q log n) por caso",
        "code": load("paradigmas/respostas/1025.py"),
        "insight": "bisect_left devolve o ponto mais à esquerda onde o alvo poderia entrar. O código ainda confirma se ele existe.",
        "pitfall": "A busca depende da ordenação. A posição interna começa em 0, mas o enunciado imprime começando em 1.",
    },
    {
        "chapter": "ESTRUTURAS · 12",
        "title": "Pilha: balanço de parênteses até EOF",
        "summary": "Programa completo do beecrowd 1068. A pilha representa aberturas que ainda aguardam fechamento.",
        "when": "Entrada: expressões até EOF. Saída: correct ou incorrect.",
        "complexity": "Tempo O(n) · memória O(n) por expressão",
        "code": load("estrutura_de_dados/resolucoes/1068.py"),
        "insight": "Ao ler '(', empilhe. Ao ler ')', precisa existir uma abertura disponível. No final, a pilha deve estar vazia.",
        "pitfall": "Contagens iguais não garantem ordem correta. ')(' deve ser rejeitada imediatamente.",
    },
    {
        "chapter": "ESTRUTURAS · 13",
        "title": "Fila com deque: jogando cartas fora",
        "summary": "Programa completo do beecrowd 1110. O topo fica no front e a base no back do deque.",
        "when": "Entrada: valores n até sentinela 0. Saída: descartes e restante.",
        "complexity": "Tempo O(n) · memória O(n) por caso",
        "code": load("estrutura_de_dados/resolucoes/1110.py"),
        "insight": "popleft descarta o topo; append(popleft()) move o novo topo para a base. Cada operação nas pontas custa O(1).",
        "pitfall": "list.pop(0) desloca os demais elementos e custa O(n). Para fila, prefira collections.deque.",
    },
    {
        "chapter": "ESTRUTURAS · 14",
        "title": "Pilha, fila e heap simulados em paralelo",
        "summary": "Programa completo do beecrowd 1340. Cada remoção elimina as estruturas que não poderiam devolver o valor observado.",
        "when": "Entrada: casos até EOF com operações 1 x e 2 x. Saída: classificação.",
        "complexity": "Tempo O(n log n) · memória O(n)",
        "code": load("estrutura_de_dados/resolucoes/1340.py"),
        "insight": "A mesma inserção é reproduzida nas três candidatas. Uma remoção compara LIFO, FIFO e maior prioridade.",
        "pitfall": "heapq é min-heap. Valores negativos simulam a retirada do maior elemento.",
    },
    {
        "chapter": "STRINGS · 15",
        "title": "Transformação de string em três fases",
        "summary": "Programa completo do beecrowd 1024. Cada regra recebe o resultado da fase anterior.",
        "when": "Entrada: quantidade e mensagens completas. Saída: mensagem criptografada.",
        "complexity": "Tempo O(n) · memória O(n) por mensagem",
        "code": load("strings/resolucoes/1024.py"),
        "insight": "ord e chr deslocam códigos; [::-1] inverte; len // 2 define a metade após a inversão.",
        "pitfall": "Executar fases fora de ordem muda as posições usadas pela terceira regra.",
    },
    {
        "chapter": "STRINGS · 16",
        "title": "Máquina de estados em uma frase",
        "summary": "Programa completo do beecrowd 1234. O booleano informa como a próxima letra deve ser escrita.",
        "when": "Entrada: sentenças até EOF. Saída: maiúsculas e minúsculas alternadas.",
        "complexity": "Tempo O(n) · memória O(n) por linha",
        "code": load("strings/resolucoes/1234.py"),
        "insight": "O estado troca somente depois de uma letra. Espaços e sinais são copiados sem consumir a alternância.",
        "pitfall": "Usar o índice absoluto falha quando espaços não devem contar.",
    },
    {
        "chapter": "STRINGS · 17",
        "title": "Intercalação com sobra da maior string",
        "summary": "Programa completo do beecrowd 1238. Intercala o prefixo comum e anexa o restante sem perder caracteres.",
        "when": "Entrada: T pares de strings. Saída: uma combinação por linha.",
        "complexity": "Tempo O(|a|+|b|) · memória O(|a|+|b|)",
        "code": load("strings/resolucoes/1238.py"),
        "insight": "min(len(a), len(b)) define quantos pares existem. Depois do limite, somente uma das sobras é não vazia.",
        "pitfall": "zip(a, b) puro descarta a sobra da string maior. Ela precisa ser anexada explicitamente.",
    },
    {
        "chapter": "STRINGS · 18",
        "title": "DP da maior substring comum",
        "summary": "Programa completo do beecrowd 1237. Coincidências estendem a diagonal anterior; divergências valem zero.",
        "when": "Entrada: pares de linhas até EOF. Saída: tamanho do maior trecho contínuo.",
        "complexity": "Tempo O(n·m) · memória O(min(n,m))",
        "code": load("strings/resolucoes/1237.py"),
        "insight": "anterior[j-1] representa o sufixo comum que terminava nas duas posições anteriores.",
        "pitfall": "Substring é contínua; subsequência permite saltos e resolve outro problema.",
    },
    {
        "chapter": "GRAFOS · 19",
        "title": "DFS e árvore de descoberta",
        "summary": "Programa completo do beecrowd 1076. A DFS conta arestas que alcançam vértices novos e dobra para ida e volta.",
        "when": "Entrada: T labirintos. Saída: movimentos mínimos de caneta.",
        "complexity": "Tempo O(V+E) · memória O(V+E)",
        "code": load("grafos/resolucoes/1076.py"),
        "insight": "A lista de adjacência guarda vizinhos. visitado evita repetir vértices e neutraliza arestas duplicadas.",
        "pitfall": "Em grafo não direcionado, registre a e b nos dois sentidos. Em direcionado, não invente a volta.",
    },
    {
        "chapter": "GRAFOS · 20",
        "title": "BFS no tabuleiro do cavalo",
        "summary": "Programa completo do beecrowd 1100. A fila visita casas em camadas de distância crescente.",
        "when": "Entrada: pares de casas até EOF. Saída: menor número de movimentos.",
        "complexity": "O(64·8) por caso · memória O(64)",
        "code": load("grafos/resolucoes/1100.py"),
        "insight": "Os oito deslocamentos formam as arestas do grafo. A primeira retirada do destino tem a menor distância.",
        "pitfall": "Marque a casa quando ela entra na fila, não quando sai, para evitar inserções duplicadas.",
    },
    {
        "chapter": "GRAFOS · 21",
        "title": "Dijkstra com lista e fila de prioridade",
        "summary": "Programa completo para menor caminho com pesos não negativos, usando heap e descarte de entradas antigas.",
        "when": "Entrada: grafo direcionado e uma origem. Saída: distâncias ou -1.",
        "complexity": "O((V+E) log V) · memória O(V+E)",
        "code": '''import heapq
import sys


def dijkstra(grafo, origem):
    infinito = 10**18
    distancia = [infinito] * len(grafo)
    distancia[origem] = 0
    fila = [(0, origem)]

    while fila:
        custo_atual, vertice = heapq.heappop(fila)

        # Uma rota melhor já foi inserida depois desta.
        if custo_atual != distancia[vertice]:
            continue

        for vizinho, peso in grafo[vertice]:
            novo_custo = custo_atual + peso

            # Relaxamento: melhora a estimativa do vizinho.
            if novo_custo < distancia[vizinho]:
                distancia[vizinho] = novo_custo
                heapq.heappush(fila, (novo_custo, vizinho))

    return distancia


def main():
    vertices, arestas, origem = map(int, input().split())
    grafo = [[] for _ in range(vertices)]

    for _ in range(arestas):
        a, b, peso = map(int, input().split())
        grafo[a].append((b, peso))

    resposta = dijkstra(grafo, origem)
    print(*(-1 if d == 10**18 else d for d in resposta))


if __name__ == "__main__":
    main()''',
        "insight": "Relaxar é testar se passar pelo vértice atual cria custo menor. A heap sempre oferece a menor estimativa.",
        "pitfall": "Dijkstra não funciona com pesos negativos. BFS minimiza quantidade de arestas, não a soma dos pesos.",
    },
    {
        "chapter": "GEOMETRIA · 22",
        "title": "Círculos: contenção e separação",
        "summary": "Programa completo com dois tipos de consulta: círculo dentro de outro e dois círculos em um retângulo.",
        "when": "Entrada: T consultas DENTRO ou RETANGULO. Saída: S ou N.",
        "complexity": "Tempo O(T) · memória O(1)",
        "code": '''def circulo_dentro(r1, x1, y1, r2, x2, y2):
    # Um círculo maior nunca cabe no menor.
    if r2 > r1:
        return False

    dx = x1 - x2
    dy = y1 - y2
    limite = r1 - r2

    # Distância entre centros <= diferença dos raios.
    return dx * dx + dy * dy <= limite * limite


def cabem_no_retangulo(largura, altura, r1, r2):
    # Cada diâmetro precisa caber isoladamente.
    for raio in (r1, r2):
        if 2 * raio > largura or 2 * raio > altura:
            return False

    # Cantos opostos maximizam a distância.
    dx = largura - r1 - r2
    dy = altura - r1 - r2
    return dx * dx + dy * dy >= (r1 + r2) ** 2


def main():
    t = int(input())

    for _ in range(t):
        partes = input().split()
        tipo = partes[0]
        valores = list(map(float, partes[1:]))

        if tipo == "DENTRO":
            resposta = circulo_dentro(*valores)
        else:
            resposta = cabem_no_retangulo(*valores)

        print("S" if resposta else "N")


if __name__ == "__main__":
    main()''',
        "insight": "Contenção usa diferença dos raios; não sobreposição usa soma. Comparar quadrados evita sqrt.",
        "pitfall": "Antes de elevar a diferença ao quadrado, teste qual raio é maior. Tangência usa <= ou >=.",
    },
    {
        "chapter": "GEOMETRIA · 23",
        "title": "Distância de ponto a segmento",
        "summary": "Programa completo que projeta cada ponto no segmento e imprime a menor distância com duas casas.",
        "when": "Entrada: segmento e Q pontos. Saída: uma distância por ponto.",
        "complexity": "Tempo O(Q) · memória O(1)",
        "code": '''import math


def distancia_ponto_segmento(p, a, b):
    px, py = p
    ax, ay = a
    bx, by = b
    vx = bx - ax
    vy = by - ay
    comprimento2 = vx * vx + vy * vy

    # Segmento degenerado: A e B são o mesmo ponto.
    if comprimento2 == 0.0:
        return math.hypot(px - ax, py - ay)

    # Projeção na reta, depois limitada ao segmento.
    t = ((px - ax) * vx + (py - ay) * vy) / comprimento2
    t = max(0.0, min(1.0, t))

    qx = ax + t * vx
    qy = ay + t * vy
    return math.hypot(px - qx, py - qy)


def main():
    ax, ay, bx, by = map(float, input().split())
    consultas = int(input())
    a = (ax, ay)
    b = (bx, by)

    for _ in range(consultas):
        ponto = tuple(map(float, input().split()))
        distancia = distancia_ponto_segmento(ponto, a, b)
        print(f"{distancia:.2f}")


if __name__ == "__main__":
    main()''',
        "insight": "t entre 0 e 1 usa a perpendicular; fora desse intervalo, a extremidade mais próxima vence.",
        "pitfall": "Distância à reta infinita pode cair fora do segmento e produzir resposta impossível.",
    },
    {
        "chapter": "GEOMETRIA · 24",
        "title": "Circuncírculo e comparação com EPS",
        "summary": "Programa completo que testa se todos os pontos pertencem ao círculo definido pelos três primeiros.",
        "when": "Entrada: N pontos. Saída: SIM, NAO ou COLINEARES.",
        "complexity": "Tempo O(N) · memória O(N)",
        "code": '''import math


EPS = 1e-7


def circuncirculo(a, b, c):
    ax, ay = a
    bx, by = b
    cx, cy = c
    d = 2.0 * (
        ax * (by - cy)
        + bx * (cy - ay)
        + cx * (ay - by)
    )

    # Determinante zero: os três pontos são colineares.
    if math.isclose(d, 0.0, abs_tol=EPS):
        return None

    a2 = ax * ax + ay * ay
    b2 = bx * bx + by * by
    c2 = cx * cx + cy * cy
    ux = (a2 * (by - cy) + b2 * (cy - ay)
          + c2 * (ay - by)) / d
    uy = (a2 * (cx - bx) + b2 * (ax - cx)
          + c2 * (bx - ax)) / d
    raio2 = (ax - ux) ** 2 + (ay - uy) ** 2
    return ux, uy, raio2


def main():
    n = int(input())
    pontos = [tuple(map(float, input().split())) for _ in range(n)]
    circulo = circuncirculo(*pontos[:3])

    if circulo is None:
        print("COLINEARES")
        return

    ux, uy, raio2 = circulo
    todos = all(
        math.isclose(
            (x - ux) ** 2 + (y - uy) ** 2,
            raio2, rel_tol=EPS, abs_tol=EPS
        )
        for x, y in pontos
    )
    print("SIM" if todos else "NAO")


if __name__ == "__main__":
    main()''',
        "insight": "Três pontos não colineares determinam um círculo. O determinante detecta a degeneração.",
        "pitfall": "Resultados de divisões não devem ser comparados com ==. Use tolerância relativa e absoluta.",
    },
    {
        "chapter": "GEOMETRIA · 25",
        "title": "Áreas, seno e conversão para radianos",
        "summary": "Programa completo que atende consultas de áreas do quadrado com arcos e da razão pentágono-quadrado.",
        "when": "Entrada: T comandos AREA ou PENTAGONO. Saída: valores formatados.",
        "complexity": "Tempo O(T) · memória O(1)",
        "code": '''import math


def areas(lado):
    quadrado = lado * lado
    complemento = quadrado - math.pi * quadrado / 4.0
    segmento = (
        quadrado * (4 * math.pi - 3 * math.sqrt(3)) / 24
    )
    a3 = 8 * segmento + 8 * complemento - 4 * quadrado
    a2 = 4 * complemento - 2 * a3
    a1 = quadrado - a2 - a3
    return a1, a2, a3


def lado_do_quadrado(lado_do_pentagono):
    # math.sin recebe radianos, não graus.
    return (
        lado_do_pentagono
        * math.sin(math.radians(108))
        / math.sin(math.radians(63))
    )


def main():
    t = int(input())

    for _ in range(t):
        tipo, texto = input().split()
        valor = float(texto)

        if tipo == "AREA":
            a1, a2, a3 = areas(valor)
            print(f"{a1:.3f} {a2:.3f} {a3:.3f}")
        else:
            print(f"{lado_do_quadrado(valor):.10f}")


if __name__ == "__main__":
    main()''',
        "insight": "Fórmulas constantes viram funções O(1). math.radians faz a conversão obrigatória antes de sin.",
        "pitfall": "A ordem das áreas e a quantidade de casas pertencem ao enunciado. Não arredonde valores intermediários.",
    },
    {
        "chapter": "PARADIGMAS · 26",
        "title": "Backtracking com poda por limite",
        "summary": "Programa completo que maximiza uma soma sem ultrapassar o limite, escolhendo, explorando e desfazendo.",
        "when": "Entrada: itens positivos e capacidade. Saída: maior soma possível.",
        "complexity": "Pior caso O(2ⁿ) · podas reduzem a busca",
        "code": '''def melhor_soma(valores, limite):
    n = len(valores)
    sufixo = [0] * (n + 1)

    # Bound otimista: soma de tudo que ainda resta.
    for i in range(n - 1, -1, -1):
        sufixo[i] = sufixo[i + 1] + valores[i]

    melhor = 0

    def buscar(i, soma):
        nonlocal melhor

        if soma > limite:
            return  # ramo inviável

        melhor = max(melhor, soma)

        if i == n:
            return

        # Mesmo pegando tudo, este ramo não supera o incumbente.
        if soma + sufixo[i] <= melhor:
            return

        buscar(i + 1, soma + valores[i])  # escolher
        buscar(i + 1, soma)               # não escolher

    buscar(0, 0)
    return melhor


def main():
    n, limite = map(int, input().split())
    valores = list(map(int, input().split()))
    assert len(valores) == n
    print(melhor_soma(valores, limite))


if __name__ == "__main__":
    main()''',
        "insight": "Backtracking explora escolhas; branch and bound poda um ramo que não pode superar a melhor solução já encontrada.",
        "pitfall": "O bound deve ser otimista e seguro. Um limite que subestima o potencial pode eliminar a resposta ótima.",
    },
    {
        "chapter": "PARADIGMAS · 27",
        "title": "Guloso com pilha monotônica",
        "summary": "Programa completo do beecrowd 1084. Dígitos maiores removem dígitos menores anteriores.",
        "when": "Entrada: n, m e número até sentinela 0 0. Saída: maior número.",
        "complexity": "Tempo O(n) · memória O(n)",
        "code": load("paradigmas/respostas/1084.py"),
        "insight": "A primeira posição diferente decide o maior número. Cada dígito entra e sai da pilha no máximo uma vez.",
        "pitfall": "Uma estratégia gulosa precisa de justificativa. Escolha local sem prova pode falhar em outro problema.",
    },
    {
        "chapter": "PARADIGMAS · 28",
        "title": "DP de troco ilimitado",
        "summary": "Programa completo do beecrowd 1034. mochila[j] guarda o menor número de blocos para formar j.",
        "when": "Entrada: tipos de bloco e comprimento alvo. Saída: mínimo de blocos.",
        "complexity": "Tempo O(N·M) · memória O(M)",
        "code": load("paradigmas/respostas/1034.py"),
        "insight": "O laço crescente permite reutilizar o bloco atual. O estado j-bloco precisa ser alcançável.",
        "pitfall": "Percorrer para trás resolveria a versão em que cada bloco só pode ser usado uma vez.",
    },
    {
        "chapter": "PARADIGMAS · 29",
        "title": "Mochila 0/1 com memória comprimida",
        "summary": "Programa completo do beecrowd 1286. Cada pedido pode ser escolhido no máximo uma vez.",
        "when": "Entrada: pedidos com valor e peso. Saída: melhor valor na capacidade.",
        "complexity": "Tempo O(n·capacidade) · memória O(capacidade)",
        "code": load("paradigmas/respostas/1286.py"),
        "insight": "A capacidade é percorrida de trás para frente; assim o item atual não alimenta outro estado da mesma rodada.",
        "pitfall": "A direção do laço define 0/1 ou ilimitada. A fórmula isolada não revela essa diferença.",
    },
    {
        "chapter": "PARADIGMAS · 30",
        "title": "Recursão e memoização de dois estados",
        "summary": "Programa completo do beecrowd 1029. O cache guarda Fibonacci e a quantidade teórica de chamadas.",
        "when": "Entrada: consultas n. Saída: fib(n) e chamadas recursivas.",
        "complexity": "Tempo O(maior n) · memória O(maior n)",
        "code": load("paradigmas/respostas/1029.py"),
        "insight": "F[n] e CF[n] são estados distintos da mesma recorrência. Cada índice é calculado apenas uma vez.",
        "pitfall": "Memoização evita recomputação, mas a versão top-down ainda usa pilha. A chave deve identificar todo o estado.",
    },
]
