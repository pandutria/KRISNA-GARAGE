import React, { useEffect, useState } from 'react'
import axios from 'axios';
import RupiahFormat from '@/Utils/RupiahFormat';
import Swal from 'sweetalert2';
import { X } from 'lucide-react';

interface TransactionDetailProps {
  show: boolean;
  setShow: any;
  transactionId: any;
}

interface transactionProp {
  id: number;
  status: string;
  subtotal: number;
  transaction_id: number;
  qty: any;
  transaction: {
    total_price: any;
    payment_method: string;
    status: string;
    schedule: {
      customer: { name: string };
      mechanic: { name: string };
      vehicle: { type: any };
      service: { name: string; price: any };
    };
  };
  part: { name: string; price: any };
  created_at: any;
}

const ShowDetailTransaction: React.FC<TransactionDetailProps> = ({ transactionId, setShow, show }) => {
  const [transactionData, setTransactionData] = useState<transactionProp[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [status, setStatus] = useState('');
  const [customer, setCustomer] = useState('');
  const [mechanic, setMechanic] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState('');

  useEffect(() => {
    const checkResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const fetchTransactionId = async () => {
      try {
        const response = await axios.get(`/api/transactionDetail/transaction/${transactionId}`);
        const data = response.data.transactionDetail;
        setTransactionData(data);
        setStatus(data[0]?.transaction.status);
        setTotalPrice(data[0]?.transaction.total_price);
        setServiceName(data[0]?.transaction.schedule.service.name);
        setServicePrice(data[0]?.transaction.schedule.service.price);
        setCustomer(data[0]?.transaction.schedule.customer.name);
        setVehicle(data[0]?.transaction.schedule.vehicle.type);
        setMechanic(data[0]?.transaction.schedule.mechanic.name);
      } catch (error) {
        console.error(error);
      }
    };

    checkResize();
    fetchTransactionId();
  }, [transactionId]);

  const handleShow = () => {
    setShow(false);
  };

  const handleStatusUpdate = async() => {
    Swal.fire({
      didOpen: () => {
        Swal.showLoading()
      },
      allowOutsideClick: false,
      title: 'Memuat...',
      timer: 1000
    });

    await new Promise(resolve => setTimeout(resolve, 2000));
    const result = await Swal.fire({
      icon: 'question',
      title: 'Ubah Status Transaksi?',
      input: 'select',
      inputOptions: {
        success: 'Berhasil',
        rejected: 'Ditolak'
      },
      inputLabel: 'Pilih status baru',
      showCancelButton: true,
      cancelButtonText: 'Batal',
      confirmButtonText: 'Simpan',
      confirmButtonColor: 'green',
      cancelButtonColor: 'red'
    });

    if (result.isConfirmed && result.value) {
      try {
        await axios.put(`/api/transaction/updateStatus/${transactionId}`, { status: result.value });
        Swal.fire({
          icon: 'success',
          title: "Status Berhasil Diubah",
          confirmButtonText: 'Oke',
          confirmButtonColor: 'green'
        });
        
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCetak = () => {
    window.print();
  };

  return (
    <div className='bg-[#0000004e] w-full min-h-screen fixed z-30 justify-center flex items-center'>
      <div className="bg-white dark:bg-gray-900 lg:p-8 py-8 px-5 rounded-lg lg:min-w-[600px] w-[290px] flex flex-col justify-center items-center relative">
        <div className="absolute right-[12px] top-[12px]">
          <button
            className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition dark:bg-red-900 dark:hover:bg-red-800 dark:text-red-300"
            onClick={handleShow}
          >
            <X size={18} />
          </button>
        </div>
        <h1 className='font-poppins_semibold lg:text-[28px] text-[20px] font-[500] dark:text-white'>Detail Transaksi</h1>
        <div className="mt-6 flex flex-col gap-3 justify-center items-center w-full">
          <div className="flex justify-between items-center gap-2 w-full">
            <p className='lg:text-[16px] text-[14px] dark:text-white'>ID Transaksi :</p>
            <p className='lg:text-[14px] text-[12px] dark:text-white'>{`Order-${transactionData[0]?.transaction_id}`}</p>
          </div>
          <div className="flex justify-between items-center gap-2 w-full">
            <p className='lg:text-[16px] text-[14px] dark:text-white'>Pelanggan :</p>
            <p className='lg:text-[14px] text-[12px] dark:text-white'>{customer}</p>
          </div>
          <div className="flex justify-between items-center gap-2 w-full">
            <p className='lg:text-[16px] text-[14px] dark:text-white'>Waktu :</p>
            <p className='lg:text-[14px] text-[12px] dark:text-white'>{transactionData[0]?.created_at.slice(0, 10)}</p>
          </div>
          <div className="flex justify-between items-center gap-2 w-full">
            <p className='lg:text-[16px] text-[14px] dark:text-white'>Layanan :</p>
            <p className='lg:text-[14px] text-[12px] dark:text-white'>{serviceName}</p>
          </div>
          <div className="flex justify-between items-center gap-2 w-full">
            <p className='lg:text-[16px] text-[14px] dark:text-white'>Kendaraan :</p>
            <p className='lg:text-[14px] text-[12px] dark:text-white'>{vehicle}</p>
          </div>
          <div className="flex justify-between items-center gap-2 w-full">
            <p className='lg:text-[16px] text-[14px] dark:text-white'>Mekanik :</p>
            <p className='lg:text-[14px] text-[12px] dark:text-white'>{mechanic}</p>
          </div>
          <hr className='outline-none bg-black dark:bg-white lg:h-[2px] h-[1px] w-full' />
          <div className="overflow-x-scroll w-full">
            <div className="flex flex-col gap-2 w-full h-[16vh] print:h-auto">
              {transactionData?.map((item, index) => (
                <div className="flex flex-col gap-4 avoid-break" key={index}>
                  <div className="flex justify-between mt-1 items-start">
                    <p className='lg:text-[16px] text-[12px] dark:text-white'>{item.part.name}</p>
                    <div className="flex flex-col">
                      <p className='lg:text-[16px] text-[14px] dark:text-white'>{RupiahFormat(item.subtotal)}</p>
                      <p className='lg:text-[12px] text-[10px] dark:text-white'>{item.qty} <span className="mx-1">X</span> {RupiahFormat(item.part.price)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <hr className='outline-none bg-black dark:bg-white lg:h-[2px] h-[1px] w-full mt-2' />
          <div className="flex justify-between items-center gap-2 w-full">
            <p className='text-[16px] dark:text-white'>Harga Layanan :</p>
            <p className='text-[16px] dark:text-white'>{RupiahFormat(Number(servicePrice))}</p>
          </div>
          <div className="flex justify-between items-center gap-2 w-full">
            <p className='text-[16px] dark:text-white'>Total :</p>
            <p className='text-[16px] dark:text-white'>{RupiahFormat(Number(totalPrice))}</p>
          </div>
          <div className="flex flex-col w-full gap-2">
            <div className="flex justify-between items-center gap-2 w-full">
              <p className='text-[16px] dark:text-white'>Status :</p>
              <div className="flex justify-center items-center gap-4">
                <p className={`text-[14px] text-white rounded-md p-2 ${status === 'rejected' ? 'bg-red-600' : status === 'procces' ? 'bg-yellow-600' : status === 'success' ? 'bg-green-600' : 'bg-gray-600'}`}>
                  {status === 'rejected' ? 'Ditolak' : status === 'procces' ? 'Diproses' : status === 'success' ? 'Disetujui' : 'Menunggu'}
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleStatusUpdate}
                className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md transition dark:bg-green-700 dark:hover:bg-green-800"
              >
                Ubah Status
              </button>
              <button
                onClick={handleCetak}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md transition dark:bg-blue-700 dark:hover:bg-blue-800"
              >
                Cetak
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowDetailTransaction
