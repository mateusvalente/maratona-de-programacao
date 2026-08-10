window.PARADIGM_LESSONS = [
  {
    number: 1,
    slug: "01-introducao-paradigmas",
    title: "O que é um paradigma algorítmico?",
    summary: "Uma estratégia para organizar decisões e transformar um problema em passos executáveis.",
    duration: "50 min",
    prerequisites: ["funções", "condicionais", "laços", "listas", "noção de complexidade"],
    sections: [
      {
        title: "O problema não determina uma única estratégia",
        html: `
          <p>Um algoritmo é uma sequência finita de passos. Um <strong>paradigma algorítmico</strong> é uma maneira geral de pensar nesses passos. Dois programas podem produzir a mesma resposta e, ainda assim, organizar o raciocínio de formas muito diferentes.</p>
          <div class="note"><strong>Exemplo conceitual:</strong> precisamos encontrar uma rota. Podemos testar rotas, dividir o mapa, guardar resultados de trechos repetidos ou tomar decisões locais. A meta é a mesma; o modo de chegar até ela muda.</div>
          <div class="concept-grid">
            <article class="concept-card accent"><h3>Explorar</h3><p>Enumerar possibilidades e verificar quais atendem às condições.</p></article>
            <article class="concept-card blue"><h3>Decompor</h3><p>Transformar uma instância em partes menores e relacionar as respostas.</p></article>
            <article class="concept-card yellow"><h3>Escolher</h3><p>Tomar decisões locais seguindo uma propriedade que precisa ser justificada.</p></article>
            <article class="concept-card red"><h3>Reutilizar</h3><p>Evitar cálculos repetidos guardando respostas de subproblemas.</p></article>
          </div>`
      },
      {
        title: "Um primeiro mapa",
        html: `
          <figure class="diagram"><img src="{{ROOT}}assets/img/mapa-paradigmas.svg" alt="Mapa visual ligando exploração, decomposição e otimização aos paradigmas estudados"></figure>
          <p>O mapa organiza relações, não caixas isoladas. Backtracking costuma usar recursão. Divisão e conquista também. Memoização combina recursão com memória. Uma solução pode até misturar paradigmas em partes diferentes.</p>
          <div class="warning"><strong>Recursão não é sinônimo de paradigma isolado.</strong> Ela é principalmente uma técnica de definição e implementação: uma função resolve o problema usando uma instância menor do próprio problema.</div>`
      },
      {
        title: "Complexidade e restrições são pistas",
        html: `
          <p>Antes de escolher uma técnica, observe o tamanho da entrada. Testar <code>2^n</code> subconjuntos pode ser aceitável para um <code>n</code> pequeno e inviável para um <code>n</code> grande. Já um algoritmo <code>O(n log n)</code> costuma lidar com entradas muito maiores.</p>
          <div class="table-wrap"><table><thead><tr><th>Crescimento</th><th>Leitura intuitiva</th><th>Exemplo de origem</th></tr></thead><tbody>
            <tr><td><code>O(n)</code></td><td>o trabalho cresce aproximadamente junto com a entrada</td><td>uma passagem pela lista</td></tr>
            <tr><td><code>O(n log n)</code></td><td>um pouco acima de linear</td><td>dividir repetidamente e combinar</td></tr>
            <tr><td><code>O(n²)</code></td><td>dobrar <code>n</code> pode quadruplicar o trabalho</td><td>comparar muitos pares</td></tr>
            <tr><td><code>O(2^n)</code></td><td>cada item duplica o espaço de escolhas</td><td>escolher ou não escolher cada item</td></tr>
            <tr><td><code>O(n!)</code></td><td>todas as ordens possíveis</td><td>gerar permutações</td></tr>
          </tbody></table></div>
          <p class="source-note">Os limites não formam uma tabela de regras absolutas: linguagem, constante, memória e tempo do juiz também importam. Eles servem como estimativa inicial.</p>`
      },
      {
        title: "Como estudar os paradigmas",
        html: `
          <ol class="steps">
            <li><strong>Defina o estado da decisão:</strong> o que sabemos neste ponto?</li>
            <li><strong>Liste as escolhas:</strong> que próximos passos são permitidos?</li>
            <li><strong>Observe repetição:</strong> o mesmo subproblema volta a aparecer?</li>
            <li><strong>Procure propriedades:</strong> uma escolha local pode ser provada como segura?</li>
            <li><strong>Estime o custo:</strong> quantos estados, escolhas ou níveis serão visitados?</li>
          </ol>`
      }
    ],
    lab: "classifier",
    goals: ["explicar o que é um paradigma", "distinguir explorar, decompor, escolher e reutilizar", "entender que uma solução pode combinar técnicas", "usar restrições como pistas, sem tratá-las como regras absolutas"],
    questions: [
      ["Dois algoritmos para o mesmo problema precisam ter a mesma complexidade?", "Não. Eles podem executar estratégias diferentes e ter custos de tempo e memória diferentes."],
      ["Recursão e backtracking são a mesma coisa?", "Não. Recursão é uma técnica de chamadas sobre instâncias menores; backtracking é uma estratégia de exploração com escolha, tentativa e desfazer. Backtracking frequentemente usa recursão."],
      ["Uma classificação por paradigma é sempre exclusiva?", "Não. Um algoritmo pode combinar técnicas e ser descrito por mais de uma perspectiva."]
    ],
    sources: [
      ["GeeksforGeeks — Algorithm Design Techniques", "https://www.geeksforgeeks.org/dsa/algorithms-design-techniques/"],
      ["GeeksforGeeks — Introduction to Algorithms", "https://www.geeksforgeeks.org/dsa/introduction-to-algorithms/"],
      ["beecrowd — Programação competitiva", "https://beecrowd.com/pt/blog-posts/programacao-competitiva/"]
    ]
  },
  {
    number: 2,
    slug: "02-forca-bruta",
    title: "Busca exaustiva e força bruta",
    summary: "Testar sistematicamente todas as possibilidades pode ser a escolha certa quando o espaço de busca cabe no limite.",
    duration: "55 min",
    prerequisites: ["Aula 01", "laços", "listas", "funções", "notação Big O"],
    sections: [
      {
        title: "Testar tudo não significa pensar pouco",
        html: `
          <p>Na busca exaustiva, enumeramos todas as candidatas relevantes, testamos as condições e mantemos as respostas válidas. É uma estratégia completa: se a geração estiver correta, nenhuma candidata fica escondida.</p>
          <div class="success"><strong>Força bruta é válida.</strong> Para entradas pequenas, ela costuma ser a solução mais simples de implementar, testar e provar correta.</div>
          <div class="flow"><span class="flow-step">gerar candidata</span><span class="flow-arrow">→</span><span class="flow-step">verificar regras</span><span class="flow-arrow">→</span><span class="flow-step">registrar resultado</span><span class="flow-arrow">→</span><span class="flow-step">próxima candidata</span></div>`
      },
      {
        title: "Exemplo didático: pares que somam um alvo",
        html: `<p>Para uma lista pequena, podemos testar cada par de posições. O primeiro laço escolhe uma posição e o segundo percorre apenas as posições posteriores. Assim, não comparamos um item consigo mesmo nem repetimos o mesmo par invertido.</p>`,
        code: {
          title: "Exemplo didático próprio · Python 3",
          source: [
            "def pares_com_soma(valores, alvo):",
            "    # Cada par de índices é testado exatamente uma vez.",
            "    encontrados = []",
            "",
            "    for i in range(len(valores)):",
            "        for j in range(i + 1, len(valores)):",
            "            if valores[i] + valores[j] == alvo:",
            "                # Guardamos o par quando ele satisfaz a condição.",
            "                encontrados.append((valores[i], valores[j]))",
            "",
            "    return encontrados",
            "",
            "",
            "print(pares_com_soma([2, 4, 7, 9], 11))  # [(2, 9), (4, 7)]"
          ],
          note: "Há O(n²) pares possíveis no pior caso. Para uma entrada pequena isso pode ser perfeitamente aceitável."
        }
      },
      {
        title: "O tamanho do espaço de busca",
        html: `
          <div class="table-wrap"><table><thead><tr><th>Decisão</th><th>Quantidade de candidatas</th><th>Quando cresce</th></tr></thead><tbody>
            <tr><td>escolher um item</td><td><code>n</code></td><td>linearmente</td></tr>
            <tr><td>escolher um par</td><td>aproximadamente <code>n²/2</code></td><td>quadraticamente</td></tr>
            <tr><td>escolher ou não cada item</td><td><code>2^n</code></td><td>exponencialmente</td></tr>
            <tr><td>testar toda ordem dos itens</td><td><code>n!</code></td><td>fatorialmente</td></tr>
          </tbody></table></div>
          <p>Com 4 escolhas binárias existem 16 combinações. Com 20, já são 1.048.576. Com 50, o número ultrapassa um quatrilhão. O mesmo formato de algoritmo muda de viável para inviável apenas pelo valor de <code>n</code>.</p>`
      },
      {
        title: "Quando considerar força bruta",
        html: `
          <ul class="clean-list">
            <li><strong>Entrada pequena:</strong> a estimativa total cabe confortavelmente.</li>
            <li><strong>Referência de correção:</strong> uma solução simples pode validar algoritmos mais sofisticados em casos pequenos.</li>
            <li><strong>Poucas dimensões:</strong> testar pares ou trios pode ser suficiente.</li>
            <li><strong>Não cabe?</strong> procure evitar repetições, podar ramos, dividir o problema ou explorar uma propriedade.</li>
          </ul>
          <div class="warning"><strong>Erro comum:</strong> olhar apenas para o número de laços. Uma recursão com duas chamadas por nível pode gerar <code>2^n</code> estados mesmo sem laços visíveis.</div>`
      }
    ],
    lab: "growth",
    goals: ["definir busca exaustiva", "estimar o tamanho de um espaço de busca", "reconhecer crescimentos quadrático, exponencial e fatorial", "explicar quando uma solução simples é suficiente"],
    questions: [
      ["Força bruta é sempre lenta?", "Não. O custo depende do número de candidatas e do tamanho máximo da entrada."],
      ["Por que 2^n aparece ao escolher ou não cada item?", "Cada item oferece duas decisões independentes. Multiplicar 2 por ele mesmo n vezes produz 2^n combinações."],
      ["Qual é a utilidade de uma solução exaustiva além da submissão?", "Ela pode servir como referência para testar uma solução otimizada em entradas pequenas."]
    ],
    sources: [
      ["GeeksforGeeks — Brute Force Approach", "https://www.geeksforgeeks.org/dsa/brute-force-approach-and-its-pros-and-cons/"],
      ["GeeksforGeeks — Asymptotic Analysis", "https://www.geeksforgeeks.org/dsa/analysis-of-algorithms-big-o-analysis/"]
    ]
  },
  {
    number: 3,
    slug: "03-recursao",
    title: "Recursão",
    summary: "Resolver uma instância usando uma versão menor do mesmo problema, com um ponto claro de parada.",
    duration: "70 min",
    prerequisites: ["Aula 02", "funções", "parâmetros", "retorno", "condicionais"],
    sections: [
      {
        title: "Primeiro a ideia, depois o código",
        html: `
          <p>Uma definição recursiva expressa a resposta de um problema em termos de uma instância menor dele mesmo. Para somar de 1 até 5, podemos separar o 5 e pedir a resposta de 1 até 4.</p>
          <div class="diagram"><pre>somar(5)
└─ 5 + somar(4)
        └─ 4 + somar(3)
                └─ 3 + somar(2)
                        └─ 2 + somar(1)
                                └─ 1</pre></div>
          <p>A descida reduz <code>n</code>. Quando chegamos a 1, já conhecemos a resposta. Esse é o <strong>caso base</strong>. Depois as chamadas retornam na ordem inversa.</p>
          <div class="success"><strong>Regra indispensável:</strong> toda chamada recursiva precisa avançar em direção a um caso base alcançável.</div>`
      },
      {
        title: "Caso base, redução e retorno",
        html: `<p>No fatorial, <code>n!</code> é <code>n × (n - 1)!</code>. O caso base <code>1! = 1</code> interrompe novas chamadas. O valor retornado pela chamada menor participa do cálculo da chamada atual.</p>`,
        code: {
          title: "Exemplo didático próprio · fatorial",
          source: [
            "def fatorial(n):",
            "    # Caso base: a resposta já é conhecida.",
            "    if n <= 1:",
            "        return 1",
            "",
            "    # Redução: n - 1 é uma instância menor.",
            "    resultado_menor = fatorial(n - 1)",
            "",
            "    # Retorno: combina n com a resposta menor.",
            "    return n * resultado_menor",
            "",
            "",
            "print(fatorial(4))  # 24"
          ],
          note: "A função não calcula tudo de uma vez. Cada chamada fica aguardando a resposta da chamada seguinte."
        }
      },
      {
        title: "A pilha de chamadas",
        html: `
          <p>Cada chamada guarda seus parâmetros, variáveis locais e o ponto para onde deve retornar. A estrutura é LIFO: a última chamada criada é a primeira a terminar.</p>
          <div class="two-col">
            <div><h3>Descida</h3><pre>fatorial(4)
fatorial(3)
fatorial(2)
fatorial(1) → 1</pre></div>
            <div><h3>Retorno</h3><pre>fatorial(2) → 2 × 1 = 2
fatorial(3) → 3 × 2 = 6
fatorial(4) → 4 × 6 = 24</pre></div>
          </div>
          <p>Recursão usa memória proporcional à profundidade da pilha. Em Python, profundidades muito grandes podem causar <code>RecursionError</code>; aumentar o limite não corrige uma recursão mal definida.</p>`
      },
      {
        title: "Recursiva ou iterativa?",
        html: `<p>As duas formas podem descrever o mesmo cálculo. A versão iterativa usa uma variável acumuladora; a recursiva usa retornos pendentes na pilha. Escolha pela clareza, pelas restrições e pelo formato natural do problema.</p>`,
        code: {
          title: "O mesmo fatorial com repetição",
          source: [
            "def fatorial_iterativo(n):",
            "    # O acumulador começa no elemento neutro da multiplicação.",
            "    produto = 1",
            "",
            "    for valor in range(2, n + 1):",
            "        produto *= valor",
            "",
            "    return produto",
            "",
            "",
            "print(fatorial_iterativo(4))  # 24"
          ],
          note: "Neste exemplo, a versão iterativa usa O(1) de memória auxiliar; a recursiva usa O(n) quadros de chamada."
        }
      },
      {
        title: "Erros comuns",
        html: `<ul class="error-list">
          <li><strong>Sem caso base:</strong> as chamadas não sabem quando parar.</li>
          <li><strong>Caso base incorreto:</strong> a função para cedo ou devolve um valor errado.</li>
          <li><strong>Problema não diminui:</strong> chamar <code>f(n)</code> dentro de <code>f(n)</code> repete o mesmo estado.</li>
          <li><strong>Ignorar o retorno:</strong> a resposta da chamada menor precisa ser usada ou propagada.</li>
          <li><strong>Profundidade excessiva:</strong> uma entrada grande pode estourar a pilha do Python.</li>
        </ul>`
      }
    ],
    lab: "recursion-stack",
    goals: ["identificar caso base e redução", "acompanhar descida e retorno", "explicar a pilha de chamadas", "comparar versões recursiva e iterativa", "diagnosticar uma recursão que não termina"],
    questions: [
      ["O caso base precisa vir antes da chamada recursiva no código?", "Ele precisa ser verificado antes de criar uma nova chamada que ultrapassaria o ponto de parada."],
      ["Por que os retornos aparecem na ordem inversa?", "A pilha é LIFO: a última chamada criada termina primeiro."],
      ["Toda recursão é mais lenta que um laço?", "Não como regra absoluta. Há custo de chamadas e de pilha, mas a complexidade depende do algoritmo e algumas estruturas são naturalmente recursivas."]
    ],
    sources: [
      ["GeeksforGeeks — Introduction to Recursion", "https://www.geeksforgeeks.org/dsa/introduction-to-recursion-2/"],
      ["Python — limite de recursão", "https://docs.python.org/3/library/sys.html#sys.getrecursionlimit"],
      ["GeeksforGeeks — Recursion and Backtracking Notes", "https://www.geeksforgeeks.org/dsa/short-notes-on-recursion-and-backtracking/"]
    ]
  }
  ,
  {
    number: 4,
    slug: "04-backtracking",
    title: "Backtracking",
    summary: "Escolher, explorar e desfazer para percorrer uma árvore de decisões sem carregar escolhas antigas para o próximo ramo.",
    duration: "70 min",
    prerequisites: ["Aula 03", "recursão", "listas", "condicionais", "análise de possibilidades"],
    sections: [
      {
        title: "Busca com memória do caminho",
        html: `
          <div class="flow"><span class="flow-step active">escolher</span><span class="flow-arrow">→</span><span class="flow-step">explorar</span><span class="flow-arrow">→</span><span class="flow-step">verificar</span><span class="flow-arrow">→</span><span class="flow-step">desfazer</span></div>
          <p>Backtracking constrói uma candidata aos poucos. Depois de explorar uma escolha, restaura o estado para que a próxima tentativa comece do ponto correto.</p>
          <figure class="diagram"><img src="{{ROOT}}assets/img/arvore-decisoes.svg" alt="Árvore de decisões mostrando escolhas, exploração e um ramo podado"></figure>
          <div class="note"><strong>Escolher → explorar → desfazer.</strong> O desfazer não significa que a tentativa foi inútil; ele permite visitar outro ramo sem misturar estados.</div>`
      },
      {
        title: "Exemplo didático: todas as sequências de duas letras",
        html: `<p>A lista <code>caminho</code> representa a candidata atual. Ao adicionar uma letra, descemos um nível. Quando a sequência tem tamanho 2, registramos uma cópia. O <code>pop()</code> remove a escolha antes de tentar a próxima letra.</p>`,
        code: {
          title: "Exemplo didático próprio · choose/explore/unchoose",
          source: [
            "def gerar(caminho, letras, tamanho, respostas):",
            "    if len(caminho) == tamanho:",
            "        respostas.append(caminho.copy())",
            "        return",
            "",
            "    for letra in letras:",
            "        caminho.append(letra)              # escolher",
            "        gerar(caminho, letras, tamanho, respostas)  # explorar",
            "        caminho.pop()                      # desfazer",
            "",
            "",
            "respostas = []",
            "gerar([], [\"A\", \"B\"], 2, respostas)",
            "# A lista mostra as quatro sequências completas geradas.",
            "print(respostas)  # [['A', 'A'], ['A', 'B'], ['B', 'A'], ['B', 'B']]"
          ],
          note: "Usamos copy() porque caminho continuará sendo modificado durante a busca."
        }
      },
      {
        title: "Força bruta, backtracking e poda",
        html: `
          <div class="table-wrap"><table><thead><tr><th>Técnica</th><th>Comportamento</th><th>Estado do caminho</th></tr></thead><tbody>
            <tr><td>Força bruta</td><td>gera e testa todas as candidatas</td><td>pode ou não ser construído incrementalmente</td></tr>
            <tr><td>Backtracking</td><td>constrói, explora e desfaz decisões</td><td>é restaurado entre os ramos</td></tr>
            <tr><td>Backtracking com poda</td><td>interrompe um ramo já inviável</td><td>evita completar candidatas que não podem servir</td></tr>
          </tbody></table></div>
          <p>Uma poda precisa ser segura: só abandonamos o ramo quando há uma razão lógica para afirmar que nenhuma continuação dele pode atender à condição.</p>
          <div class="warning"><strong>Poda muda o trabalho realizado, não a resposta correta.</strong> Uma poda baseada apenas em intuição pode eliminar a solução que procuramos.</div>`
      },
      {
        title: "Como reconhecer a estrutura",
        html: `<ul class="clean-list">
          <li><strong>Há uma sequência de escolhas?</strong> Cada decisão abre alternativas.</li>
          <li><strong>É preciso manter uma candidata parcial?</strong> Um caminho, conjunto, ordem ou configuração.</li>
          <li><strong>Uma escolha precisa ser retirada?</strong> O próximo ramo deve receber o estado anterior.</li>
          <li><strong>Dá para detectar inviabilidade cedo?</strong> Então existe oportunidade de poda.</li>
        </ul>`
      }
    ],
    lab: "backtracking",
    goals: ["explicar escolher, explorar e desfazer", "ler uma árvore de decisões", "distinguir backtracking de enumeração simples", "entender o que torna uma poda segura", "perceber por que o estado deve ser restaurado"],
    questions: [
      ["Toda recursão é backtracking?", "Não. Backtracking usa uma exploração de escolhas e restauração de estado; uma função recursiva pode apenas calcular uma recorrência."],
      ["O que acontece se esquecermos o pop do exemplo?", "As letras escolhidas em um ramo continuam na lista e contaminam os próximos ramos."],
      ["Poda garante complexidade polinomial?", "Não. Ela pode reduzir bastante a busca em casos práticos, mas o pior caso ainda pode ser exponencial."]
    ],
    sources: [
      ["GeeksforGeeks — Introduction to Backtracking", "https://www.geeksforgeeks.org/dsa/introduction-to-backtracking-2/"],
      ["GeeksforGeeks — Recursion and Backtracking Notes", "https://www.geeksforgeeks.org/dsa/short-notes-on-recursion-and-backtracking/"]
    ]
  },
  {
    number: 5,
    slug: "05-divisao-conquista",
    title: "Divisão e conquista",
    summary: "Dividir uma instância, resolver partes menores e combinar as respostas quando necessário.",
    duration: "65 min",
    prerequisites: ["Aula 03", "recursão", "listas ordenadas", "intervalos", "complexidade logarítmica"],
    sections: [
      {
        title: "Dividir, conquistar e combinar",
        html: `
          <div class="flow"><span class="flow-step active">DIVIDIR</span><span class="flow-arrow">→</span><span class="flow-step">RESOLVER</span><span class="flow-arrow">→</span><span class="flow-step">COMBINAR</span></div>
          <p>Divisão e conquista separa o problema em subproblemas menores, geralmente do mesmo tipo. Cada parte é resolvida e suas respostas são reunidas. Os subproblemas tendem a ser independentes; quando os mesmos subproblemas se repetem, programação dinâmica pode ser mais apropriada.</p>
          <div class="concept-grid">
            <article class="concept-card accent"><h3>Busca binária</h3><p>Escolhe apenas uma metade para continuar. A combinação é quase inexistente.</p></article>
            <article class="concept-card blue"><h3>Merge Sort</h3><p>Ordena as metades e intercala os resultados em ordem.</p></article>
          </div>`
      },
      {
        title: "Busca binária: o intervalo encolhe",
        html: `<p>Em uma sequência ordenada, compare o alvo com o elemento central. Uma comparação permite descartar metade do intervalo. Por isso, o número de passos cresce como <code>O(log n)</code>.</p>`,
        code: {
          title: "Exemplo didático próprio · busca binária",
          source: [
            "def busca_binaria(valores, alvo):",
            "    # O intervalo fechado [esquerda, direita] contém a busca atual.",
            "    esquerda = 0",
            "    direita = len(valores) - 1",
            "",
            "    while esquerda <= direita:",
            "        meio = (esquerda + direita) // 2",
            "",
            "        if valores[meio] == alvo:",
            "            return meio",
            "",
            "        # A ordenação permite descartar uma metade inteira.",
            "        if valores[meio] < alvo:",
            "            esquerda = meio + 1",
            "        else:",
            "            direita = meio - 1",
            "",
            "    return -1",
            "",
            "",
            "numeros = [2, 4, 7, 9, 13]",
            "print(busca_binaria(numeros, 9))  # índice 3"
          ],
          note: "A ordenação é a propriedade que justifica descartar uma metade inteira."
        }
      },
      {
        title: "Por que log n?",
        html: `
          <p>Se começarmos com 1.024 posições, os intervalos possíveis têm aproximadamente 1.024, 512, 256, 128, 64, 32, 16, 8, 4, 2 e 1 posição. São cerca de 10 divisões, pois <code>2¹⁰ = 1.024</code>.</p>
          <div class="table-wrap"><table><thead><tr><th>n</th><th>Busca linear, pior caso</th><th>Busca binária, aproximação</th></tr></thead><tbody>
            <tr><td>16</td><td>16 comparações</td><td>4 divisões</td></tr>
            <tr><td>1.024</td><td>1.024 comparações</td><td>10 divisões</td></tr>
            <tr><td>1.048.576</td><td>mais de um milhão</td><td>20 divisões</td></tr>
          </tbody></table></div>`
      },
      {
        title: "Recorrência e custo de combinar",
        html: `
          <p>No Merge Sort, cada nível processa todos os <code>n</code> elementos durante as intercalações, e existem cerca de <code>log n</code> níveis. Isso leva a <code>O(n log n)</code>.</p>
          <div class="note"><strong>Dividir não basta.</strong> Precisamos contar quantos subproblemas surgem, seus tamanhos e o custo para combinar as respostas.</div>
          <p>Quick Sort também particiona a entrada, mas seu equilíbrio depende do pivô. Bons particionamentos levam ao comportamento esperado <code>O(n log n)</code>; partições muito desequilibradas podem levar a <code>O(n²)</code>.</p>`
      }
    ],
    lab: "binary-search",
    goals: ["explicar dividir, resolver e combinar", "acompanhar a redução de uma busca binária", "relacionar divisão pela metade com log n", "distinguir subproblemas independentes de subproblemas repetidos"],
    questions: [
      ["Busca binária funciona em uma lista não ordenada?", "Não com esse descarte de metades. Sem ordenação, comparar com o meio não informa em qual lado o alvo pode estar."],
      ["Toda divisão e conquista precisa combinar respostas?", "Não de forma significativa. Na busca binária, apenas uma metade continua; já no Merge Sort, as metades precisam ser intercaladas."],
      ["Qual a diferença inicial para DP?", "Divisão e conquista costuma criar partes independentes. DP é especialmente útil quando subproblemas se sobrepõem e suas respostas seriam repetidas."]
    ],
    sources: [
      ["GeeksforGeeks — Divide and Conquer", "https://www.geeksforgeeks.org/dsa/introduction-to-divide-and-conquer-algorithm/"],
      ["GeeksforGeeks — Binary Search", "https://www.geeksforgeeks.org/dsa/binary-search/"],
      ["GeeksforGeeks — Merge Sort", "https://www.geeksforgeeks.org/dsa/merge-sort/"]
    ]
  },
  {
    number: 6,
    slug: "06-guloso",
    title: "Algoritmos gulosos",
    summary: "Tomar uma decisão local definitiva só funciona quando uma propriedade garante que ela não prejudica o ótimo global.",
    duration: "65 min",
    prerequisites: ["Aula 01", "ordenação", "laços", "funções", "argumentação de corretude"],
    sections: [
      {
        title: "Melhor agora não garante melhor no final",
        html: `
          <div class="flow"><span class="flow-step active">escolha local</span><span class="flow-arrow">→</span><span class="flow-step">escolha local</span><span class="flow-arrow">→</span><span class="flow-step">escolha local</span><span class="flow-arrow">→</span><span class="flow-step">solução final</span></div>
          <p>Um algoritmo guloso toma a escolha considerada mais vantajosa no estado atual e não volta atrás. Isso pode ser rápido e elegante, mas só é correto quando a estrutura do problema torna essa escolha <strong>segura</strong>.</p>
          <div class="warning"><strong>Intuição não é prova.</strong> “Parece melhor” ajuda a formular uma hipótese gulosa; ainda precisamos justificar que alguma solução ótima contém essa escolha ou pode ser transformada para contê-la.</div>`
      },
      {
        title: "Exemplo em que funciona: máximo de atividades",
        html: `
          <p>Imagine atividades que usam uma sala, cada uma com início e fim. Queremos realizar a maior quantidade sem sobreposição. Escolher primeiro a atividade que termina mais cedo deixa o maior intervalo restante para as próximas.</p>
          <ol class="steps">
            <li>Ordene conceitualmente pelo horário de término.</li>
            <li>Escolha a próxima atividade compatível que termina mais cedo.</li>
            <li>Repita no intervalo que restou.</li>
          </ol>
          <p>A justificativa usa uma troca: se uma solução ótima começar por outra atividade que termina mais tarde, podemos trocar sua primeira atividade pela que termina mais cedo sem reduzir a quantidade disponível depois.</p>`
      },
      {
        title: "Exemplo em que falha: troco fictício",
        html: `
          <p>Com moedas <code>[1, 3, 4]</code> e valor 6, escolher sempre a maior moeda disponível produz <code>4 + 1 + 1</code>: três moedas. Mas <code>3 + 3</code> usa apenas duas. A regra local não preserva o ótimo global nesse sistema.</p>
          <div class="table-wrap"><table><thead><tr><th>Estratégia</th><th>Escolhas</th><th>Quantidade</th></tr></thead><tbody>
            <tr><td>maior moeda agora</td><td>4, 1, 1</td><td>3</td></tr>
            <tr><td>melhor resposta global</td><td>3, 3</td><td>2</td></tr>
          </tbody></table></div>
          <p>O mesmo procedimento pode funcionar para certos conjuntos de moedas e falhar para outros. O paradigma não promete correção automática.</p>`
      },
      {
        title: "Perguntas para investigar um possível guloso",
        html: `<ul class="clean-list">
          <li><strong>Posso decidir agora sem precisar voltar?</strong> Se sempre precisamos revisar decisões, talvez não seja guloso.</li>
          <li><strong>Que medida define “melhor local”?</strong> Menor término, maior ganho, menor custo?</li>
          <li><strong>A escolha deixa um subproblema semelhante?</strong> Precisamos saber o que resta.</li>
          <li><strong>Posso provar uma troca segura?</strong> Transformar uma solução ótima sem piorá-la é uma técnica comum.</li>
          <li><strong>Existe um contraexemplo pequeno?</strong> Testar casos mínimos é uma ótima forma de desafiar a hipótese.</li>
        </ul>`
      }
    ],
    lab: "greedy-coins",
    goals: ["distinguir escolha local e ótimo global", "entender que greedy exige justificativa", "procurar contraexemplos", "reconhecer a ideia de argumento de troca", "evitar assumir que uma heurística é ótima"],
    questions: [
      ["Todo algoritmo que ordena e percorre é guloso?", "Não. O rótulo depende de tomar escolhas locais definitivas para construir a resposta, não apenas de usar ordenação."],
      ["Encontrar bons resultados em testes prova um guloso?", "Não. Testes ajudam a encontrar falhas, mas a correção para todas as entradas exige uma justificativa."],
      ["Qual a utilidade de um contraexemplo?", "Um único caso em que a regra local falha é suficiente para refutar a proposta de correção geral."]
    ],
    sources: [
      ["GeeksforGeeks — Greedy Algorithms", "https://www.geeksforgeeks.org/dsa/greedy-algorithms/"],
      ["GeeksforGeeks — Correctness of Greedy Algorithms", "https://www.geeksforgeeks.org/dsa/correctness-greedy-algorithms/"],
      ["IME-USP — Algoritmos gulosos", "https://www.ime.usp.br/~pf/analise_de_algoritmos/aulas/guloso.html"]
    ]
  }
  ,
  {
    number: 7,
    slug: "07-programacao-dinamica",
    title: "Programação dinâmica",
    summary: "Definir estados e transições para resolver subproblemas sobrepostos uma única vez.",
    duration: "85 min",
    prerequisites: ["Aula 03", "recursão", "listas", "funções", "complexidade"],
    sections: [
      {
        title: "O problema dos cálculos repetidos",
        html: `
          <p>Na definição recursiva de Fibonacci, <code>fib(5)</code> chama <code>fib(4)</code> e <code>fib(3)</code>. Dentro de <code>fib(4)</code>, <code>fib(3)</code> aparece novamente. A árvore recalcula os mesmos valores muitas vezes.</p>
          <div class="diagram"><div class="tree">
            <div class="tree-level"><span class="tree-node">fib(5)</span></div>
            <div class="tree-level"><span class="tree-node">fib(4)</span><span class="tree-node repeat">fib(3)</span></div>
            <div class="tree-level"><span class="tree-node repeat">fib(3)</span><span class="tree-node repeat">fib(2)</span><span class="tree-node repeat">fib(2)</span><span class="tree-node">fib(1)</span></div>
          </div></div>
          <div class="note"><strong>Pergunta decisiva:</strong> e se guardássemos a resposta de cada subproblema depois do primeiro cálculo?</div>`
      },
      {
        title: "Estado antes da fórmula",
        html: `
          <p>Um <strong>estado</strong> identifica um subproblema. Antes de escrever <code>dp[i]</code>, diga em português o que ele significa. Sem essa frase, a fórmula vira um conjunto de símbolos sem interpretação.</p>
          <div class="success"><strong>Exemplo semântico:</strong> <code>dp[i]</code> representa a quantidade de maneiras de chegar exatamente ao degrau <code>i</code> usando passos de 1 ou 2 degraus.</div>
          <ol class="steps">
            <li><strong>Estado:</strong> qual pergunta menor estamos respondendo?</li>
            <li><strong>Transição:</strong> quais estados anteriores formam a resposta atual?</li>
            <li><strong>Casos base:</strong> quais respostas já são conhecidas?</li>
            <li><strong>Ordem:</strong> quando cada dependência estará pronta?</li>
            <li><strong>Resposta:</strong> em qual estado está o resultado final?</li>
          </ol>`
      },
      {
        title: "Exemplo didático: escada de passos 1 ou 2",
        html: `<p>Para chegar ao degrau <code>i</code>, o último passo veio do degrau <code>i - 1</code> ou <code>i - 2</code>. Essas possibilidades são diferentes, então somamos suas quantidades.</p>`,
        code: {
          title: "Exemplo didático próprio · bottom-up",
          source: [
            "def contar_maneiras(n):",
            "    # dp[i] = maneiras de chegar exatamente ao degrau i",
            "    dp = [0] * (n + 1)",
            "    dp[0] = 1  # existe uma maneira de estar no início",
            "",
            "    for i in range(1, n + 1):",
            "        dp[i] += dp[i - 1]  # último passo teve tamanho 1",
            "",
            "        if i >= 2:",
            "            dp[i] += dp[i - 2]  # último passo teve tamanho 2",
            "",
            "    return dp[n]",
            "",
            "",
            "print(contar_maneiras(5))  # 8"
          ],
          note: "A transição vem da pergunta sobre o último passo; ela não surgiu apenas como fórmula."
        }
      },
      {
        title: "Top-down e bottom-up",
        html: `
          <div class="table-wrap"><table><thead><tr><th>Abordagem</th><th>Como avança</th><th>Características</th></tr></thead><tbody>
            <tr><td>Top-down</td><td>começa pela pergunta final e chama estados necessários</td><td>recursão + cache; pode evitar estados nunca requisitados</td></tr>
            <tr><td>Bottom-up</td><td>começa pelos casos base e preenche estados maiores</td><td>iteração; ordem de dependências explícita; sem pilha recursiva</td></tr>
          </tbody></table></div>
          <p>Ambas reutilizam respostas. A diferença é a ordem de avaliação e a forma de implementar.</p>`
      },
      {
        title: "Quando há sinais de DP",
        html: `<ul class="clean-list">
          <li><strong>Subproblemas sobrepostos:</strong> as mesmas perguntas menores reaparecem.</li>
          <li><strong>Estrutura ótima:</strong> uma resposta ótima pode ser composta a partir de respostas ótimas menores compatíveis.</li>
          <li><strong>Número controlado de estados:</strong> conseguimos contar combinações distintas dos parâmetros relevantes.</li>
          <li><strong>Transições locais:</strong> cada estado depende de um conjunto conhecido de estados menores.</li>
        </ul>
        <div class="warning"><strong>Nem toda recursão vira DP.</strong> Se os subproblemas forem essencialmente diferentes e não se repetirem, guardar respostas pode não trazer vantagem.</div>`
      }
    ],
    lab: "dp-table",
    goals: ["identificar subproblemas sobrepostos", "definir um estado em linguagem natural", "explicar transição e casos base", "comparar top-down e bottom-up", "entender como DP pode evitar uma árvore exponencial"],
    questions: [
      ["O que deve vir primeiro: a fórmula ou o significado do estado?", "O significado. A transição deve ser derivada da interpretação do estado e das escolhas do problema."],
      ["Top-down e memoização são exatamente DP?", "Memoização é uma forma top-down de reutilizar subproblemas e é frequentemente usada para implementar programação dinâmica."],
      ["Por que dp[0] pode valer 1 no exemplo da escada?", "Ele representa uma forma vazia de estar no ponto inicial. Esse valor permite construir corretamente os primeiros degraus."]
    ],
    sources: [
      ["GeeksforGeeks — How Dynamic Programming Works", "https://www.geeksforgeeks.org/dsa/how-does-dynamic-programming-work/"],
      ["GeeksforGeeks — Tabulation vs Memoization", "https://www.geeksforgeeks.org/dsa/tabulation-vs-memoization/"],
      ["CP-Algorithms — Introduction to Dynamic Programming", "https://cp-algorithms.com/dynamic_programming/intro-to-dp.html"]
    ]
  },
  {
    number: 8,
    slug: "08-memoizacao",
    title: "Memoização",
    summary: "Adicionar um cache à recursão para que cada estado distinto seja calculado apenas quando necessário.",
    duration: "60 min",
    prerequisites: ["Aula 03", "Aula 07", "recursão", "dicionários", "estados"],
    sections: [
      {
        title: "Recursão com memória",
        html: `
          <div class="flow"><span class="flow-step">recursão pura</span><span class="flow-arrow">→</span><span class="flow-step active">adicionar cache</span><span class="flow-arrow">→</span><span class="flow-step done">memoização</span></div>
          <p>Memoizar significa associar cada estado à resposta já calculada. Quando a função recebe novamente o mesmo estado, retorna o valor do cache sem expandir outra árvore de chamadas.</p>
          <div class="note"><strong>A chave do cache identifica o estado.</strong> Se o subproblema depende de dois parâmetros, a chave normalmente precisa incluir os dois.</div>`
      },
      {
        title: "Cache manual com dicionário",
        html: `<p>Primeiro verificamos se <code>n</code> já está em <code>memo</code>. Caso esteja, reutilizamos. Caso contrário, calculamos, guardamos e só então retornamos.</p>`,
        code: {
          title: "Exemplo didático próprio · Fibonacci memoizado",
          source: [
            "def fib(n, memo):",
            "    # Casos base: não precisam ser armazenados nem subdivididos.",
            "    if n <= 1:",
            "        return n",
            "",
            "    # Se o estado n já foi resolvido, evitamos repetir a recursão.",
            "    if n in memo:",
            "        return memo[n]",
            "",
            "    # Calculamos uma vez, registramos e devolvemos a resposta.",
            "    memo[n] = fib(n - 1, memo) + fib(n - 2, memo)",
            "    return memo[n]",
            "",
            "",
            "memo = {}  # O dicionário é compartilhado por toda esta execução.",
            "print(fib(10, memo))",
            "print(memo)"
          ],
          note: "Cada n entre 2 e 10 é calculado uma vez. Os demais acessos são consultas ao dicionário."
        }
      },
      {
        title: "Quanto trabalho desaparece?",
        html: `
          <p>Na versão ingênua de Fibonacci, o número de chamadas cresce exponencialmente. Para <code>fib(10)</code>, são 177 chamadas se contarmos também os casos base. Com memoização, há apenas um conjunto linear de estados distintos e algumas consultas ao cache.</p>
          <div class="table-wrap"><table><thead><tr><th>Versão</th><th>Estados recalculados?</th><th>Tempo</th><th>Memória auxiliar</th></tr></thead><tbody>
            <tr><td>recursão pura</td><td>sim, muitas vezes</td><td>exponencial nesse exemplo</td><td>O(n) de pilha</td></tr>
            <tr><td>memoizada</td><td>não</td><td>O(n) estados</td><td>O(n) cache + pilha</td></tr>
          </tbody></table></div>`
      },
      {
        title: "functools.cache depois do conceito",
        html: `<p>O Python pode administrar o dicionário por meio de um decorador. A função abaixo tem o mesmo papel conceitual: antes de executar um estado novo, o mecanismo verifica se a combinação de argumentos já foi calculada.</p>`,
        code: {
          title: "Recurso da linguagem · functools.cache",
          source: [
            "from functools import cache",
            "",
            "",
            "@cache",
            "def fib(n):",
            "    # Os casos base encerram a recursão.",
            "    if n <= 1:",
            "        return n",
            "",
            "    # O decorador guarda o resultado antes de futuras repetições.",
            "    return fib(n - 1) + fib(n - 2)",
            "",
            "",
            "print(fib(10))  # 55"
          ],
          note: "functools.cache equivale a lru_cache(maxsize=None). Em competição, confirme se os argumentos são imutáveis e se a profundidade recursiva é segura."
        }
      },
      {
        title: "Erros comuns no cache",
        html: `<ul class="error-list">
          <li><strong>Chave incompleta:</strong> dois subproblemas diferentes acabam compartilhando uma resposta.</li>
          <li><strong>Guardar tarde demais:</strong> a função retorna sem registrar o resultado.</li>
          <li><strong>Cache entre casos de teste:</strong> dados de uma instância contaminam outra quando o estado depende da entrada.</li>
          <li><strong>Estado mutável como chave:</strong> listas não podem ser chaves de dicionário; transforme o necessário em tupla.</li>
        </ul>`
      }
    ],
    lab: "memo-calls",
    goals: ["explicar cache de estados", "implementar memoização com dicionário", "escolher uma chave completa", "comparar quantidade de chamadas", "usar functools.cache sabendo o que ele automatiza"],
    questions: [
      ["Memoização elimina a pilha de chamadas?", "Não. Ela reduz cálculos repetidos, mas a implementação top-down continua recursiva e usa a pilha."],
      ["Por que uma lista não pode ser chave do memo?", "Porque listas são mutáveis e, por isso, não são hashable. Tuplas de valores imutáveis podem ser usadas."],
      ["Memoizar sempre melhora uma recursão?", "Não. É útil quando estados iguais reaparecem e o custo de armazenar/consultar é compensado pelo trabalho evitado."]
    ],
    sources: [
      ["GeeksforGeeks — Memoization", "https://www.geeksforgeeks.org/dsa/memoization-1d-2d-and-3d/"],
      ["GeeksforGeeks — Tabulation vs Memoization", "https://www.geeksforgeeks.org/dsa/tabulation-vs-memoization/"],
      ["Python — functools.cache e lru_cache", "https://docs.python.org/3/library/functools.html#functools.cache"]
    ]
  },
  {
    number: 9,
    slug: "09-branch-and-bound",
    title: "Introdução a Branch and Bound",
    summary: "Usar limites matemáticos para descartar regiões que não podem melhorar a melhor solução conhecida.",
    duration: "55 min",
    prerequisites: ["Aula 02", "Aula 04", "árvore de decisões", "poda", "problemas de otimização"],
    sections: [
      {
        title: "Branch: separar; Bound: limitar",
        html: `
          <p>Branch and Bound é uma família de técnicas para otimização combinatória. <strong>Branch</strong> cria subproblemas por decisões. <strong>Bound</strong> calcula um limite sobre o melhor resultado que cada ramo ainda poderia alcançar.</p>
          <div class="diagram"><pre>melhor solução conhecida = 50

ramo A: ainda pode chegar a 68  → explorar
ramo B: no máximo chegaria a 40 → podar
ramo C: ainda pode chegar a 55  → explorar</pre></div>
          <p>Se buscamos maximizar e o limite superior de um ramo é 40, ele não pode superar a solução 50 já encontrada. Logo, explorá-lo não altera a resposta.</p>`
      },
      {
        title: "Incumbente e limite",
        html: `
          <div class="concept-grid">
            <article class="concept-card accent"><h3>Incumbente</h3><p>A melhor solução completa encontrada até agora. Ela é viável, não apenas uma estimativa.</p></article>
            <article class="concept-card yellow"><h3>Bound</h3><p>Uma estimativa otimista do melhor que um ramo incompleto poderia alcançar.</p></article>
          </div>
          <p>Quanto melhor o incumbente e mais apertado o limite, mais ramos podem ser descartados. O limite deve ser seguro: em maximização, ele não pode subestimar o potencial real do ramo.</p>`
      },
      {
        title: "Backtracking x Branch and Bound",
        html: `
          <div class="table-wrap"><table><thead><tr><th></th><th>Backtracking</th><th>Branch and Bound</th></tr></thead><tbody>
            <tr><td>meta comum</td><td>encontrar soluções que atendam às restrições</td><td>encontrar a melhor solução segundo um objetivo</td></tr>
            <tr><td>poda típica</td><td>o ramo já ficou inviável</td><td>o ramo não pode melhorar o incumbente</td></tr>
            <tr><td>informação usada</td><td>restrições da candidata parcial</td><td>limite inferior ou superior e melhor solução atual</td></tr>
          </tbody></table></div>
          <p>Na prática, as ideias podem conviver: primeiro descartamos estados inviáveis e depois usamos um bound para descartar estados viáveis, porém incapazes de vencer.</p>`
      },
      {
        title: "Ordem de exploração",
        html: `
          <p>Branch and Bound pode selecionar o próximo nó de formas diferentes: profundidade, largura ou melhor limite primeiro. Encontrar cedo uma boa solução incumbente costuma fortalecer as podas seguintes.</p>
          <div class="warning"><strong>Não confunda com BFS ou DFS como objetivo.</strong> BFS e DFS descrevem a ordem de visita. Branch and Bound descreve a ramificação, os limites e a poda; a fila usada depende da estratégia de exploração.</div>
          <p>Esta aula é introdutória. Formulações fortes de bounds e estruturas de prioridade aparecem em problemas mais avançados.</p>`
      }
    ],
    lab: "branch-bound",
    goals: ["definir branch, bound e incumbente", "entender uma poda por limite", "distinguir inviabilidade de incapacidade de melhorar", "perceber que BFS/DFS são ordens de exploração", "reconhecer o caráter introdutório da técnica"],
    questions: [
      ["Um ramo podado por bound é necessariamente inviável?", "Não. Ele pode conter soluções válidas, mas nenhuma capaz de melhorar a melhor solução atual."],
      ["Por que encontrar uma boa solução cedo ajuda?", "Ela melhora o incumbente e permite podar mais ramos cujos limites não a superam."],
      ["Branch and Bound é BFS ou DFS?", "Nenhum dos dois obrigatoriamente. Pode usar diferentes ordens de expansão; sua característica central são os limites e a poda de otimização."]
    ],
    sources: [
      ["GeeksforGeeks — Branch and Bound Algorithm", "https://www.geeksforgeeks.org/dsa/branch-and-bound-algorithm/"],
      ["GeeksforGeeks — Introduction to Branch and Bound", "https://www.geeksforgeeks.org/dsa/introduction-to-branch-and-bound-data-structures-and-algorithms-tutorial/"],
      ["GeeksforGeeks — Backtracking vs Branch and Bound", "https://www.geeksforgeeks.org/dsa/difference-between-backtracking-and-branch-n-bound-technique/"]
    ]
  },
  {
    number: 10,
    slug: "10-comparando-paradigmas",
    title: "Comparando os paradigmas",
    summary: "Reconhecer sinais do problema, estimar custos e justificar por que uma estratégia combina com a estrutura encontrada.",
    duration: "70 min",
    prerequisites: ["Aulas 01 a 09", "complexidade", "restrições de entrada", "testes de mesa"],
    sections: [
      {
        title: "Uma tabela para orientar, não rotular",
        html: `
          <div class="table-wrap"><table><thead><tr><th>Paradigma ou técnica</th><th>Ideia central</th><th>Sinal frequente</th><th>Pergunta de controle</th></tr></thead><tbody>
            <tr><td>Força bruta</td><td>testar possibilidades</td><td>espaço pequeno</td><td>quantas candidatas existem?</td></tr>
            <tr><td>Recursão</td><td>instância menor do mesmo problema</td><td>definição hierárquica</td><td>qual é o caso base?</td></tr>
            <tr><td>Backtracking</td><td>escolher, explorar, desfazer</td><td>configuração parcial</td><td>quando um ramo fica inviável?</td></tr>
            <tr><td>Divisão e conquista</td><td>dividir e combinar</td><td>partes independentes</td><td>qual é o custo de combinar?</td></tr>
            <tr><td>Guloso</td><td>escolha local definitiva</td><td>possível propriedade de troca</td><td>a escolha local é provadamente segura?</td></tr>
            <tr><td>DP</td><td>reutilizar estados</td><td>subproblemas repetidos</td><td>o que dp[i] significa?</td></tr>
            <tr><td>Memoização</td><td>recursão + cache</td><td>mesmo estado chamado novamente</td><td>qual é a chave completa?</td></tr>
            <tr><td>Branch and Bound</td><td>limitar e podar</td><td>otimização combinatória</td><td>o ramo ainda pode vencer?</td></tr>
          </tbody></table></div>`
      },
      {
        title: "As relações importam",
        html: `
          <div class="concept-grid">
            <article class="concept-card accent"><h3>Backtracking + recursão</h3><p>A pilha representa escolhas do caminho; o retorno facilita desfazer.</p></article>
            <article class="concept-card blue"><h3>Divisão + recursão</h3><p>Cada chamada resolve uma parte menor e retorna sua contribuição.</p></article>
            <article class="concept-card yellow"><h3>DP top-down + recursão</h3><p>As dependências são chamadas sob demanda e guardadas no cache.</p></article>
            <article class="concept-card red"><h3>Busca + bound</h3><p>A árvore pode ser percorrida em ordens diferentes, com poda por limite.</p></article>
          </div>
          <p>“Usa recursão” descreve a implementação, mas não basta para reconhecer o raciocínio principal. Pergunte o que as chamadas representam.</p>`
      },
      {
        title: "Restrições como ordem de grandeza",
        html: `
          <p>Os limites ajudam a descartar propostas claramente inviáveis. Em vez de decorar uma tabela rígida, estime operações e compare com o tempo disponível.</p>
          <div class="table-wrap"><table><thead><tr><th>Restrição fictícia</th><th>Hipóteses que merecem investigação</th><th>Cuidado</th></tr></thead><tbody>
            <tr><td><code>n ≤ 10</code></td><td>permutações pequenas, subconjuntos, backtracking</td><td>o trabalho por candidata ainda importa</td></tr>
            <tr><td><code>n ≤ 25</code></td><td>algumas buscas exponenciais com poda ou divisão</td><td><code>n!</code> continua enorme</td></tr>
            <tr><td><code>n ≤ 2.000</code></td><td>talvez <code>O(n²)</code></td><td>constantes e número de casos importam</td></tr>
            <tr><td><code>n ≤ 100.000</code></td><td><code>O(n)</code> ou <code>O(n log n)</code></td><td>memória e operações por item importam</td></tr>
          </tbody></table></div>
          <div class="note"><strong>Estimativa, não lei.</strong> Um limite isolado não revela toda a solução. Leia também os valores, a quantidade de casos e a estrutura dos dados.</div>`
      },
      {
        title: "Roteiro de decisão",
        html: `<ol class="steps">
          <li><strong>Formalize a entrada e a resposta.</strong> O que exatamente deve ser calculado?</li>
          <li><strong>Esboce a solução mais simples.</strong> Quantas candidatas ou operações ela executa?</li>
          <li><strong>Procure estrutura.</strong> Há ordenação, subproblemas, escolhas, repetição ou limites?</li>
          <li><strong>Escolha uma hipótese de paradigma.</strong> Ela explica como reduzir o trabalho?</li>
          <li><strong>Justifique a correção.</strong> Caso base, invariante, troca, transição ou poda segura.</li>
          <li><strong>Cheque tempo e memória.</strong> Compare a ordem de crescimento com as restrições.</li>
        </ol>`
      }
    ],
    lab: "paradigm-quiz",
    goals: ["comparar os paradigmas sem tratá-los como caixas exclusivas", "reconhecer sinais em enunciados fictícios", "usar restrições para estimar viabilidade", "separar técnica de implementação e estratégia", "justificar uma escolha algorítmica"],
    questions: [
      ["Um problema pode usar divisão e conquista e programação dinâmica?", "Sim. Partes diferentes da solução podem usar estratégias diferentes; a classificação serve para explicar o raciocínio, não limitar a implementação."],
      ["As restrições determinam o algoritmo?", "Não. Elas eliminam algumas complexidades e sugerem outras, mas a estrutura do problema ainda decide quais algoritmos são corretos."],
      ["Como diferenciar um guloso de uma heurística?", "Um guloso correto tem uma justificativa de que suas escolhas locais produzem uma solução ótima. Uma heurística busca bons resultados sem essa garantia geral."]
    ],
    sources: [
      ["GeeksforGeeks — Algorithm Design Techniques", "https://www.geeksforgeeks.org/dsa/algorithms-design-techniques/"],
      ["GeeksforGeeks — Greedy, Divide and Conquer and DP", "https://www.geeksforgeeks.org/dsa/comparison-among-greedy-divide-and-conquer-and-dynamic-programming-algorithm/"],
      ["CP-Algorithms — catálogo de algoritmos", "https://cp-algorithms.com/"]
    ]
  }
];
