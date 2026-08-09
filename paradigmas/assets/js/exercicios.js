window.PARADIGM_LABELS = {
  "forca-bruta": "Força bruta",
  "recursao": "Recursão",
  "backtracking": "Backtracking",
  "divisao-conquista": "Divisão e conquista",
  "guloso": "Guloso",
  "programacao-dinamica": "Programação dinâmica",
  "memoizacao": "Memoização",
  "branch-and-bound": "Branch and Bound",
  "pre-processamento": "Pré-processamento",
  "iteracao": "Iteração direta"
};

window.PARADIGM_EXERCISES = [
  {
    "key": "beecrowd-1547",
    "id": "1547",
    "title": "Adivinha",
    "platform": "beecrowd",
    "url": "https://judge.beecrowd.com/pt/problems/view/1547",
    "primary": "forca-bruta",
    "paradigms": [
      "forca-bruta"
    ],
    "difficulty": "Introdução",
    "concepts": [
      "varredura completa",
      "comparação de candidatas"
    ],
    "prerequisites": "laços, listas e valor absoluto",
    "reason": "Oferece uma primeira busca completa pequena, com critério objetivo e fácil de testar."
  },
  {
    "key": "beecrowd-1055",
    "id": "1055",
    "title": "Soma Permutada Elegante",
    "platform": "beecrowd",
    "url": "https://judge.beecrowd.com/pt/problems/view/1055",
    "primary": "guloso",
    "paradigms": [
      "guloso"
    ],
    "difficulty": "Desafio",
    "concepts": [
      "permutações",
      "espaço de possibilidades"
    ],
    "prerequisites": "recursão, listas e análise combinatória básica",
    "reason": "Mostra como a enumeração de ordens cresce rapidamente e prepara a discussão sobre poda."
  },
  {
    "key": "beecrowd-1029",
    "id": "1029",
    "title": "Fibonacci, Quantas Chamadas?",
    "platform": "beecrowd",
    "url": "https://judge.beecrowd.com/pt/problems/view/1029",
    "primary": "recursao",
    "paradigms": [
      "recursao",
      "memoizacao"
    ],
    "difficulty": "Introdução",
    "concepts": [
      "árvore de chamadas",
      "casos base"
    ],
    "prerequisites": "funções, retorno e contadores",
    "reason": "Torna visível o custo da recursão e a repetição de chamadas em entradas pequenas."
  },
  {
    "key": "beecrowd-1033",
    "id": "1033",
    "title": "Quantas Chamadas Recursivas?",
    "platform": "beecrowd",
    "url": "https://judge.beecrowd.com/pt/problems/view/1033",
    "primary": "divisao-conquista",
    "paradigms": [
      "divisao-conquista",
      "recursao"
    ],
    "difficulty": "Intermediário",
    "concepts": [
      "recorrência",
      "contagem de chamadas"
    ],
    "prerequisites": "recursão e análise de casos base",
    "reason": "Aprofunda o acompanhamento da estrutura recursiva sem depender apenas do valor calculado."
  },
  {
    "key": "beecrowd-1153",
    "id": "1153",
    "title": "Fatorial Simples",
    "platform": "beecrowd",
    "url": "https://judge.beecrowd.com/pt/problems/view/1153",
    "primary": "iteracao",
    "paradigms": [
      "iteracao",
      "recursao"
    ],
    "difficulty": "Introdução",
    "concepts": [
      "redução de problema",
      "caso base"
    ],
    "prerequisites": "funções e multiplicação",
    "reason": "É um ponto de entrada curto para comparar formulações iterativa e recursiva."
  },
  {
    "key": "beecrowd-1161",
    "id": "1161",
    "title": "Soma de Fatoriais",
    "platform": "beecrowd",
    "url": "https://judge.beecrowd.com/pt/problems/view/1161",
    "primary": "iteracao",
    "paradigms": [
      "iteracao",
      "recursao"
    ],
    "difficulty": "Introdução",
    "concepts": [
      "função recursiva",
      "múltiplos casos"
    ],
    "prerequisites": "entrada até EOF e fatorial",
    "reason": "Exercita uma função recursiva pequena dentro de um fluxo de leitura competitivo."
  },
  {
    "key": "beecrowd-1166",
    "id": "1166",
    "title": "Torre de Hanoi, Novamente!",
    "platform": "beecrowd",
    "url": "https://judge.beecrowd.com/pt/problems/view/1166",
    "primary": "guloso",
    "paradigms": [
      "guloso"
    ],
    "difficulty": "Intermediário",
    "concepts": [
      "tentativas ordenadas",
      "estado da configuração"
    ],
    "prerequisites": "recursão, listas e teste de validade",
    "reason": "Exige construir uma configuração por decisões sucessivas e observar quando uma tentativa pode continuar."
  },
  {
    "key": "beecrowd-1690",
    "id": "1690",
    "title": "Soma de Subconjuntos",
    "platform": "beecrowd",
    "url": "https://judge.beecrowd.com/pt/problems/view/1690",
    "primary": "backtracking",
    "paradigms": [
      "backtracking",
      "branch-and-bound"
    ],
    "difficulty": "Desafio",
    "concepts": [
      "subconjuntos",
      "poda"
    ],
    "prerequisites": "recursão e busca exaustiva",
    "reason": "É apropriado para discutir árvore de escolhas e investigação de podas sem entregar a modelagem."
  },
  {
    "key": "beecrowd-1025",
    "id": "1025",
    "title": "Onde está o Mármore?",
    "platform": "beecrowd",
    "url": "https://judge.beecrowd.com/pt/problems/view/1025",
    "primary": "divisao-conquista",
    "paradigms": [
      "divisao-conquista",
      "pre-processamento"
    ],
    "difficulty": "Introdução",
    "concepts": [
      "ordenação",
      "busca em intervalo"
    ],
    "prerequisites": "listas e comparação",
    "reason": "É uma ponte prática para discutir busca eficiente em dados ordenados."
  },
  {
    "key": "beecrowd-1088",
    "id": "1088",
    "title": "Bolhas e Baldes",
    "platform": "beecrowd",
    "url": "https://judge.beecrowd.com/pt/problems/view/1088",
    "primary": "pre-processamento",
    "paradigms": [
      "pre-processamento"
    ],
    "difficulty": "Desafio",
    "concepts": [
      "inversões",
      "intercalação"
    ],
    "prerequisites": "Merge Sort e paridade",
    "reason": "Mostra que uma etapa de combinação pode carregar informação além da ordenação."
  },
  {
    "key": "beecrowd-1084",
    "id": "1084",
    "title": "Apagando e Ganhando",
    "platform": "beecrowd",
    "url": "https://judge.beecrowd.com/pt/problems/view/1084",
    "primary": "guloso",
    "paradigms": [
      "guloso"
    ],
    "difficulty": "Intermediário",
    "concepts": [
      "decisão local",
      "manutenção de candidatos"
    ],
    "prerequisites": "strings, pilha e comparação",
    "reason": "É um problema clássico para justificar uma decisão local e perceber seu efeito futuro."
  },
  {
    "key": "beecrowd-1495",
    "id": "1495",
    "title": "Futebol",
    "platform": "beecrowd",
    "url": "https://judge.beecrowd.com/pt/problems/view/1495",
    "primary": "guloso",
    "paradigms": [
      "guloso"
    ],
    "difficulty": "Intermediário",
    "concepts": [
      "priorização",
      "recurso limitado"
    ],
    "prerequisites": "ordenação e simulação",
    "reason": "Permite investigar qual uso local de um recurso produz maior benefício."
  },
  {
    "key": "beecrowd-1936",
    "id": "1936",
    "title": "Fatorial",
    "platform": "beecrowd",
    "url": "https://judge.beecrowd.com/pt/problems/view/1936",
    "primary": "guloso",
    "paradigms": [
      "guloso"
    ],
    "difficulty": "Introdução",
    "concepts": [
      "escolha local",
      "decomposição numérica"
    ],
    "prerequisites": "fatorial e laços",
    "reason": "Tem entrada curta e permite concentrar a discussão na validade da escolha local."
  },
  {
    "key": "beecrowd-1034",
    "id": "1034",
    "title": "Festival de Estátuas de Gelo",
    "platform": "beecrowd",
    "url": "https://judge.beecrowd.com/pt/problems/view/1034",
    "primary": "programacao-dinamica",
    "paradigms": [
      "programacao-dinamica",
      "memoizacao"
    ],
    "difficulty": "Intermediário",
    "concepts": [
      "estados unidimensionais",
      "reutilização"
    ],
    "prerequisites": "listas, mínimo e subproblemas",
    "reason": "É uma entrada conhecida para construir o significado de um estado antes da transição."
  },
  {
    "key": "beecrowd-1286",
    "id": "1286",
    "title": "Motoboy",
    "platform": "beecrowd",
    "url": "https://judge.beecrowd.com/pt/problems/view/1286",
    "primary": "programacao-dinamica",
    "paradigms": [
      "programacao-dinamica"
    ],
    "difficulty": "Intermediário",
    "concepts": [
      "escolher ou não escolher",
      "capacidade"
    ],
    "prerequisites": "DP e listas de pares",
    "reason": "Introduz decisões de inclusão com limite de recurso em uma narrativa concreta."
  },
  {
    "key": "beecrowd-1288",
    "id": "1288",
    "title": "Canhão de Destruição",
    "platform": "beecrowd",
    "url": "https://judge.beecrowd.com/pt/problems/view/1288",
    "primary": "programacao-dinamica",
    "paradigms": [
      "programacao-dinamica"
    ],
    "difficulty": "Intermediário",
    "concepts": [
      "capacidade",
      "otimização"
    ],
    "prerequisites": "DP de escolha e casos de teste",
    "reason": "Consolida a interpretação de capacidade, valor acumulado e resposta final."
  },
  {
    "key": "beecrowd-1310",
    "id": "1310",
    "title": "Lucro",
    "platform": "beecrowd",
    "url": "https://judge.beecrowd.com/pt/problems/view/1310",
    "primary": "programacao-dinamica",
    "paradigms": [
      "programacao-dinamica"
    ],
    "difficulty": "Introdução",
    "concepts": [
      "melhor prefixo",
      "estado unidimensional"
    ],
    "prerequisites": "listas, máximo e somas",
    "reason": "Permite discutir uma resposta ótima em sequência com estado compacto."
  },
  {
    "key": "beecrowd-1932",
    "id": "1932",
    "title": "Bolsa de Valores",
    "platform": "beecrowd",
    "url": "https://judge.beecrowd.com/pt/problems/view/1932",
    "primary": "programacao-dinamica",
    "paradigms": [
      "programacao-dinamica"
    ],
    "difficulty": "Intermediário",
    "concepts": [
      "estado por etapa",
      "decisões"
    ],
    "prerequisites": "DP e interpretação de estados",
    "reason": "Treina a descrição semântica de situações possíveis em cada instante."
  },
  {
    "key": "beecrowd-2446",
    "id": "2446",
    "title": "Troco",
    "platform": "beecrowd",
    "url": "https://judge.beecrowd.com/pt/problems/view/2446",
    "primary": "programacao-dinamica",
    "paradigms": [
      "programacao-dinamica"
    ],
    "difficulty": "Introdução",
    "concepts": [
      "alcançabilidade",
      "escolher ou não escolher"
    ],
    "prerequisites": "listas booleanas e somas",
    "reason": "É adequado para separar estados possíveis de estados impossíveis sem focar apenas em fórmulas."
  }
];
