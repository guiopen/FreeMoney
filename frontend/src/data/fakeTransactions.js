const fakeTransactions = [
  {
    id: 0,
    title: "Conta de Luz",
    date: new Date(),
    category: "Casa",
    value: 789.2,
    expense: true,
  },
  {
    id: 1,
    title: "Conta de água",
    date: new Date(new Date().setMonth(3)),
    category: "Casa",
    value: 489.2,
    expense: true
  },
  {
    id: 2,
    title: "Mensalidade cursos",
    date: new Date(new Date().setMonth(1)),
    category: "Profissão",
    value: 389.2,
    expense: true
  },
  {
    id: 3,
    title: "Gás",
    date: new Date(new Date().setMonth(6)),
    category: "Casa",
    value: 189.2,
    expense: true
  },
  {
    id: 4,
    title: "Estágio",
    date: new Date(),
    category: "Salário",
    value: 1789.2,
    expense: false,
  },
  {
    id: 5,
    title: "Freelance",
    date: new Date(new Date().setMonth(2)),
    category: "Serviço",
    value: 2789.2,
    expense: false,
  },
  {
    id: 6,
    title: "Trampo",
    date: new Date(new Date().setMonth(6)),
    category: "Serviço",
    value: 1789.2,
    expense: false,
  },
  {
    id: 7,
    title: "Dividendos",
    date: new Date(),
    category: "Investimentos",
    value: 285.62,
    expense: false,
  },
]

export default fakeTransactions