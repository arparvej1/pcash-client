import { FaSignOutAlt } from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const { user, logOut } = useAuth();
  const location = useLocation();
  // const { isAdmin, adminLoading, isAgent, agentLoading, isAgentOrAdmin, agentOrAdminLoading } = useUserPower();
  const isAdmin = true;

  const navLinks = <>
    <li><NavLink to='/'>Home</NavLink></li>
    {/* <li><Link className={`${location.pathname === "/dashboard" ? 'active' : undefined}`} to='/dashboard'>Dashboard</Link></li> */}
    <li><NavLink to='/profile'>Profile</NavLink></li>
    {
      user && <>
        <li className="bg-info text-info-content text-center font-semibold text-base py-1">Normal User</li>
        <li><NavLink to='/send-money'>Send Money</NavLink></li>
        <li><NavLink to='/cash-out'>Cash Out</NavLink></li>
        <li><NavLink to='/cash-in'>Cash In</NavLink></li>
        <li><NavLink to='/transactions-history'>Transaction sHistory</NavLink></li>
        
      </>
    }
    {
      isAdmin && <>
        <li className="bg-info text-info-content text-center font-semibold text-base py-1">Admin</li>
        <li><NavLink to='/add-agent'>Add Agent</NavLink></li>
        <li>
          <span onClick={() => logOut()} className='ml-2 btn md:text-lg'>LogOut <FaSignOutAlt /></span>
        </li>
      </>
    }
  </>

  return (
    <div className="md:h-full bg-base-300 text-base-content">
      <ul className="menu flex flex-row md:flex-col flex-wrap">
        {navLinks}
      </ul>
    </div>
  );
};

export default Sidebar;