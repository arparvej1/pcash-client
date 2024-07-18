import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import TransactionTable from "../../../hooks/components/TransactionTable";
import PendingAccount from "../../../hooks/components/PendingAccount";

const UserTransactionsHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [myTransactions, setMyTransactions] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    // --------- send server start -----
    axiosSecure.get(`/my-transactions`)
      .then(function (response) {
        // console.log(response.data);
        setMyTransactions(response.data);
        setDataLoading(false);
      })
      .catch(function (error) {
        setDataLoading(false);
        console.log(error);
      });
    // --------- send server end -----
  }, []);

  if (user.status === 'pending') return <PendingAccount />;

  return (
    <div>
      <Helmet>
        <title> Transactions History | pCash </title>
      </Helmet>
      <h3 className="font-semibold text-2xl text-center my-3 text-black">Transactions History</h3>

      <div>
        <TransactionTable transactions={myTransactions.slice().reverse().slice(0, 10)} />
        {
          dataLoading ? <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
            :
            myTransactions.length < 1 ?
              <div>
                No Data Found
              </div>
              :
              <></>
        }
      </div>
    </div>
  );
};

export default UserTransactionsHistory;