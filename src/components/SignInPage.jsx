import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    const lastEmail = localStorage.getItem('lastRegisteredEmail');
    if (lastEmail) {
      setEmail(lastEmail);
    }
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setIsButtonActive(email.trim() !== '' && password.trim() !== '');
    if (error) setError('');
  }, [email, password, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isButtonActive) return;
    const users = JSON.parse(localStorage.getItem('popxUsers') || '[]');
    const user = users.find(user => user.email === email);
    
    if (!user) {
      setError('No account found with this email address');
      return;
    }
    
    if (user.password !== password) {
      setError('Incorrect password');
      return;
    }
    localStorage.setItem('currentUser', JSON.stringify(user));
    navigate('/account');
    console.log('Login successful for:', { email, password });
  };

  const handleCreateAccount = () => {
    navigate('/register');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.15,
        duration: 0.5
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
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
        className="bg-white w-full max-w-sm h-[667px] rounded-md shadow-md border border-gray-100 px-6 pt-10"
      >
        <motion.form 
          variants={containerVariants}
          initial="hidden"
          animate={loaded ? "visible" : "hidden"}
          onSubmit={handleSubmit}
        >
          <motion.h1 
            variants={itemVariants}
            className="text-2xl font-semibold text-gray-800 mb-1"
          >
            Signin to your
          </motion.h1>
          <motion.h1 
            variants={itemVariants}
            className="text-2xl font-semibold text-gray-800 mb-2"
          >
            PopX account
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-gray-500 text-sm mb-6"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </motion.p>
          
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md"
            >
              {error}
            </motion.div>
          )}
          
          <motion.div 
            variants={itemVariants}
            className="mb-4"
          >
            <label className="block text-purple-500 text-sm font-medium mb-1">
              Email Address
            </label>
            <motion.input
              whileFocus={{ boxShadow: "0 0 0 2px rgba(168, 85, 247, 0.2)" }}
              type="email"
              placeholder="Enter email address"
              className="w-full p-3 border border-gray-200 rounded-md focus:outline-none text-gray-700 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </motion.div>
          <motion.div 
            variants={itemVariants}
            className="mb-6"
          >
            <label className="block text-purple-500 text-sm font-medium mb-1">
              Password
            </label>
            <motion.input
              whileFocus={{ boxShadow: "0 0 0 2px rgba(168, 85, 247, 0.2)" }}
              type="password"
              placeholder="Enter password"
              className="w-full p-3 border border-gray-200 rounded-md focus:outline-none text-gray-700 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </motion.div>
          <motion.button
            variants={itemVariants}
            whileHover={isButtonActive ? { scale: 1.02 } : {}}
            whileTap={isButtonActive ? { scale: 0.98 } : {}}
            type="submit"
            className={`w-full py-3 rounded-md font-medium transition-colors duration-300 ${
              isButtonActive ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-600'
            }`}
          >
            Login
          </motion.button>
          <motion.div
            variants={itemVariants}
            className="mt-6 text-center"
          >
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={handleCreateAccount}
                className="text-purple-600 font-medium hover:underline focus:outline-none"
              >
                Create Account
              </button>
            </p>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
}

export default SignInPage;