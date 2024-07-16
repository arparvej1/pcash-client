import { Helmet } from "react-helmet-async";
import TransactionTable from "../../../hooks/components/TransactionTable";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const AgentTransactionsHistory = () => {
  const axiosSecure = useAxiosSecure();
  const [myTransactions, setMyTransactions] = useState([]);

  useEffect(() => {
    // --------- send server start -----
    axiosSecure.get(`/my-transactions`)
      .then(function (response) {
        console.log(response.data);
        setMyTransactions(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    // --------- send server end -----
  }, []);
  
  return (
    <div>
      <Helmet>
        <title> Transactions History | pCash </title>
      </Helmet>
      <h3 className="font-semibold text-2xl text-center my-3 text-black">Transactions History</h3>

      <div className="container mx-auto p-4">
        {/* <h1 className="text-2xl font-semibold mb-4">Transaction History</h1> */}
        <TransactionTable transactions={myTransactions.slice().reverse().slice(0, 20)} />
      </div>
    </div>
  );
};

export default AgentTransactionsHistory;