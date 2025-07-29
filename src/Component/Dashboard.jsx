import React, { useEffect, useState } from 'react';
import useAuth from '../Hook/useAuth';
import Loading from '../Shared/Loading';
import axios from 'axios';
import BuyerDashboard from '../Layouts/BuyerDashboard.';
import WorkerDashboard from '../Layouts/WorkerDashboard';
import AdminDashboard from '../Layouts/AdminDashboard';

const Dashboard = () => {


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


    if (!user || loading) {
        return <Loading />
    }



    if (role === 'buyer') {
        return <BuyerDashboard />
    }
    else if (role === 'worker') {
        return <WorkerDashboard />
    }
    else if (role === 'admin') {
        return <AdminDashboard />
    }
};

export default Dashboard;