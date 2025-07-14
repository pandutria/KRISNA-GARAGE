import { ThemeProvider } from "@/Context/ThemeContext";
import { SidebarProvider } from "@/Context/SideBarContext";
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
import Swal from "sweetalert2";
import CustomerLayoutContent from "@/Pages/CustomerLayoutContent";

interface Data {
  id: number;
  customer: {
    name: string;
  };
  mechanic: {
    name: string;
  };
  vehicle: {
    type: string;
  };
  service: {
    name: string;
  }
  status: string;
  created_at: any;
}

const Schedule: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await axios.get('/api/schedule');
        setData(response.data.schedule);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData()
  }, []);
  return (
    <SidebarProvider>
      <ThemeProvider>
        <CustomerLayoutContent>
          <PageBreadcrumb pageTitle="Jadwal" />
            <div className="space-y-6">
              <ComponentCard title="List Jadwal" addItem="/customer/add/schedule">
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
                            Kendaraan
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
                            Tanggal
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
                              {item.vehicle.type}
                            </TableCell>
                            <TableCell className="px-4 py-3 text-black text-start text-theme-sm dark:text-white">
                              {item.service.name}
                            </TableCell>
                            <TableCell className="px-4 py-3 text-black text-start text-theme-sm dark:text-white">
                              {item.mechanic.name}
                            </TableCell>
                            <TableCell className="px-4 py-3 text-black text-start text-theme-sm dark:text-white">
                              {item.status}
                            </TableCell>
                            <TableCell className="px-4 py-3 text-black text-start text-theme-sm dark:text-white">
                              {item.created_at.slice(0, 10)}
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

export default Schedule;