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

export default function EditVehicle () {
  interface Data {
    id: number;
    type: string
    engine_number: any,
    frame_number: any,
    vehicle: any
  }

  const [type, setType] = useState('');
  const [engine, setEngine] = useState('');
  const [frame, setFrame] = useState('');
  const page = usePage();
  const id = page.props.id;

  useEffect(() => {
    const fetchDataById = async() => {
        try {
            const response = await axios.get<Data>(`/api/vehicle/${id}`);
            const data = response.data.vehicle;
            setType(data.type);
            setEngine(data.engine_number);
            setFrame(data.frame_number);
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
      await axios.put(`/api/vehicle/${id}`, {
        type: type,
        engine_number: engine,
        frame_number: frame,
      });

      Swal.fire({
        title: "Ubah data berhasil",
        icon: 'success',
        confirmButtonColor: 'green',
        confirmButtonText: 'Sukses'
      });

      setTimeout(() => {
        router.visit('/admin/vehicles');
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
                <ComponentCard title="Tambah Kendaraan" showAdd={false}>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="input">Tipe Kendaraan</Label>
                      <Input type="text" value={type} onChange={(e) => setType(e.target.value)} placeholder="Tipe Kendaraan..." />
                    </div>
                    <div>
                      <Label htmlFor="input">Nomor Mesin</Label>
                      <Input type="number" value={engine} onChange={(e) => setEngine(e.target.value)} placeholder="Nomor mesin..." />
                    </div>
                    <div>
                      <Label htmlFor="input">Nomor Rangka</Label>
                      <Input type="number" value={frame} onChange={(e) => setFrame(e.target.value)} placeholder="Nomor Rangka..." />
                    </div>
                    <Button onClick={handleEdit} typeButton='ubah'>Ubah</Button>
                  </div>
                </ComponentCard>
            </AdminLayoutContent>
        </ThemeProvider>
    </SidebarProvider>
  )
}
