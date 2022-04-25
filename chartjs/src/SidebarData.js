import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
  {
    title: "Charts",
    path: "/charts",
    icon: <AiIcons.AiOutlineLineChart></AiIcons.AiOutlineLineChart>,
    cName: "nav-text",
  },

  {
    title: "Account",
    path: "/account",
    icon: <RiIcons.RiAccountCircleFill></RiIcons.RiAccountCircleFill>,
    cName: "nav-text",
  },

  {
    title: "Settings",
    path: "/settings",
    icon: <IoIcons.IoMdSettings></IoIcons.IoMdSettings>,
    cName: "nav-text",
  },
];
