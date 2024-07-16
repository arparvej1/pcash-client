import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from '../../provider/AuthProvider';

const AgentRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className='flex justify-center'>
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (user && user.role === 'agent') {
    return children;
  }

  return <Navigate state={location.pathname} to='/' replace></Navigate>;
};

AgentRoutes.propTypes = {
  children: PropTypes.node
}

export default AgentRoutes;