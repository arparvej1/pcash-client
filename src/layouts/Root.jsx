import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Shared/Sidebar";

const Root = () => {
  return (
    <>
      <div className="max-w-screen-xl mx-5 xl:px-5 2xl:px-0 xl:mx-auto">
        {/* <div className="max-w-full bg-neutral text-neutral-content p-2">
          <Navbar></Navbar>
        </div> */}
        <div className="grid md:grid-cols-6">
          <div className="col-span-1">
            <Sidebar></Sidebar>
          </div>
          <div className="md:col-span-5 max-w-screen-xl 2xl:px-0 bg-green-400">
            <Outlet></Outlet>
          </div>
        </div>
      </div>

    </>
  );
};

export default Root;