import { useState } from "react";
import { Link, Outlet } from "react-router";
import Header from "../Component/DashboardComponent/Header";
import DashboardFooter from "../Component/DashboardComponent/DashboardFooter";
import Sidebar from "../Component/DashboardComponent/BuyerSidebar";
import '../dashboard.css';
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import useAuth from "../Hook/useAuth";
import Loading from "../Shared/Loading";
import BuyerSidebar from "../Component/DashboardComponent/BuyerSidebar";
import AdminSidebar from "../Component/DashboardComponent/AdminSidebar";

const AdminDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const { loading } = useAuth()


    if (loading) {
        return <Loading />
    }

    return (
        <div className="flex flex-col h-screen">
            {/* Mobile Header Toggle Button */}
            <div className="md:hidden p-4 border-b border-primary/50 flex shadow justify-between items-center">
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-primary font-bold">
                    <HiMiniBars3BottomLeft size={30} />
                </button>
                <Link to='/' className="font-bold text-2xl text-primary">Task Mint</Link>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar: hidden on mobile */}
                <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                {/* Main content */}
                <main className="flex-1 flex flex-col justify-between overflow-hidden">
                    <div className="p-4 flex-1 overflow-y-auto">
                        <Header />
                        <Outlet />
                    </div>
                    <DashboardFooter />
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
