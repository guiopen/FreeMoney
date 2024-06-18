// import { useEffect, useState } from "react"
import fakeTransactions from "../../data/fakeTransactions"

export default function TransactionHistories() {
  // const [transactions, setTransactions] = useState(fakeTransactions)

  // useEffect(() => {
  // async function fetchTransactions() {
  //   fetch("/transactions")
  //     .then(res => {
  //       if (!res.ok) {
  //         throw new Error("Erro na requisição!")
  //       }
  //       return res.json()
  //     })
  //     .then(json => setTransactions(json))
  //     .catch(e => console.error(e, "Fetch error"))
  // }

  // fetchTransactions()
  // }, [transactions])

  function renderTransactions() {
    return fakeTransactions.map(t => true ? (
      <tr key={t.id} className={`border-zinc-200 border-t border-solid text-sm mx-2
        ${t.expense ? "text-red-400" : "text-green-400"}`}
      >
        <td>{t.title}</td>
        <td>{t.date.toLocaleDateString().substring(0, 5)}</td>
        <td className="hidden sm:block">{t.category}</td>
        <td>{t.value}</td>
      </tr>
    )
      : null)
  }

  return (
    <div className="w-full flex flex-col">
      <span className="text-sm font-semibold text-zinc-500 mb-4">
        Histórico de transações
      </span>
      <table className="w-full">
        <thead className="font-semibold text-zinc-500 text-sm">
          <tr>
            <td>Título</td>
            <td>Data</td>
            <td className="hidden sm:block">Categoria</td>
            <td>Valor</td>
          </tr>
        </thead>
        <tbody>
          {renderTransactions()}
        </tbody>
      </table>
    </div>
  )
}