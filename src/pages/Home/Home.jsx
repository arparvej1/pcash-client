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
        <Link to="/register">Register</Link>
      </p>
      <br />
      <button className="btn btn-primary" onClick={clickMe}>Click Me</button>
    </div>
  );
};

export default Home;