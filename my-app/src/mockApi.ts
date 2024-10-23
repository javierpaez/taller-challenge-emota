export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
}

const transactions: Transaction[] = [
  { id: "1", date: "2024-10-01", description: "Lorem Ipsum one", amount: 50.5 },
  { id: "2", date: "2024-10-02", description: "Lorem Ipsum two", amount: 20.5 },
  {
    id: "3",
    date: "2023-10-03",
    description: "Lorem Ipsum three",
    amount: 150.5,
  },
];

export const fetchTransactions = (): Promise<Transaction[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) {
        resolve(transactions);
      } else {
        reject(new Error("Error"));
      }
    }, 500);
  });
};
