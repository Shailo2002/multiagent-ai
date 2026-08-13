import { GoSidebarExpand } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { BsPlugin } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { HiMiniUserCircle } from "react-icons/hi2";
import { FiLogOut } from "react-icons/fi";
import { FiPlusCircle } from "react-icons/fi";
import {
  FiUser,
  FiSettings,
  FiHelpCircle,
  FiChevronRight,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import { LuGauge } from "react-icons/lu";
import createChat from "../features/createChat";

export const sidebarButtons = [
  {
    id: "new chat",
    label: "New Chat",
    icon: FiPlusCircle,
    onClick: createChat,
  },
  {
    id: "search",
    label: "Search",
    icon: IoSearch,
  },
  { id: "plugin", label: "Plugin", icon: BsPlugin },
];

export const profileMenuButtons = [
  {
    id: "upgrade-plan",
    label: "Upgrade plan",
    icon: HiOutlineSparkles,
  },
  {
    id: "personalization",
    label: "Personalization",
    icon: LuGauge,
  },
  {
    id: "profile",
    label: "Profile",
    icon: FiUser,
  },
  {
    id: "settings",
    label: "Settings",
    icon: FiSettings,
  },
  {
    id: "help",
    label: "Help",
    icon: FiHelpCircle,
    endIcon: FiChevronRight,
  },
  {
    id: "logout",
    label: "Log out",
    icon: FiLogOut,
  },
];
