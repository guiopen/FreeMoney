import { useState } from "react"
import Radio from "./Radio"

export default function LineChart() {
  const [selected, setSelected] = useState("expenses")

  function handleSelect(ev) {
    setSelected(ev.target.value)
  }

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
    </div>
  )
}