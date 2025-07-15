import { useSidebar } from "../Context/SideBarContext";
import AppHeader from "@/Components/Header";
import React, { useEffect } from "react";
import CashierSidebar from "@/Components/CashierSidebar";
import ShowDetailTransaction from "./Kasir/ShowDetailTransaction";

interface LayoutContentProps {
  children: React.ReactNode;
  show: boolean;
  setShow: any;
  id: any;
}

const CashierLayoutContent: React.FC<LayoutContentProps> = ({ children, show, setShow, id }: any) => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();  
  const handleShow = () => {
    setShow(!show);
  }

  return (
    <div className="min-h-screen xl:flex font-poppins">
      <div className={`${show == false ? 'hidden' : 'fixed'} z-[200]`}>
        <ShowDetailTransaction transactionId={id} show={show} setShow={setShow}/>
      </div>
      <div className="">
        <CashierSidebar />
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

export default CashierLayoutContent