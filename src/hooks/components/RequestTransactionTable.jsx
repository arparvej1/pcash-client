import PropTypes from 'prop-types';
import useAuth from '../useAuth';

const RequestTransactionTable = ({ transactions, handleAccept }) => {
  const { user } = useAuth();
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 table">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            <th className="text-center py-3 px-4 uppercase font-semibold text-sm">Transaction ID</th>
            {user.role === 'admin' && <th className="text-center py-3 px-4 uppercase font-semibold text-sm">Sender</th>}
            <th className="text-center py-3 px-4 uppercase font-semibold text-sm">Transaction Type</th>
            <th className="text-center py-3 px-4 uppercase font-semibold text-sm">{user.role === 'admin' ? 'Receiver' : 'Mobile Number'}</th>
            <th className="text-center py-3 px-4 uppercase font-semibold text-sm">Amount</th>
            <th className="text-center py-3 px-4 uppercase font-semibold text-sm">Fee</th>
            <th className="text-center py-3 px-4 uppercase font-semibold text-sm">Transaction Time</th>
            <th className="text-center py-3 px-4 uppercase font-semibold text-sm">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction._id} className="border-b border-gray-200 hover">
              <td className="text-left py-2 px-4">{transaction.transactionId}</td>
              {user.role === 'admin' && <td className="text-center py-2 px-4">{transaction?.senderMobile}</td>}
              <td className="text-center py-2 px-4">{user.role === 'user' && transaction.receiverMobile === user.mobileNumber ? transaction.transactionType === 'Bonus' ? 'Bonus' : 'Received Money' : transaction.transactionType}</td>


              {user.role === 'admin' && <td className="text-center py-2 px-4">{transaction.receiverMobile}</td>}
              {user.role !== 'admin' && <td className="text-center py-2 px-4">{transaction.receiverMobile === user.mobileNumber ? transaction.senderMobile : transaction.receiverMobile}</td>}


              <td className="text-center py-2 px-4">{transaction.amount}</td>
              <td className="text-center py-2 px-4">{transaction.fee}</td>
              <td className="text-center py-2 px-4">{transaction.transactionTime}</td>
              <td className="text-center py-2 px-4">
                <span
                  onClick={() => handleAccept(transaction)}
                  className={`${transaction.status === 'pending' ? 'cursor-pointer bg-blue-700 text-white btn' : ''}`}>{transaction.status === 'pending' ? 'Accept' : transaction.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

RequestTransactionTable.propTypes = {
  transactions: PropTypes.array,
  handleAccept: PropTypes.func
}

export default RequestTransactionTable;
