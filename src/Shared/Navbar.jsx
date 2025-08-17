import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { Link, NavLink } from "react-router";
import useAuth from "../Hook/useAuth";
import axios from "axios";
import { ImCoinDollar } from "react-icons/im";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [dbUser, setDbUser] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (!user?.accessToken) return;
    axios
      .get(`https://microtaskserver.vercel.app/users/${user?.email}`, {
        headers: {
          authorization: `Bearer ${user?.accessToken}`,
        },
      })
      .then((res) => setDbUser(res.data))
      .catch((err) => console.error(err));
  }, [user?.email, user?.accessToken]);

  const handleLogout = () => {
    logout()
      .then(() => toast.success("Logout Successful"))
      .catch(() => toast.error("Logout Failed"));
  };

  // ৫টি route
  const routes = [
    { path: "/", name: "Home" },
    { path: "/tasks", name: "Tasks" },
    { path: "/about", name: "About" },
    { path: "/contact", name: "Contact" },
  ];

  return (
    <div className="p-5 container mx-auto flex items-center justify-between relative">
      {/* Logo */}
      <Link to="/" className="text-3xl font-semibold">
        Task Mint
      </Link>

      {/* Middle Routes */}
      <div className="hidden lg:flex gap-8 font-semibold text-lg">
        {routes.map((r, i) => (
          <NavLink
            key={i}
            to={r.path}
            className={({ isActive }) =>
              `transition-colors ${
                isActive
                  ? "text-secondary border-b-2 border-secondary pb-1"
                  : "hover:text-secondary"
              }`
            }
          >
            {r.name}
          </NavLink>
        ))}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6 relative">
        {user ? (
          <div className="relative">
            {/* Profile + Coin */}
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img
                src={
                  user.photoURL ||
                  "https://i.ibb.co/MBtjqXQ/default-avatar.png"
                }
                alt="profile"
                className="w-10 h-10 rounded-full border-2 border-secondary"
              />
              <div className="flex items-center gap-1 bg-yellow-400 text-black px-3 py-1 rounded-full font-bold shadow-md">
                <ImCoinDollar /> {dbUser?.coin || 0}
              </div>
            </div>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-40 bg-base-300 text-base-content rounded-xl shadow-lg z-50 text-center">
                <NavLink
                  to="/dashboard"
                  className="block px-4 py-2 hover:bg-secondary/30 rounded-t-xl font-semibold"
                  onClick={() => setDropdownOpen(false)}
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-red-600 hover:bg-red-200 rounded-b-xl"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="font-semibold flex space-x-6 text-base">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `py-1 px-2 hidden lg:block ${
                  isActive ? "border-b-2 border-secondary" : "hover:border-b"
                }`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `py-1 px-2 hidden lg:block ${
                  isActive ? "border-b-2 border-secondary" : "hover:border-b"
                }`
              }
            >
              Register
            </NavLink>
          </div>
        )}

        {/* Mobile Menu Icon */}
        <div className="lg:hidden">
          <FaBars
            size={28}
            className="cursor-pointer hover:text-secondary"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute lg:hidden bg-base-300/40 text-base-content backdrop-blur-2xl w-[70%] h-screen ${
          isOpen ? "left-0 top-0" : "-left-[1000px] top-0"
        } duration-500 flex flex-col items-center text-center py-10`}
      >
        <div className="absolute bg-base-300 hover:bg-secondary right-3 top-4 p-1 rounded">
          <RxCross1 size={30} onClick={() => setIsOpen(!isOpen)} />
        </div>

        <h1 className="text-3xl font-bold mt-6">Task Mint</h1>
        <div className="divider"></div>

        {/* Mobile Routes */}
        <div className="flex flex-col gap-6 text-lg font-bold">
          {routes.map((r, i) => (
            <NavLink
              key={i}
              to={r.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `transition-colors ${
                  isActive
                    ? "text-secondary border-b-2 border-secondary"
                    : "hover:text-secondary"
                }`
              }
            >
              {r.name}
            </NavLink>
          ))}

          {user ? (
            <>
              <NavLink
                to="/dashboard"
                className="py-2 hover:border-b"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </NavLink>
              <button
                onClick={handleLogout}
                className="py-2 text-red-600 hover:border-b"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="py-2 hover:border-b"
                onClick={() => setIsOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="py-2 hover:border-b"
                onClick={() => setIsOpen(false)}
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
