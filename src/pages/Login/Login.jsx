import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import { Helmet } from 'react-helmet-async';
import { GoLock } from 'react-icons/go';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import { MdMailOutline } from 'react-icons/md';
import { AuthContext } from '../../provider/AuthProvider';
import axios from 'axios';

const Login = () => {
  const { user, token, setToken } = useContext(AuthContext);
  const [textDot, setTextDot] = useState('');
  const navigate = useNavigate();
  const [loginFailedMsg, setLoginFailedMsg] = useState('');
  const location = useLocation();

  const { register, setFocus } = useForm();
  useEffect(() => {
    setFocus("focusEmail");
  }, [setFocus]);

  const [pinShow, setPinShow] = useState(false);
  const handlePinShow = () => {
    setPinShow(!pinShow);
  }

  const handleLogin = (e) => {
    e.preventDefault();
    const emailOrMobile = e.target.emailOrMobile.value;
    const pin = e.target.pin.value;
    const userInfo = { emailOrMobile, pin }

    const westernRegex = /^01\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!westernRegex.test(emailOrMobile) && !emailRegex.test(emailOrMobile)) {
      setLoginFailedMsg('Please enter correct information.');
      toast.error('Please enter a valid mobile number or email.');
      return;
    }

    // PIN validation checking
    if (!/^\d{5}$/.test(pin)) {
      setLoginFailedMsg('Please enter correct information.');
      toast.error('Invalid PIN.');
      return;
    }

    setTextDot('...');

    console.log(userInfo);
    // --------- send server start -----
    axios.post(`${import.meta.env.VITE_VERCEL_API}/userLogin`, userInfo)
      .then(function (response) {
        console.log(response.data);
        // e.target.reset();
        if (response.data.token) {
          localStorage.setItem('access-token', response.data.token);
          setToken(response.data.token);
        }
        setLoginFailedMsg('');
        setTextDot('');
        toast.success('Login Successfully!');
        navigate(location?.state ? location.state : '/');
        console.log('Login Successfully!');
      })
      .catch(function (error) {
        setTextDot('');
        console.log(error);
        if (error?.response?.data === 'user blocked') {
          toast.error('Login failed! This User Blocked.');
        } else {
          setLoginFailedMsg('Please enter correct information.');
          toast.error('Login failed!');
        }
      });
    // --------- send server end -----

    console.log('Request Login');
  }

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, token]);

  return (
    <>
      <Helmet>
        <title> Login | pCash </title>
      </Helmet>
      <div className='flex flex-col md:flex-row max-w-7xl mx-3 md:mx-auto mt-8'>
        <div className='md:w-2/3 lg:w-2/5 rounded-2xl bg-base-200 p-5 md:p-10 md:mx-auto bg-[url("https://wallpapercave.com/wp/wp2939993.jpg")] bg-cover'>
          <h3 className="text-3xl font-semibold mb-6 text-center text-white">
            Login Now!
          </h3>
          <form onSubmit={handleLogin} className='flex flex-col gap-3 '>
            <div>
              <span className='text-white'>Email or Mobile Number:</span>
              <label className="flex items-center input input-bordered gap-3" htmlFor="emailOrMobile">
                <MdMailOutline />
                <input type="text" {...register("focusEmail")} name='emailOrMobile' placeholder="Enter your email or mobile number" className="w-full" required />
              </label>
            </div>
            <div>
              <span className='text-white'>PIN:</span>
              <label className="flex items-center input input-bordered gap-3" htmlFor="email">
                <GoLock />
                <div className="flex justify-between items-center w-full bg-transparent">
                  <input type={pinShow ? 'text' : 'password'} name='pin' placeholder="pin" className="w-full" required /><span onClick={handlePinShow}>{pinShow ? <VscEye /> : <VscEyeClosed />}</span>
                </div>
              </label>
              {loginFailedMsg && <div className='mt-2 bg-blue-300 bg-opacity-75 p-3 rounded-2xl text-red-500'>{loginFailedMsg}</div>}
            </div>
            <div>
              <input type="submit" value={`Login${textDot}`} className="btn btn-accent w-full  font-semibold text-xl" />
            </div>
          </form>
          <div className="mt-4 text-sm text-gray-300 text-center">
            <p>
              New user?{" "}
              <Link state={location?.state} to='/register' className="font-semibold hover:underline">Register here</Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;