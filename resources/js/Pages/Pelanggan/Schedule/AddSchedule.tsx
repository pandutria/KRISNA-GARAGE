import { SidebarProvider } from '@/Context/SideBarContext'
import { ThemeProvider } from '@/Context/ThemeContext'
import React, { useEffect, useState } from 'react'
import ComponentCard from '@/Assets/Common/ComponentCard'
import Label from '@/Assets/Common/Label'
import Input from '@/Assets/Common/InputField'
import Swal from 'sweetalert2'
import axios from 'axios'
import { router } from '@inertiajs/react'
import Button from '@/Ui/Button'
import CustomerLayoutContent from '@/Pages/CustomerLayoutContent'
import cookie from 'js-cookie'
import Select from '@/Assets/Common/Select'

export default function AddSchedule () {
//   interface VehicleData {
//     id: number;
//     type: string
//     engine_number: number,
//     frame_number: number,
//   }

//   interface ServiceData {
//     id: number;
//     name: string;
//     description: string;
//     price: number;
//   }

//   interface MechanicData {
//     id: number;
//     name: string;
//     password: string;
//     address: string;
//     phone_number: number;
//   }
    
  const [vehicleId, setVehicleId] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [mechanicId, setMechanicId] = useState('');
  const [vehicleData, setVehicleData] = useState<any>([]);
  const [serviceData, setServiceData] = useState<any>([]);
  const [mechanicData, setMechanicData] = useState<any>([]);
  const token = cookie.get('token');

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
      await axios.post('/api/schedule', {
        vehicle_id: vehicleId,
        service_id: serviceId,
        mechanic_id: mechanicId,
      }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
      });

      Swal.fire({
        title: "Tambah data berhasil",
        icon: 'success',
        confirmButtonColor: 'green',
        confirmButtonText: 'Sukses'
      });

      setTimeout(() => {
        router.visit('/customer/schedules');
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

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get('/api/vehicle');
        const mappedData = response.data.vehicle.map((item: any) => ({
          id: item.id,
          value: String(item.id),
          label: `${item.type} - Mesin: ${item.engine_number}`,
        }));
        setVehicleData(mappedData);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchService = async () => {
      try {
        const response = await axios.get('/api/service');
        const mappedData = response.data.service.map((item: any) => ({
          id: item.id,
          value: String(item.id),
          label: `${item.name} - Harga: ${item.price}`,
        }));
        setServiceData(mappedData);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchMechanic = async () => {
      try {
        const response = await axios.get('/api/mechanic');
        const mappedData = response.data.mechanic.map((item: any) => ({
          id: item.id,
          value: String(item.id),
          label: `${item.name}`,
        }));
        setMechanicData(mappedData);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchVehicle();
    fetchService();
    fetchMechanic();
  }, []);

  return (
    <SidebarProvider>
        <ThemeProvider>
            <CustomerLayoutContent>
                <ComponentCard title="Tambah Kendaraan" showAdd={false}>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="input">Kendaraan</Label>
                      <Select className="dark:bg-dark-900" defaultValue={vehicleId} options={vehicleData} onChange={setVehicleId} placeholder='Pilih Kendaraan...' />
                    </div>
                    <div>
                      <Label htmlFor="input">Layanan</Label>
                      <Select className="dark:bg-dark-900" defaultValue={serviceId} options={serviceData} onChange={setServiceId} placeholder='Pilih Layanan...' />
                    </div>
                    <div>
                      <Label htmlFor="input">Mekanik</Label>
                      <Select className="dark:bg-dark-900" defaultValue={mechanicId} options={mechanicData} onChange={setMechanicId} placeholder='Pilih Mekanik...' />
                    </div>
                    <Button onClick={handlePost} typeButton='kirim'>Kirim</Button>
                  </div>
                </ComponentCard>
            </CustomerLayoutContent>
        </ThemeProvider>
    </SidebarProvider>
  )
}
