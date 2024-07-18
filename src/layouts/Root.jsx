import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Shared/Sidebar";
import Navbar from "../pages/Shared/Navbar";
import useAuth from "../hooks/useAuth";

const Root = () => {
  const { loading } = useAuth();
  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    )
  }
  return (
    <>
      <div className="max-w-screen-xl mx-5 xl:px-5 2xl:px-0 xl:mx-auto border-4 border-green-400">
        <div className="max-w-full bg-neutral">
          <Navbar />
        </div>
        <div className="md:grid md:grid-cols-6">
          <div className="col-span-1">
            <Sidebar />
          </div>
          <div className="md:col-span-5 max-w-screen-xl 2xl:px-0 bg-green-400 flex flex-col min-h-fit">
            <div className="flex-grow p-3">
              <Outlet />
            </div>
            <footer className="footer footer-center bg-base-300 text-base-content p-4">
              <aside>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by pCash</p>
              </aside>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Root;