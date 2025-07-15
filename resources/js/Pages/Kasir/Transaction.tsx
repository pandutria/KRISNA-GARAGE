import { ThemeProvider } from "@/Context/ThemeContext";
import { SidebarProvider } from "@/Context/SideBarContext";
import PageBreadcrumb from "@/Assets/Common/PageBreadCrumb";
import ComponentCard from "@/Assets/Common/ComponentCard";
import axios from "axios";
import { useState, useEffect } from "react";
import cookie from 'js-cookie';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/Ui/Table";
import { router } from "@inertiajs/react";
import RupiahFormat from "@/Utils/RupiahFormat";
import CashierLayoutContent from "../CashierLayoutContent";
import { Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

interface Data {
  id: number;
  schedule: {
    customer: {
      name: string;
    };
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

const Transaction: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const token = cookie.get('token');
  const [show, setShow] = useState(false);
  const [transactionId, setTransactionId] = useState(0);
  
  const fetchData = async() => {
    try {
      const response = await axios.get('/api/transaction');
      setData(response.data.transaction);
    } catch (error) {
      console.error(error);
    }
  }

  const handleShow = (id: number) => {
    setTransactionId(id);
    setShow(true);
  }

  useEffect(() => {
    fetchData()
  }, []);

  const handleDelete = async(id: number) => {
    try {
      Swal.fire({
        icon: 'question',
        title: "Apa kamu yakin untuk menghapus data ini?",
        confirmButtonColor: 'red',
        confirmButtonText: 'Iya',
        showDenyButton: true,
        denyButtonColor: 'green',
        denyButtonText: 'Tidak'
      }).then(async(result) => {
        if (result.isConfirmed) {
          Swal.fire({
            didOpen: () => {
              Swal.showLoading()
            },
            allowOutsideClick: false,
            title: 'Memuat...',
            timer: 1000
          });
        
          await new Promise(resolve => setTimeout(resolve, 2000));
          await axios.delete(`/api/transaction/${id}`);
        
          Swal.fire({
            title: "Hapus data berhasil",
            icon: 'success',
            confirmButtonColor: 'green',
            confirmButtonText: 'Sukses'
          });
        
          setTimeout(() => {
            fetchData();
          }, 1000);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <SidebarProvider>
      <ThemeProvider>
        <CashierLayoutContent show={show} setShow={setShow} id={transactionId}>
          <PageBreadcrumb pageTitle="Transaksi" />
            <div className="space-y-6">
              <ComponentCard title="List Transaksi" showAdd={false}>
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                  <div className="max-w-full overflow-x-auto">
                    <Table>
                      {/* Table Header */}
                      <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                        <TableRow>
                          <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                          >
                            No
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                          >
                            Nama
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                          >
                            Layanan
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                          >
                            Kendaraan
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                          >
                            Mekanik
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                          >
                            Status
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                          >
                            Total Harga
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                          >
                            Aksi
                          </TableCell>
                        </TableRow>
                      </TableHeader>

                      {/* Table Body */}
                      <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {data.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="px-5 py-4 sm:px-6 text-start">
                              {index + 1}
                            </TableCell>
                            <TableCell className="px-4 py-3 text-black text-start text-theme-sm dark:text-white">
                              {item.schedule.customer.name}
                            </TableCell>
                            <TableCell className="px-4 py-3 text-black text-start text-theme-sm dark:text-white">
                              {item.schedule.service.name}
                            </TableCell>
                            <TableCell className="px-4 py-3 text-black text-start text-theme-sm dark:text-white">
                              {item.schedule.vehicle.type}
                            </TableCell>
                            <TableCell className="px-4 py-3 text-black text-start text-theme-sm dark:text-white">
                              {item.schedule.mechanic.name}
                            </TableCell>
                            <TableCell className="px-4 py-3 text-black text-start text-theme-sm dark:text-white">
                              {item.status == 'unpaid' ? 'Belum Terbayar' : item.status == 'procces' ? 'Sedang Diproses' : 'Sudah Terbayar'}
                            </TableCell>
                            <TableCell className="px-4 py-3 text-black text-start text-theme-sm dark:text-white">
                              {RupiahFormat(item.total_price)}
                            </TableCell>
                            <TableCell className="px-4 py-3 text-black text-theme-sm dark:text-white">
                              <div className="flex gap-2">
                                <button
                                  className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 transition"
                                  title="Ubah"
                                  onClick={() => handleShow(item.id)}
                                >
                                  <Pencil size={18} />
                                </button>
                                <button
                                  className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition"
                                  title="Hapus"
                                  onClick={() => handleDelete(item.id)}
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </ComponentCard>
            </div>
        </CashierLayoutContent>
      </ThemeProvider>
    </SidebarProvider>
  );
};

export default Transaction;