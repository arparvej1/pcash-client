import { Helmet } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();
  const [showBalanceThis, setShowBalanceThis] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (showBalanceThis) {
        setShowBalanceThis(false);
      }
    }, 5000);
    return () => clearTimeout(timeout); // Clean up the timeout on unmount if necessary
  }, [showBalanceThis]);

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
            <p>{user.mobileNumber}</p>
            <div className='flex'>
              {user.role === 'admin' && <p className='p-2 m-1 bg-success rounded-xl text-white font-semibold'>Admin</p>}
              {user.role === 'agent' && <p className='p-2 m-1 bg-success rounded-xl text-white font-semibold'>Agent</p>}
            </div>
          </div>
          <div className='text-right navbar-end'>
            <div className='flex justify-end'>
              <div className='flex flex-col min-w-48 items-center font-bold text-xl bg-accent text-accent-content py-2 px-4 rounded-xl'>
                <p>Balance</p>
                <div className="divider my-0"></div>
                <p className='cursor-pointer w-full text-center' onClick={() => setShowBalanceThis(!showBalanceThis)}>
                  <span>{showBalanceThis ? parseFloat(user?.balance).toFixed(2) : "Tap for Balance"}</span>
                </p>
              </div>
            </div>
            <div>
              <Link to='/update-profile' className='text-xl font-semibold underline btn btn-ghost text-blue-600'>Edit Profile</Link>
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
                <p className=' font-semibold'>{user?.creationTime || 'Not Found'}</p>
              </div>
              <div>
                <p>Last Login:</p>
                <p className=' font-semibold'>{user?.lastLogInTime}</p>
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