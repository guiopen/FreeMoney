import LineChart from "../../components/UserSummary/LineChart";
import PizzaChart from "../../components/UserSummary/PizzaChart";
import TransactionHistories from "../../components/UserSummary/TransactionHistories";

export default function Summary() {
  return (
    <div className="w-screen min-h-[calc(100vh-96px)] py-24 px-4 lg:px-8
      bg-[#D8FDFF] 
      flex flex-col lg:flex-row justify-center gap-8
    ">
      <div className="flex flex-col gap-8 lg:flex-1 w-full">
        <div className="w-full p-4 rounded-md bg-white max-lg:flex-1 h-[50%]">
          <LineChart />
        </div>
        <div className="w-full p-4 rounded-md bg-white h-[50%]">
          <PizzaChart />
        </div>
      </div>
      <div className="p-4 rounded-md bg-white lg:flex-1 w-full">
        <TransactionHistories />
      </div>
    </div>
  )
}