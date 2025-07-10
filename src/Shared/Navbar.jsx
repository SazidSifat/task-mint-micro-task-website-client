import React, { useEffect, useState } from 'react';
import { FaBars } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { Link } from 'react-router';
import AuthContext from '../Context/AuthContext';
import useAuth from '../Hook/useAuth';
import axios from 'axios';
import { ImCoinDollar } from "react-icons/im";

const Navbar = () => {

    const { user, logout } = useAuth()
    const [dbUser, setDbUser] = useState()



    useEffect(() => {
        axios.get(`http://localhost:3000/users/${user?.email}`)
            .then(res => {
                console.log(res.data)
                setDbUser(res.data)
            })
    }, [user?.email])




    const handleLogout = () => {

        logout().then(res => console.log(res))

    }


    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className='p-5 container mx-auto flex items-center justify-between'>


            <Link to='/'><h1 className='text-3xl font-semibold'>Task Mint</h1></Link>

            <div className='flex  items-center justify-center gap-6'>

                <div className='flex items-center justify-center gap-6  '>
                    {
                        user ? <div className='flex items-center justify-center gap-4 '>
                            <Link to='/dashboard' className='py-1 px-2 hidden lg:block font-bold text-lg   hover:border-b '>Dashboard</Link>
                            <img src={user.photoURL} alt="" className='w-10 h-10 rounded-full' />
                            <p className='flex items-center justify-center border py-2 px-3 rounded-xl   gap-1 text-lg font-bold'><ImCoinDollar />{dbUser?.coin || 0}</p>
                            <Link onClick={handleLogout} className='py-3 px-6 border border-red-300 rounded-lg  hover:text-black   hover:bg-red-300 '>Logout</Link></div> : <div className='font-semibold flex space-x-6 text-base'>
                            <Link to='/login' className='py-1 px-2 hidden lg:block   hover:border-b '>Login</Link>
                            <Link to='/register' className='py-1 px-2 hidden lg:block   hover:border-b'>Register</Link>
                        </div>
                    }
                    <div className='lg:hidden'>
                        <FaBars size={28} className='cursor-pointer hover:text-secondary' onClick={() => setIsOpen(!isOpen)} />
                    </div>
                </div>
                <Link className='py-3 px-8 hidden lg:block  bg-secondary text-secondary-content rounded-lg font-bold hover:bg-secondary/70'>Join as Developer</Link>
            </div>


            {/* mobile menu */}

            <div className={`absolute lg:hidden bg-base-300/40 text-base-content backdrop-blur-2xl w-[60%] h-[1500px] ${isOpen ? "left-0 top-0" : "-left-[1000px] top-0"} duration-500  flex flex-col items-center text-center py-10`}>

                <div className='absolute bg-base-300 hover:bg-secondary right-3 top-4 p-1 rounded'>
                    <RxCross1 size={30} onClick={() => setIsOpen(!isOpen)} />
                </div>

                <h1 className='text-3xl font-bold mt-6'>Task Mint</h1>
                <div className='divider'></div>
                <div className='font-bold flex flex-col gap-6 '>
                    <div className='flex items-center justify-center gap-6  '>
                        {
                            user ? <div className='flex items-center justify-center gap-4 '>
                                <Link to='/dashboard' className='py-1 px-2 text-base-content lg:block font-bold text-lg   hover:border-b '>Dashboard</Link></div> : <div className='flex flex-col  text-lg font-bold'>
                                <Link to='/login' className='py-1 px-2  text-center hover:border-b '>Login</Link>
                                <Link to='/register' className='py-1 px-2 text-center hover:border-b'>Register</Link>
                            </div>
                        }

                    </div>
                    <Link className='py-3 px-8  lg:block  bg-secondary text-secondary-content rounded-lg font-bold hover:bg-secondary/70'>Join as Developer</Link>
                </div>

            </div>


        </div>




    );
};

export default Navbar;