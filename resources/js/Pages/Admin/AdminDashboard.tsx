import PageBreadcrumb from '@/Assets/Common/PageBreadCrumb'
import { SidebarProvider } from '@/Context/SideBarContext'
import { ThemeProvider } from '@/Context/ThemeContext'
import React, { useEffect, useState } from 'react'
import AdminLayoutContent from '../AdminLayoutContent'
import axios from 'axios'
import { User, Users, Truck, Box, Settings, Package } from 'lucide-react'

export default function AdminDashboard() {
  const [mechanics, setMechanics] = useState([]);
  const [customers, setCustomers] = useState<Data[]>([]);
  const [parts, setParts] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [services, setServices] = useState([]);
  const [transactions, setTransactions] = useState([]);

  interface Data {
    id: number;
    name: string;
    password: string;
    address: string;
    phone_number: number;
  }

  useEffect(() => {
    axios.get('/api/mechanic').then(res => setMechanics(res.data.mechanic.length))
    axios.get('/api/customer').then(res => setCustomers(res.data.customer))
    axios.get('/api/part').then(res => setParts(res.data.part.length))
    axios.get('/api/vehicle').then(res => setVehicles(res.data.vehicle.length))
    axios.get('/api/service').then(res => setServices(res.data.service.length))
    axios.get('/api/transaction').then(res => setTransactions(res.data.transaction.length))
  }, [])

  return (
    <SidebarProvider>
      <ThemeProvider>
        <AdminLayoutContent>
          <PageBreadcrumb pageTitle='Dasbor'/>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col gap-4 col-span-1 lg:col-span-2">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Pelanggan yang baru saja bergabung</h2>
              <div className="flex flex-col gap-3">
                {customers.slice(0, 5).map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="text-sm text-gray-700 dark:text-gray-200">{item.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{item.phone_number}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 col-span-1 lg:col-span-2">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 flex items-center gap-4">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full"><Users className="text-blue-600 dark:text-blue-300" size={24} /></div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Mekanik</p>
                  <p className="text-lg font-semibold text-gray-800 dark:text-white">{mechanics}</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 flex items-center gap-4">
                <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full"><User className="text-orange-600 dark:text-orange-300" size={24} /></div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Pelanggan</p>
                  <p className="text-lg font-semibold text-gray-800 dark:text-white">{customers.length}</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 flex items-center gap-4">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full"><Box className="text-green-600 dark:text-green-300" size={24} /></div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Suku Cadang</p>
                  <p className="text-lg font-semibold text-gray-800 dark:text-white">{parts}</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 flex items-center gap-4">
                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full"><Truck className="text-purple-600 dark:text-purple-300" size={24} /></div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Kendaraan</p>
                  <p className="text-lg font-semibold text-gray-800 dark:text-white">{vehicles}</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 flex items-center gap-4">
                <div className="bg-pink-100 dark:bg-pink-900 p-3 rounded-full"><Settings className="text-pink-600 dark:text-pink-300" size={24} /></div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Layanan</p>
                  <p className="text-lg font-semibold text-gray-800 dark:text-white">{services}</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 flex items-center gap-4">
                <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-full"><Package className="text-yellow-600 dark:text-yellow-300" size={24} /></div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Transaksi</p>
                  <p className="text-lg font-semibold text-gray-800 dark:text-white">{transactions}</p>
                </div>
              </div>
            </div>
          </div>
        </AdminLayoutContent>
      </ThemeProvider>
    </SidebarProvider>
  )
}
