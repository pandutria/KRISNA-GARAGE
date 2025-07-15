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
import CustomerLayoutContent from "@/Pages/CustomerLayoutContent";
import RupiahFormat from "@/Utils/RupiahFormat";

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

const Transaction: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const token = cookie.get('token');
  
  const fetchData = async() => {
    try {
      const response = await axios.get('/api/transaction/customer', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setData(response.data.transaction);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <SidebarProvider>
      <ThemeProvider>
        <CustomerLayoutContent>
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
                            Bayar
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
                                  className={`p-2 rounded-lg w-full transition ${item.status !== 'unpaid' ? 'bg-gray-100 hover:bg-gray-200 text-gray-600' : 'bg-green-100 hover:bg-green-200 text-green-600'}`}
                                  title="Ubah"
                                  onClick={() => {item.status != 'unpaid' ? false : router.visit(`/customer/transaction/payment/${item.id}`)}}
                                >
                                  Bayar
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
        </CustomerLayoutContent>
      </ThemeProvider>
    </SidebarProvider>
  );
};

export default Transaction;