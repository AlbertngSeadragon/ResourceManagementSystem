import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import { useAuth } from "./contexts/AuthContext";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const history = useHistory();
  const { logout } = useAuth();
  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  async function handleLogout() {
    await logout();
    history.push("./login");
  }

  return (
    <div>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose></AiIcons.AiOutlineClose>
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <li key={4} className="nav-text" onClick={handleLogout}>
              <Link to="#">
                <AiIcons.AiOutlineLogout></AiIcons.AiOutlineLogout>
                <span>Log out</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  );
}

export default Navbar;
