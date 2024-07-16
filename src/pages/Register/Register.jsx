import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import { Helmet } from 'react-helmet-async';
import { CiUser } from "react-icons/ci";
import { TbPhotoEdit } from "react-icons/tb";
import { MdMailOutline } from "react-icons/md";
import { GoLock } from "react-icons/go";
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import axios from 'axios';
import { FaMobileAlt } from 'react-icons/fa';
import useUploadImage from '../../hooks/useUploadImage';


const Register = () => {
  const { user } = useContext(AuthContext);
  const [textDot, setTextDot] = useState('');
  const [pinMsg, setPinMsg] = useState('');
  const [errorMobile, setErrorMobile] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const uploadImage_imgbb = useUploadImage();

  const [pinShow, setPinShow] = useState(false);
  const handlePinShow = () => {
    setPinShow(!pinShow);
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    const uploadImage = e.target.profilePicture;
    const profilePicture = await uploadImage_imgbb(uploadImage);
    if (!profilePicture) return;

    const name = e.target.name.value;
    const email = e.target.email.value;
    const mobileNumber = e.target.mobileNumber.value;
    const pin = e.target.pin.value;
    const userType = e.target.userType.value;
    const newRegister = { name, photo_url: profilePicture, email, mobileNumber, pin, userType };

    const westernRegex = /^01\d{9}$/;
    if (!westernRegex.test(mobileNumber)) {
      setErrorMobile('Please correct the mobile number.');
      toast.error('Please correct the mobile number.');
      return;
    } else {
      setErrorMobile('');
    }

    // PIN validation checking
    if (!/^\d{5}$/.test(pin)) {
      toast.error('Invalid PIN. Please enter a 5-digit number.');
      setPinMsg('Invalid PIN. Please enter a 5-digit number.');
      console.log(pinMsg);
      return;
    } else {
      setPinMsg('');
    }

    setTextDot('...');

    console.log(newRegister);
    // --------- send server start -----
    axios.post(`${import.meta.env.VITE_VERCEL_API}/userRegister`, newRegister)
      .then(function (response) {
        console.log(response.data);
        e.target.reset();
        setTextDot('');
        toast.success('Registration Successfully!');
        console.log('Registration Successfully!');
        navigate(location?.state ? location.state : '/');
      })
      .catch(function (error) {
        setTextDot('');
        console.log(error);
        if (error.response.data.error) {
          toast.error(error.response.data.error);
        } else {
          toast.error('Registration failed!');
        }
      });
    // --------- send server end -----

    console.log('Request Registration');
  }

  const { register, setFocus } = useForm()
  useEffect(() => {
    setFocus("fullName")
  }, [setFocus])

  // useEffect(() => {
  //   if (user) {
  //     navigate('/');
  //   }
  // }, [user]);

  return (
    <>
      <Helmet>
        <title> Register | pCash </title>
      </Helmet>

      <div className='flex flex-col md:flex-row max-w-7xl mx-auto mt-2'>
        {/* ------ */}
        <div className='md:w-2/3 lg:w-2/5 rounded-2xl bg-base-200 p-5 md:p-8 md:mx-auto bg-[url("https://wallpapercave.com/wp/wp2939993.jpg")] bg-cover'>
          <h3 className="text-3xl font-semibold mb-6 text-center text-white">
            New Account?
          </h3>
          <form onSubmit={handleRegister} className='flex flex-col gap-3 '>
            <div>
              <span className='text-white'>Full Name:</span>
              <label className="flex items-center input input-bordered gap-3" htmlFor="name">
                <CiUser />
                <input type="text" {...register("fullName")} name='name' placeholder="Full Name" className="w-full" required />
              </label>
            </div>
            <div>
              <span className='text-white'>Profile Picture:</span>
              <label htmlFor="profilePicture">
                <input type="file" name="profilePicture" className="file-input file-input-bordered w-full" />
              </label>
            </div>
            <div>
              <span className='text-white'>Email:</span>
              <label className="flex items-center input input-bordered gap-3" htmlFor="email">
                <MdMailOutline />
                <input type="email" name='email' placeholder="Email" className="w-full" required />
              </label>
            </div>
            <div>
              <span className='text-white'>Mobile Number:</span>
              <label className="flex items-center input input-bordered gap-3" htmlFor="email">
                <FaMobileAlt />
                <input type="text" name='mobileNumber' placeholder="Enter your mobile number" className="w-full" required />
              </label>
              {errorMobile && <div className='mt-2 bg-blue-300 bg-opacity-75 p-3 rounded-2xl text-red-500'>{errorMobile}</div>}
            </div>
            <div>
              <span className='text-white'>PIN:</span>
              <label className="flex items-center input input-bordered gap-3" htmlFor="email">
                <GoLock />
                <div className="flex justify-between items-center w-full bg-transparent">
                  <input type={pinShow ? 'text' : 'password'} name='pin' placeholder="pin" className="w-full" required /><span onClick={handlePinShow}>{pinShow ? <VscEye /> : <VscEyeClosed />}</span>
                </div>
              </label>
              {pinMsg && <div className='mt-2 bg-blue-300 bg-opacity-75 p-3 rounded-2xl text-red-500'>{pinMsg}</div>}
            </div>
            <div className='text-white flex gap-3 items-center'>
              <span>User Type:</span>
              <label className="flex items-center gap-3 border-2 p-2 bg-gray-600 rounded-xl">
                <input type="radio" name="userType" value="user" required />
                User
              </label>
              <label className="flex items-center gap-3 border-2 p-2 bg-gray-600 rounded-xl">
                <input type="radio" name="userType" value="agent" required />
                Agent
              </label>
            </div>
            <div>
              <input type="submit" value={`Register${textDot}`} className="btn btn-accent w-full font-semibold text-xl" />
            </div>
          </form>
          <div className="mt-4 text-sm text-gray-300 text-center">
            <p>
              Already have an account?{" "}
              <Link state={location?.state} to='/login' className="text-gray-200 font-semibold hover:underline">Login here</Link>
            </p>
          </div>
        </div>
      </div>
      <div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Register;