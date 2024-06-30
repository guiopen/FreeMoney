export const calculateBalance = (transactions) => {
    let balance = 0;

    for (const transaction of transactions) {
      if (transaction.expense) {
        balance -= transaction.value;
      } else {
        balance += transaction.value;
      }
    }

    return balance;
  };