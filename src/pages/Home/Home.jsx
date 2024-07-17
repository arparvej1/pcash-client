import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";

const Home = () => {
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
    <div>
      <Helmet>
        <title>pCash</title>
      </Helmet>
      <div className="text-black text-2xl font-semibold">
        Hello, {user?.name}!
      </div>
      <div className='flex flex-col md:flex-row items-center gap-5 bg-base-200 p-8 mt-5 rounded-xl'>
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
          <div className='flex justify-center md:justify-end'>
            <div className='flex flex-col min-w-48 items-center font-bold text-xl bg-accent text-accent-content py-2 px-4 rounded-xl'>
              <p>Balance</p>
              <div className="divider my-0"></div>
              <p className='cursor-pointer w-full text-center' onClick={() => setShowBalanceThis(!showBalanceThis)}>
                <span>{showBalanceThis ? parseFloat(user?.balance).toFixed(2) : "Tap for Balance"}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;