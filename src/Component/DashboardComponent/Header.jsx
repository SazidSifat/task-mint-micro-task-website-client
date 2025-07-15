import { useEffect, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import useAuth from "../../Hook/useAuth";
import axios from "axios";
import { motion } from "motion/react"

const Header = () => {


    const { user } = useAuth()
    const [userDetails, setUserDetails] = useState({})
    const email = user?.email


    useEffect(() => {
        if (email) {
            axios
                .get(`http://localhost:3000/users/${encodeURIComponent(email)}`)
                .then(res => setUserDetails(res.data))
                .catch(err => console.error(err));
        }
    }, [email]);

    const role = userDetails?.role?.charAt(0).toUpperCase() + userDetails?.role?.slice(1).toLowerCase()


    return (
        <header className="flex flex-wrap items-center justify-between gap-4 px-4 border-b md:px-20 py-4  border-secondary  ">
            <div className="font-bold text-primary text-2xl hidden lg:block">{role} Dashboard</div>

            <div className="flex items-center gap-4 ml-auto">
                <div className="text-right hidden sm:block">
                    <div className="font-medium ">Available coin: {userDetails?.coin}</div>
                    <div className="text-sm ">{userDetails.role} | {user?.displayName}</div>
                </div>
                <img
                    src={user?.photoURL}
                    alt="User"
                    className="w-10 h-10 rounded-full"
                />
                <motion.button whileHover={{ scale: 1.2 }} className="text-primary cursor-pointer"><IoNotifications size={24} /></motion.button>
            </div>
        </header>

    );
};

export default Header;
