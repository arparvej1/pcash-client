import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Home = () => {

  return (
    <div>
      <Helmet>
        <title>pCash</title>
      </Helmet>
      <div>
        
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