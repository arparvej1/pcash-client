import { FaSignOutAlt } from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const { user, logOut } = useAuth();
  const location = useLocation();
  // const { isAdmin, adminLoading, isAgent, agentLoading, isAgentOrAdmin, agentOrAdminLoading } = useUserPower();
  const isAdmin = true;

  const navLinks = <>
    <li><NavLink to='/'>হোম</NavLink></li>
    <li><Link className={`${location.pathname === "/dashboard" ? 'active' : undefined}`} to='/dashboard'>ড্যাশবোর্ড</Link></li>
    <li><NavLink to='/profile'>Profile</NavLink></li>
    {
      isAdmin && <>
        <li className="bg-info text-info-content text-center font-semibold text-base py-1">Admin</li>
        <li><NavLink to='/dashboard/add-agent'>প্রতিনিধি যোগ করুন</NavLink></li>
        <li>
          <span onClick={() => logOut()} className='ml-2 btn md:text-lg'>LogOut <FaSignOutAlt /></span>
        </li>
      </>
    }
  </>

  return (
    <div className="md:h-screen bg-base-300 text-base-content">
      <ul className="menu flex flex-row md:flex-col flex-wrap">
        {navLinks}
      </ul>
    </div>
  );
};

export default Sidebar;