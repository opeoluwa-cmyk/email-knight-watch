
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutDashboard, 
  Mail, 
  User, 
  Settings, 
  Shield,
  Archive
} from "lucide-react";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const menuItems = [
    {
      path: "/",
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      path: "/emails",
      name: "Emails",
      icon: <Mail size={20} />,
    },
    {
      path: "/quarantine",
      name: "Quarantine",
      icon: <Archive size={20} />,
    },
    {
      path: "/profile",
      name: "Profile",
      icon: <User size={20} />,
    },
    {
      path: "/settings",
      name: "Settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <div
      className={`h-full bg-knight-navy text-white flex flex-col border-r border-knight-navy transition-all duration-300 ${
        expanded ? "w-64" : "w-16"
      }`}
    >
      <div className="flex items-center p-4 border-b border-knight-navy/50">
        <div className="flex items-center">
          <Shield size={24} className="text-white" />
          {expanded && (
            <span className="ml-2 text-xl font-bold">Email Knight</span>
          )}
        </div>
        <button
          onClick={toggleSidebar}
          className="ml-auto p-1.5 rounded-md hover:bg-knight-blue transition-colors"
        >
          {expanded ? (
            <ChevronLeft size={18} />
          ) : (
            <ChevronRight size={18} />
          )}
        </button>
      </div>

      <div className="flex-grow p-2">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center p-3 rounded-md transition-colors ${
                  location.pathname === item.path
                    ? "bg-knight-blue text-white"
                    : "hover:bg-knight-navy/80 text-gray-300"
                }`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {expanded && <span className="ml-3">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
