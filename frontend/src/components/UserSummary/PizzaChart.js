import Radio from "./Radio"
import fakeTransactions from "../../data/fakeTransactions";
import { Doughnut } from 'react-chartjs-2';
import { useState } from "react"
import {
  CategoryScale,
  Chart as ChartJS,
  ArcElement
} from 'chart.js';

export default function PizzaChart() {

  const [selected, setSelected] = useState("expenses")

  function handleSelect(ev) {
    setSelected(ev.target.value)
  }

  ChartJS.register(CategoryScale, ArcElement);

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const expensesByCategory = {};
  const incomesByCategory = {};

  fakeTransactions.forEach((transaction) => {
    if (transaction.expense) {
      expensesByCategory[transaction.category] = (expensesByCategory[transaction.category] ?? 0) + transaction.value;
    } else {
      incomesByCategory[transaction.category] = (incomesByCategory[transaction.category] ?? 0) + transaction.value;
    }
  })

  const expensesData = {
    labels: Object.keys(expensesByCategory),
    datasets: [{
      label: "Gastos",
      data: Object.values(expensesByCategory),
      borderWidth: 0,
      backgroundColor: Array(Object.keys(expensesByCategory).length).fill().map(() => generateRandomColor()),
      hoverOffset: 4
    }]
  }

  const incomesData = {
    labels: Object.keys(expensesByCategory),
    datasets: [{
      label: "Receitas",
      data: Object.values(incomesByCategory),
      borderWidth: 0,
      backgroundColor: Array(2).fill().map(() => generateRandomColor()),
      hoverOffset: 4
    }]
  }

  return (
    <div className="w-full">
      <div className="flex flex-col min-[425px]:flex-row gap-1 justify-between">
        <span className="text-sm text-zinc-500 font-semibold">
          {selected === "expenses" ? "Gastos" : "Receitas"} por categorias
        </span>
        <span className="flex gap-4 lg:gap-6">
          <Radio
            label="Saídas"
            selected={selected === 'expenses'}
            handleSelection={ev => handleSelect(ev)}
            value="expenses"
            name="pizza"
          />
          <Radio
            label="Entradas"
            selected={selected === 'incomes'}
            handleSelection={ev => handleSelect(ev)}
            value="incomes"
            name="pizza"
          />
        </span>
      </div>
      <div>
        <Doughnut data={selected === "expenses" ? expensesData : incomesData}
          className="mx-auto mt-3 max-w-64 sm:max-w-96 md:max-w-[600px]"
          options={{ responsive: false, devicePixelRatio: 10 }}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  )
}