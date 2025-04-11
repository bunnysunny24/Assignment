import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';

function AccountSettingsPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/login');
      return;
    }

    setUserData(JSON.parse(currentUser));
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.5
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      } 
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white w-full max-w-sm h-[667px] overflow-y-auto rounded-md shadow-md border border-gray-100 relative"
      >
        <div className="flex justify-between items-center bg-gray-50 p-4 border-b border-gray-200">
          <h1 className="text-gray-700 font-medium">Account Settings</h1>
          <div className="relative">
            <button 
              onClick={toggleDropdown}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors focus:outline-none"
            >
              <Settings size={20} className="text-gray-700" />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>

        {userData && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={loaded ? "visible" : "hidden"}
            className="p-4"
          >
            <motion.div 
              variants={itemVariants}
              className="flex items-center mb-4"
            >
              <div className="relative">
                <img 
                  src="/image.JPG" 
                  alt="Profile" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/60';
                  }}
                />
                <div className="absolute bottom-0 right-0 bg-purple-500 p-1 rounded-full border-2 border-white">
                  <div className="w-2 h-2"></div>
                </div>
              </div>
              <div className="ml-4">
                <h2 className="font-medium text-gray-800">{userData.fullName}</h2>
                <p className="text-gray-600 text-sm">{userData.email}</p>
              </div>
            </motion.div>
            <motion.div 
              variants={itemVariants}
              className="mt-6 text-sm text-gray-600 leading-relaxed border-b border-gray-200 pb-6"
            >
              <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam</p>
            </motion.div>
            <motion.div 
              variants={itemVariants}
              className="mt-6"
            >
              {userData.companyName && (
                <div className="mb-4">
                  <p className="text-xs text-purple-500 font-medium mb-1">Company</p>
                  <p className="text-sm text-gray-700">{userData.companyName}</p>
                </div>
              )}
              
              <div className="mb-4">
                <p className="text-xs text-purple-500 font-medium mb-1">Phone</p>
                <p className="text-sm text-gray-700">{userData.phone || "Not provided"}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-xs text-purple-500 font-medium mb-1">Agency Status</p>
                <p className="text-sm text-gray-700">{userData.isAgency === 'yes' ? 'Agency' : 'Not an Agency'}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-xs text-purple-500 font-medium mb-1">Account Created</p>
                <p className="text-sm text-gray-700">
                  {userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : "Unknown"}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default AccountSettingsPage;