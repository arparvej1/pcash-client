import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  const { user } = useAuth();
  const [showBalance, setShowBalance] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (showBalance) {
        setShowBalance(false);
      }
    }, 5000);
    return () => clearTimeout(timeout); // Clean up the timeout on unmount if necessary
  }, [showBalance]);
  return (
    <div>
      <Helmet>
        <title>pCash</title>
      </Helmet>
      <div className="text-black text-2xl font-semibold">
        Hello, {user?.name}!
      </div>
    </div>
  );
};

export default Home;