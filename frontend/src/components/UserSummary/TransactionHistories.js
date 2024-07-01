import React, { useEffect, useState } from "react"
import { calculateBalance } from "./utils"
import TransactionModal from "./TransactionModal"

export default function TransactionHistories({ transactions, setTransactions }) {
  const [balance, setBalance] = useState(0)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    setBalance(calculateBalance(transactions))
  }, [transactions])

  function renderTransactions() {
    const reversedTransactions = [...transactions].reverse();
    return reversedTransactions.map(t => true ? (
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
      <div className="flex justify-start items-center mt-4">
        <div className="mr-4">
          <span className="font-bold">Saldo: </span>
          <span className={balance >= 0 ? 'text-green-700' : 'text-red-700'}>
            {balance.toFixed(2)}
          </span>
        </div>
        <span className="flex-grow"></span>
        {setTransactions ?
          <button className="bg-[#3298ab] text-white px-2 py-1 rounded" onClick={() => setOpenModal(true)}>
            Adicionar Transação
          </button> :
          null
        }
      </div>
      {openModal
      ? <TransactionModal transactions={transactions} setTransactions={setTransactions} closeModal={() => setOpenModal(false)}/>
      : null}
    </div>
  )
}