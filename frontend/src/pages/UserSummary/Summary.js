import { useEffect, useState } from "react";
import LineChart from "../../components/UserSummary/LineChart";
import PizzaChart from "../../components/UserSummary/PizzaChart";
import TransactionHistories from "../../components/UserSummary/TransactionHistories";
import { fetchUserData } from "../../endpoint";
import { useAuth } from "../Authentication/AuthContext";

export default function Summary() {
  const { token } = useAuth()
  const [userHistory, setUserHistory] = useState([])

  const handleFetchUserData = async () => {
    try {
      const data = await fetchUserData(token);
      console.log('Dados do usuário:', data);
      setUserHistory(data.history)
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  useEffect(() => {handleFetchUserData()}, []);

  return (
    <div className="bg-[#D8FDFF] w-full min-h-[calc(100vh-96px)]">
      <div className="w-full py-12 px-4 lg:px-8
        flex flex-col lg:flex-row justify-center gap-8
        max-w-[1024px] mx-auto
      ">
        <div className="flex flex-col gap-8 lg:flex-1 w-full h-full">
          <div className="w-full p-4 rounded-md bg-white lg:flex-1">
            <LineChart
              transactions={userHistory}
            />
          </div>
          <div className="w-full p-4 rounded-md bg-white">
            <PizzaChart
              transactions={userHistory}
            />
          </div>
        </div>
        <div className="p-4 rounded-md bg-white lg:flex-1 w-full">
          <TransactionHistories
            transactions={userHistory}
            setTransactions={setUserHistory}
          />
        </div>
      </div>
    </div>
  )
}