(function (root) {
  const lessons = [
    {
      id: 1,
      slug: "aula-01-introducao",
      title: "O que é Maratona de Programação",
      summary: "Entenda o caminho entre ler um problema e receber o primeiro Accepted.",
      duration: "45 min",
      activity: "flow",
      content: `
        <section class="band">
          <div class="two-col">
            <div>
              <h2>Uma prova de raciocínio que termina em código</h2>
              <p>Em programação competitiva, cada questão descreve uma situação e pede que você produza uma resposta exata. Seu programa não conversa com uma pessoa: ele recebe dados, processa esses dados e escreve o resultado no formato pedido.</p>
              <p>Saber Python ajuda a escrever a ideia, mas a parte principal vem antes: interpretar, encontrar um padrão, criar um algoritmo e imaginar casos capazes de quebrá-lo.</p>
              <div class="success"><strong>Resolver</strong> significa criar um programa que produz a saída correta para todas as entradas válidas, dentro dos limites de tempo e memória.</div>
            </div>
            <figure class="concept-card">
              <h3>Um exemplo mínimo</h3>
              <p>O problema informa dois inteiros e pede a soma. A entrada pode ser <code>7 5</code>; a saída esperada, <code>12</code>. A história pode mudar, mas o núcleo é: ler, somar e mostrar.</p>
              <div class="flow"><span class="flow-step">7 5</span><span class="flow-arrow">→</span><span class="flow-step">7 + 5</span><span class="flow-arrow">→</span><span class="flow-step">12</span></div>
            </figure>
          </div>
        </section>
        <section class="band">
          <h2>As partes de um problema</h2>
          <div class="concept-grid">
            <article class="concept-card"><h3>Enunciado</h3><p>Explica a situação, as regras e o que deve ser calculado. Leia procurando verbos: somar, contar, decidir, ordenar.</p></article>
            <article class="concept-card"><h3>Entrada</h3><p>Descreve os dados entregues ao programa, a ordem, os tipos e os limites. Esses limites influenciam o algoritmo.</p></article>
            <article class="concept-card"><h3>Saída</h3><p>Define exatamente o que imprimir. Espaços, letras, casas decimais e quebras de linha fazem parte da resposta.</p></article>
            <article class="concept-card"><h3>Exemplos</h3><p>Ajudam a conferir a interpretação, mas não cobrem todos os casos. Seu programa precisa funcionar além deles.</p></article>
          </div>
        </section>
        <section class="band">
          <h2>Do enunciado ao juiz</h2>
          <ol class="steps">
            <li><strong>Entender:</strong> reescreva o pedido com suas palavras.</li>
            <li><strong>Modelar:</strong> identifique entrada, saída e transformação necessária.</li>
            <li><strong>Criar o algoritmo:</strong> organize a solução em passos finitos.</li>
            <li><strong>Programar e testar:</strong> use exemplos, casos pequenos e extremos.</li>
            <li><strong>Submeter:</strong> envie o código ao juiz automático.</li>
            <li><strong>Aprender com o veredito:</strong> <em>Accepted</em> confirma os testes; outro resultado orienta a investigação.</li>
          </ol>
          <div class="note"><strong>O juiz automático</strong> executa seu programa com entradas que você não vê e compara a saída produzida com a resposta esperada. Por isso, “funcionou no meu exemplo” ainda não garante correção.</div>
        </section>
        <section class="band">
          <h2>O que realmente treinamos</h2>
          <div class="three-col">
            <article class="concept-card"><h3>Interpretação</h3><p>Separar a história dos dados e descobrir qual pergunta precisa ser respondida.</p></article>
            <article class="concept-card"><h3>Algoritmos</h3><p>Construir uma sequência clara, correta e eficiente de operações.</p></article>
            <article class="concept-card"><h3>Teste e depuração</h3><p>Procurar contraexemplos, localizar a causa do erro e corrigir sem chutar.</p></article>
          </div>
        </section>`,
      challenge: "Você recebe a idade de uma pessoa. Sem escrever código ainda, descreva a entrada, a saída e um algoritmo que informe quantos anos faltam para ela completar 18. O que deve acontecer se ela já tiver 18 ou mais?",
      solution: "Uma possibilidade: ler a idade; se ela for menor que 18, calcular 18 - idade; caso contrário, usar 0; mostrar o resultado. A decisão será programada com if na Aula 12.",
      sources: [
        ["Guia completo de programação competitiva — GeeksforGeeks", "https://www.geeksforgeeks.org/dsa/competitive-programming-a-complete-guide/"],
        ["Como ler problemas de programação competitiva — GeeksforGeeks", "https://www.geeksforgeeks.org/dsa/how-to-read-competitive-programming-questions/"]
      ]
    },
    {
      id: 2,
      slug: "aula-02-maratona-sbc-icpc",
      title: "Maratona SBC e ICPC",
      summary: "Equipes, fases, computador compartilhado, ranking e as regras que podem mudar a cada edição.",
      duration: "55 min",
      activity: "scoreboard",
      content: `
        <section class="band">
          <div class="two-col">
            <div>
              <h2>Da universidade ao cenário internacional</h2>
              <p>A Maratona SBC de Programação é a competição brasileira universitária ligada ao circuito do ICPC. Ela reúne equipes em etapas classificatórias e seleciona participantes para fases posteriores do circuito latino-americano e mundial, conforme o regulamento da edição.</p>
              <p>O ICPC organiza competições regionais no mundo. Em seu formato regional padrão, uma equipe reúne três estudantes elegíveis, orientados por um treinador, e compartilha uma única estação de trabalho durante cinco horas.</p>
              <div class="warning"><strong>Regra de ouro desta aula:</strong> datas, sedes, linguagens, vagas e critérios de avanço podem variar. Antes de competir, a equipe deve ler o regulamento e o manual da edição atual.</div>
            </div>
            <figure class="concept-card"><img src="../../assets/img/competicao.svg" alt="Três integrantes organizados ao redor de um computador"><p>Enquanto uma pessoa programa, as outras podem ler, provar ideias no papel e preparar testes.</p></figure>
          </div>
        </section>
        <section class="band">
          <h2>Formato essencial</h2>
          <div class="concept-grid">
            <article class="concept-card"><h3>Equipe</h3><p>Três competidores elegíveis e um treinador responsável pela inscrição e orientação. A elegibilidade acadêmica é definida pelo regulamento vigente.</p></article>
            <article class="concept-card"><h3>Tempo e prova</h3><p>O regional do ICPC usa cinco horas. A quantidade de problemas varia; provas costumam oferecer mais questões do que a maioria das equipes consegue resolver.</p></article>
            <article class="concept-card"><h3>Computador</h3><p>Os três integrantes compartilham uma estação. Dividir leitura, papel, testes e tempo de digitação é parte da estratégia.</p></article>
            <article class="concept-card"><h3>Submissões</h3><p>A solução é enviada ao sistema de julgamento. Um problema conta quando recebe Accepted; tentativas rejeitadas podem gerar penalidade.</p></article>
          </div>
        </section>
        <section class="band">
          <h2>Como o ranking é formado</h2>
          <p>Nas regras regionais do ICPC, vence quem resolve mais problemas. Entre equipes com a mesma quantidade, fica à frente quem tem menor tempo total. Para cada problema aceito, soma-se o tempo até a submissão correta e, em geral, 20 minutos para cada tentativa rejeitada anterior daquele problema. Erro de compilação não entra nessa penalidade padrão.</p>
          <div class="table-wrap"><table><thead><tr><th>Equipe</th><th>Resolvidos</th><th>Tempo</th><th>Posição</th></tr></thead><tbody><tr><td>Ada</td><td>5</td><td>615</td><td>1ª</td></tr><tr><td>Turing</td><td>5</td><td>702</td><td>2ª</td></tr><tr><td>Hamilton</td><td>4</td><td>410</td><td>3ª</td></tr></tbody></table></div>
          <div class="note"><strong>Por que Ada está na frente?</strong> Ada e Turing resolveram cinco problemas, mas Ada acumulou menos tempo. Hamilton tem tempo menor, porém resolveu apenas quatro.</div>
        </section>
        <section class="band">
          <h2>Fases e classificação</h2>
          <p>No Brasil, a organização publica o calendário, as sedes, o manual e os critérios de classificação de cada edição. A primeira fase costuma ocorrer em sedes locais; equipes classificadas avançam para a final nacional. Resultados dessa etapa integram o caminho regional do ICPC e podem levar a etapas seguintes, segundo as vagas e regras anunciadas.</p>
          <p>Não decore um número de vagas de um ano específico. Aprenda onde confirmar: site da Maratona SBC, manual da edição e regras regionais do ICPC.</p>
        </section>`,
      challenge: "Duas equipes resolveram 4 problemas. A equipe Azul tem tempo 500; a Verde, 460. Depois, a Verde recebe correção de uma tentativa rejeitada que acrescenta 20 minutos. Qual fica à frente?",
      solution: "A Verde passa a ter 480 minutos e continua à frente da Azul, pois ambas resolveram 4 problemas e 480 é menor que 500.",
      sources: [
        ["Regras regionais atuais — ICPC", "https://icpc.global/regionals/rules/"],
        ["Como funcionam as regionais — ICPC", "https://icpc.global/regionals/regionals"],
        ["Maratona SBC de Programação — página oficial", "https://maratona.sbc.org.br/"],
        ["Manual oficial da Maratona SBC 2025", "https://maratona.sbc.org.br/manual.pdf"]
      ]
    },
    {
      id: 3,
      slug: "aula-03-como-funciona",
      title: "Como funciona uma competição",
      summary: "Da abertura da prova à submissão: leitura, divisão de tarefas, testes e comunicação.",
      duration: "50 min",
      activity: "team",
      content: `
        <section class="band">
          <h2>Os primeiros minutos definem o mapa da prova</h2>
          <p>Quando a competição começa, a equipe não precisa escolher um problema às cegas. Primeiro, todos fazem uma leitura rápida e registram o que cada questão parece exigir. O objetivo não é resolver tudo nesse momento: é descobrir onde estão os pontos mais acessíveis.</p>
          <div class="flow"><span class="flow-step">receber prova</span><span class="flow-arrow">→</span><span class="flow-step">ler</span><span class="flow-arrow">→</span><span class="flow-step">classificar</span><span class="flow-arrow">→</span><span class="flow-step">escolher</span><span class="flow-arrow">→</span><span class="flow-step">implementar</span><span class="flow-arrow">→</span><span class="flow-step">testar</span><span class="flow-arrow">→</span><span class="flow-step">enviar</span></div>
        </section>
        <section class="band">
          <div class="two-col">
            <div>
              <h2>Divisão possível</h2>
              <ul class="clean-list">
                <li><strong>Integrante 1:</strong> lê A, B e C e anota ideia, entradas e dúvidas.</li>
                <li><strong>Integrante 2:</strong> lê D, E e F e procura padrões conhecidos.</li>
                <li><strong>Integrante 3:</strong> começa a implementar o problema já considerado mais seguro.</li>
              </ul>
            </div>
            <div>
              <h2>Comunicação curta e útil</h2>
              <p>Em vez de “acho que dá”, informe: “C pede N valores, basta contar os positivos, complexidade linear, tenho três casos de teste”. A equipe consegue comparar opções com base em evidências.</p>
              <div class="success"><strong>O computador é um recurso compartilhado.</strong> Uma solução pode ser desenvolvida no papel enquanto outra está sendo digitada.</div>
            </div>
          </div>
        </section>
        <section class="band">
          <h2>Um ciclo de trabalho saudável</h2>
          <ol class="steps">
            <li>Uma pessoa explica a ideia antes de começar a codificar.</li>
            <li>Outra tenta encontrar um caso que derrube a ideia.</li>
            <li>O código é escrito com entrada e saída conferidas.</li>
            <li>A equipe executa exemplos e testes próprios.</li>
            <li>Após a submissão, o próximo trabalho já está preparado.</li>
          </ol>
          <div class="warning"><strong>Evite fila invisível no computador:</strong> se duas pessoas precisam digitar “agora”, faltou combinar prioridade. O quadro da equipe deve indicar quem está lendo, resolvendo, testando e codificando.</div>
        </section>`,
      challenge: "Em uma equipe de três pessoas, há um problema pronto para digitar, outro quase provado no papel e quatro ainda não lidos. Proponha uma divisão de tarefas para os próximos 15 minutos.",
      solution: "Uma organização possível: integrante 1 digita o problema pronto; integrante 2 termina a prova e prepara testes do segundo; integrante 3 lê os quatro restantes e classifica. Ao concluir a submissão, o computador passa ao segundo problema.",
      sources: [
        ["Participação e formato regional — ICPC", "https://icpc.global/regionals/get-involved"],
        ["Dicas para iniciantes — GeeksforGeeks", "https://www.geeksforgeeks.org/blogs/tips-and-tricks-for-competitive-programmers-set-1-for-beginners/"]
      ]
    },
    {
      id: 4,
      slug: "aula-04-estrategias",
      title: "Estratégias de competição",
      summary: "Escolha a ordem dos problemas, controle o tempo e teste antes de gastar uma submissão.",
      duration: "55 min",
      activity: "strategy",
      content: `
        <section class="band">
          <h2>A letra não indica a dificuldade</h2>
          <p>O problema A não precisa ser o mais fácil. Uma leitura geral reduz o risco de gastar a primeira hora em uma questão difícil enquanto três soluções curtas permanecem escondidas na prova.</p>
          <div class="table-wrap"><table><thead><tr><th>Problema</th><th>Percepção inicial</th><th>Ação</th></tr></thead><tbody><tr><td>A</td><td>Fácil</td><td>resolver cedo</td></tr><tr><td>B</td><td>Difícil</td><td>deixar ideias no papel</td></tr><tr><td>C</td><td>Fácil</td><td>resolver cedo</td></tr><tr><td>D</td><td>Médio</td><td>preparar depois</td></tr><tr><td>E</td><td>Não entendido</td><td>pedir nova leitura</td></tr><tr><td>F</td><td>Fácil</td><td>resolver cedo</td></tr><tr><td>G</td><td>Difícil</td><td>retomar se houver tempo</td></tr></tbody></table></div>
          <p class="note"><strong>Ordem inicial possível:</strong> A → C → F → D → E → B → G. Ela não é definitiva: uma observação nova pode mudar prioridades.</p>
        </section>
        <section class="band">
          <h2>Antes de submeter</h2>
          <div class="concept-grid">
            <article class="concept-card"><h3>Casos pequenos</h3><p>Use a menor entrada válida. Ela revela inicializações incorretas e laços que não executam.</p></article>
            <article class="concept-card"><h3>Casos extremos</h3><p>Teste limites, zero quando permitido, valores negativos, empates e maior tamanho informado.</p></article>
            <article class="concept-card"><h3>Formato</h3><p>Confira maiúsculas, espaços, casas decimais e linhas extras. O juiz compara saída.</p></article>
            <article class="concept-card"><h3>Tipos numéricos</h3><p>Pergunte se há divisão, casas decimais ou valores grandes antes de escolher operações.</p></article>
          </div>
        </section>
        <section class="band">
          <div class="two-col">
            <div><h2>O custo de ficar preso</h2><p>Insistir pode ser correto quando há progresso verificável. Mas repetir mudanças sem compreender o erro consome tempo e bloqueia o computador. Defina um ponto de revisão: depois de 20 minutos sem avanço, explique o estado a outra pessoa ou troque de problema.</p></div>
            <div><h2>Papel não é atraso</h2><p>Escrever exemplos, fórmulas, invariantes e pseudocódigo reduz retrabalho. Em uma equipe com um computador, o papel permite que três soluções avancem ao mesmo tempo.</p></div>
          </div>
        </section>`,
      challenge: "Sua equipe tem 90 minutos restantes. A está quase pronta, B tem uma ideia sem prova, C parece fácil e ainda não foi lido com atenção, D recebeu dois WAs. Em qual ordem você revisaria essas tarefas e por quê?",
      solution: "Uma resposta defensável: terminar A, validar rapidamente C, investigar D com um caso capaz de reproduzir o erro e só então aprofundar B. O importante é justificar pela chance de Accepted por unidade de tempo, não pela letra.",
      sources: [
        ["Manual de programação competitiva — GeeksforGeeks", "https://www.geeksforgeeks.org/competitive-programming/competitive-programming-cp-handbook-with-complete-roadmap/"],
        ["Guia introdutório de competição — Princeton", "https://competitive-programming.cs.princeton.edu/intro_guide"]
      ]
    },
    {
      id: 5,
      slug: "aula-05-tipos-de-problemas",
      title: "Tipos de problemas",
      summary: "Reconheça pistas de matemática, repetição, strings, estruturas e algoritmos futuros.",
      duration: "60 min",
      activity: "categories",
      content: `
        <section class="band">
          <h2>Reconhecer padrões economiza tempo</h2>
          <p>Classificar um problema não resolve a questão sozinho, mas sugere ferramentas. “Para cada valor” aponta para repetição; “maior posição” sugere lista e varredura; “menor caminho” costuma indicar grafos.</p>
          <div class="concept-grid">
            <article class="concept-card"><h3>Entrada e saída</h3><p>Transformação direta de poucos valores. Pista: a fórmula aparece quase inteira no enunciado.</p></article>
            <article class="concept-card"><h3>Matemática</h3><p>Fórmulas, divisibilidade, áreas ou contagens. Pista: é possível resolver um exemplo no papel com operações.</p></article>
            <article class="concept-card"><h3>Condicionais</h3><p>A resposta depende de casos. Pistas: “se”, “caso”, “maior que”, “pertence ao intervalo”.</p></article>
            <article class="concept-card"><h3>Repetição</h3><p>A mesma ação ocorre N vezes ou até um sentinela. Pistas: “para cada”, “N casos”, “até aparecer zero”.</p></article>
            <article class="concept-card"><h3>Simulação</h3><p>Executamos regras na ordem em que eventos acontecem. Pista: o estado muda a cada operação.</p></article>
            <article class="concept-card"><h3>Strings</h3><p>Analisa caracteres, palavras e formatação. Pistas: texto, letras, palíndromo, frequência.</p></article>
            <article class="concept-card"><h3>Listas e matrizes</h3><p>Armazenam sequências ou grades. Pistas: posições, linhas, colunas, vizinhos, maior e menor.</p></article>
            <article class="concept-card"><h3>Ordenação e busca</h3><p>Colocar itens em ordem ou localizar valores. Pistas: ranking, ordem crescente, consultas.</p></article>
          </div>
        </section>
        <section class="band">
          <h2>Mapa dos assuntos futuros</h2>
          <div class="concept-grid">
            <article class="concept-card future"><span class="future-label">veremos futuramente</span><h3>Pilhas, filas e deques</h3><p>Ordem de entrada e remoção de elementos.</p></article>
            <article class="concept-card future"><span class="future-label">veremos futuramente</span><h3>Conjuntos e dicionários</h3><p>Presença, unicidade e associação entre chave e valor.</p></article>
            <article class="concept-card future"><span class="future-label">veremos futuramente</span><h3>Guloso</h3><p>Escolhas locais justificadas para construir uma solução global.</p></article>
            <article class="concept-card future"><span class="future-label">veremos futuramente</span><h3>Grafos</h3><p>Vértices e arestas modelam redes, rotas e dependências.</p></article>
            <article class="concept-card future"><span class="future-label">veremos futuramente</span><h3>Programação dinâmica</h3><p>Reaproveita resultados de subproblemas sobrepostos.</p></article>
            <article class="concept-card future"><span class="future-label">veremos futuramente</span><h3>Geometria</h3><p>Pontos, retas, polígonos, distâncias e orientação.</p></article>
            <article class="concept-card future"><span class="future-label">veremos futuramente</span><h3>Teoria dos números</h3><p>Primos, máximo divisor comum, modularidade e propriedades inteiras.</p></article>
            <article class="concept-card future"><span class="future-label">veremos futuramente</span><h3>Complexidade</h3><p>Compara quanto tempo e memória crescem com o tamanho da entrada.</p></article>
          </div>
        </section>`,
      challenge: "Classifique este problema: “Dadas N palavras, conte quantas começam com a letra A”. Quais conceitos básicos aparecem juntos?",
      solution: "Há repetição para processar N palavras, strings para observar o primeiro caractere, condicional para testar a letra e contador para acumular a resposta.",
      sources: [
        ["Roteiro de estruturas e algoritmos — GeeksforGeeks", "https://www.geeksforgeeks.org/dsa/dsa-tutorial-learn-data-structures-and-algorithms/"],
        ["Complexidade em programação competitiva — GeeksforGeeks", "https://www.geeksforgeeks.org/dsa/knowing-the-complexity-in-competitive-programming/"]
      ]
    },
    {
      id: 6,
      slug: "aula-06-vereditos",
      title: "Erros e vereditos",
      summary: "Use AC, WA, CE, RE, TLE e MLE como pistas para investigar a solução.",
      duration: "60 min",
      activity: "verdicts",
      content: `
        <section class="band">
          <h2>O veredito é o começo da investigação</h2>
          <p>O juiz informa em qual etapa a submissão falhou. Ele raramente mostra o caso de teste escondido; por isso, você usa o tipo de erro para reduzir as hipóteses.</p>
          <div class="concept-grid">
            <article class="concept-card"><h3>Accepted — AC</h3><p>O programa compilou/executou e passou nos testes do juiz dentro dos limites.</p></article>
            <article class="concept-card"><h3>Wrong Answer — WA</h3><p>Terminou, mas produziu resposta diferente. Revise interpretação, fórmula, casos e formatação.</p></article>
            <article class="concept-card"><h3>Compilation Error — CE</h3><p>O código não pôde ser traduzido/executado. Em Python, sintaxe e indentação são causas comuns.</p></article>
            <article class="concept-card"><h3>Runtime Error — RE</h3><p>O programa começou e quebrou: índice inválido, divisão por zero ou leitura inesperada.</p></article>
            <article class="concept-card"><h3>Time Limit Exceeded — TLE</h3><p>A execução ultrapassou o tempo. Pode haver laço infinito ou algoritmo lento para os limites.</p></article>
            <article class="concept-card"><h3>Memory Limit Exceeded — MLE</h3><p>Foram armazenados mais dados do que a memória permitida.</p></article>
          </div>
          <div class="note"><strong>Presentation Error</strong> aparece em alguns juízes para diferenças de apresentação. Outros sistemas classificam a mesma situação como Wrong Answer. Os nomes não são completamente universais.</div>
        </section>
        <section class="band">
          <div class="two-col">
            <div><h2>Erro de sintaxe</h2><div class="code-shell"><div class="code-head">Python com CE</div><pre><code>if idade &gt;= 18
    print("Maior")</code></pre></div><p>Faltou <code>:</code> após a condição. Leia a última linha indicada pelo interpretador e também a linha anterior.</p></div>
            <div><h2>Erro durante a execução</h2><div class="code-shell"><div class="code-head">Python com RE</div><pre><code>numeros = [10, 20, 30]
print(numeros[10])</code></pre></div><p>A lista só possui índices 0, 1 e 2. Acesso fora desse intervalo gera <code>IndexError</code>.</p></div>
          </div>
        </section>
        <section class="band">
          <h2>Roteiro de depuração</h2>
          <ol class="steps"><li>Reproduza com um teste pequeno.</li><li>Descubra a primeira etapa em que o estado fica incorreto.</li><li>Compare tipos, limites e formato com o enunciado.</li><li>Corrija a causa, não apenas o exemplo.</li><li>Teste novamente casos diferentes antes de reenviar.</li></ol>
        </section>`,
      challenge: "O programa calcula corretamente 3.5, mas imprime “Resposta: 3.5” quando o problema exige “MEDIA = 3.5”. Qual veredito é provável e o que corrigir?",
      solution: "Provavelmente Wrong Answer. O cálculo pode estar certo, mas a saída deve usar exatamente o rótulo e a formatação solicitados: MEDIA = 3.5.",
      sources: [
        ["Explicação de vereditos — Online Judge", "https://onlinejudge.org/index.php?Itemid=31&id=16&option=com_content&task=view"],
        ["Guia introdutório — Princeton Competitive Programming", "https://competitive-programming.cs.princeton.edu/intro_guide"]
      ]
    },
    {
      id: 7,
      slug: "aula-07-boca",
      title: "BOCA e submissões",
      summary: "Acompanhe o caminho do arquivo enviado até o julgamento e o placar.",
      duration: "45 min",
      activity: "boca",
      content: `
        <section class="band">
          <h2>O sistema que organiza a competição</h2>
          <p>BOCA é um sistema de administração de competições. Ele reúne cadastro, problemas, envio de código, filas de julgamento, respostas às equipes e placar. Em eventos da Maratona SBC, a interface e as configurações podem ser preparadas pela organização da edição.</p>
          <div class="flow"><span class="flow-step">arquivo .py</span><span class="flow-arrow">→</span><span class="flow-step">submissão</span><span class="flow-arrow">→</span><span class="flow-step">fila do juiz</span><span class="flow-arrow">→</span><span class="flow-step">testes</span><span class="flow-arrow">→</span><span class="flow-step">veredito</span><span class="flow-arrow">→</span><span class="flow-step">placar</span></div>
          <div class="warning"><strong>Antes de enviar:</strong> confira o problema selecionado, a linguagem e o arquivo. Um código correto submetido para a questão errada não resolve a questão certa.</div>
        </section>
        <section class="band">
          <h2>Competição e treinamento não são a mesma experiência</h2>
          <div class="table-wrap"><table><thead><tr><th>Plataforma</th><th>Uso típico</th><th>Característica</th></tr></thead><tbody><tr><td>BOCA</td><td>administração de uma competição</td><td>submissões, julgamento, clarificações e placar do evento</td></tr><tr><td>beecrowd</td><td>treinamento e competições</td><td>grande catálogo, categorias e histórico pessoal</td></tr><tr><td>Codeforces</td><td>rodadas frequentes</td><td>rating, hacks e editoriais comunitários</td></tr><tr><td>HackerRank</td><td>prática e avaliações</td><td>trilhas e ambientes guiados</td></tr><tr><td>LeetCode</td><td>algoritmos e entrevistas</td><td>listas temáticas e competições individuais</td></tr></tbody></table></div>
          <p class="success"><strong>Neste curso, o beecrowd será o campo de treino principal.</strong> O BOCA aparece para que você reconheça o fluxo de uma competição organizada nesse sistema.</p>
        </section>
        <section class="band"><h2>Placar congelado</h2><p>Algumas competições ocultam parte das submissões perto do final. A equipe continua recebendo seu próprio feedback, mas o placar público pode não revelar novas soluções até a cerimônia. Quando isso existir, o regulamento informa o comportamento.</p></section>`,
      challenge: "Você recebeu WA. O que deve fazer antes de enviar o mesmo arquivo novamente? Liste pelo menos três verificações.",
      solution: "Reproduzir com testes próprios; conferir formato da saída; revisar casos de borda e condições; confirmar problema, linguagem e arquivo. Reenviar sem nenhuma mudança apenas repete a evidência já obtida.",
      sources: [
        ["Repositório do BOCA", "https://github.com/cassiopc/boca/"],
        ["Página do BOCA — IME-USP", "https://www.ime.usp.br/~cassio/boca/"],
        ["beecrowd Judge", "https://judge.beecrowd.com/pt"]
      ]
    },
    {
      id: 8,
      slug: "aula-08-linguagens",
      title: "Linguagens de programação",
      summary: "Compare C, C++, Java e Python sem perder o foco principal: resolver problemas.",
      duration: "45 min",
      activity: "languages",
      content: `
        <section class="band">
          <h2>Uma ideia, diferentes ferramentas</h2>
          <p>O algoritmo é o plano; a linguagem é a forma de expressá-lo. Competições definem quais linguagens aceitam e podem aplicar limites diferentes. Nas regras regionais do ICPC, o conjunto oferecido deve incluir linguagens como C, C++, Java, Kotlin e Python 3, mas a lista concreta precisa ser confirmada na edição.</p>
          <div class="table-wrap"><table><thead><tr><th>Linguagem</th><th>Pontos fortes</th><th>Atenção</th></tr></thead><tbody><tr><td>C</td><td>desempenho e controle</td><td>menos estruturas prontas e gerenciamento mais manual</td></tr><tr><td>C++</td><td>muito rápido e STL ampla</td><td>sintaxe e detalhes de tipos podem exigir mais cuidado</td></tr><tr><td>Java</td><td>biblioteca sólida e tipagem forte</td><td>código costuma ser mais verboso</td></tr><tr><td>Python 3</td><td>leitura simples e implementação rápida</td><td>alguns algoritmos pesados exigem atenção ao desempenho</td></tr></tbody></table></div>
        </section>
        <section class="band">
          <div class="two-col"><div><h2>Por que começar com Python 3?</h2><p>A sintaxe curta permite observar a ideia sem carregar tantos detalhes da linguagem. Isso ajuda a treinar interpretação, variáveis, decisões, laços e estruturas.</p></div><div><h2>O que Python não substitui?</h2><p>Uma linguagem confortável não corrige algoritmo errado. Se uma solução realiza operações demais, trocar apenas a sintaxe raramente resolve o problema.</p></div></div>
          <div class="success"><strong>Nosso foco inicial:</strong> construir soluções corretas e explicáveis. Discussões profundas de otimização e escolha de linguagem entram quando os problemas exigirem.</div>
        </section>`,
      challenge: "Explique por que “Python é mais curto” não significa “qualquer solução em Python será rápida o suficiente”.",
      solution: "O tempo depende principalmente do algoritmo e do tamanho da entrada. Um programa curto pode repetir trabalho demais; uma implementação maior pode usar um método muito mais eficiente.",
      sources: [
        ["Linguagens nas regras regionais — ICPC", "https://icpc.global/regionals/rules/"],
        ["Tutorial completo de Python — GeeksforGeeks", "https://www.geeksforgeeks.org/python/python-programming-language-tutorial/"]
      ]
    },
    {
      id: 9,
      slug: "aula-09-python-basico",
      title: "Primeiros passos com Python",
      summary: "Execute o primeiro programa, crie variáveis e use operadores para transformar dados.",
      duration: "65 min",
      activity: "calculator",
      content: `
        <section class="band">
          <h2>Seu primeiro resultado</h2>
          <div class="code-shell"><div class="code-head">Python 3</div><pre><code>print("Hello World!")</code></pre></div>
          <p><code>print</code> envia um valor para a saída. O texto entre aspas é uma <em>string</em>. Ao executar, Python lê a instrução e produz exatamente <code>Hello World!</code>.</p>
          <div class="warning"><strong>Na competição:</strong> não acrescente frases como “A resposta é”. Imprima somente o formato pedido.</div>
        </section>
        <section class="band">
          <h2>Variáveis guardam valores com nomes</h2>
          <div class="code-shell"><div class="code-head">Tipos básicos</div><pre><code>nome = "Ana"       # str
idade = 20         # int
altura = 1.70      # float
classificada = True  # bool</code></pre></div>
          <div class="concept-grid"><article class="concept-card"><h3>str</h3><p>Texto: nomes, frases e caracteres.</p></article><article class="concept-card"><h3>int</h3><p>Número inteiro, sem parte decimal.</p></article><article class="concept-card"><h3>float</h3><p>Número com parte decimal, escrito com ponto.</p></article><article class="concept-card"><h3>bool</h3><p>Valor lógico: <code>True</code> ou <code>False</code>.</p></article></div>
        </section>
        <section class="band">
          <h2>Operações que aparecem em problemas</h2>
          <div class="table-wrap"><table><thead><tr><th>Operador</th><th>Ação</th><th>Exemplo</th><th>Resultado</th></tr></thead><tbody><tr><td>+</td><td>soma</td><td>7 + 3</td><td>10</td></tr><tr><td>-</td><td>subtração</td><td>7 - 3</td><td>4</td></tr><tr><td>*</td><td>produto</td><td>7 * 3</td><td>21</td></tr><tr><td>/</td><td>divisão real</td><td>7 / 2</td><td>3.5</td></tr><tr><td>//</td><td>divisão inteira</td><td>7 // 2</td><td>3</td></tr><tr><td>%</td><td>resto</td><td>7 % 2</td><td>1</td></tr><tr><td>**</td><td>potência</td><td>2 ** 3</td><td>8</td></tr></tbody></table></div>
          <p class="note"><strong>Exemplo de maratona:</strong> <code>numero % 2</code> é zero quando o inteiro é par. O resto transforma uma propriedade matemática em uma verificação programável.</p>
        </section>`,
      challenge: "Crie, no papel, variáveis para quantidade de produtos e preço unitário. Qual expressão calcula o total? Qual tipo combina com cada valor?",
      solution: "Por exemplo: quantidade = 3 (int), preco = 12.50 (float) e total = quantidade * preco (float).",
      sources: [
        ["Tutorial de Python — GeeksforGeeks", "https://www.geeksforgeeks.org/python/python-programming-language-tutorial/"],
        ["Operadores em Python — GeeksforGeeks", "https://www.geeksforgeeks.org/python-operators/"]
      ]
    },
    {
      id: 10,
      slug: "aula-10-input-output",
      title: "Input e output",
      summary: "Desmonte input, split, map e formatação até cada valor chegar à variável correta.",
      duration: "80 min",
      activity: "input",
      content: `
        <section class="band">
          <h2>O programa precisa receber os dados do caso</h2>
          <div class="code-shell"><div class="code-head">Ler e repetir um texto</div><pre><code>nome = input()
print(nome)</code></pre></div>
          <p><code>input()</code> lê uma linha da entrada e devolve texto. Mesmo que a pessoa digite <code>20</code>, o valor inicial é a string <code>"20"</code>. Para fazer contas inteiras, convertemos:</p>
          <div class="code-shell"><div class="code-head">Conversão</div><pre><code>idade = int(input())</code></pre></div>
        </section>
        <section class="band">
          <h2>Dois valores em linhas diferentes</h2>
          <div class="two-col"><div class="code-shell"><div class="code-head">Entrada</div><pre><code>10
20</code></pre></div><div class="code-shell"><div class="code-head">Código</div><pre><code>a = int(input())
b = int(input())

print(a + b)</code></pre></div></div>
          <p>A primeira chamada consome a primeira linha; a segunda consome a próxima. Cada string é convertida para inteiro antes da soma.</p>
        </section>
        <section class="band">
          <h2>Dois valores na mesma linha</h2>
          <div class="code-shell"><div class="code-head">Leitura competitiva comum</div><pre><code>a, b = map(int, input().split())</code></pre></div>
          <div class="trace"><div class="trace-row"><span class="trace-number">1</span><div class="trace-copy"><code>input()</code> lê a linha e produz <code>"10 20"</code>.</div></div><div class="trace-row"><span class="trace-number">2</span><div class="trace-copy"><code>split()</code> separa nos espaços: <code>["10", "20"]</code>.</div></div><div class="trace-row"><span class="trace-number">3</span><div class="trace-copy"><code>map(int, ...)</code> converte cada parte: <code>10</code> e <code>20</code>.</div></div><div class="trace-row"><span class="trace-number">4</span><div class="trace-copy">A atribuição múltipla coloca <code>10</code> em <code>a</code> e <code>20</code> em <code>b</code>.</div></div></div>
          <p>Quando queremos guardar uma quantidade variável de números, construímos uma lista:</p>
          <div class="code-shell"><div class="code-head">Linha inteira em uma lista</div><pre><code>numeros = list(map(int, input().split()))</code></pre></div>
        </section>
        <section class="band">
          <h2>Saída exata</h2>
          <div class="code-shell"><div class="code-head">f-string</div><pre><code>resultado = 19
print(f"X = {resultado}")</code></pre></div>
          <p>A letra <code>f</code> permite inserir o valor de uma variável entre chaves. A saída será <code>X = 19</code>.</p>
          <div class="warning"><strong>Mesmo cálculo, resposta errada:</strong> se o esperado é <code>X = 19</code> e você imprime <code>Resultado: 19</code>, o juiz pode retornar Wrong Answer.</div>
          <div class="note"><strong>Decimais:</strong> <code>print(f"{media:.2f}")</code> imprime duas casas. O enunciado decide quantas usar.</div>
        </section>
        <section class="band">
          <h2>Erro clássico: concatenar textos</h2>
          <div class="two-col"><div class="code-shell"><div class="code-head">Incorreto para soma</div><pre><code>a = input()
b = input()
print(a + b)</code></pre></div><div><p>Com entradas <code>10</code> e <code>20</code>, as variáveis guardam textos. Somar strings significa juntar: o resultado é <code>1020</code>.</p><p>Converta com <code>int</code> para obter <code>30</code>.</p></div></div>
        </section>`,
      challenge: "A entrada possui três preços na mesma linha. Escreva a leitura que os coloca em a, b e c como float e uma saída com o total em duas casas decimais.",
      solution: "a, b, c = map(float, input().split())\ntotal = a + b + c\nprint(f\"{total:.2f}\")",
      sources: [
        ["Métodos de entrada em Python competitivo — GeeksforGeeks", "https://www.geeksforgeeks.org/competitive-programming/python-input-methods-competitive-programming/"],
        ["Entrada e saída em Python — documentação oficial", "https://docs.python.org/3/tutorial/inputoutput.html"]
      ]
    },
    {
      id: 11,
      slug: "aula-11-primeiros-problemas",
      title: "Primeiros problemas do beecrowd",
      summary: "Transforme fórmulas simples em programas aceitos, com leitura e saída exatas.",
      duration: "90 min",
      activity: "problems-basic",
      content: `
        <section class="band">
          <h2>Agora o enunciado vira submissão</h2>
          <p>Os primeiros exercícios isolam habilidades pequenas: imprimir um texto, ler números, aplicar uma fórmula e formatar a resposta. Parece simples, e justamente por isso é um ótimo treino de disciplina.</p>
          <ol class="steps"><li>Abra o problema original e localize entrada e saída.</li><li>Resolva o exemplo manualmente.</li><li>Escreva um algoritmo em frases.</li><li>Implemente sem mensagens extras.</li><li>Teste e só então submeta.</li></ol>
          <div class="success"><strong>Meta da aula:</strong> concluir a Lista 01. Cada cartão leva a uma página com raciocínio, código, teste de mesa e erros comuns.</div>
        </section>
        <section class="band">
          <h2>Exemplo: soma simples</h2>
          <div class="two-col"><div><p>Se os valores chegam em linhas separadas, fazemos duas leituras. Depois calculamos e imprimimos com o rótulo exato.</p><ol class="steps"><li>Ler A.</li><li>Ler B.</li><li>Calcular A + B.</li><li>Mostrar X.</li></ol></div><div class="code-shell"><div class="code-head">Estrutura didática</div><pre><code>a = int(input())
b = int(input())

x = a + b

print(f"X = {x}")</code></pre></div></div>
        </section>
        <section class="band"><h2>Três perguntas antes de codificar</h2><div class="concept-grid"><article class="concept-card"><h3>Qual é o tipo?</h3><p>Inteiro, decimal ou texto? A escolha determina <code>int</code>, <code>float</code> ou leitura direta.</p></article><article class="concept-card"><h3>Qual é a fórmula?</h3><p>Escreva com nomes de variáveis antes de traduzir para Python.</p></article><article class="concept-card"><h3>Qual é o formato?</h3><p>Rótulo, ordem, espaços e casas decimais precisam coincidir.</p></article><article class="concept-card"><h3>Que caso testa melhor?</h3><p>Além do exemplo, experimente zero, negativos quando permitidos e decimais.</p></article></div></section>`,
      challenge: "Escolha um exercício da Lista 01. Antes de abrir a solução, escreva entrada, saída e algoritmo em quatro linhas. Depois compare sua ideia, não apenas o código.",
      solution: "Não há uma única resposta: a verificação está na página de cada problema. Sua descrição deve usar apenas dados disponíveis e produzir exatamente a saída solicitada.",
      sources: [
        ["Lista de problemas iniciantes — beecrowd", "https://judge.beecrowd.com/pt/problems/index/1"],
        ["Soluções aceitas para conferência de catálogo — gabsereniski/beecrowd", "https://github.com/gabsereniski/beecrowd"],
        ["Catálogo de títulos — junioranheu/beecrowd", "https://github.com/junioranheu/beecrowd"]
      ]
    },
    {
      id: 12,
      slug: "aula-12-if",
      title: "Decisões com if",
      summary: "Faça o programa escolher caminhos com condições, comparações e operadores lógicos.",
      duration: "80 min",
      activity: "if",
      content: `
        <section class="band">
          <h2>Quando a resposta depende de uma condição</h2>
          <p>Imagine um problema que informa uma idade. A ação muda quando o valor alcança 18. Precisamos representar uma pergunta cuja resposta é verdadeira ou falsa.</p>
          <div class="code-shell"><div class="code-head">Uma decisão</div><pre><code>idade = int(input())

if idade &gt;= 18:
    print("Maior de idade")</code></pre></div>
          <p>Os dois pontos iniciam o bloco. A indentação indica quais instruções pertencem ao <code>if</code>.</p>
        </section>
        <section class="band">
          <h2>Dois ou mais caminhos</h2>
          <div class="two-col"><div class="code-shell"><div class="code-head">if e else</div><pre><code>if idade &gt;= 18:
    print("Maior de idade")
else:
    print("Menor de idade")</code></pre></div><div class="code-shell"><div class="code-head">if, elif e else</div><pre><code>if nota &gt;= 90:
    print("A")
elif nota &gt;= 70:
    print("B")
else:
    print("C")</code></pre></div></div>
          <p>Python testa de cima para baixo e executa o primeiro caminho verdadeiro. Por isso, a ordem das condições importa.</p>
        </section>
        <section class="band">
          <h2>Comparações e combinações</h2>
          <div class="table-wrap"><table><thead><tr><th>Operadores</th><th>Leitura</th><th>Exemplo</th></tr></thead><tbody><tr><td>==, !=</td><td>igual, diferente</td><td>senha == 1234</td></tr><tr><td>&gt;, &lt;</td><td>maior, menor</td><td>temperatura &lt; 0</td></tr><tr><td>&gt;=, &lt;=</td><td>maior/menor ou igual</td><td>10 &lt;= valor</td></tr><tr><td>and</td><td>as duas condições</td><td>valor &gt;= 10 and valor &lt;= 20</td></tr><tr><td>or</td><td>pelo menos uma</td><td>dia == 6 or dia == 7</td></tr><tr><td>not</td><td>nega a condição</td><td>not bloqueado</td></tr></tbody></table></div>
          <div class="warning"><strong>Igualdade usa dois sinais:</strong> <code>=</code> atribui um valor; <code>==</code> compara.</div>
        </section>
        <section class="band"><h2>Da condição ao exercício</h2><p>Na Lista 02, comece identificando os caminhos possíveis. Só depois escreva <code>if</code>, <code>elif</code> e <code>else</code>. Em intervalos, desenhe a reta e confira quais pontas são abertas ou fechadas.</p></section>`,
      challenge: "Leia um inteiro e escreva uma lógica que imprima POSITIVO, NEGATIVO ou ZERO. Em que ordem você testaria?",
      solution: "numero = int(input())\nif numero > 0:\n    print(\"POSITIVO\")\nelif numero < 0:\n    print(\"NEGATIVO\")\nelse:\n    print(\"ZERO\")",
      sources: [
        ["if, elif e else em Python — GeeksforGeeks", "https://www.geeksforgeeks.org/python/python3-if-if-else-nested-if-if-elif-statements/"],
        ["Controle de fluxo — documentação oficial Python", "https://docs.python.org/3/tutorial/controlflow.html"]
      ]
    },
    {
      id: 13,
      slug: "aula-13-for",
      title: "Repetição com for",
      summary: "Repita uma tarefa N vezes, percorra intervalos e construa contadores e acumuladores.",
      duration: "80 min",
      activity: "range",
      content: `
        <section class="band">
          <h2>Quando sabemos quantas repetições existem</h2>
          <div class="code-shell"><div class="code-head">Cinco repetições</div><pre><code>for i in range(5):
    print(i)</code></pre></div>
          <div class="flow"><span class="flow-step">i = 0</span><span class="flow-arrow">→</span><span class="flow-step">i = 1</span><span class="flow-arrow">→</span><span class="flow-step">i = 2</span><span class="flow-arrow">→</span><span class="flow-step">i = 3</span><span class="flow-arrow">→</span><span class="flow-step">i = 4</span></div>
          <p><code>range(5)</code> começa em zero e para antes de 5. O limite final não entra.</p>
        </section>
        <section class="band">
          <h2>Início, fim e passo</h2>
          <div class="table-wrap"><table><thead><tr><th>Expressão</th><th>Valores</th><th>Leitura</th></tr></thead><tbody><tr><td>range(5)</td><td>0, 1, 2, 3, 4</td><td>do zero até antes de 5</td></tr><tr><td>range(1, 6)</td><td>1, 2, 3, 4, 5</td><td>de 1 até antes de 6</td></tr><tr><td>range(0, 10, 2)</td><td>0, 2, 4, 6, 8</td><td>começa em 0 e avança de 2</td></tr></tbody></table></div>
        </section>
        <section class="band">
          <h2>Acumulador e contador</h2>
          <div class="two-col"><div class="code-shell"><div class="code-head">Somar cinco valores</div><pre><code>soma = 0

for i in range(5):
    valor = int(input())
    soma += valor

print(soma)</code></pre></div><div><p><code>soma</code> começa no elemento neutro da adição. A cada volta, incorpora o novo valor.</p><p>Um contador segue o mesmo padrão, mas normalmente acrescenta 1 apenas quando uma condição é verdadeira.</p></div></div>
          <div class="note"><strong>Perguntas para qualquer laço:</strong> o que se repete? Quantas vezes? O índice é importante? Existe um resultado acumulado?</div>
        </section>
        <section class="band"><h2>Percorrer valores e índices</h2><div class="two-col"><div class="code-shell"><div class="code-head">Valores</div><pre><code>for numero in numeros:
    print(numero)</code></pre></div><div class="code-shell"><div class="code-head">Índices</div><pre><code>for i in range(len(numeros)):
    print(i, numeros[i])</code></pre></div></div><p>Use os valores quando só interessa o conteúdo. Use índices quando a posição faz parte da resposta ou quando é necessário alterar uma célula específica.</p></section>`,
      challenge: "Leia 6 inteiros e conte quantos são positivos. Identifique a repetição, a condição e o contador antes de programar.",
      solution: "contador = 0\nfor i in range(6):\n    valor = int(input())\n    if valor > 0:\n        contador += 1\nprint(contador)",
      sources: [
        ["Laços em Python — GeeksforGeeks", "https://www.geeksforgeeks.org/python/loops-in-python/"],
        ["Função range — GeeksforGeeks", "https://www.geeksforgeeks.org/python/python-range-function/"]
      ]
    },
    {
      id: 14,
      slug: "aula-14-while",
      title: "Repetição com while",
      summary: "Repita enquanto uma condição for verdadeira, pule uma volta com continue e encerre o laço com break.",
      duration: "80 min",
      activity: "while",
      content: `
        <section class="band">
          <h2>Quando a condição controla a duração</h2>
          <div class="code-shell"><div class="code-head">Contagem controlada</div><pre><code>numero = 1

while numero &lt;= 5:
    print(numero)
    numero += 1</code></pre></div>
          <p>Antes de cada repetição, Python testa <code>numero &lt;= 5</code>. A atualização <code>numero += 1</code> aproxima o estado do fim.</p>
          <div class="warning"><strong>Laço infinito:</strong> se a condição nunca se tornar falsa, o programa não termina e pode receber TLE.</div>
        </section>
        <section class="band">
          <h2>Valor sentinela</h2>
          <p>Às vezes não sabemos quantos valores virão. O enunciado reserva um valor especial para indicar o fim, como zero.</p>
          <div class="code-shell"><div class="code-head">Ler até zero</div><pre><code>while True:
    numero = int(input())

    if numero == 0:
        break

    print(numero)</code></pre></div>
          <p><code>break</code> encerra imediatamente o laço atual. Nenhuma repetição seguinte acontece, mesmo que ainda existam dados.</p>
        </section>
        <section class="band">
          <h2>continue: pule somente a volta atual</h2>
          <p><code>continue</code> não encerra o laço. Ele interrompe apenas a repetição atual e volta ao teste da condição. É útil quando um valor deve ser ignorado, mas os próximos ainda precisam ser processados.</p>
          <div class="two-col">
            <div class="code-shell"><div class="code-head">Ignorar valores negativos</div><pre><code>numero = 0

while numero &lt; 5:
    numero += 1

    if numero == 3:
        continue

    print(numero)</code></pre></div>
            <div>
              <h3>Fluxo da execução</h3>
              <div class="flow"><span class="flow-step">1 imprime</span><span class="flow-arrow">→</span><span class="flow-step">2 imprime</span><span class="flow-arrow">→</span><span class="flow-step active">3 pula</span><span class="flow-arrow">→</span><span class="flow-step">4 imprime</span><span class="flow-arrow">→</span><span class="flow-step">5 imprime</span></div>
              <p>Quando <code>numero == 3</code>, Python encontra <code>continue</code> e não executa o <code>print</code> daquela volta. Depois testa novamente a condição do <code>while</code>.</p>
            </div>
          </div>
          <div class="warning"><strong>Atualize antes de continuar:</strong> se a variável que controla o <code>while</code> for atualizada somente depois de <code>continue</code>, ela pode ficar presa no mesmo valor e criar um laço infinito.</div>
        </section>
        <section class="band">
          <h2>break e continue não fazem a mesma coisa</h2>
          <div class="table-wrap"><table><thead><tr><th>Comando</th><th>O que interrompe?</th><th>O laço continua?</th><th>Uso comum</th></tr></thead><tbody><tr><td><code>continue</code></td><td>Somente a volta atual</td><td>Sim, volta à condição</td><td>Ignorar um dado inválido</td></tr><tr><td><code>break</code></td><td>O laço inteiro</td><td>Não</td><td>Encontrar sentinela ou resposta</td></tr></tbody></table></div>
          <div class="code-shell"><div class="code-head">Usando os dois comandos</div><pre><code>while True:
    numero = int(input())

    if numero == 0:
        break

    if numero &lt; 0:
        continue

    print(numero)</code></pre></div>
          <p>Nesse exemplo, zero encerra tudo; um negativo é ignorado; um positivo chega ao <code>print</code>.</p>
        </section>
        <section class="band">
          <h2>for ou while?</h2>
          <div class="concept-grid"><article class="concept-card"><h3>Use for</h3><p>Quando o número de repetições é conhecido ou quando percorremos uma sequência.</p></article><article class="concept-card"><h3>Use while</h3><p>Quando a repetição depende de uma condição que muda durante o processo.</p></article></div>
          <div class="note"><strong>Os dois são repetição.</strong> A escolha comunica melhor a estrutura do problema; não existe busca DFS ou BFS envolvida aqui.</div>
        </section>`,
      challenge: "Leia inteiros até aparecer -1. Ignore valores negativos diferentes de -1 e some apenas os valores não negativos. Use break e continue.",
      solution: "soma = 0\n\nwhile True:\n    valor = int(input())\n\n    if valor == -1:\n        break\n\n    if valor < 0:\n        continue\n\n    soma += valor\n\nprint(soma)",
      sources: [
        ["Laços em Python — GeeksforGeeks", "https://www.geeksforgeeks.org/python/loops-in-python/"],
        ["break e continue — documentação Python", "https://docs.python.org/3/tutorial/controlflow.html#break-and-continue-statements"]
      ]
    },
    {
      id: 15,
      slug: "aula-15-listas",
      title: "Listas e vetores",
      summary: "Armazene vários valores, acesse posições e percorra dados para encontrar respostas.",
      duration: "85 min",
      activity: "list",
      content: `
        <section class="band">
          <h2>Por que guardar vários valores?</h2>
          <p>Se o problema pede apenas a soma, podemos acumular durante a leitura. Mas, se depois precisamos consultar posições, inverter a ordem ou encontrar o índice do menor valor, é útil armazenar a sequência.</p>
          <div class="code-shell"><div class="code-head">Uma lista Python</div><pre><code>numeros = [10, 20, 30, 40]</code></pre></div>
          <div class="table-wrap"><table><thead><tr><th>Índice</th><th>0</th><th>1</th><th>2</th><th>3</th></tr></thead><tbody><tr><td>Valor</td><td>10</td><td>20</td><td>30</td><td>40</td></tr></tbody></table></div>
          <p>O primeiro índice é zero. <code>numeros[0]</code> vale 10; <code>numeros[3]</code> vale 40.</p>
        </section>
        <section class="band">
          <h2>Operações essenciais</h2>
          <div class="concept-grid"><article class="concept-card"><h3>len(numeros)</h3><p>Quantidade de elementos.</p></article><article class="concept-card"><h3>append(50)</h3><p>Adiciona 50 ao final.</p></article><article class="concept-card"><h3>sum(numeros)</h3><p>Soma os valores numéricos.</p></article><article class="concept-card"><h3>min e max</h3><p>Retornam menor e maior valor.</p></article></div>
        </section>
        <section class="band">
          <h2>Ler e percorrer</h2>
          <div class="code-shell"><div class="code-head">Uma linha de inteiros</div><pre><code>numeros = list(map(int, input().split()))

for numero in numeros:
    print(numero)</code></pre></div>
          <p>Se a resposta pede a posição, percorra os índices:</p>
          <div class="code-shell"><div class="code-head">Índice e valor</div><pre><code>for i in range(len(numeros)):
    print(i, numeros[i])</code></pre></div>
          <div class="warning"><strong>Índice inválido:</strong> em uma lista de tamanho 4, os índices válidos vão de 0 a 3. Tentar acessar 4 causa Runtime Error.</div>
        </section>
        <section class="band"><h2>Lista Python e array</h2><p>Em cursos introdutórios, “vetor” costuma significar uma sequência indexada de tamanho definido. A <code>list</code> de Python também é indexada, mas pode crescer e guardar referências a objetos. Para os problemas desta etapa, ela cumpre o papel prático do vetor.</p><p class="note"><strong>Não há campo “próximo” em cada posição.</strong> Isso pertence a uma lista encadeada, outra estrutura. Aqui acessamos células por índice.</p></section>`,
      challenge: "Dada a lista [8, 3, 9, 3], encontre o menor valor e a primeira posição em que ele aparece sem usar index().",
      solution: "menor = numeros[0]\nposicao = 0\nfor i in range(1, len(numeros)):\n    if numeros[i] < menor:\n        menor = numeros[i]\n        posicao = i",
      sources: [
        ["Listas em Python — GeeksforGeeks", "https://www.geeksforgeeks.org/python/python-lists/"],
        ["Estruturas de dados — documentação Python", "https://docs.python.org/3/tutorial/datastructures.html"]
      ]
    },
    {
      id: 16,
      slug: "aula-16-strings",
      title: "Strings",
      summary: "Observe texto como sequência de caracteres e pratique índices, limpeza e transformação.",
      duration: "75 min",
      activity: "string",
      content: `
        <section class="band">
          <h2>Uma sequência de caracteres</h2>
          <div class="code-shell"><div class="code-head">Texto</div><pre><code>texto = "Maratona"</code></pre></div>
          <div class="table-wrap"><table><thead><tr><th>Índice</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th></tr></thead><tbody><tr><td>Caractere</td><td>M</td><td>a</td><td>r</td><td>a</td><td>t</td><td>o</td><td>n</td><td>a</td></tr></tbody></table></div>
          <p><code>texto[0]</code> devolve <code>M</code>. Como listas, strings usam índice inicial zero. Diferentemente das listas, strings não podem ter um caractere alterado diretamente.</p>
        </section>
        <section class="band">
          <h2>Percorrer e transformar</h2>
          <div class="two-col"><div class="code-shell"><div class="code-head">Caractere por caractere</div><pre><code>for letra in texto:
    print(letra)</code></pre></div><div class="concept-grid"><article class="concept-card"><h3>len(texto)</h3><p>Quantidade de caracteres.</p></article><article class="concept-card"><h3>lower() / upper()</h3><p>Cria texto em minúsculas ou maiúsculas.</p></article><article class="concept-card"><h3>strip()</h3><p>Remove espaços e quebras nas pontas.</p></article><article class="concept-card"><h3>split()</h3><p>Separa em partes e produz uma lista.</p></article></div></div>
        </section>
        <section class="band">
          <h2>Padrões frequentes</h2>
          <ul class="clean-list"><li><strong>Contagem:</strong> percorrer caracteres e aumentar um contador quando há correspondência.</li><li><strong>Normalização:</strong> usar <code>lower()</code> para comparar sem diferenciar maiúsculas.</li><li><strong>Reconstrução:</strong> produzir uma nova string com caracteres transformados.</li><li><strong>Palavras:</strong> usar <code>split()</code> quando espaços separam unidades.</li></ul>
          <div class="note"><strong>Nos exercícios:</strong> espaços podem fazer parte da entrada. Leia com <code>input()</code> e só use <code>split()</code> quando realmente quiser separar palavras.</div>
        </section>
        <section class="band">
          <h2>Recortes e métodos úteis</h2>
          <div class="concept-grid"><article class="concept-card"><h3>texto[inicio:fim]</h3><p>Cria um recorte do início até antes do fim. <code>texto[:4]</code> pega os quatro primeiros caracteres.</p></article><article class="concept-card"><h3>texto[::-1]</h3><p>Usa passo -1 para criar uma cópia invertida.</p></article><article class="concept-card"><h3>replace(a, b)</h3><p>Cria uma string trocando ocorrências de <code>a</code> por <code>b</code>.</p></article><article class="concept-card"><h3>isalpha()</h3><p>Informa se o caractere é uma letra; ajuda a preservar espaços e sinais.</p></article></div>
          <p><code>lstrip("0")</code> remove zeros somente do início. Isso é diferente de <code>strip()</code>, que sem argumento remove espaços nas duas pontas.</p>
        </section>`,
      challenge: "Conte quantas letras 'a' aparecem em uma linha, considerando A e a equivalentes.",
      solution: "texto = input().lower()\ncontador = 0\nfor letra in texto:\n    if letra == \"a\":\n        contador += 1\nprint(contador)",
      sources: [
        ["Strings em Python — GeeksforGeeks", "https://www.geeksforgeeks.org/python/python-string/"],
        ["Métodos de string — documentação Python", "https://docs.python.org/3/library/stdtypes.html#string-methods"]
      ]
    },
    {
      id: 17,
      slug: "aula-17-funcoes",
      title: "Funções: parâmetros, retorno e organização",
      summary: "Crie funções, passe argumentos, devolva resultados e divida o algoritmo em responsabilidades claras.",
      duration: "95 min",
      activity: "function",
      content: `
        <section class="band">
          <h2>Uma parte do algoritmo com nome</h2>
          <div class="code-shell"><div class="code-head">Definir e chamar</div><pre><code>def soma(a, b):
    return a + b

resultado = soma(10, 20)
print(resultado)</code></pre></div>
          <div class="trace"><div class="trace-row"><span class="trace-number">1</span><div class="trace-copy"><code>def</code> define a função chamada <code>soma</code>.</div></div><div class="trace-row"><span class="trace-number">2</span><div class="trace-copy"><code>a</code> e <code>b</code> são parâmetros: nomes usados dentro da função.</div></div><div class="trace-row"><span class="trace-number">3</span><div class="trace-copy"><code>soma(10, 20)</code> chama a função com dois argumentos.</div></div><div class="trace-row"><span class="trace-number">4</span><div class="trace-copy"><code>return</code> devolve 30 para a expressão da chamada.</div></div></div>
        </section>
        <section class="band">
          <h2>Parâmetro e argumento</h2>
          <div class="concept-grid">
            <article class="concept-card"><h3>Parâmetro</h3><p>É o nome escrito na definição. Em <code>def dobro(numero)</code>, <code>numero</code> é o parâmetro usado dentro da função.</p></article>
            <article class="concept-card"><h3>Argumento</h3><p>É o valor enviado na chamada. Em <code>dobro(7)</code>, o número 7 é o argumento recebido por <code>numero</code>.</p></article>
          </div>
          <div class="flow"><span class="flow-step">dobro(7)</span><span class="flow-arrow">→</span><span class="flow-step active">numero = 7</span><span class="flow-arrow">→</span><span class="flow-step">return 14</span></div>
        </section>
        <section class="band">
          <h2>return não é print</h2>
          <div class="two-col">
            <div class="code-shell"><div class="code-head">Devolver para reutilizar</div><pre><code>def quadrado(numero):
    return numero * numero

resultado = quadrado(5)
print(resultado + 10)</code></pre></div>
            <div class="code-shell"><div class="code-head">Apenas mostrar na tela</div><pre><code>def mostrar_quadrado(numero):
    print(numero * numero)

resultado = mostrar_quadrado(5)
print(resultado)</code></pre></div>
          </div>
          <div class="table-wrap"><table><thead><tr><th>Comando</th><th>Efeito</th><th>Pode ser usado em outro cálculo?</th></tr></thead><tbody><tr><td><code>return</code></td><td>Encerra a função e entrega um valor à chamada</td><td>Sim</td></tr><tr><td><code>print</code></td><td>Escreve um valor na saída</td><td>Não; sozinho retorna <code>None</code></td></tr></tbody></table></div>
        </section>
        <section class="band">
          <h2>Mais de um caminho pode retornar</h2>
          <div class="code-shell"><div class="code-head">Função que responde True ou False</div><pre><code>def eh_par(numero):
    if numero % 2 == 0:
        return True

    return False

valor = int(input())

if eh_par(valor):
    print("par")
else:
    print("ímpar")</code></pre></div>
          <p>Assim que um <code>return</code> é executado, a função termina. Se o número for par, o segundo <code>return</code> nem é alcançado.</p>
        </section>
        <section class="band">
          <h2>Valores padrão e argumentos nomeados</h2>
          <div class="code-shell"><div class="code-head">Um parâmetro opcional</div><pre><code>def saudacao(nome, mensagem="Olá"):
    return f"{mensagem}, {nome}!"

print(saudacao("Ana"))
print(saudacao("Bia", "Bom dia"))
print(saudacao(nome="Caio", mensagem="Bem-vindo"))</code></pre></div>
          <ul class="clean-list"><li><strong>Valor padrão:</strong> permite omitir um argumento quando existe uma escolha comum.</li><li><strong>Argumento nomeado:</strong> deixa explícito qual parâmetro recebe cada valor.</li><li><strong>Ordem:</strong> parâmetros sem valor padrão devem aparecer antes dos parâmetros opcionais.</li></ul>
        </section>
        <section class="band">
          <h2>Escopo: variáveis locais pertencem à chamada</h2>
          <div class="code-shell"><div class="code-head">Variável local</div><pre><code>def calcular_total(preco, quantidade):
    total = preco * quantidade
    return total

resposta = calcular_total(12.5, 4)
print(resposta)</code></pre></div>
          <p><code>total</code> existe dentro da função. Fora dela, usamos o valor devolvido e guardado em <code>resposta</code>. Essa separação reduz alterações acidentais em outras partes do programa.</p>
          <div class="warning"><strong>Evite depender de variáveis globais sem necessidade.</strong> Prefira receber dados por parâmetros e devolver a resposta com <code>return</code>.</div>
        </section>
        <section class="band">
          <h2>Quando uma função ajuda</h2>
          <div class="concept-grid"><article class="concept-card"><h3>Reutilização</h3><p>A mesma regra é aplicada em vários pontos.</p></article><article class="concept-card"><h3>Leitura</h3><p>Um nome como <code>eh_par</code> comunica a intenção.</p></article><article class="concept-card"><h3>Teste</h3><p>Uma etapa pequena pode ser verificada isoladamente.</p></article><article class="concept-card"><h3>Organização</h3><p>Soluções maiores ganham blocos com responsabilidades claras.</p></article></div>
          <div class="warning"><strong>Função não é decoração:</strong> criar muitas funções minúsculas sem propósito pode tornar o fluxo mais difícil. Separe etapas que tenham uma ideia própria.</div>
        </section>
        <section class="band">
          <h2>O que você já consegue combinar</h2>
          <ul class="clean-list"><li>Ler números e textos no formato da entrada.</li><li>Calcular com variáveis e operadores.</li><li>Escolher caminhos com <code>if</code>.</li><li>Repetir com <code>for</code> e <code>while</code>.</li><li>Armazenar e percorrer listas e strings.</li><li>Organizar regras em funções.</li><li>Testar, interpretar vereditos e corrigir.</li></ul>
          <p class="success"><strong>Próxima meta:</strong> antes de programar uma solução maior, escreva os nomes das etapas. As etapas com entrada, regra e resultado próprios podem se tornar funções.</p>
        </section>
        <section class="band">
          <h2>Exercícios guiados</h2>
          <div class="concept-grid">
            <article class="concept-card"><h3>1. Dobro</h3><p>Crie <code>dobro(numero)</code> e devolva duas vezes o argumento.</p><details class="solution"><summary>Conferir</summary><div><pre><code>def dobro(numero):
    return numero * 2</code></pre></div></details></article>
            <article class="concept-card"><h3>2. Maior</h3><p>Crie <code>maior(a, b)</code> e devolva o maior valor.</p><details class="solution"><summary>Conferir</summary><div><pre><code>def maior(a, b):
    if a &gt; b:
        return a
    return b</code></pre></div></details></article>
            <article class="concept-card"><h3>3. Positivo</h3><p>Crie <code>eh_positivo(numero)</code> e devolva um booleano.</p><details class="solution"><summary>Conferir</summary><div><pre><code>def eh_positivo(numero):
    return numero &gt; 0</code></pre></div></details></article>
            <article class="concept-card"><h3>4. Média</h3><p>Crie <code>media(valores)</code> para uma lista não vazia.</p><details class="solution"><summary>Conferir</summary><div><pre><code>def media(valores):
    return sum(valores) / len(valores)</code></pre></div></details></article>
          </div>
        </section>`,
      challenge: "Crie uma função media(notas) que devolva a média da lista e uma função aprovado(media_final) que devolva True quando a média for pelo menos 6. Leia as notas de uma linha e mostre a média e a situação.",
      solution: "def media(notas):\n    return sum(notas) / len(notas)\n\ndef aprovado(media_final):\n    return media_final >= 6\n\nnotas = list(map(float, input().split()))\nmedia_final = media(notas)\n\nprint(f\"{media_final:.2f}\")\n\nif aprovado(media_final):\n    print(\"APROVADO\")\nelse:\n    print(\"REPROVADO\")",
      sources: [
        ["Funções em Python — GeeksforGeeks", "https://www.geeksforgeeks.org/python/python-functions/"],
        ["Definindo funções — documentação Python", "https://docs.python.org/3/tutorial/controlflow.html#defining-functions"]
      ]
    },
    {
      id: 18,
      slug: "aula-18-matematica-estatistica",
      title: "Matemática e estatística com Python",
      summary: "Transforme fórmulas e conjuntos de dados em algoritmos para calcular porcentagens, médias, mediana, moda e amplitude.",
      duration: "90 min",
      activity: "statistics",
      content: `
        <section class="band">
          <div class="two-col">
            <div>
              <h2>Números também contam uma história</h2>
              <p>Em muitos problemas, não basta guardar os valores: precisamos resumir o conjunto. Uma turma pode ter várias notas, uma loja pode registrar vários preços e uma competição pode produzir vários tempos. A estatística descritiva ajuda a responder perguntas como “qual é o centro?”, “qual valor mais aparece?” e “qual é a distância entre os extremos?”.</p>
              <p>Nesta aula trabalharemos apenas com <strong>estatística descritiva introdutória</strong>. Não estamos tentando prever o futuro nem calcular probabilidades; estamos descrevendo os dados que já recebemos.</p>
            </div>
            <div class="concept-card">
              <h3>Dados: 5, 6, 6, 7, 30</h3>
              <div class="stats-grid compact">
                <div class="stat-card"><span>Média</span><strong>10,8</strong></div>
                <div class="stat-card"><span>Mediana</span><strong>6</strong></div>
                <div class="stat-card"><span>Moda</span><strong>6</strong></div>
                <div class="stat-card"><span>Amplitude</span><strong>25</strong></div>
              </div>
              <p>O valor 30 puxa a média para cima, mas não altera a posição central. Por isso, medidas diferentes podem contar partes diferentes da mesma história.</p>
            </div>
          </div>
        </section>

        <section class="band">
          <h2>Ferramentas matemáticas frequentes</h2>
          <div class="table-wrap"><table><thead><tr><th>Ideia</th><th>Fórmula</th><th>Em Python</th><th>Exemplo</th></tr></thead><tbody>
            <tr><td>Porcentagem</td><td>valor × taxa / 100</td><td><code>valor * taxa / 100</code></td><td>20% de 150 = 30</td></tr>
            <tr><td>Proporção</td><td>parte / total</td><td><code>parte / total</code></td><td>15 de 60 = 0,25</td></tr>
            <tr><td>Variação percentual</td><td>(novo - antigo) / antigo × 100</td><td><code>(novo - antigo) / antigo * 100</code></td><td>80 para 100 = 25%</td></tr>
            <tr><td>Quociente e resto</td><td>divisão inteira e sobra</td><td><code>a // b</code> e <code>a % b</code></td><td>17 = 3 × 5 + 2</td></tr>
          </tbody></table></div>
          <div class="warning"><strong>Divisão exige atenção:</strong> não existe divisão por zero. Em uma média, isso significa que a lista de dados não pode estar vazia. Na variação percentual, o valor antigo também precisa ser diferente de zero.</div>
        </section>

        <section class="band">
          <h2>Média aritmética: soma dividida pela quantidade</h2>
          <p>Para os valores 6, 7, 8 e 9, somamos 30 e dividimos pela quantidade 4. A média é 7,5.</p>
          <div class="code-shell"><div class="code-head">Média de uma lista</div><pre><code>valores = list(map(float, input().split()))

media = sum(valores) / len(valores)

print(f"{media:.2f}")</code></pre></div>
          <div class="trace"><div class="trace-row"><span class="trace-number">1</span><div class="trace-copy"><code>sum(valores)</code> acumula todos os dados.</div></div><div class="trace-row"><span class="trace-number">2</span><div class="trace-copy"><code>len(valores)</code> informa quantos dados participaram.</div></div><div class="trace-row"><span class="trace-number">3</span><div class="trace-copy">A divisão produz a média; <code>:.2f</code> controla somente a apresentação com duas casas.</div></div></div>
        </section>

        <section class="band">
          <h2>Média ponderada: alguns valores têm mais importância</h2>
          <p>Quando cada nota possui um peso, não podemos dividir apenas pela quantidade de notas. Multiplicamos cada valor por seu peso, somamos os produtos e dividimos pela soma dos pesos.</p>
          <div class="two-col">
            <div class="code-shell"><div class="code-head">Calculando passo a passo</div><pre><code>notas = [7.0, 8.0, 6.0]
pesos = [2, 3, 5]

soma_produtos = 0

for i in range(len(notas)):
    soma_produtos += notas[i] * pesos[i]

media = soma_produtos / sum(pesos)
print(f"{media:.2f}")</code></pre></div>
            <div>
              <h3>Teste de mesa</h3>
              <div class="table-wrap"><table><thead><tr><th>Nota</th><th>Peso</th><th>Produto</th></tr></thead><tbody><tr><td>7</td><td>2</td><td>14</td></tr><tr><td>8</td><td>3</td><td>24</td></tr><tr><td>6</td><td>5</td><td>30</td></tr><tr><td colspan="2">68 / 10</td><td><strong>6,8</strong></td></tr></tbody></table></div>
              <p class="note"><strong>Erro comum:</strong> dividir por 3 porque existem três notas. Na média ponderada, dividimos pela soma dos pesos: 2 + 3 + 5 = 10.</p>
            </div>
          </div>
        </section>

        <section class="band">
          <h2>Mediana: primeiro coloque os dados em ordem</h2>
          <div class="concept-grid">
            <article class="concept-card"><h3>Quantidade ímpar</h3><p>Em <code>[2, 4, 7, 9, 12]</code>, há um único valor central. A mediana é 7.</p></article>
            <article class="concept-card"><h3>Quantidade par</h3><p>Em <code>[2, 5, 7, 9]</code>, os centros são 5 e 7. A mediana é a média deles: 6.</p></article>
          </div>
          <div class="code-shell"><div class="code-head">Algoritmo da mediana</div><pre><code>dados = [9, 2, 7, 5]
ordenados = sorted(dados)
n = len(ordenados)
meio = n // 2

if n % 2 == 1:
    mediana = ordenados[meio]
else:
    mediana = (ordenados[meio - 1] + ordenados[meio]) / 2

print(mediana)</code></pre></div>
          <div class="success"><strong>A ordem é indispensável.</strong> O elemento que está no meio da lista original não é necessariamente a mediana. Primeiro ordenamos; depois procuramos a posição central.</div>
        </section>

        <section class="band">
          <h2>Moda: o valor que mais se repete</h2>
          <p>A moda depende da frequência. Um conjunto pode ter uma moda, várias modas empatadas ou, na convenção usada nesta aula, ser chamado de “sem moda” quando nenhum valor se repete.</p>
          <div class="concept-grid">
            <article class="concept-card"><h3>Uma moda</h3><p><code>[1, 2, 2, 3]</code> tem moda 2, pois ele aparece duas vezes.</p></article>
            <article class="concept-card"><h3>Mais de uma moda</h3><p><code>[1, 1, 2, 2, 3]</code> tem modas 1 e 2. As duas frequências máximas são iguais.</p></article>
          </div>
          <div class="code-shell"><div class="code-head">Usando a biblioteca padrão</div><pre><code>from statistics import multimode

dados = [1, 1, 2, 2, 3]
modas = multimode(dados)

if len(modas) == len(dados):
    print("sem moda")
else:
    print(*modas)</code></pre></div>
          <p class="note"><strong>Por que multimode?</strong> <code>mode()</code> devolve apenas uma moda. <code>multimode()</code> preserva todos os valores empatados com a maior frequência.</p>
        </section>

        <section class="band">
          <h2>Amplitude: a distância entre os extremos</h2>
          <p>A amplitude é calculada por <code>max(dados) - min(dados)</code>. Ela mostra o tamanho do intervalo ocupado pelos valores, mas não explica como os dados estão distribuídos dentro dele.</p>
          <div class="flow"><span class="flow-step">mínimo = 5</span><span class="flow-arrow">→</span><span class="flow-step">máximo = 30</span><span class="flow-arrow">→</span><span class="flow-step active">amplitude = 25</span></div>
        </section>

        <section class="band">
          <h2>Quando usar cada medida?</h2>
          <div class="concept-grid">
            <article class="concept-card"><h3>Média</h3><p>Considera todos os valores. É útil quando os dados são comparáveis, mas pode ser bastante alterada por um valor extremo.</p></article>
            <article class="concept-card"><h3>Mediana</h3><p>Representa a posição central. É menos afetada por valores muito altos ou muito baixos.</p></article>
            <article class="concept-card"><h3>Moda</h3><p>Mostra o valor mais frequente e também pode ser usada com categorias, como cores ou respostas.</p></article>
            <article class="concept-card"><h3>Amplitude</h3><p>Resume a distância entre mínimo e máximo. Ajuda a perceber a dispersão, mas observa apenas dois dados.</p></article>
          </div>
        </section>

        <section class="band">
          <h2>Python já conhece essas operações</h2>
          <div class="code-shell"><div class="code-head">Módulo statistics</div><pre><code>from statistics import mean, median, multimode

dados = [5, 6, 6, 7, 30]

print(mean(dados))
print(median(dados))
print(multimode(dados))
print(max(dados) - min(dados))</code></pre></div>
          <p>A biblioteca é útil, mas compreender o algoritmo continua importante. Em uma prova, o enunciado pode pedir uma regra diferente, como média ponderada, mediana inferior ou um desempate específico para a moda.</p>
          <div class="warning"><strong>Não arredonde etapas intermediárias.</strong> Mantenha o valor completo durante os cálculos e formate somente a saída, por exemplo com <code>print(f"{resultado:.2f}")</code>.</div>
        </section>

        <section class="band">
          <h2>Exercícios guiados</h2>
          <div class="concept-grid">
            <article class="concept-card"><h3>1. Média simples</h3><p>Calcule a média de 6, 7, 8 e 9.</p><details class="solution"><summary>Conferir resposta</summary><div><p>Soma 30, quantidade 4: <strong>7,5</strong>.</p></div></details></article>
            <article class="concept-card"><h3>2. Porcentagem</h3><p>Uma equipe resolveu 18 de 24 problemas de treino. Qual foi o percentual?</p><details class="solution"><summary>Conferir resposta</summary><div><p><code>18 / 24 * 100</code> resulta em <strong>75%</strong>.</p></div></details></article>
            <article class="concept-card"><h3>3. Média ponderada</h3><p>As notas 7 e 8 têm pesos 2 e 3. Qual é a média?</p><details class="solution"><summary>Conferir resposta</summary><div><p><code>(7 × 2 + 8 × 3) / 5</code> resulta em <strong>7,6</strong>.</p></div></details></article>
            <article class="concept-card"><h3>4. Mediana</h3><p>Encontre a mediana de 9, 2, 7 e 5.</p><details class="solution"><summary>Conferir resposta</summary><div><p>Ordenando: 2, 5, 7, 9. A média dos centros é <strong>6</strong>.</p></div></details></article>
            <article class="concept-card"><h3>5. Moda</h3><p>Quais são as modas de 1, 2, 2, 3, 3 e 4?</p><details class="solution"><summary>Conferir resposta</summary><div><p>2 e 3 aparecem duas vezes. O conjunto é bimodal: <strong>2 e 3</strong>.</p></div></details></article>
            <article class="concept-card"><h3>6. Amplitude</h3><p>Calcule a amplitude de 12, 5, 9, 20 e 8.</p><details class="solution"><summary>Conferir resposta</summary><div><p>Máximo 20 menos mínimo 5: <strong>15</strong>.</p></div></details></article>
          </div>
        </section>

        <section class="band">
          <h2>Pratique com problemas do beecrowd</h2>
          <p>Os exercícios abaixo já possuem uma página explicativa no módulo. Tente resolver pelo enunciado oficial antes de abrir a explicação.</p>
          <div class="problem-list">
            <article class="problem-card"><span class="problem-id">1002</span><div><h3>Área do Círculo</h3><p>Fórmula, potência, constante e formatação decimal.</p><a class="btn" href="../../problemas/beecrowd/1002/index.html">Ver exercício explicado</a></div><span class="difficulty">fórmula</span></article>
            <article class="problem-card"><span class="problem-id">1005</span><div><h3>Média 1</h3><p>Primeira aplicação de média ponderada.</p><a class="btn" href="../../problemas/beecrowd/1005/index.html">Ver exercício explicado</a></div><span class="difficulty">média</span></article>
            <article class="problem-card"><span class="problem-id">1006</span><div><h3>Média 2</h3><p>Três valores com pesos diferentes.</p><a class="btn" href="../../problemas/beecrowd/1006/index.html">Ver exercício explicado</a></div><span class="difficulty">pesos</span></article>
            <article class="problem-card"><span class="problem-id">1014</span><div><h3>Consumo</h3><p>Razão entre distância percorrida e combustível.</p><a class="btn" href="../../problemas/beecrowd/1014/index.html">Ver exercício explicado</a></div><span class="difficulty">proporção</span></article>
            <article class="problem-card"><span class="problem-id">1040</span><div><h3>Média 3</h3><p>Média ponderada combinada com decisões.</p><a class="btn" href="../../problemas/beecrowd/1040/index.html">Ver exercício explicado</a></div><span class="difficulty">condicionais</span></article>
            <article class="problem-card"><span class="problem-id">1064</span><div><h3>Positivos e Média</h3><p>Filtragem, contagem, soma e média.</p><a class="btn" href="../../problemas/beecrowd/1064/index.html">Ver exercício explicado</a></div><span class="difficulty">repetição</span></article>
          </div>
        </section>`,
      challenge: "Leia uma linha com números inteiros e mostre: média com duas casas, mediana, todas as modas e amplitude. Se nenhum valor se repetir, escreva 'sem moda'.",
      solution: "from statistics import median, multimode\n\ndados = list(map(int, input().split()))\nmedia = sum(dados) / len(dados)\nmodas = multimode(dados)\namplitude = max(dados) - min(dados)\n\nprint(f\"media: {media:.2f}\")\nprint(f\"mediana: {median(dados)}\")\n\nif len(modas) == len(dados):\n    print(\"moda: sem moda\")\nelse:\n    print(\"moda:\", *modas)\n\nprint(f\"amplitude: {amplitude}\")",
      sources: [
        ["Funções de estatística matemática — documentação Python", "https://docs.python.org/3/library/statistics.html"],
        ["Média, mediana e moda — GeeksforGeeks", "https://www.geeksforgeeks.org/maths/mean-median-mode/"],
        ["Média, mediana e moda em Python — GeeksforGeeks", "https://www.geeksforgeeks.org/python/finding-mean-median-mode-in-python-without-libraries/"]
      ]
    },
    {
      id: 19,
      slug: "aula-19-match-case",
      title: "Switch case em Python: match/case",
      summary: "Escolha uma ação comparando um valor com padrões claros usando match, case e o caso padrão.",
      duration: "80 min",
      activity: "match-case",
      content: `
        <section class="band">
          <div class="two-col">
            <div>
              <h2>O switch do Python se chama match/case</h2>
              <p>Outras linguagens usam o nome <em>switch case</em> para escolher uma ação entre vários valores. Desde o Python 3.10, a linguagem oferece <code>match/case</code>. Ele começa com comparações simples e também consegue reconhecer a estrutura de listas, tuplas e dicionários.</p>
              <p>Para esta aula, começaremos pelo uso mais parecido com switch: comparar uma opção com valores fixos.</p>
            </div>
            <div class="concept-card">
              <h3>Mapa mental</h3>
              <div class="flow"><span class="flow-step">match valor</span><span class="flow-arrow">→</span><span class="flow-step">testar cases</span><span class="flow-arrow">→</span><span class="flow-step active">executar o primeiro padrão</span></div>
              <p>Se nenhum padrão específico combinar, <code>case _</code> funciona como o caso padrão.</p>
            </div>
          </div>
        </section>

        <section class="band">
          <h2>Um menu com opções exatas</h2>
          <div class="code-shell"><div class="code-head">match/case básico</div><pre><code>opcao = int(input())

match opcao:
    case 1:
        print("Cadastrar")
    case 2:
        print("Consultar")
    case 3:
        print("Sair")
    case _:
        print("Opção inválida")</code></pre></div>
          <div class="trace"><div class="trace-row"><span class="trace-number">1</span><div class="trace-copy"><code>match opcao</code> define o valor analisado.</div></div><div class="trace-row"><span class="trace-number">2</span><div class="trace-copy">Os padrões são testados de cima para baixo.</div></div><div class="trace-row"><span class="trace-number">3</span><div class="trace-copy">O primeiro <code>case</code> compatível é executado.</div></div><div class="trace-row"><span class="trace-number">4</span><div class="trace-copy"><code>case _</code> recebe qualquer valor que não combinou antes.</div></div></div>
          <div class="success"><strong>Não existe queda automática.</strong> Depois de executar um caso, Python sai do <code>match</code>. Não precisamos escrever <code>break</code> ao final de cada caso.</div>
        </section>

        <section class="band">
          <h2>Vários valores podem compartilhar a mesma ação</h2>
          <p>O símbolo <code>|</code> cria um padrão OU. O exemplo agrupa sábado e domingo.</p>
          <div class="code-shell"><div class="code-head">Padrão alternativo</div><pre><code>dia = int(input())

match dia:
    case 1 | 7:
        print("fim de semana")
    case 2 | 3 | 4 | 5 | 6:
        print("dia útil")
    case _:
        print("dia inválido")</code></pre></div>
          <p><code>case 1 | 7</code> não calcula “1 ou 7” como uma expressão comum. Ele declara dois padrões capazes de escolher o mesmo bloco.</p>
        </section>

        <section class="band">
          <h2>Guardas adicionam uma condição</h2>
          <p>Uma guarda usa <code>if</code> depois do padrão. O caso só é escolhido quando o padrão e a condição forem verdadeiros.</p>
          <div class="code-shell"><div class="code-head">Padrão com guarda</div><pre><code>comando, nivel = input().split()
nivel = int(nivel)

match comando:
    case "acessar" if nivel &gt;= 5:
        print("acesso administrativo")
    case "acessar":
        print("acesso comum")
    case "sair":
        print("encerrando")
    case _:
        print("comando desconhecido")</code></pre></div>
          <div class="warning"><strong>A ordem importa.</strong> O caso mais específico, com a guarda, deve aparecer antes do caso geral <code>case "acessar"</code>.</div>
        </section>

        <section class="band">
          <h2>match reconhece estruturas</h2>
          <div class="code-shell"><div class="code-head">Uma prévia de padrões em listas</div><pre><code>comando = input().split()

match comando:
    case ["somar", a, b]:
        print(int(a) + int(b))
    case ["dobrar", valor]:
        print(int(valor) * 2)
    case _:
        print("formato inválido")</code></pre></div>
          <p>O primeiro caso exige uma lista com exatamente três partes, começando por <code>"somar"</code>. Além de verificar o formato, o padrão guarda as outras partes em <code>a</code> e <code>b</code>.</p>
        </section>

        <section class="band">
          <h2>Quando usar if e quando usar match?</h2>
          <div class="table-wrap"><table><thead><tr><th>Situação</th><th>Escolha mais direta</th><th>Motivo</th></tr></thead><tbody><tr><td>Faixas como nota &gt;= 6</td><td><code>if/elif</code></td><td>A decisão depende de uma expressão booleana</td></tr><tr><td>Opções 1, 2, 3</td><td><code>match/case</code></td><td>Compara o mesmo valor com alternativas fixas</td></tr><tr><td>Condições muito diferentes</td><td><code>if/elif</code></td><td>Cada ramo testa uma pergunta própria</td></tr><tr><td>Formato de lista ou dicionário</td><td><code>match/case</code></td><td>O padrão descreve a estrutura esperada</td></tr></tbody></table></div>
          <div class="note"><strong>match não substitui todo if.</strong> Ele é especialmente legível quando vários caminhos dependem do mesmo valor ou do mesmo formato.</div>
        </section>

        <section class="band">
          <h2>Exercícios guiados</h2>
          <div class="concept-grid">
            <article class="concept-card"><h3>1. Semáforo</h3><p>Use <code>match</code> para vermelho, amarelo e verde.</p><details class="solution"><summary>Conferir ideia</summary><div><p>Crie um caso para cada string e <code>case _</code> para cor inválida.</p></div></details></article>
            <article class="concept-card"><h3>2. Vogal</h3><p>Agrupe a, e, i, o e u em um único caso.</p><details class="solution"><summary>Conferir ideia</summary><div><p>Use <code>case "a" | "e" | "i" | "o" | "u":</code>.</p></div></details></article>
            <article class="concept-card"><h3>3. Dia da semana</h3><p>Receba um número de 1 a 7 e imprima o nome correspondente.</p><details class="solution"><summary>Conferir ideia</summary><div><p>São sete casos literais e um caso padrão para valores inválidos.</p></div></details></article>
            <article class="concept-card"><h3>4. Faixa de idade</h3><p>Devemos usar <code>match</code> ou <code>if</code> para testar idade &lt; 12, &lt; 18 e demais?</p><details class="solution"><summary>Conferir resposta</summary><div><p><code>if/elif</code> é mais direto porque trabalhamos com intervalos e comparações.</p></div></details></article>
          </div>
        </section>`,
      challenge: "Leia uma operação (+, -, * ou /) e dois números. Use match/case para calcular o resultado. Trate divisão por zero e operação inválida.",
      solution: "operacao = input().strip()\na = float(input())\nb = float(input())\n\nmatch operacao:\n    case \"+\":\n        print(a + b)\n    case \"-\":\n        print(a - b)\n    case \"*\":\n        print(a * b)\n    case \"/\" if b != 0:\n        print(a / b)\n    case \"/\":\n        print(\"divisão por zero\")\n    case _:\n        print(\"operação inválida\")",
      sources: [
        ["Instruções match — documentação Python", "https://docs.python.org/3/tutorial/controlflow.html#match-statements"],
        ["Python match case — GeeksforGeeks", "https://www.geeksforgeeks.org/python/python-match-case-statement/"],
        ["Especificação de pattern matching — PEP 634", "https://peps.python.org/pep-0634/"]
      ]
    },
    {
      id: 20,
      slug: "aula-20-dicionarios-conjuntos",
      title: "Dicionários e conjuntos",
      summary: "Associe chaves a valores, conte frequências e elimine repetições com dict e set.",
      duration: "95 min",
      activity: "dictionary-set",
      content: `
        <section class="band">
          <div class="two-col">
            <div>
              <h2>Nem todo dado deve ser procurado por posição</h2>
              <p>Uma lista responde perguntas como “qual valor está no índice 2?”. Um dicionário responde “qual valor pertence à chave pontos?”. Um conjunto responde “este valor já apareceu?” e guarda apenas elementos únicos.</p>
              <p>Essas estruturas aparecem com frequência em contagens, cadastros, consultas, remoção de duplicatas e comparação de grupos.</p>
            </div>
            <div class="table-wrap"><table><thead><tr><th>Estrutura</th><th>Organização</th><th>Uso comum</th></tr></thead><tbody><tr><td><code>list</code></td><td>posição → valor</td><td>sequência ordenada e repetida</td></tr><tr><td><code>dict</code></td><td>chave → valor</td><td>cadastro e frequência</td></tr><tr><td><code>set</code></td><td>valores únicos</td><td>pertencimento e duplicatas</td></tr></tbody></table></div>
          </div>
        </section>

        <section class="band">
          <h2>Dicionário: cada chave aponta para um valor</h2>
          <div class="code-shell"><div class="code-head">Criar, consultar e atualizar</div><pre><code>aluno = {
    "nome": "Ana",
    "nota": 8.5,
    "faltas": 2
}

print(aluno["nome"])

aluno["nota"] = 9.0
aluno["turma"] = "A"

print(aluno)</code></pre></div>
          <ul class="clean-list"><li><strong>Chave:</strong> identifica a informação, como <code>"nome"</code>.</li><li><strong>Valor:</strong> é o dado associado à chave, como <code>"Ana"</code>.</li><li><strong>Atualização:</strong> atribuir a uma chave existente troca o valor.</li><li><strong>Inserção:</strong> atribuir a uma chave nova cria um novo par.</li></ul>
        </section>

        <section class="band">
          <h2>Acesso seguro com get</h2>
          <div class="two-col">
            <div class="code-shell"><div class="code-head">Acesso direto</div><pre><code>print(aluno["cidade"])</code></pre></div>
            <div class="code-shell"><div class="code-head">Valor padrão</div><pre><code>cidade = aluno.get("cidade", "não informada")
print(cidade)</code></pre></div>
          </div>
          <p>O acesso com colchetes causa <code>KeyError</code> quando a chave não existe. <code>get</code> permite escolher um valor padrão para esse caso.</p>
        </section>

        <section class="band">
          <h2>Percorrendo chaves e valores</h2>
          <div class="code-shell"><div class="code-head">items() produz os pares</div><pre><code>pontos = {
    "Ada": 30,
    "Bia": 25,
    "Caio": 40
}

for nome, pontuacao in pontos.items():
    print(nome, pontuacao)</code></pre></div>
          <div class="concept-grid"><article class="concept-card"><h3>keys()</h3><p>Produz as chaves do dicionário.</p></article><article class="concept-card"><h3>values()</h3><p>Produz somente os valores.</p></article><article class="concept-card"><h3>items()</h3><p>Produz pares de chave e valor.</p></article><article class="concept-card"><h3>in</h3><p>Testa se uma chave existe no dicionário.</p></article></div>
        </section>

        <section class="band">
          <h2>Contagem de frequências</h2>
          <div class="code-shell"><div class="code-head">Quantas vezes cada palavra apareceu?</div><pre><code>palavras = input().lower().split()
frequencias = {}

for palavra in palavras:
    frequencias[palavra] = frequencias.get(palavra, 0) + 1

for palavra, quantidade in frequencias.items():
    print(palavra, quantidade)</code></pre></div>
          <div class="trace"><div class="trace-row"><span class="trace-number">1</span><div class="trace-copy">Na primeira ocorrência, <code>get(palavra, 0)</code> devolve zero.</div></div><div class="trace-row"><span class="trace-number">2</span><div class="trace-copy">Somamos 1 e criamos a chave.</div></div><div class="trace-row"><span class="trace-number">3</span><div class="trace-copy">Nas próximas ocorrências, recuperamos a contagem anterior e aumentamos novamente.</div></div></div>
        </section>

        <section class="band">
          <h2>Conjunto: cada valor aparece uma única vez</h2>
          <div class="code-shell"><div class="code-head">Remover duplicatas</div><pre><code>numeros = [4, 2, 4, 7, 2, 9]
unicos = set(numeros)

print(unicos)
print(len(unicos))
print(7 in unicos)</code></pre></div>
          <div class="warning"><strong>Conjunto não possui índice.</strong> Não use <code>unicos[0]</code> e não dependa da ordem exibida. Se precisar ordenar, use <code>sorted(unicos)</code>.</div>
          <p>Para criar um conjunto vazio, use <code>set()</code>. A escrita <code>{}</code> cria um dicionário vazio.</p>
        </section>

        <section class="band">
          <h2>Operações entre conjuntos</h2>
          <div class="table-wrap"><table><thead><tr><th>Operação</th><th>Python</th><th>Resultado para A={1,2,3} e B={3,4}</th></tr></thead><tbody><tr><td>União</td><td><code>A | B</code></td><td>{1, 2, 3, 4}</td></tr><tr><td>Interseção</td><td><code>A &amp; B</code></td><td>{3}</td></tr><tr><td>Diferença</td><td><code>A - B</code></td><td>{1, 2}</td></tr><tr><td>Diferença simétrica</td><td><code>A ^ B</code></td><td>{1, 2, 4}</td></tr></tbody></table></div>
          <p class="note"><strong>Exemplo:</strong> a interseção encontra alunos presentes em duas listas; a diferença encontra quem está na primeira, mas não na segunda.</p>
        </section>

        <section class="band">
          <h2>Escolha a estrutura pela pergunta</h2>
          <div class="concept-grid"><article class="concept-card"><h3>Preciso da posição?</h3><p>Use lista quando a ordem e os índices fizerem parte do problema.</p></article><article class="concept-card"><h3>Preciso buscar pela chave?</h3><p>Use dicionário para associar nomes, códigos ou categorias a informações.</p></article><article class="concept-card"><h3>Preciso saber se já apareceu?</h3><p>Use conjunto para unicidade e testes de pertencimento.</p></article><article class="concept-card"><h3>Preciso contar?</h3><p>Use um dicionário em que a chave é o item e o valor é sua frequência.</p></article></div>
        </section>

        <section class="band">
          <h2>Exercícios guiados</h2>
          <div class="concept-grid">
            <article class="concept-card"><h3>1. Cadastro</h3><p>Crie um dicionário com nome, idade e curso. Depois altere a idade.</p><details class="solution"><summary>Conferir ideia</summary><div><p>Use pares <code>"chave": valor</code> e depois atribua à chave <code>"idade"</code>.</p></div></details></article>
            <article class="concept-card"><h3>2. Frequência</h3><p>Conte quantas vezes cada número aparece em uma lista.</p><details class="solution"><summary>Conferir ideia</summary><div><p>Use o número como chave e <code>frequencias.get(numero, 0) + 1</code>.</p></div></details></article>
            <article class="concept-card"><h3>3. Distintos</h3><p>Descubra quantos valores diferentes existem em uma lista.</p><details class="solution"><summary>Conferir ideia</summary><div><p><code>len(set(valores))</code> devolve a quantidade de valores únicos.</p></div></details></article>
            <article class="concept-card"><h3>4. Em comum</h3><p>Encontre os valores presentes em duas listas.</p><details class="solution"><summary>Conferir ideia</summary><div><p>Converta as listas para conjuntos e use a interseção <code>A &amp; B</code>.</p></div></details></article>
          </div>
        </section>`,
      challenge: "Leia uma frase, normalize para minúsculas e mostre quantas palavras diferentes existem. Depois imprima cada palavra e sua frequência em ordem alfabética.",
      solution: "palavras = input().lower().split()\nfrequencias = {}\n\nfor palavra in palavras:\n    frequencias[palavra] = frequencias.get(palavra, 0) + 1\n\nprint(len(set(palavras)))\n\nfor palavra in sorted(frequencias):\n    print(palavra, frequencias[palavra])",
      sources: [
        ["Dicionários e conjuntos — documentação Python", "https://docs.python.org/3/tutorial/datastructures.html"],
        ["Dicionários em Python — GeeksforGeeks", "https://www.geeksforgeeks.org/python/python-dictionary/"],
        ["Conjuntos em Python — GeeksforGeeks", "https://www.geeksforgeeks.org/python/sets-in-python/"]
      ]
    }
  ];

  root.COURSE_LESSONS = lessons;
  if (typeof module !== "undefined" && module.exports) module.exports = lessons;
})(typeof window !== "undefined" ? window : globalThis);
