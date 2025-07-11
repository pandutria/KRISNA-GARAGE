import { router } from '@inertiajs/react';
import React, { useState } from 'react';

const Register = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  return (
    <div className={`${darkMode ? 'dark bg-gray-900' : ''} min-h-screen font-poppins`}>
    <button
      onClick={() => setDarkMode(prev => !prev)}
      className="absolute top-4 right-4 z-50 bg-gray-200 dark:text-white dark:bg-gray-800 text-sm px-3 py-1 rounded-lg"
    >
      {darkMode ? '☀️ Light' : '🌙 Dark'}
    </button>
      <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0 min-h-screen flex lg:flex-row">
        <div className="flex flex-col flex-1 w-full lg:w-1/2 justify-center items-center">
          <div className="w-full max-w-md">

            <div className="mb-5 sm:mb-8">
              <h1 className="mb-2 font-semibold text-gray-800 text-2xl dark:text-white/90">
                Sign Up
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enter your email and password to sign up!
              </p>
            </div>

            <form className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1.5">First Name</label>
                  <input type="text" placeholder="First name" className="w-full h-11 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-sm text-gray-800 dark:text-white dark:bg-gray-900 placeholder:text-gray-400 dark:placeholder:text-white/30" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1.5">Last Name</label>
                  <input type="text" placeholder="Last name" className="w-full h-11 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-sm text-gray-800 dark:text-white dark:bg-gray-900 placeholder:text-gray-400 dark:placeholder:text-white/30" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1.5">Email</label>
                <input type="email" placeholder="Email" className="w-full h-11 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-sm text-gray-800 dark:text-white dark:bg-gray-900 placeholder:text-gray-400 dark:placeholder:text-white/30" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1.5">Password</label>
                <input type="password" placeholder="Password" className="w-full h-11 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-sm text-gray-800 dark:text-white dark:bg-gray-900 placeholder:text-gray-400 dark:placeholder:text-white/30" />
              </div>

              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-1 h-4 w-4 text-brand-500 border-gray-300 rounded" />
                <p className="text-sm text-gray-500 dark:text-gray-400 text-[12px]">
                  By creating an account, you agree to our <span className="text-gray-800 dark:text-white">Terms</span> and <span className="text-gray-800 dark:text-white">Privacy Policy</span>.
                </p>
              </div>

              <button type="submit" className="w-full px-4 py-3 text-sm font-medium text-white bg-primary rounded-lg hover:bg-brand-600">
                Sign Up
              </button>
            </form>

            <p className="mt-5 text-sm text-start text-gray-700 dark:text-gray-400">
              Already have an account? <p onClick={() => router.visit('/')} className="text-brand-500 hover:text-primary cursor-pointer">Sign In</p>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;
