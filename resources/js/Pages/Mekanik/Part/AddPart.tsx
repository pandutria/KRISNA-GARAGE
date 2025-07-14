import { SidebarProvider } from '@/Context/SideBarContext'
import { ThemeProvider } from '@/Context/ThemeContext'
import React, { useState } from 'react'
import ComponentCard from '@/Assets/Common/ComponentCard'
import Label from '@/Assets/Common/Label'
import Input from '@/Assets/Common/InputField'
import Swal from 'sweetalert2'
import axios from 'axios'
import { router } from '@inertiajs/react'
import Button from '@/Ui/Button'
import MechanicSidebar from '@/Components/MechanicSidebar'
import MechanicLayoutContent from '@/Pages/MechanicLayoutContent'

export default function AddPart () {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [code, setCode] = useState('');
  const [price, setPrice] = useState('');

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
      await axios.post('/api/part', {
        name: name,
        type: type,
        code: code,
        price: price
      });

      Swal.fire({
        title: "Tambah data berhasil",
        icon: 'success',
        confirmButtonColor: 'green',
        confirmButtonText: 'Sukses'
      });

      setTimeout(() => {
        router.visit('/mechanic/parts');
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
            <MechanicLayoutContent>
                <ComponentCard title="Tambah Suku Cadang" showAdd={false}>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="input">Nama Suku Cadang</Label>
                      <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama..." />
                    </div>
                    <div>
                      <Label htmlFor="input">Tipe Suku Cadang</Label>
                      <Input type="text" value={type} onChange={(e) => setType(e.target.value)} placeholder="Tipe..." />
                    </div>
                    <div>
                      <Label htmlFor="input">Kode Suku Cadang</Label>
                      <Input type="number" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Kode..." />
                    </div>
                    <div>
                      <Label htmlFor="input">Harga Suku Cadang</Label>
                      <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Harga..." />
                    </div>
                    <Button onClick={handlePost} typeButton='kirim'>Kirim</Button>
                  </div>
                </ComponentCard>
            </MechanicLayoutContent>
        </ThemeProvider>
    </SidebarProvider>
  )
}
