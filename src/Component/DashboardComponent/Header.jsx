import { useEffect, useRef, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import useAuth from "../../Hook/useAuth";
import axios from "axios";
import { motion } from "motion/react"
import Notification from "./Notification";
import { Fade, Zoom } from "react-awesome-reveal";

const Header = () => {

    const [notification, setNotification] = useState([])
    const { user } = useAuth()
    const [userDetails, setUserDetails] = useState({})
    const email = user?.email
    const [isOpen, setIsOpen] = useState(false)
    const popupRef = useRef();


    useEffect(() => {
        if (email) {
            axios
                .get(`http://localhost:3000/users/${encodeURIComponent(email)}`)
                .then(res => setUserDetails(res.data))
                .catch(err => console.error(err));
        }
    }, [email]);

    useEffect(() => {
        const handleClickOutside = (event) => {


            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    useEffect(() => {
        axios.get(`http://localhost:3000/notification/${email}`)
            .then((res) => {
                setNotification(res.data)
                console.log(res.data)

            })
            .catch(err => console.log(err))
    }, [email])

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
                <motion.button onClick={() => setIsOpen(!isOpen)} whileHover={{ scale: 1.2 }} className="text-primary cursor-pointer"><IoNotifications size={24} /></motion.button>
            </div>


            {
                isOpen && (<div className="absolute bg-base-300/80 flex flex-col gap-3 items-center shadow-lg backdrop-blur w-sm text-secondary p-6  overflow-y-scroll  rounded-2xl h-[70vh]  right-16 z-50 top-20 ">
                    <Fade>
                        {
                            notification.length === 0 ? <p className="text-2xl text-base-content">No Notification</p> :
                                notification.map(n => <Notification key={n.message} n={n} popupRef={popupRef} />)
                        }
                    </Fade>
                </div>)
            }
        </header>

    );
};

export default Header;
