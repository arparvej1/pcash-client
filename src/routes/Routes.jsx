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
import SendMoney from "../pages/ForUser/SendMoney/SendMoney";
import CashIn from "../pages/ForUser/CashIn/CashIn";
import CashOut from "../pages/ForUser/CashOut/CashOut";
import UserTransactionsHistory from "../pages/ForUser/UserTransactionsHistory/UserTransactionsHistory";
import CashOutManage from "../pages/ForAgent/CashOutManage/CashOutManage";
import CashInManage from "../pages/ForAgent/CashInManage/CashInManage";
import AgentTransactionsHistory from "../pages/ForAgent/AgentTransactionsHistory/AgentTransactionsHistory";
import AllTransactionsHistory from "../pages/ForAdmin/AllTransactionsHistory/AllTransactionsHistory";
import UserManage from "../pages/ForAdmin/UserManage/UserManage";
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
        element: <PrivateRoutes><Profile></Profile></PrivateRoutes>
      },
      // ------------- user start -----------------
      {
        path: '/send-money',
        element: <PrivateRoutes><SendMoney></SendMoney></PrivateRoutes>
      },
      {
        path: '/cash-out',
        element: <PrivateRoutes><CashOut></CashOut></PrivateRoutes>
      },
      {
        path: '/cash-in',
        element: <PrivateRoutes><CashIn></CashIn></PrivateRoutes>
      },
      {
        path: '/transactions-history',
        element: <PrivateRoutes><UserTransactionsHistory></UserTransactionsHistory></PrivateRoutes>
      },
      // ------------- user end -----------------
      // ------------- agent start -----------------
      {
        path: '/cash-out-manage',
        element: <PrivateRoutes><CashOutManage></CashOutManage></PrivateRoutes>
      },
      {
        path: '/cash-in-manage',
        element: <PrivateRoutes><CashInManage></CashInManage></PrivateRoutes>
      },
      {
        path: '/agent-transactions-history',
        element: <PrivateRoutes><AgentTransactionsHistory></AgentTransactionsHistory></PrivateRoutes>
      },
      // ------------- agent end -----------------
      // ------------- admin start -----------------
      {
        path: '/user-manage',
        element: <PrivateRoutes><UserManage></UserManage></PrivateRoutes>
      },
      {
        path: '/all-transactions-history',
        element: <PrivateRoutes><AllTransactionsHistory></AllTransactionsHistory></PrivateRoutes>
      },
      // ------------- admin end -----------------
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
