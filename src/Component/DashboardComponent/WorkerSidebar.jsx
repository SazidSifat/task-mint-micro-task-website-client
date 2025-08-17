import { Link, NavLink, useNavigate } from "react-router";
import { IoClose } from "react-icons/io5";
import {
  FaHome,
  FaPlusCircle,
  FaTasks,
  FaCoins,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import useAuth from "../../Hook/useAuth";
import { toast } from "react-toastify";

const WorkerSidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
      .then(() => {
        navigate("/login");
        toast.success("Logout Successful");
      })
      .catch(() => {
        toast.error("Logout Failed");
      });
  };

  return (
    <aside
      className={`
        fixed md:relative z-50 h-full bg-primary text-primary-content p-4 w-64
        transform ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 transition-transform duration-300 ease-in-out
      `}
    >
      {/* Close button on mobile */}
      <div className="md:hidden flex justify-end">
        <button onClick={onClose}>
          <IoClose size={24} />
        </button>
      </div>

      <nav className="flex flex-col font-bold mt-4 lg:mt-0 h-full justify-between">
        <div>
          <div className="font-bold text-3xl hidden lg:block text-center mt-4">
            <Link to="/" onClick={onClose}>
              Task Mint
            </Link>
          </div>
          <div className="divider"></div>

          {/* Main Links */}
          <Link
            onClick={onClose}
            to="/dashboard"
            className="py-3 w-full gap-2 flex items-center justify-center hover:bg-secondary hover:text-secondary-content rounded-2xl text-right"
          >
            <FaHome /> Home
          </Link>

          <NavLink
            onClick={onClose}
            to="/dashboard/task-list"
            className={({ isActive }) =>
              `py-3 w-full gap-2 flex items-center justify-center rounded-2xl text-right ${
                isActive
                  ? "bg-secondary text-secondary-content"
                  : "hover:bg-secondary hover:text-secondary-content"
              }`
            }
          >
            <FaPlusCircle /> Task List
          </NavLink>

          <NavLink
            onClick={onClose}
            to="/dashboard/my-submission"
            className="py-3 w-full gap-2 flex items-center justify-center hover:bg-secondary hover:text-secondary-content rounded-2xl text-right"
          >
            <FaTasks /> My Submission
          </NavLink>

          <NavLink
            onClick={onClose}
            to="/dashboard/withdraw"
            className="py-3 w-full gap-2 flex items-center justify-center hover:bg-secondary hover:text-secondary-content rounded-2xl text-right"
          >
            <FaCoins /> Withdraw
          </NavLink>
        </div>

        {/* Profile & Logout at the bottom */}
        <div className="flex flex-col gap-2">
          <NavLink
            onClick={onClose}
            to="/dashboard/profile"
            className={({ isActive }) =>
              `py-3 w-full gap-2 flex items-center justify-center rounded-2xl text-right ${
                isActive
                  ? "bg-secondary text-secondary-content"
                  : "hover:bg-secondary hover:text-secondary-content"
              }`
            }
          >
            <FaUserCircle /> Profile
          </NavLink>

          <Link
            onClick={handleLogout}
            className="py-3 w-full gap-2 border border-error bg-red-300 text-black flex items-center justify-center hover:bg-error hover:text-secondary-content rounded-2xl text-right"
          >
            <FaSignOutAlt /> Logout
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default WorkerSidebar;
