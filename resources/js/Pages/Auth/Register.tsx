import { router } from '@inertiajs/react';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const handleRegister = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      Swal.fire({
          didOpen: () => {
              Swal.showLoading()
          },
          allowOutsideClick: false,
          title: "Please wait...",
          timer: 1000
      });

      await new Promise(resolve => setTimeout(resolve, 1000));
      await axios.post('/api/register', {
        name: name,
        password: password,
        phone_number: phone,
        address: address,
      });

      Swal.fire({
        title: "Daftar Berhasil",
        icon: 'success',
        confirmButtonColor: 'green',
        confirmButtonText: 'Sukses'
      });

      setTimeout(() => {
        router.visit('/');
      }, 3000);
    } catch (error: any) {
      Swal.fire({
        title: "Daftar Gagal",
        icon: 'error',
        confirmButtonColor: 'red',
        confirmButtonText: 'Gagal'
      });
    }
  }

  return (
    <div className={`${darkMode ? 'dark bg-gray-900' : ''} min-h-screen py-2 font-poppins`}>
      <button
        onClick={() => setDarkMode(prev => !prev)}
        className="absolute top-4 right-4 z-50 bg-gray-200 dark:text-white dark:bg-gray-800 text-sm px-3 py-1 rounded-lg"
      >
        {darkMode ? '☀️ Terang' : '🌙 Gelap'}
      </button>

      <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0 min-h-screen flex lg:flex-row">
        <div className="flex flex-col flex-1 w-full lg:w-1/2 justify-center items-center">
          <div className="w-full max-w-md">

            <div className="mb-5 sm:mb-8">
              <h1 className="mb-2 font-semibold text-gray-800 text-2xl dark:text-white/90">
                Daftar Akun
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Masukkan email dan kata sandi untuk mendaftar!
              </p>
            </div>

            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1.5">Nama</label>
                <input type="text" placeholder="Nama" value={name} onChange={(e) => setName(e.target.value)} className="w-full h-11 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-sm text-gray-800 dark:text-white dark:bg-gray-900 placeholder:text-gray-400 dark:placeholder:text-white/30" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1.5">No. Telepon</label>
                <input type="text" placeholder="No. Telepon" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full h-11 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-sm text-gray-800 dark:text-white dark:bg-gray-900 placeholder:text-gray-400 dark:placeholder:text-white/30" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1.5">Alamat</label>
                <input type="text" placeholder="Alamat" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full h-11 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-sm text-gray-800 dark:text-white dark:bg-gray-900 placeholder:text-gray-400 dark:placeholder:text-white/30" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1.5">Kata Sandi</label>
                <input type="password" placeholder="Kata sandi" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-11 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-sm text-gray-800 dark:text-white dark:bg-gray-900 placeholder:text-gray-400 dark:placeholder:text-white/30" />
              </div>

              <button onClick={handleRegister} type="submit" className="w-full px-4 py-3 text-sm font-medium text-white bg-primary rounded-lg hover:bg-brand-600">
                Daftar
              </button>
            </form>

            <p className="mt-5 text-sm text-start text-gray-700 dark:text-gray-400 flex items-center gap-1">
              Sudah punya akun? <p onClick={() => router.visit('/')} className="text-primary hover:text-primary cursor-pointer">Masuk</p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;