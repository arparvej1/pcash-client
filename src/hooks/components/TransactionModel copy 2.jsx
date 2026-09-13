import PropTypes from 'prop-types';
import { useState } from 'react';
import useAuth from '../useAuth';
import { ToastContainer } from 'react-toastify';

const TransactionModel = ({ transaction }) => {
  const { user } = useAuth();
  const { transactionId, senderMobile, receiverMobile, transactionType, amount, fee, transactionTime, status } = transaction;

  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transactionId)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="transactionModel" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          <div className='flex flex-col justify-center items-center mb-2 gap-2'>
            <h3 className={`font-bold text-xl md:text-2xl lg:text-4xl ${status === 'rejected' ? 'text-red-700' : 'text-green-700'}`}>{user.role === 'user' && receiverMobile === user.mobileNumber && transactionType === 'Send Money' ? 'Received Money' : transactionType} {status === 'rejected' ? 'Failed' : ''}</h3>
            <p className={`capitalize ${status === 'rejected' ? 'text-red-700' : ''}`}>{status}</p>
            <p className={`capitalize ${status === 'rejected' ? 'text-red-700' : ''}`}>{transactionTime}</p>
          </div>
          <div className={`flex justify-center ${status === 'rejected' ? 'bg-red-300' : ''}`}>
            <div className="overflow-x-auto">
              <table className="table">
                <tbody>
                  <tr className="font-bold text-lg">
                    <th className='text-right'>Mobile Number:</th>
                    <td>{transaction.receiverMobile === user.mobileNumber ? transaction.senderMobile : transaction.receiverMobile}</td>
                  </tr>
                  <tr>
                    <th className='text-right'>TransactionId:</th>
                    <td onClick={copyToClipboard} className="cursor-pointer hover:text-blue-500 relative">
                      {transactionId}
                      {copied && (
                        <span className="absolute left-0 top-full mt-1 px-2 py-1 bg-green-200 text-green-800 text-xs rounded">
                          Copied!
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th className='text-right'>Amount:</th>
                    <td>{amount}</td>
                  </tr>
                  <tr>
                    <th className='text-right'>Fee:</th>
                    <td>{fee % 1 > 0 ? parseFloat(fee).toFixed(2) : fee}</td>
                  </tr>
                  <tr>
                    <th className='text-right'>My Number:</th>
                    <td>{user.mobileNumber}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <ToastContainer />
      </dialog>
    </div>
  );
};

TransactionModel.propTypes = {
  transaction: PropTypes.object
}

export default TransactionModel;