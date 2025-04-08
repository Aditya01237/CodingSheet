import React, { useEffect, useState } from "react";
import { auth, googleProvider } from "../../firebase"; // Your Firebase config file
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log(user);
        navigate("/main");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-black p-4">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 w-full max-w-sm shadow-xl"
    >
      <h1 className="text-3xl font-bold text-white text-center">
        Welcome To CodingSheet
      </h1>
      <p className="text-sm text-white/60 text-center mt-2">
        Sign in to continue
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleGoogleLogin}
        className="mt-8 w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl py-3 border border-white/20 backdrop-blur-md transition shadow-md"
      >
        <FcGoogle className="text-2xl" />
        <span>Sign in with Google</span>
      </motion.button>
    </motion.div>
  </div>
);

  
};

export default Login;
