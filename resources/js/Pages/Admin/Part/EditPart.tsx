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

export default function EditPart () {
  interface Data {
    id: number;
    name: string;
    type: string;
    code: number;
    price: number;
    part: any;
  }

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [code, setCode] = useState('');
  const [price, setPrice] = useState('');
  const page = usePage();
  const id = page.props.id;

  useEffect(() => {
    const fetchDataById = async() => {
        try {
            const response = await axios.get<Data>(`/api/part/${id}`);
            const data = response.data.part;
            setType(data.type);
            setName(data.name);
            setCode(data.code);
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
      await axios.put(`/api/part/${id}`, {
        name: name,
        type: type,
        code: code,
        price: price
      });

      Swal.fire({
        title: "Ubah data berhasil",
        icon: 'success',
        confirmButtonColor: 'green',
        confirmButtonText: 'Sukses'
      });

      setTimeout(() => {
        router.visit('/admin/parts');
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
                    <Button onClick={handleEdit} typeButton='ubah'>Ubah</Button>
                  </div>
                </ComponentCard>
            </AdminLayoutContent>
        </ThemeProvider>
    </SidebarProvider>
  )
}
