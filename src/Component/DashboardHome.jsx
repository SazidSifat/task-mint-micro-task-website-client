import React, { useEffect, useState } from 'react';
import useAuth from '../Hook/useAuth';
import Loading from '../Shared/Loading';
import axios from 'axios';
import BuyerDashboard from '../Layouts/BuyerDashboard.';
import WorkerDashboard from '../Layouts/WorkerDashboard';
import AdminDashboard from '../Layouts/AdminDashboard';
import BuyerHome from './Buyer/BuyerHome';
import WorkerHome from './Worker/WorkerHome';
import AdminHome from './Admin/AdminHome';
import { useNavigate } from 'react-router';

const DashboardHome = () => {


    const { user, loading, setLoading, logout } = useAuth()
    const [userDetails, setUserDetails] = useState({})
    const role = userDetails.role
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`https://microtaskserver.vercel.app/users/${user?.email}`, {
            headers: {
                authorization: `Bearer ${user?.accessToken}`
            }
        })
            .then((res) => {
                setUserDetails(res.data)
                setLoading(false)
            })
            .catch((error) => {
                const status = error.response?.status;

                if (status === 401 || status === 400) {
                    // No token or invalid token
                    logout();
                    navigate('/login');
                } else if (status === 403) {
                    navigate('/forbidden');
                } else {
                    console.error("Unexpected error", error);
                }
            })

    }, [user?.email, setLoading, user?.accessToken, logout, navigate])


    if (loading) {
        return <Loading />
    }

    if (role === 'buyer') {
        return <BuyerHome />
    }
    else if (role === "worker") {
        return <WorkerHome />
    }
    else if (role === 'admin') {
        return <AdminHome />
    }

};

export default DashboardHome;