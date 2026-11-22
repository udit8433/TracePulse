
import { useState } from "react";
import "./Sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Home,
  Info,
  LogOut,
  Menu,
  Activity
} from "lucide-react";
import { logoutUser } from "../api";
import toast from "react-hot-toast";

function Sidebar() {

  const [collapsed, setCollapsed] = useState(false);
  

  const navigate = useNavigate();

const handleLogout = async () => {

    const confirmLogout = window.confirm(
        "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    try {
        await logoutUser();

        toast.success("Logged out successfully");
        navigate("/login");

    } catch (error) {
        console.log("Logout error:", error);
        toast.error("Logout failed");
    }
};

  return (
    <aside
      className={`sidebar ${collapsed ? "collapsed" : ""}`}
    >

      {/* Toggle Button */}
      <button
        className="sidebar-toggle"
        onClick={() => setCollapsed(!collapsed)}
        title="Toggle Sidebar"
      >
        <Menu size={21} />
      </button>

      {/* Brand */}
      <div className="brand">
        <div className="brand-icon">⌁</div>

        {!collapsed && (
          <span>
            Trace<span className="brand-highlight">Pulse</span>
          </span>
        )}
      </div>

      {!collapsed && (
        <div className="sidebar-label">MENU</div>
      )}

      {/* Navigation */}
      <nav className="sidebar-nav">

        

        <Link to="/Home" className="nav-item">
          <Home size={20} />
          {!collapsed && <span>Home</span>}
        </Link>

       

        <Link to="/Contact" className="nav-item">
          <Info size={20} />
          {!collapsed && <span>Contact Us</span>}
        </Link>

      </nav>

      {/* Monitoring Info */}
      <div className="sidebar-info">
        <div className="live-dot"></div>

        {!collapsed && (
          <span>Monitoring Dashboard</span>
        )}
      </div>

      {/* Bottom Section */}
      <div className="sidebar-bottom">

        
      

      </div>

      {/* Logout */}
      <button
        className="logout-button"
        onClick={handleLogout}
      >
        <LogOut size={20} />
        {!collapsed && <span>Logout</span>}
      </button>

    </aside>
  );
}

export default Sidebar;
