import { SidebarProvider } from '@/Context/SideBarContext'
import { ThemeProvider } from '@/Context/ThemeContext'
import AdminLayoutContent from '@/Pages/AdminLayoutContent'
import React, { useState } from 'react'
import ComponentCard from '@/Assets/Common/ComponentCard'
import Label from '@/Assets/Common/Label'
import Input from '@/Assets/Common/InputField'
import Swal from 'sweetalert2'
import axios from 'axios'
import { router } from '@inertiajs/react'
import Button from '@/Ui/Button'

export default function AddMechanic () {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const handlePost = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      Swal.fire({
        didOpen: () => {
          Swal.showLoading()
        },
        allowOutsideClick: false,
        title: 'Memuat...',
        timer: 1000
      });

      await new Promise(resolve => setTimeout(resolve, 2000));
      await axios.post('/api/mechanic', {
        name: name,
        password: password,
        address: address,
        phone_number: phone
      });

      Swal.fire({
        title: "Tambah data berhasil",
        icon: 'success',
        confirmButtonColor: 'green',
        confirmButtonText: 'Sukses'
      });

      setTimeout(() => {
        router.visit('/admin/mechanics');
      }, 3000);
    } catch (error) {
      Swal.fire({
        title: "Tambah data gagal",
        text: "Harap masukkan input dengan benar",
        icon: 'error',
        confirmButtonColor: 'red',
        confirmButtonText: 'Gagal'
      });
    }
  }
  return (
    <SidebarProvider>
        <ThemeProvider>
            <AdminLayoutContent>
                <ComponentCard title="Tambah Mekanik" showAdd={false}>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="input">Nama Mekanik</Label>
                      <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama..." />
                    </div>
                    <div>
                      <Label htmlFor="input">Kata Sandi Mekanik</Label>
                      <Input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Kata Sandi..." />
                    </div>
                    <div>
                      <Label htmlFor="input">Alamat Mekanik</Label>
                      <Input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Alamat..." />
                    </div>
                    <div>
                      <Label htmlFor="input">No. Telepon Mekanik</Label>
                      <Input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="No. Telepon..." />
                    </div>
                    <Button onClick={handlePost} typeButton='kirim'>Kirim</Button>
                  </div>
                </ComponentCard>
            </AdminLayoutContent>
        </ThemeProvider>
    </SidebarProvider>
  )
}
