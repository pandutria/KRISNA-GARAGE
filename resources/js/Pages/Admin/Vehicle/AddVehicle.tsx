import { SidebarProvider } from '@/Context/SideBarContext'
import { ThemeProvider } from '@/Context/ThemeContext'
import AdminLayoutContent from '@/Pages/AdminLayoutContent'
import React, { useState } from 'react'
import ComponentCard from '@/Assets/Common/ComponentCard'
import Label from '@/Assets/Common/Label'
import Input from '@/Assets/Common/InputField'

export default function AddVehicle () {
  return (
    <SidebarProvider>
        <ThemeProvider>
            <AdminLayoutContent>
                <ComponentCard title="Tambah Kendaraan" showAdd={false}>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="inputTwo">Tipe Kendaraan</Label>
                      <Input type="text" id="inputTwo" placeholder="Tipe Kendaraan..." />
                    </div>
                    <div>
                      <Label htmlFor="inputTwo">Nomor Mesin</Label>
                      <Input type="text" id="inputTwo" placeholder="Nomor mesin..." />
                    </div>
                    <div>
                      <Label htmlFor="inputTwo">Nomor Rangka</Label>
                      <Input type="text" id="inputTwo" placeholder="Nomor Rangka..." />
                    </div>
                  </div>
                </ComponentCard>
            </AdminLayoutContent>
        </ThemeProvider>
    </SidebarProvider>
  )
}
