import { useState } from "react"
import Radio from "./Radio"
import { Line } from 'react-chartjs-2';
import fakeTransactions from "../../data/fakeTransactions";
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
} from 'chart.js';

export default function LineChart() {
  const [selected, setSelected] = useState("expenses")

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

  function handleSelect(ev) {
    setSelected(ev.target.value)
  }

  const expensesByMonth = fakeTransactions
    .reduce((obj, transaction) => {
      const month = transaction.date.getMonth()
      if (transaction.expense) {
        obj[month] += transaction.value
      }
      return obj
    }, { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0 })

  const incomesByMonth = fakeTransactions
    .reduce((obj, transaction) => {
      const month = transaction.date.getMonth()
      if (!transaction.expense) {
        obj[month] += transaction.value
      }
      return obj
    }, { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0 })

  const expensesData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
      {
        data: Object.values(expensesByMonth),
        borderColor: "red",
      }
    ]
  };

  const incomesData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
      {
        data: Object.values(incomesByMonth),
        borderColor: "green",
      }
    ]
  };

  return (
    <div className="w-full">
      <div className="flex flex-col min-[425px]:flex-row gap-1 justify-between">
        <span className="text-sm text-zinc-500 font-semibold">
          Histórico de {selected === "expenses" ? "Saídas" : "Entradas"}
        </span>
        <span className="flex gap-4 lg:gap-6">
          <Radio
            label="Saídas"
            selected={selected === 'expenses'}
            handleSelection={ev => handleSelect(ev)}
            value="expenses"
            name="line"
          />
          <Radio
            label="Entradas"
            selected={selected === 'incomes'}
            handleSelection={ev => handleSelect(ev)}
            value="incomes"
            name="line"
          />
        </span>
      </div>
      <div className="w-full">
        <Line
          className="mx-auto mt-3 max-w-64 sm:max-w-96 md:max-w-[600px]"
          id="0"
          data={selected === "expenses" ? expensesData : incomesData}
          options={{ plugins: { tooltip: { enabled: true, position: "nearest" } } }}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  )
}