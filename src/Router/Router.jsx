import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import PrivateRoute from "../Shared/PrivateRoute";
import BuyerDashboard from "../Layouts/BuyerDashboard.";
import AddTask from "../Component/Buyer/AddTask";
import MyTask from "../Component/Buyer/Mytask";


const router = createBrowserRouter([
    {
        path: '/',
        Component: HomeLayout,
        children: [
            {
                index: true,
                element: <Home/>
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
        Component: BuyerDashboard,
        children: [
            {
                path:"/dashboard/add-task",
                Component : AddTask

            },
              {
                path:"/dashboard/my-tasks",
                Component : MyTask
            }
        ]
    }
])

export default router;