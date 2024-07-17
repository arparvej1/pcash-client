import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import RequestTransactionTable from "../../../hooks/components/RequestTransactionTable";
import { toast } from "react-toastify";

const CashOutManage = () => {
  const { user, onAuthStateChanged } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [myRequestTransactions, setMyRequestTransactions] = useState([]);

  const loadTransactions = () => {
    // --------- send server start -----
    axiosSecure.get(`/cash-out-request-transactions`)
      .then(function (response) {
        // console.log(response.data);
        setMyRequestTransactions(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    // --------- send server end -----
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleAcceptCashOut = (transaction) => {
    console.log(transaction);
    // --------- send server start -----
    axiosSecure.post(`/cash-out-accept`, transaction)
      .then(function (response) {
        // console.log(response.data);
        setMyRequestTransactions(response.data);
        onAuthStateChanged();
        toast.success('Cash Out Successfully!');
      })
      .catch(function (error) {
        if (error.response.data.slice(0, 1) !== '<') {
          toast.warn(error.response.data);
        } else {
          toast.error('Cash Out failed!');
        }
        console.log(error);
      });
    // --------- send server end -----
  }

  return (
    <div>
      <Helmet>
        <title> CashOut Manage | pCash </title>
      </Helmet>
      <h3 className="font-semibold text-2xl text-center my-3 text-black">CashOut Manage</h3>

      <div className="container mx-auto p-4">
        <RequestTransactionTable
          transactions={myRequestTransactions.slice().reverse()}
          handleAccept={handleAcceptCashOut}
        />
      </div>
    </div>
  );
};

export default CashOutManage;