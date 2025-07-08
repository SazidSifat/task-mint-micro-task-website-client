import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";


const router = createBrowserRouter([
    {
        path:'/',
        Component: HomeLayout
    }
])

export default router;