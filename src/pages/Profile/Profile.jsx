import { Helmet } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useEffect, useState } from 'react';

const Profile = () => {
  const { user } = useAuth();
  // const { isAdmin, isAgent } = useUserPower();
  const isAdmin = true;
  const isAgent = true;
  const [showBalance, setShowBalance] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if(showBalance){
        setShowBalance(false);
      }
    }, 5000);
    return () => clearTimeout(timeout); // Clean up the timeout on unmount if necessary
  }, [showBalance]);

  return (
    <div className='md:4/5 mx-auto mb-5'>
      <Helmet>
        <title> My Profile | pCash </title>
      </Helmet>
      <div className='flex flex-col gap-3'>
        <h3 className='font-bold text-4xl  text-accent-content'>My Profile</h3>
        <div className='flex flex-col md:flex-row items-center gap-5 bg-base-200 p-8 rounded-xl'>
          <div className=''>
            <img className='w-32 h-32 rounded-full' src={user.photo_url ? user.photo_url : "https://i.ibb.co/ZT5tByN/avatar-15-blue.jpg"} alt={user.name} />
          </div>
          <div className='flex flex-col gap-2'>
            <h3 className='text-xl font-semibold'>{user.name}</h3>
            <p>{user.email}</p>
            <div className='flex'>
              {isAdmin && <p className='p-2 m-1 bg-success rounded-xl text-white font-semibold'>Admin</p>}
              {isAgent && <p className='p-2 m-1 bg-success rounded-xl text-white font-semibold'>Moderator</p>}
            </div>
          </div>
          <div className='text-right navbar-end'>
            <div className='flex justify-end'>
              <div className='flex flex-col min-w-48 items-center font-bold text-xl bg-accent text-accent-content py-2 px-4 rounded-xl'>
                <p>Balance</p>
                <div className="divider my-0"></div>
                <p className='cursor-pointer w-full text-center' onClick={() => setShowBalance(!showBalance)}>
                  <span>{showBalance ? user.balance : "Tap for Balance"}</span>
                </p>
              </div>
            </div>
            <div>
              {/* <Link to='/update-profile' className='text-xl font-semibold underline btn btn-ghost text-blue-600'>Edit Profile</Link> */}
            </div>
          </div>
        </div>
        <div className='grid lg:grid-cols-2 gap-3'>
          {/* ----- Personal Information ------ */}
          <div className='flex flex-col gap-3 md:gap-5 bg-base-200 p-6 md:p-8 rounded-xl'>
            <h3 className='font-semibold text-xl md:text-2xl underline'>Personal Information</h3>
            <div className='flex flex-col gap-3 md:text-xl'>
              <div>
                <p>Full Name:</p>
                <p className=' font-semibold'>{user.name || 'Full Name Not Found!'}</p>
              </div>
              <div>
                <p>Email:</p>
                <p className=' font-semibold'>{user.email}</p>
              </div>
            </div>
          </div>
          {/* ----- Accounts Information ------ */}
          <div className='flex flex-col  gap-3 md:gap-5 bg-base-200 p-6 md:p-8 rounded-xl'>
            <h3 className='font-semibold text-xl md:text-2xl underline'>Accounts Information</h3>
            <div className='flex flex-col gap-3 md:text-xl'>
              <div>
                <p>Account Creation Date & Time:</p>
                {/* <p className=' font-semibold'>{user.metadata.creationTime}</p> */}
              </div>
              <div>
                <p>Last Login:</p>
                {/* <p className=' font-semibold'>{user.metadata.lastSignInTime}</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;