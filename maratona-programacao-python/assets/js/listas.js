(function (root) {
  const lists = [
    {
      id: 1,
      slug: "lista-01-entrada-saida-matematica",
      title: "Entrada, saída e matemática",
      summary: "Do primeiro print a fórmulas, médias, salário, consumo e proporção.",
      problems: [1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1014, 1016]
    },
    {
      id: 2,
      slug: "lista-02-condicionais",
      title: "Condicionais",
      summary: "Decisões simples, intervalos, casos encadeados e condições compostas.",
      problems: [1035, 1036, 1037, 1038, 1040, 1041, 1042, 1043, 1044, 1046]
    },
    {
      id: 3,
      slug: "lista-03-repeticao",
      title: "Repetição",
      summary: "Laços, contadores, acumuladores, intervalos e padrões numéricos.",
      problems: [1059, 1060, 1064, 1065, 1066, 1070, 1071, 1072, 1073, 1078]
    },
    {
      id: 4,
      slug: "lista-04-listas",
      title: "Listas e vetores",
      summary: "Posições, substituição, busca, inversão, preenchimento e buffers.",
      problems: [1080, 1172, 1173, 1174, 1175, 1176, 1177, 1178, 1179, 1180]
    },
    {
      id: 5,
      slug: "lista-05-revisao",
      title: "Revisão da primeira etapa",
      summary: "Misture leitura, matemática, decisões, repetição, listas e strings.",
      problems: [1007, 1009, 1038, 1044, 1072, 1078, 1180, 1120, 1168, 1234, 1235, 1238]
    }
  ];

  root.PROBLEM_LISTS = lists;
  if (typeof module !== "undefined" && module.exports) module.exports = lists;
})(typeof window !== "undefined" ? window : globalThis);
