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

export default function EditCustomer () {
  interface Data {
    id: number;
    name: string;
    password: string;
    address: string;
    phone_number: number;
    customer: any;
  }

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const page = usePage();
  const id = page.props.id;

  useEffect(() => {
    const fetchDataById = async() => {
        try {
            const response = await axios.get<Data>(`/api/customer/${id}`);
            const data = response.data.customer;
            setName(data.name);
            setAddress(data.address);
            setPhone(data.phone_number);
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
      await axios.put(`/api/customer/${id}`, {
        name: name,
        password: password,
        address: address,
        phone_number: phone
      });

      Swal.fire({
        title: "Ubah data berhasil",
        icon: 'success',
        confirmButtonColor: 'green',
        confirmButtonText: 'Sukses'
      });

      setTimeout(() => {
        router.visit('/admin/customers');
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
                <ComponentCard title="Tambah Pelanggan" showAdd={false}>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="input">Nama Pelanggan</Label>
                      <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama..." />
                    </div>
                    <div>
                      <Label htmlFor="input">Kata Sandi Pelanggan</Label>
                      <Input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Kata Sandi..." />
                    </div>
                    <div>
                      <Label htmlFor="input">Alamat Pelanggan</Label>
                      <Input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Alamat..." />
                    </div>
                    <div>
                      <Label htmlFor="input">No. Telepon Pelanggan</Label>
                      <Input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="No. Telepon..." />
                    </div>
                    <Button onClick={handleEdit} typeButton='ubah'>Ubah</Button>
                  </div>
                </ComponentCard>
            </AdminLayoutContent>
        </ThemeProvider>
    </SidebarProvider>
  )
}
