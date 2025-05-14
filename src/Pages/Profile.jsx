import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { FaUser, FaWallet, FaEdit, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Profile = () => {
  const { user, balance } = useContext(AuthContext);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-8">
        <div className="flex flex-col items-center">
          {user?.photoURL ? (
            <div className="group relative">
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 transition-all duration-300 ease-in-out group-hover:scale-125 group-hover:shadow-xl"
              />
            </div>
          ) : (
            <div className="w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl font-bold">
              <FaUser />
            </div>
          )}

          <h1 className="text-3xl font-bold mt-6 text-gray-900 dark:text-white">{user?.displayName || 'User'}</h1>
          <p className="text-gray-600 mt-2 dark:text-gray-300">{user?.email}</p>

          <div className="w-full border-t border-gray-200 dark:border-gray-700 my-8"></div>

          <div className="w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Account Details</h2>
              <Link
                to="/profile/update"
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm flex items-center"
              >
                <FaEdit className="mr-2" /> Update Profile
              </Link>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-600 text-sm dark:text-gray-400">Display Name</p>
                  <p className="font-medium text-gray-900 dark:text-white">{user?.displayName || 'Not set'}</p>
                </div>

                <div>
                  <p className="text-gray-600 text-sm dark:text-gray-400">Email</p>
                  <p className="font-medium text-gray-900 dark:text-white">{user?.email}</p>
                </div>

                <div>
                  <p className="text-gray-600 text-sm dark:text-gray-400 flex items-center">
                    <FaWallet className="mr-1" /> Account Balance
                  </p>
                  <p className="font-medium text-blue-600 dark:text-blue-400">{balance} BDT</p>
                </div>

                <div>
                  <p className="text-gray-600 text-sm dark:text-gray-400">Account Status</p>
                  <p className="font-medium text-green-600 dark:text-green-400 flex items-center">
                    <FaCheckCircle className="mr-1" /> Active
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
