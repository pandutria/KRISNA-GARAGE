import { SidebarProvider } from '@/Context/SideBarContext'
import { ThemeProvider } from '@/Context/ThemeContext'
import React, { useEffect, useState } from 'react'
import ComponentCard from '@/Assets/Common/ComponentCard'
import Label from '@/Assets/Common/Label'
import Input from '@/Assets/Common/InputField'
import Swal from 'sweetalert2'
import axios from 'axios'
import { router, usePage } from '@inertiajs/react'
import Button from '@/Ui/Button'
import CustomerLayoutContent from '@/Pages/CustomerLayoutContent'
import Select from '@/Assets/Common/Select'

export default function Payment () {
  interface Data {
    id: number;
    schedule: {
      mechanic: {
        name: String;
      };
      service: {
        name: string;
      };
      vehicle: {
        type: string;
      }
    };
    total_price: any;
    status: string;
  }

  const [method, setMethod] = useState('');
  const [paymentNumber, setPaymentNumber] = useState('');
  const [data, setData] = useState<Data | null>(null);
  const page = usePage();
  const id = page.props.id;

  const MethodPaymentData = [
    {
        id: "BNI",
        label: "BNI",
        value: "BNI"
    },
    {
        id: "BCA",
        label: "BCA",
        value: "BCA",
    },
    {
        id: "Mandiri",
        label: "Mandiri",
        value: "Mandiri",
    },
  ];

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await axios.get(`/api/transaction/${id}`);
        setData(response.data.transaction[0]);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
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
      await axios.put(`/api/transaction/pay/${id}`, {
        payment_method: method,
        payment_number: paymentNumber
      });

      Swal.fire({
        title: "Pembayaran berhasil",
        icon: 'success',
        confirmButtonColor: 'green',
        confirmButtonText: 'Sukses'
      });

      setTimeout(() => {
        router.visit('/customer/transactions');
      }, 3000);
    } catch (error) {
      Swal.fire({
        title: "Pembayaran gagal",
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
            <CustomerLayoutContent>
                <ComponentCard title="Pembayaran" showAdd={false}>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="input">Layanan</Label>
                      <Input type="string" disabled value={`${data?.schedule.service.name.toString()}`} />
                    </div>
                    <div>
                      <Label htmlFor="input">Kendaraan</Label>
                      <Input type="string" disabled value={`${data?.schedule.vehicle.type.toString()}`} />
                    </div>
                    <div>
                      <Label htmlFor="input">Mekanik</Label>
                      <Input type="string" disabled value={`${data?.schedule.mechanic.name.toString()}`} />
                    </div>
                    <div>
                      <Label htmlFor="input">Metode Pembayaran</Label>
                      <Select className="dark:bg-dark-900" defaultValue={method} options={MethodPaymentData} onChange={setMethod} placeholder='Pilih metode pembayaraan...' />
                    </div>
                    <div>
                      <Label htmlFor="input">Nomor Kartu</Label>
                      <Input type="number" value={paymentNumber} onChange={(e) => setPaymentNumber(e.target.value)} placeholder="Pilih nomor pembayaraan..." />
                    </div>
                    <Button onClick={handleEdit} typeButton='kirim'>Bayar</Button>
                  </div>
                </ComponentCard>
            </CustomerLayoutContent>
        </ThemeProvider>
    </SidebarProvider>
  )
}
