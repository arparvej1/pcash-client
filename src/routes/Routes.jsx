import {
  createBrowserRouter,
} from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Profile from "../pages/Profile/Profile";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
// import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <PrivateRoutes><Home></Home></PrivateRoutes>
      },
      {
        path: '/profile',
        // element: <Profile></Profile>
        element: <PrivateRoutes><Profile></Profile></PrivateRoutes>
      },
    ]
  },
  // {
  //   path: 'dashboard',
  //   element: <DashboardLayout></DashboardLayout>,
  //   children: [
  //     {
  //       path: '',
  //       // element: <DashBoard></DashBoard>
  //       element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>
  //     },
  //     // ------------- user dashboard start -----------------

  //     // ------------- user dashboard end -----------------
  //     // ------------- agent dashboard start -----------------

  //     // ------------- agent dashboard end -----------------
  //     // ------------- admin dashboard start -----------------

  //     // ------------- admin dashboard end -----------------
  //   ]
  // },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '/register',
    element: <Register></Register>
  }
]);

export default router;
