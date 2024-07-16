import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const [token, setToken] = useState(localStorage.getItem('access-token'));

  const logOut = () => {
    if (localStorage.getItem('access-token')) {
      localStorage.removeItem('access-token');
      setToken(null);
    }
  };

  const onAuthStateChanged = () => {
    if (token) {
      axiosPublic.post(`/userCheck`, { token })
        .then(function (response) {
          console.log(response.data);
          setUser(response.data); // Assuming user is authenticated based on response
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
          setLoading(false);
          setUser(null); // Set user as not authenticated on error
        });
    } else {
      setLoading(false);
      setUser(null); // No token found, user is not authenticated
    }
  }

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged();
  }, [token]);

  const authInfo = {
    user,
    loading,
    setToken,
    logOut,
    onAuthStateChanged
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
}

export default AuthProvider;