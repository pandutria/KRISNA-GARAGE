import { useCallback } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
  BoxCubeIcon,
  CalenderIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
  PageIcon,
  PieChartIcon,
  PlugInIcon,
  TableIcon,
  UserCircleIcon,
  FileIcon,
  PartIcon,
  MechanicIcon,
  TimeIcon,
  DollarLineIcon
} from "../Assets/Icons/index";
import { useSidebar } from "../Context/SideBarContext";
import logo from '../../../public/images/logo.jpg';

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
};

const navItems: NavItem[] = [
  {
    icon: <PartIcon />,
    name: "Suku Cadang",
    path: "/mechanic/parts",
  },
  {
    icon: <TimeIcon />,
    name: "Jadwal",
    path: "/mechanic/schedules",
  },
  {
    name: "Transaksi",
    icon: <DollarLineIcon />,
    path: "/mechanic/add/transaction",
  },
];

const MechanicSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const page = usePage();
  const location = page.url;

  const isActive = useCallback(
    (path: string) => location === path,
    [location]
  );

  const renderMenuItems = (items: NavItem[]) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav) => (
        <li key={nav.name}>
          {nav.path && (
            <Link
              href={nav.path}
              className={`menu-item group ${
                isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
              }`}
            >
              <span
                className={`menu-item-icon-size ${
                  isActive(nav.path)
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="#">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <div className="font-poppins flex items-center gap-3">
                <img
                  className="rounded-full"
                  src={logo}
                  alt="Logo"
                  width={50}
                  height={50}
                />
                <h1 className="font-[500] text-[20px] text-black dark:text-white">Krisna Garage</h1>
              </div>
            </>
          ) : (
            <img
            className="rounded-full"
              src={logo}
              alt="Logo"
              width={45}
              height={45}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(navItems)}
            </div>           
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default MechanicSidebar;
