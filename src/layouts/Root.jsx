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
          <Navbar></Navbar>
        </div>
        <div className="grid md:grid-cols-6">
          <div className="col-span-1">
            <Sidebar></Sidebar>
          </div>
          <div className="md:col-span-5 max-w-screen-xl 2xl:px-0 bg-green-400">
            <div className="p-3">
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Root;