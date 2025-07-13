import { SidebarProvider } from '@/Context/SideBarContext'
import { ThemeProvider } from '@/Context/ThemeContext'
import AdminLayoutContent from '@/Pages/AdminLayoutContent'
import React, { useEffect, useState } from 'react'
import ComponentCard from '@/Assets/Common/ComponentCard'
import Label from '@/Assets/Common/Label'
import Input from '@/Assets/Common/InputField'
import Swal from 'sweetalert2'
import axios from 'axios'
import { router, usePage } from '@inertiajs/react'
import Button from '@/Ui/Button'
import TextArea from '@/Assets/Common/TextArea'

export default function EditVehicle () {
  interface Data {
    id: number;
    name: string;
    description: string;
    price: number;
    service: any
  }

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const page = usePage();
  const id = page.props.id;

  useEffect(() => {
    const fetchDataById = async() => {
        try {
            const response = await axios.get<Data>(`/api/service/${id}`);
            const data = response.data.service;
            setName(data.name);
            setDesc(data.description);
            setPrice(data.price);
        } catch (error) {
            console.error(error);
        }
    }

    fetchDataById();
  }, [id]);

  const handleEdit = async(e: React.FormEvent) => {
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
      await axios.put(`/api/service/${id}`, {
        name: name,
        description: desc,
        price: price,
      });

      Swal.fire({
        title: "Ubah data berhasil",
        icon: 'success',
        confirmButtonColor: 'green',
        confirmButtonText: 'Sukses'
      });

      setTimeout(() => {
        router.visit('/admin/services');
      }, 3000);
    } catch (error) {
      Swal.fire({
        title: "Ubah data gagal",
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
                <ComponentCard title="Tambah Layanan" showAdd={false}>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="input">Nama Layanan</Label>
                      <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama..." />
                    </div>
                    <div>
                      <Label htmlFor="input">Deskripsi Layanan</Label>
                      <TextArea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Deskripsi..."/>
                    </div>
                    <div>
                      <Label htmlFor="input">Harga Layanan</Label>
                      <Input type='number' value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Harga..." />
                    </div>
                    <Button onClick={handleEdit} typeButton='ubah'>Ubah</Button>
                  </div>
                </ComponentCard>
            </AdminLayoutContent>
        </ThemeProvider>
    </SidebarProvider>
  )
}
