import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';
import { FaHome, FaFileInvoiceDollar, FaUser, FaSignOutAlt, FaWallet } from 'react-icons/fa';

const Navbar = () => {
  const { user, balance, logoutUser } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  
  const handleLogout = () => {
    logoutUser()
      .then(() => toast.success('Logged out successfully'))
      .catch(() => toast.error('Failed to log out'));
  };

  return (
    <nav className="bg-gray-800 bg-opacity-60 backdrop-blur-md shadow-md py-4 px-6 fixed top-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold flex items-center text-white">
          <FaWallet className="mr-2 text-blue-400" /> Pay Bills
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <NavLink to="/" className={({ isActive }) =>
            isActive ? "text-blue-400 font-medium border-b-2 border-blue-400 text-white" : "text-gray-300 hover:text-white transition-colors duration-300"
          }>
            <span className="flex items-center">
              <FaHome className="mr-1" /> Home
            </span>
          </NavLink>

          <NavLink to="/bills" className={({ isActive }) =>
            isActive ? "text-blue-400 font-medium border-b-2 border-blue-400 text-white" : "text-gray-300 hover:text-white transition-colors duration-300"
          }>
            <span className="flex items-center">
              <FaFileInvoiceDollar className="mr-1" /> Bills
            </span>
          </NavLink>

          {user && (
            <NavLink to="/profile" className={({ isActive }) =>
              isActive ? "text-blue-400 font-medium border-b-2 border-blue-400 text-white" : "text-gray-300 hover:text-white transition-colors duration-300"
            }>
              <span className="flex items-center">
                <FaUser className="mr-1" /> Profile
              </span>
            </NavLink>
          )}
        </div>

        {/* User Section */}
        <div>
          {user ? (
            <div className="relative">
              {/* User Profile Button */}
              <button onClick={() => setShowMenu(!showMenu)} className="flex items-center">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="User" className="w-10 h-10 rounded-full border-2 border-blue-500" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    {user.displayName?.[0]?.toUpperCase() || 'U'}
                  </div>
                )}
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded shadow-lg py-1 z-10 border border-gray-700">
                  <div className="px-4 py-2 border-b border-gray-700">
                    <p className="font-medium text-white">{user.displayName || 'User'}</p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>

                  <div className="px-4 py-2 border-b border-gray-700">
                    <p className="text-sm text-white">
                      <FaWallet className="inline mr-2 text-blue-400" />
                      Balance: <span className="font-medium text-green-400">{balance} BDT</span>
                    </p>
                  </div>

                  <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-700 text-white transition-colors duration-200" onClick={() => setShowMenu(false)}>
                    <FaUser className="inline mr-2 text-blue-400" /> My Profile
                  </Link>

                  <button onClick={() => {
                    handleLogout();
                    setShowMenu(false);
                  }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 text-white transition-colors duration-200">
                    <FaSignOutAlt className="inline mr-2 text-red-400" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-x-2">
              <Link to="/auth/register" className="px-4 py-2 border rounded text-white border-gray-600 hover:bg-gray-700 transition-colors duration-200">Register</Link>
              <Link to="/auth/login" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200">Login</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
