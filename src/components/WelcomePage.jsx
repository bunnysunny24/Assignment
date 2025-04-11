import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function WelcomePage() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      } 
    }
  };

  const buttonHoverEffect = {
    scale: 1.02,
    transition: { type: "spring", stiffness: 400, damping: 10 }
  };

  const buttonTapEffect = {
    scale: 0.98,
    transition: { type: "spring", stiffness: 400, damping: 17 }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="absolute top-0 left-0 w-32 h-32 bg-purple-200 rounded-full opacity-20 transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-200 rounded-full opacity-20 transform translate-x-1/4 translate-y-1/4" />
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white rounded-md shadow-lg w-full max-w-sm h-[667px] relative overflow-hidden border border-gray-100"
      >
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={loaded ? "visible" : "hidden"}
          className="absolute bottom-0 left-0 right-0 p-6 bg-white"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-xl font-medium text-gray-800 mb-1"
          >
            Welcome to PopX
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-gray-500 text-sm mb-6"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </motion.p>
          <motion.button
            variants={itemVariants}
            whileHover={buttonHoverEffect}
            whileTap={buttonTapEffect}
            className="w-full py-3 bg-purple-600 text-white text-sm font-medium rounded-md mb-3"
            onClick={() => navigate('/register')}
          >
            Create Account
          </motion.button>
          
          <motion.button
            variants={itemVariants}
            whileHover={buttonHoverEffect}
            whileTap={buttonTapEffect}
            className="w-full py-3 bg-purple-200 text-gray-700 text-sm font-medium rounded-md relative overflow-hidden"
            onClick={() => navigate('/login')}
          >
            <span className="relative z-10">Already Registered? Login</span>
            <motion.div 
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
              className="absolute left-0 top-0 h-full bg-purple-300/50 z-0"
            />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default WelcomePage;