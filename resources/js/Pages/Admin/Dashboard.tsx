import { SidebarProvider, useSidebar } from "../../Context/SideBarContext";
import AppHeader from "@/Components/Header";
import AppSidebar from "../../Components/Sidebar";
import { ThemeProvider } from "@/Context/ThemeContext";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex font-poppins">
      <div>
        <AppSidebar />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <SidebarProvider>
        <ThemeProvider>
            <LayoutContent />
        </ThemeProvider>
    </SidebarProvider>
  );
};

export default Dashboard;
