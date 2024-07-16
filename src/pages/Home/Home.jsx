import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
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
      <div>
        Hello, {user.name}!
      </div>




      <br /><br />
      <p>
        <Link className="btn btn-primary" to="/register">Register</Link>
        <Link className="btn btn-primary" to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Home;