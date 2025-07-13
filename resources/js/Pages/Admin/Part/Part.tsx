import { ThemeProvider } from "@/Context/ThemeContext";
import { SidebarProvider } from "@/Context/SideBarContext";
import AdminLayoutContent from "../../AdminLayoutContent";
import PageBreadcrumb from "@/Assets/Common/PageBreadCrumb";
import ComponentCard from "@/Assets/Common/ComponentCard";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/Ui/Table";
import { router } from "@inertiajs/react";
import Swal from "sweetalert2";
import RupiahFormat from "@/Utils/RupiahFormat";

interface Data {
  id: number;
  name: string;
  type: string;
  code: number;
  price: number;
}

const Part: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await axios.get('/api/part');
        setData(response.data.part);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData()
  }, []);

  const handleDelete = async(id: number) => {
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
      await axios.delete(`/api/part/${id}`);

      Swal.fire({
        title: "Hapus data berhasil",
        icon: 'success',
        confirmButtonColor: 'green',
        confirmButtonText: 'Sukses'
      });

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <SidebarProvider>
      <ThemeProvider>
        <AdminLayoutContent>
          <PageBreadcrumb pageTitle="Suku Cadang" />
            <div className="space-y-6">
              <ComponentCard title="List Suku Cadang" addItem="/admin/add/part">
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
                            Kode
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                          >
                           Tipe
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                          >
                           Harga
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
                              {item.name}
                            </TableCell>
                            <TableCell className="px-4 py-3 text-black text-start text-theme-sm dark:text-white">
                              {item.code}
                            </TableCell>
                            <TableCell className="px-4 py-3 text-black text-start text-theme-sm dark:text-white">
                              {item.type}
                            </TableCell>
                            <TableCell className="px-4 py-3 text-black text-start text-theme-sm dark:text-white">
                              {RupiahFormat(item.price)}
                            </TableCell>
                            <TableCell className="px-4 py-3 text-black text-theme-sm dark:text-white">
                              <div className="flex gap-2">
                                <button
                                  className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 transition"
                                  title="Ubah"
                                  onClick={() => router.visit(`/admin/edit/part/${item.id}`)}
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
        </AdminLayoutContent>
      </ThemeProvider>
    </SidebarProvider>
  );
};

export default Part;