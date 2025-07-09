import React from 'react';
import Navbar from '../Shared/Navbar';
import { Outlet } from 'react-router';

const HomeLayout = () => {
    return (
        <div>
            <div className='bg-primary text-primary-content sticky top-0 z-50'>
                <Navbar />
            </div>
            <Outlet />
        </div>
    );
};

export default HomeLayout;