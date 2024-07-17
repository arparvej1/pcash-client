import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import TransactionTable from "../../../hooks/components/TransactionTable";

const AllTransactionsHistory = () => {
  const axiosSecure = useAxiosSecure();
  const [allTransactions, setAllTransactions] = useState([]);

  useEffect(() => {
    // --------- send server start -----
    axiosSecure.get(`/all-transactions`)
      .then(function (response) {
        console.log(response.data);
        setAllTransactions(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    // --------- send server end -----
  }, []);

  return (
    <div>
      <Helmet>
        <title> All Transactions History | pCash </title>
      </Helmet>
      <h3 className="font-semibold text-2xl text-center my-3 text-black">All Transactions History</h3>

      <div>
        <TransactionTable transactions={allTransactions.slice().reverse()} />
      </div>
    </div>
  );
};

export default AllTransactionsHistory;