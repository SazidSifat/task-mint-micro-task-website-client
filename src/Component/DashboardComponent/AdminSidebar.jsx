import { Link, NavLink, useNavigate } from "react-router";
import { IoClose } from "react-icons/io5";
import {
  FaHome,
  FaRegUser,
  FaTasks,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import useAuth from "../../Hook/useAuth";
import { toast } from "react-toastify";

const AdminSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

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

  const linkClass =
    "py-3 w-full gap-2 flex items-center justify-center hover:bg-secondary hover:text-secondary-content rounded-2xl text-right";

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
          <Link onClick={onClose} to="/dashboard" className={linkClass}>
            <FaHome /> Home
          </Link>

          <NavLink
            onClick={onClose}
            to="/dashboard/manage-users"
            className={linkClass}
          >
            <FaRegUser /> Manage Users
          </NavLink>

          <NavLink
            onClick={onClose}
            to="/dashboard/manage-tasks"
            className={linkClass}
          >
            <FaTasks /> Manage Tasks
          </NavLink>
        </div>

        {/* Profile & Logout at the bottom */}
        <div className="flex flex-col gap-2">
          <NavLink
            onClick={onClose}
            to="/dashboard/profile"
            className={linkClass}
          >
            <FaUserCircle /> Profile
          </NavLink>

          <button
            onClick={handleLogout}
            className={`${linkClass} text-left flex border border-error bg-error text-black/80 hover:bg-red-400 items-center justify-center`}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
