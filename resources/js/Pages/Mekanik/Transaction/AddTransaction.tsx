import { SidebarProvider } from '@/Context/SideBarContext'
import { ThemeProvider } from '@/Context/ThemeContext'
import Select from '@/Assets/Common/Select'
import React, { useEffect, useState } from 'react'
import ComponentCard from '@/Assets/Common/ComponentCard'
import Label from '@/Assets/Common/Label'
import Swal from 'sweetalert2'
import axios from 'axios'
import { router } from '@inertiajs/react'
import Button from '@/Ui/Button'
import MechanicLayoutContent from '@/Pages/MechanicLayoutContent'
import cookie from 'js-cookie'
import { MinusIcon, PlusIcon } from 'lucide-react'
import Input from '@/Assets/Common/InputField'

export default function AddTransaction () {
  interface TransactionDetail {
    part_id: number;
    qty: number;
    subtotal: number;
  }

  const [scheduleId, setScheduleId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentNumber, setPaymentNumber] = useState('');
  const [scheduleData, setScheduleData] = useState<any[]>([]);
  const [partData, setPartData] = useState<any[]>([]);
  const [transactionDetail, setTransactionDetail] = useState<TransactionDetail[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const token = cookie.get('token');

  const MethodPaymentData = [
    {
        id: "Dana",
        label: "Dana",
        value: "Dana"
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
    const fetchScheduleData = async() => {
      try {
        const response = await axios.get('/api/schedule/mechanic', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const mappedData = response.data.schedule.map((item: any) => ({
          id: item.id,
          value: String(item.id),
          label: `Kendaraan: ${item.vehicle.type} - Layanan: ${item.service.name}`
        }));
        setScheduleData(mappedData);
      } catch (error) { console.error(error); }
    }

    const fetchPartData = async() => {
      try {
        const response = await axios.get('/api/part');
        setPartData(response.data.part);
      } catch (error) { console.error(error); }
    }

    fetchScheduleData();
    fetchPartData();
  }, []);

  useEffect(() => {
    let total = 0;
    transactionDetail.forEach(item => { total += item.subtotal; });
    setTotalPrice(total);
  }, [transactionDetail]);

  const incrementQty = (part_id: number) => {
    const part = partData.find(p => p.id === part_id);
    if (!part) return;
    setTransactionDetail(prev => {
      const existing = prev.find(item => item.part_id === part_id);
      if (existing) {
        const newQty = existing.qty + 1;
        const newSubtotal = part.price * newQty;
        return prev.map(item => item.part_id === part_id ? { ...item, qty: newQty, subtotal: newSubtotal } : item);
      } else {
        return [...prev, { part_id, qty: 1, subtotal: part.price }];
      }
    });
  }

  const decrementQty = (part_id: number) => {
    const part = partData.find(p => p.id === part_id);
    if (!part) return;
    setTransactionDetail(prev => {
      return prev.map(item => {
        if (item.part_id === part_id) {
          const newQty = item.qty - 1 < 0 ? 0 : item.qty - 1;
          const newSubtotal = part.price * newQty;
          return { ...item, qty: newQty, subtotal: newSubtotal };
        }
        return item;
      });
    });
  }

  const getQty = (part_id: number) => {
    const found = transactionDetail.find(item => item.part_id === part_id);
    return found ? found.qty : 0;
  }

  const getSubtotal = (part_id: number) => {
    const found = transactionDetail.find(item => item.part_id === part_id);
    return found ? found.subtotal : 0;
  }

  const handlePost = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      Swal.fire({
        didOpen: () => { Swal.showLoading() },
        allowOutsideClick: false,
        title: 'Memuat...',
        timer: 1000
      });
      await new Promise(resolve => setTimeout(resolve, 2000));
      const responseTransactionHeader = await axios.post('/api/transaction', {
        schedule_id: scheduleId,
        total: totalPrice,
        payment_method: paymentMethod,
        payment_number: paymentNumber,
      });
      for (const item of transactionDetail) {
        await axios.post('/api/transactionId', {
          transaction_id: responseTransactionHeader.data.transaction.id,
          part_id: item.part_id,
          qty: item.qty,
          subtotal: item.subtotal
        });
      }
      Swal.fire({
        title: "Tambah data berhasil",
        icon: 'success',
        confirmButtonColor: 'green',
        confirmButtonText: 'Sukses'
      });
      setTimeout(() => { router.visit('/mechanic/add/transaction'); }, 3000);
    } catch (error) {
      console.error(error);
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
          <ComponentCard title="Pembayaraan" showAdd={false}>
            <div className="space-y-6">
              <div>
                <Label htmlFor="input">Jadwal</Label>
                <Select className="dark:bg-dark-900" defaultValue={scheduleId} onChange={setScheduleId} options={scheduleData} placeholder='Pilih Jadwal...' />
              </div>
              <div>
                <Label htmlFor="input">Metode Pembayaraan</Label>
                <Select className="dark:bg-dark-900" defaultValue={paymentMethod} options={MethodPaymentData} onChange={setPaymentMethod} placeholder='Pilih Metode Pembayaran...' />
              </div>
              <div>
                <Label htmlFor="input">No Pembayaraan</Label>
                <Input type="number" value={paymentNumber} onChange={(e) => setPaymentNumber(e.target.value)} placeholder="No. Pembayaran..." />
              </div>
              <div>
                <Label htmlFor="input">Suku Cadang Yang Diperlukan</Label>
                <div className="flex gap-4 flex-wrap items-center">
                  {partData.map((item, index) => (
                    <div className="border-gray-300 rounded-md border-2 p-3 text-[14px] min-w-[180px]" key={index}>
                      <h1 className="text-[13px]">{item.name}</h1>
                      <h1 className="text-[12px] text-gray-500">Harga: Rp{item.price.toLocaleString()}</h1>
                      <div className="flex justify-between items-center mt-2">
                        <button
                          type="button"
                          onClick={() => decrementQty(item.id)}
                          className="p-[4px] rounded-md border border-gray-300 text-gray-500 hover:bg-gray-100"
                        >
                          <MinusIcon size={14} />
                        </button>
                        <h1 className="text-[13px]">{getQty(item.id)}</h1>
                        <button
                          type="button"
                          onClick={() => incrementQty(item.id)}
                          className="p-[4px] rounded-md border border-gray-300 text-gray-500 hover:bg-gray-100"
                        >
                          <PlusIcon size={14} />
                        </button>
                      </div>
                      <h1 className="text-[12px] text-gray-600 mt-1">Subtotal: Rp{getSubtotal(item.id).toLocaleString()}</h1>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-right text-[14px] font-semibold">
                Total: Rp{totalPrice.toLocaleString()}
              </div>
              <Button onClick={handlePost} typeButton='kirim'>Kirim</Button>
            </div>
          </ComponentCard>
        </MechanicLayoutContent>
      </ThemeProvider>
    </SidebarProvider>
  )
}
