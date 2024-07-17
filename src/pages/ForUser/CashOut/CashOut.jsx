import { toast, ToastContainer } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { GoLock } from "react-icons/go";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";

const CashOut = () => {
  const { onAuthStateChanged } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loginFailedMsg, setLoginFailedMsg] = useState('');

  const [pinShow, setPinShow] = useState(false);
  const handlePinShow = () => {
    setPinShow(!pinShow);
  }

  const handleCashOut = (e) => {
    e.preventDefault();
    const form = e.target;
    const emailOrMobile = form.emailOrMobile.value;
    const amount = form.amount.value;
    const pin = e.target.pin.value;

    const westernRegex = /^01\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!westernRegex.test(emailOrMobile) && !emailRegex.test(emailOrMobile)) {
      toast.error('Please enter a valid mobile number or email.');
      return;
    }

    if (!/^\d+$/.test(amount) || amount < 1) {
      toast.error("Invalid amount. Please enter correct amount.");
      return;
    }

    // PIN validation checking
    if (!/^\d{5}$/.test(pin)) {
      setLoginFailedMsg('Please enter correct pin.');
      toast.error('Invalid PIN.');
      return;
    } else {
      setLoginFailedMsg('');
    }

    const cashOutInfo = {
      emailOrMobile,
      amount: parseInt(amount),
      pin
    }
    console.log(cashOutInfo);

    // --------- send server start -----
    axiosSecure.post(`/cash-out-request`, cashOutInfo)
      .then(function (response) {
        console.log(response.data);
        e.target.reset();
        if (response.data.token) {
          console.log(response.data);
        }
        toast.success('Cash Out Request Successfully!');
        onAuthStateChanged();
        // navigate(location?.state ? location.state : '/');
        console.log('Cash Out Request Successfully!');
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
    console.log('Request Cash Out.');

  }

  return (
    <div>
      <Helmet>
        <title> Cash Out | pCash </title>
      </Helmet>
      <h3 className="font-semibold text-2xl text-center my-3 text-black">Cash Out</h3>
      <div>
        <form
          onSubmit={handleCashOut}
          className="md:w-3/4 mx-auto gap-5 text-black">
          <div className="border-2 border-primary rounded-xl p-5 md:w-2/3 lg:w-3/5 mx-auto">
            <label className="form-control w-full">
              <div>
                <span className="font-semibold">Email or Mobile Number</span>
              </div>
              <input type="text" name="emailOrMobile" placeholder="Enter email or mobile number" className="input input-bordered w-full" required />
            </label>
            <br />
            <label className="form-control w-full">
              <div>
                <span className="font-semibold">Amount (Each cash out incurs a 1.5% fee.)</span>
              </div>
              <input type="text" name="amount" placeholder="Enter amount" className="input input-bordered w-full" />
            </label>
            <br />
            <div>
              <span className="font-semibold">PIN:</span>
              <label className="flex items-center input input-bordered gap-3" htmlFor="email">
                <GoLock />
                <div className="flex justify-between items-center w-full bg-transparent">
                  <input type={pinShow ? 'text' : 'password'} name='pin' placeholder="pin" className="w-full" required /><span onClick={handlePinShow}>{pinShow ? <VscEye /> : <VscEyeClosed />}</span>
                </div>
              </label>
              {loginFailedMsg && <div className='mt-2 bg-blue-300 bg-opacity-75 p-3 rounded-2xl text-red-500'>{loginFailedMsg}</div>}
            </div>
            <br />
            <input type="submit" value={'Cash Out Request'} className="btn bg-secondary text-secondary-content text-lg w-full" />
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CashOut;