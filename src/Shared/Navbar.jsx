import React, { useContext, useState } from 'react';
import { FaBars } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { Link } from 'react-router';
import AuthContext from '../Context/AuthContext';

const Navbar = () => {

    
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className='p-5 container mx-auto flex items-center justify-between'>


            <Link to='/'><h1 className='text-3xl font-semibold'>Task Mint</h1></Link>

            <div className='hidden lg:block'>
                <div className='font-semibold space-x-6 text-base'>
                    <Link to='/login' className='py-1 px-2    hover:border-b '>Login</Link>
                    <Link to='/register' className='py-1 px-2    hover:border-b'>Register</Link>
                    <Link className='py-3 px-8  bg-secondary text-secondary-content rounded hover:bg-secondary/70'>Join as Developer</Link>
                </div>
            </div>

            <div className='lg:hidden'>
                <FaBars size={28} className='cursor-pointer' onClick={() => setIsOpen(!isOpen)} />
            </div>





            {/* mobile menu */}

            <div className={`absolute lg:hidden bg-base-300/40 text-base-content backdrop-blur-2xl w-[60%] h-[1500px] ${isOpen ? "left-0 top-0" : "-left-96 top-0"} duration-500  flex flex-col items-center text-center py-10`}>

                <div className='absolute bg-base-300 right-3 top-4 p-1 rounded'>
                    <RxCross1 size={30} onClick={() => setIsOpen(!isOpen)} />
                </div>

                <h1 className='text-3xl font-semibold my-6'>Task Mint</h1>
                <div className='font-bold '>
                    <div className='flex flex-col' >
                        <button className='py-3 px-8  rounded'>Login</button>
                        <button className='py-3 px-8  rounded'>Register</button>
                        <button className='py-3 px-8 text-secondary-content bg-secondary rounded'>Join as Developer</button>
                    </div>
                </div>

            </div>


        </div>




    );
};

export default Navbar;