import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import axios from 'axios';
import cookie from 'js-cookie'
import Swal from 'sweetalert2';

export default function Login() {
  const [darkMode, setDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [checkboxToggle, setCheckboxToggle] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');

    if (storedDarkMode !== null) {
      setDarkMode(JSON.parse(storedDarkMode));
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
        Swal.fire({
            didOpen: () => {
                Swal.showLoading()
            },
            allowOutsideClick: false,
            title: "Memuat...",
            timer: 1000
        });

        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await axios.post('/api/login', {
            name: name,
            password: password
        });

        const userRole = response.data.user.role;
        const token = response.data.token;
        cookie.set('token', token);

        Swal.fire({
            title: "Login Berhasil",
            icon: 'success',
            confirmButtonText: 'Sukses',
            confirmButtonColor:'green'
        });
        
        if (userRole == 'admin') {            
            setTimeout(() => {
                router.visit('/admin/vehicles');
            }, 3000);
        } else if (userRole == 'mechanic') {
            setTimeout(() => {
                router.visit('/mechanic/dashboard');
            }, 3000);
        } else if (userRole == 'cashier') {
            setTimeout(() => {
                router.visit('/cashier/dashboard');
            }, 3000);
        } else {
            setTimeout(() => {
                router.visit('/customor/dashboard');
            }, 3000);
        }
    } catch (error: any) {
        Swal.fire({
            title: error.response.data.message,
            icon: 'error',
            confirmButtonText: 'Error',
            confirmButtonColor:'red'
        });
    }
  }

  return (
    <div className={darkMode ? 'dark bg-gray-900' : ''}>
      <button
        onClick={() => setDarkMode(prev => !prev)}
        className="absolute top-4 right-4 z-50 bg-gray-200 dark:text-white dark:bg-gray-800 text-sm px-3 py-1 rounded-lg"
      >
        {darkMode ? '☀️ Terang' : '🌙 Gelap'}
      </button>

      <div className="relative p-6 bg-white dark:bg-gray-900 sm:p-0 font-poppins">
        <div className="relative flex flex-col justify-center w-full h-screen dark:bg-gray-900 sm:p-0 lg:flex-row">
          <div className="flex flex-col flex-1 w-full lg:w-1/2">

            <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
              <div className="mb-5 sm:mb-8">
                <h1 className="mb-2 font-semibold text-gray-800 text-2xl dark:text-white/90">
                  Masuk
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Masukkan email dan kata sandi untuk masuk!
                </p>
              </div>

              <form>
                <div className="space-y-5">
                  <div>
                    <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-400">
                      Nama <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="User123"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-11 w-full rounded-lg border bg-transparent px-4 py-2.5 text-sm text-gray-800 dark:text-white/90 shadow-sm placeholder:text-gray-400 dark:placeholder:text-white/30 border-gray-300 dark:border-gray-700 focus:border-brand-300 dark:focus:border-brand-800 focus:outline-none focus:ring-3 focus:ring-brand-500/10"
                    />
                  </div>

                  <div>
                    <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-400">
                      Kata Sandi <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Masukkan Kata Sandi Anda"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-11 w-full rounded-lg border bg-transparent py-2.5 pl-4 pr-11 text-sm text-gray-800 dark:text-white/90 shadow-sm placeholder:text-gray-400 dark:placeholder:text-white/30 border-gray-300 dark:border-gray-700 focus:border-brand-300 dark:focus:border-brand-800 focus:outline-none focus:ring-3 focus:ring-brand-500/10"
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer dark:text-gray-400"
                      >
                        {showPassword ? '🙈' : '👁️'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center text-sm font-normal text-gray-700 dark:text-gray-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checkboxToggle}
                        onChange={() => setCheckboxToggle(!checkboxToggle)}
                        className="mr-2"
                      />
                      Tetap masuk
                    </label>
                    <a href="/reset-password.html" className="text-sm text-brand-500 dark:text-white hover:text-primary">
                      Lupa kata sandi?
                    </a>
                  </div>

                  <button onClick={handleLogin} type="submit" className="w-full px-4 py-3 text-sm font-medium text-white rounded-lg bg-primary hover:bg-brand-600 shadow">
                    Masuk
                  </button>
                </div>
              </form>

              <div className="mt-5 text-sm text-center flex gap-1 items-center text-gray-700 dark:text-gray-400">
                Belum punya akun?
                <p onClick={() => {router.visit('/signup')}} className="text-brand-500 hover:text-primary cursor-pointer">
                  Daftar
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
