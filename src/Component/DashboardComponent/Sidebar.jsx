import { Link, NavLink } from "react-router";
import { IoClose } from "react-icons/io5";
import { ImCoinDollar } from "react-icons/im";
import { FaHome, FaPlusCircle, FaTasks, FaCoins, FaHistory } from "react-icons/fa";


const Sidebar = ({ isOpen, onClose }) => {
    return (
        <aside className={`
            fixed md:relative z-50 h-full bg-primary text-primary-content p-4 w-64
            transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0 transition-transform duration-300 ease-in-out
        `}>
            {/* Close button on mobile */}
            <div className="md:hidden flex justify-end">
                <button onClick={onClose}><IoClose size={24} /></button>
            </div>

            <nav className="flex gap-2 flex-col font-bold mt-4 lg:mt-0 ">
                <div className="font-bold text-3xl hidden lg:block text-center mt-4">
                    <Link to='/' onClick={onClose}>Task Mint</Link>
                </div>
                <div className="divider hidden lg:block"></div>

                <NavLink onClick={onClose} to="/dashboard/home" className="py-3 w-full  gap-2  flex items-center justify-center hover:bg-secondary hover:text-secondary-content rounded-2xl text-right ">
                    <FaHome />  Home
                </NavLink>

                <NavLink onClick={onClose} to="/dashboard/add-task" className="py-3 w-full  gap-2 flex items-center justify-center hover:bg-secondary hover:text-secondary-content rounded-2xl text-right ">
                    <FaPlusCircle />  Add New Task
                </NavLink>

                <NavLink onClick={onClose} to="/my-tasks" className="py-3 w-full gap-2 flex items-center justify-center hover:bg-secondary hover:text-secondary-content rounded-2xl text-right ">
                    <FaTasks /> My Tasks
                </NavLink>

                <NavLink onClick={onClose} to="/purchase-coin" className="py-3 gap-2 w-full flex items-center justify-center hover:bg-secondary hover:text-secondary-content rounded-2xl text-right ">
                    <FaCoins />  Purchase Coin
                </NavLink>

                <NavLink onClick={onClose} to="/payment-history" className="py-3  gap-2 w-full flex items-items justify-center hover:bg-secondary hover:text-secondary-content rounded-2xl text-right ">
                    <FaHistory />  Payment History
                </NavLink>
            </nav>
        </aside>
    );
};

export default Sidebar;
