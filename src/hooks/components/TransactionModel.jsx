import PropTypes from "prop-types";
import { useState } from "react";
import useAuth from "../useAuth";
import { ToastContainer } from "react-toastify";

const TransactionModel = ({ transaction }) => {
  const { user } = useAuth();

  const {
    transactionId,
    senderMobile,
    receiverMobile,
    transactionType,
    amount,
    fee,
    transactionTime,
    status,
  } = transaction;

  const [copied, setCopied] = useState(false);

  const isRejected = status === "rejected";

  const displayType =
    user.role === "user" &&
    receiverMobile === user.mobileNumber &&
    transactionType === "Send Money"
      ? "Received Money"
      : transactionType;

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(transactionId)
      .then(() => {
        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div>
      <dialog id="transactionModel" className="modal backdrop:bg-black/50">
        <div className="modal-box w-11/12 max-w-md p-0 overflow-hidden rounded-3xl">
          {/* =========================
              HEADER
          ========================== */}
          <div
            className={
              isRejected
                ? "relative px-5 pt-5 pb-5 text-center text-white bg-gradient-to-br from-red-600 via-red-500 to-rose-500"
                : "relative px-5 pt-5 pb-5 text-center text-white bg-gradient-to-br from-emerald-600 via-green-500 to-teal-500"
            }
          >
            {/* Close Button */}
            <form method="dialog">
              <button
                type="submit"
                className="absolute right-3 top-3 btn btn-sm btn-circle bg-white/10 hover:bg-white/20 border-none text-white"
              >
                ✕
              </button>
            </form>

            {/* Status Icon */}
            <div className="flex justify-center mb-3">
              <div className="w-16 h-16 rounded-full bg-white/20 border border-white/30 flex items-center justify-center shadow-lg">
                <div
                  className={
                    isRejected
                      ? "w-12 h-12 rounded-full bg-white flex items-center justify-center text-3xl font-bold text-red-500"
                      : "w-12 h-12 rounded-full bg-white flex items-center justify-center text-3xl font-bold text-emerald-500"
                  }
                >
                  {isRejected ? "✕" : "✓"}
                </div>
              </div>
            </div>

            {/* Transaction Type */}
            <h3 className="font-bold text-2xl md:text-3xl leading-tight">
              {displayType}
              {isRejected ? " Failed" : ""}
            </h3>

            {/* Status */}
            <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/20">
              <span className="w-2 h-2 rounded-full bg-white"></span>

              <span className="text-xs font-medium capitalize">{status}</span>
            </div>

            {/* Transaction Time */}
            <p className="mt-2 text-xs text-white/85">{transactionTime}</p>
          </div>

          {/* =========================
              AMOUNT
          ========================== */}
          <div className="px-5 pt-5">
            <div
              className={
                isRejected
                  ? "rounded-2xl p-4 text-center border bg-red-50 border-red-100"
                  : "rounded-2xl p-4 text-center border bg-emerald-50 border-emerald-100"
              }
            >
              <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
                Amount
              </p>

              <p
                className={
                  isRejected
                    ? "mt-0.5 text-3xl md:text-4xl font-extrabold text-red-600"
                    : "mt-0.5 text-3xl md:text-4xl font-extrabold text-emerald-600"
                }
              >
                ৳ {Number(amount).toLocaleString("en-BD")}
              </p>
            </div>
          </div>

          {/* =========================
              DETAILS
          ========================== */}
          <div className="px-5 py-4">
            <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
              {/* FROM */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100">
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-gray-400">
                    From
                  </p>

                  <p className="text-xs text-gray-500 mt-0.5">{senderMobile}</p>
                </div>

                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                  <span className="text-xs">📤</span>
                </div>
              </div>

              {/* TO */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100">
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-gray-400">
                    To
                  </p>

                  <p className="text-sm font-bold text-gray-800 mt-0.5">
                    {receiverMobile}
                  </p>
                </div>

                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                  <span className="text-xs">📥</span>
                </div>
              </div>

              {/* TRANSACTION ID */}
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-[11px] uppercase tracking-wide text-gray-400">
                  Transaction ID
                </p>

                <div className="flex items-center gap-2 mt-1.5">
                  <p className="font-mono text-xs font-semibold text-gray-700 break-all flex-1">
                    {transactionId}
                  </p>

                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className={
                      copied
                        ? "shrink-0 btn btn-xs btn-success text-white rounded-lg"
                        : "shrink-0 btn btn-xs btn-outline rounded-lg"
                    }
                  >
                    {copied ? "✓" : "Copy"}
                  </button>
                </div>

                {copied && (
                  <p className="text-[11px] text-emerald-600 mt-1 font-medium">
                    Transaction ID copied successfully!
                  </p>
                )}
              </div>

              {/* FEE */}
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-gray-500">Fee</span>

                <span className="text-sm font-semibold text-gray-800">
                  ৳{" "}
                  {Number(fee) % 1 > 0
                    ? Number(fee).toFixed(2)
                    : Number(fee).toLocaleString("en-BD")}
                </span>
              </div>
            </div>
          </div>

          {/* =========================
              FOOTER
          ========================== */}
          <div className="px-5 pb-4">
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
              <span>🔒</span>
              <span>Secure Transaction</span>
            </div>
          </div>
        </div>

        <ToastContainer />
      </dialog>
    </div>
  );
};

TransactionModel.propTypes = {
  transaction: PropTypes.object,
};

export default TransactionModel;
