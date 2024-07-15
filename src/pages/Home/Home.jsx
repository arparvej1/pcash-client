import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {

  const clickMe = () => {
    console.log('object');
    toast.success('Click!')
  }

  return (
    <div>
      <Helmet>
        <title>pCash</title>
      </Helmet>
      <div>Hello pCash!</div>
      <br /><br />
      <p>
        <Link className="btn btn-primary" to="/register">Register</Link>
        <Link className="btn btn-primary" to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Home;