// import { useEffect, useState } from "react"
// import fakeTransactions from "../../data/fakeTransactions"

export default function TransactionHistories({ transactions }) {

  function renderTransactions() {
    return transactions.map(t => true ? (
      <tr key={t.id} className={`border-zinc-200 border-t border-solid text-sm mx-2
        ${t.expense ? "text-red-600" : "text-green-600"}`}
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
    </div>
  )
}