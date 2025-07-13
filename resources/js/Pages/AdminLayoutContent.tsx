import { useSidebar } from "../Context/SideBarContext";
import AppHeader from "@/Components/Header";
import AdminSidebar from "@/Components/AdminSidebar";
import React, { useEffect } from "react";

interface LayoutContentProps {
  children: React.ReactNode;
}

const AdminLayoutContent: React.FC<LayoutContentProps> = ({ children }) => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();  

  return (
    <div className="min-h-screen xl:flex font-poppins">
      <div>
        <AdminSidebar />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-7xl md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayoutContent