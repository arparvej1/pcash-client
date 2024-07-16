import { FaSignOutAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const { user, logOut } = useAuth();

  const navLinks = <>
    <li><NavLink to='/'>Home</NavLink></li>
    <li><NavLink to='/profile'>Profile</NavLink></li>
    {
      user && user.role === 'user'  && <>
        <li className="bg-info text-info-content text-center font-semibold text-base py-1 hidden md:inline-block">Normal User</li>
        <li><NavLink to='/send-money'>Send Money</NavLink></li>
        <li><NavLink to='/cash-out'>Cash Out</NavLink></li>
        <li><NavLink to='/cash-in'>Cash In</NavLink></li>
        <li><NavLink to='/transactions-history'>Transactions History</NavLink></li>
      </>
    }
    {
      user && user.role === 'agent' && <>
        <li className="bg-info text-info-content text-center font-semibold text-base py-1 hidden md:inline-block">Agent</li>
        <li><NavLink to='/cash-out-manage'>Cash Out Manage</NavLink></li>
        <li><NavLink to='/cash-in-manage'>Cash In Manage</NavLink></li>
        <li><NavLink to='/agent-transactions-history'>Transactions History</NavLink></li>

      </>
    }
    {
      user && user.role === 'admin' && <>
        <li className="bg-info text-info-content text-center font-semibold text-base py-1 hidden md:inline-block">Admin</li>
        <li><NavLink to='/user-manage'>User Manage</NavLink></li>
        <li><NavLink to='/all-transactions-history'>All Transactions History</NavLink></li>
      </>
    }
    <li>
      <span onClick={() => logOut()} className='ml-2 btn md:text-lg'>LogOut <FaSignOutAlt /></span>
    </li>
  </>

  return (
    <div className="md:h-full bg-base-300 text-base-content">
      <ul className="menu flex flex-row md:flex-col flex-wrap gap-1">
        {navLinks}
      </ul>
    </div>
  );
};

export default Sidebar;