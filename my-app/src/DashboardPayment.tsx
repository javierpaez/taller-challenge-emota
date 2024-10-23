import { useEffect, useState } from "react";
import { fetchTransactions, Transaction } from "./mockApi";

const DashboardPayment = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);

  useEffect(() => {
    fetchTransactions()
      .then((data) => {
        setTransactions(data);
        setFilteredTransactions(data);
      })
      .catch((err) => setError(err));
  }, []);

  const handleFilter = () => {
    const filtered = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date).getTime();
      const start = startDate ? new Date(startDate).getTime() : null;
      const end = endDate ? new Date(endDate).getTime() : null;
      return (
        (!start || transactionDate >= start) && (!end || transactionDate <= end)
      );
    });

    setFilteredTransactions(filtered);
  };

  if (error) {
    return <p>Error</p>;
  }

  return (
    <div className="container">
      <h1>Payment Transactions</h1>

      <div>
        <label>
          Start Date:{" "}
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date:{" "}
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <button onClick={handleFilter}>Filter</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Description</th>
            <th>Amount (USD)</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>{transaction.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardPayment;
