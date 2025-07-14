import { useSidebar } from "../Context/SideBarContext";
import AppHeader from "@/Components/Header";
import React, { useEffect } from "react";
import MechanicSidebar from "@/Components/MechanicSidebar";

interface LayoutContentProps {
  children: React.ReactNode;
}

const MechanicLayoutContent: React.FC<LayoutContentProps> = ({ children }) => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();  

  return (
    <div className="min-h-screen xl:flex font-poppins">
      <div>
        <MechanicSidebar />
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

export default MechanicLayoutContent