import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';


const ErrorPage = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     navigate('/');
  //   }, 100);
  //   return () => clearTimeout(timeout); // Clean up the timeout on unmount if necessary
  // }, []);
  return (
    <>
      <Helmet>
        <title> 404 error | Page Not Found! | pCash </title>
      </Helmet>
      <div className="max-w-screen-xl mx-5 lg:mx-auto flex justify-center my-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    </>
  );
};

export default ErrorPage;