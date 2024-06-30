import React, { useEffect, useState } from "react"
import { calculateBalance } from "./utils"

export default function TransactionHistories({ transactions }) {
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    setBalance(calculateBalance(transactions))
  }, [transactions])

  function renderTransactions() {
    return transactions.map(t => true ? (
      <tr key={t.id} className={`border-zinc-200 border-t border-solid text-sm mx-2
        ${t.expense ? "text-red-700" : "text-green-700"}`}
      >
        <td>{t.title}</td>
        <td>{new Date(t.date).toLocaleDateString().substring(0, 5)}</td>
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
      <div className="flex justify-start mt-4">
        <span className="font-bold">Saldo: </span>
        <span className={balance >= 0 ? 'text-green-700' : 'text-red-700'}>
          {balance.toFixed(2)}
        </span>
      </div>
    </div>
  )
}