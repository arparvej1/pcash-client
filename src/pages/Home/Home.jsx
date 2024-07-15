import { Helmet } from "react-helmet-async";
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
      <button className="btn btn-primary" onClick={clickMe}>Click Me</button>
    </div>
  );
};

export default Home;