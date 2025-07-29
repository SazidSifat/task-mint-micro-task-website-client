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

const DashboardHome = () => {


    const { user, loading, setLoading } = useAuth()
    const [userDetails, setUserDetails] = useState({})
    const role = userDetails.role


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

    }, [user?.email, setLoading, user?.accessToken])


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