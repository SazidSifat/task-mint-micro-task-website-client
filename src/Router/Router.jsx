import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import PrivateRoute from "../Shared/PrivateRoute";
import BuyerDashboard from "../Layouts/BuyerDashboard.";
import AddTask from "../Component/Buyer/AddTask";
import MyTask from "../Component/Buyer/Mytask";
import PurchaseCoin from "../Component/Buyer/PurchaseCoin";
import BuyerHome from "../Component/Buyer/BuyerHome";
import Payment from "../Component/Buyer/Payment/Payment";
import PaymentHistory from "../Component/Buyer/PaymentHistory";
import Loading from "../Shared/Loading";
import Dashboard from "../Component/Dashboard";
import DashboardHome from "../Component/DashboardHome";
import ManageUsers from "../Component/Admin/ManageUsers";
import ManageTasks from "../Component/Admin/ManageTasks";
import TaskList from "../Component/Worker/TaskList";
import TaskDetails from "../Component/Worker/TaskDetails";
import MySubmissionDetails from "../Component/Worker/MySubmissionDetails";
import Withdrawals from "../Component/Worker/Withdrawals";




const router = createBrowserRouter([
    {
        path: '/',
        Component: HomeLayout,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/register',
                Component: Register
            }
        ]
    },
    {
        path: "/dashboard",
        Component: Dashboard,
        children: [
            {
                index: true,
                Component: DashboardHome
            },
            {
                path: "/dashboard/add-task",
                Component: AddTask

            },
            {
                path: "/dashboard/my-tasks",
                Component: MyTask
            },
            {
                path: "/dashboard/purchase-coin",
                Component: PurchaseCoin

            },
            {
                path: "/dashboard/payment/:id",
                Component: Payment
            },
            {
                path: 'dashboard/payment-history/:email',
                Component: PaymentHistory,
            },
            {
                path: "/dashboard/manage-users",
                Component: ManageUsers
            },
            {
                path: "/dashboard/manage-tasks",
                Component: ManageTasks
            },
            {
                path: '/dashboard/task-list',
                Component: TaskList
            },
            {

                path: '/dashboard/task-list/:id',
                Component: TaskDetails
            },
            {
                path: '/dashboard/my-submission',
                Component: MySubmissionDetails

            }
            , {
                path: '/dashboard/withdraw',
                Component: Withdrawals
            }

        ]
    }
])

export default router;