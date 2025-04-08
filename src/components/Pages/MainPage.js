import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Tile from "../Pages/Tile";
import { FaMoon, FaSun } from "react-icons/fa";

const MainPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(savedMode === 'true');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center w-full max-w-6xl">
        <div className="flex justify-between items-center mx-4 p-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Welcome, {user?.displayName?.toUpperCase()}
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-yellow-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
        <div>
          <Tile darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
};

export default MainPage;