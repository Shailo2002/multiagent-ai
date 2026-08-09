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

export const sidebarButtons = [
  {
    id: "new chat",
    label: "New Chat",
    icon: FiPlusCircle,
  },
  {
    id: "search",
    label: "Search",
    icon: IoSearch,
  },
  { id: "plugin", label: "Plugin", icon: BsPlugin },
];

export const chats = [
  {
    id: "chat-1",
    name: "Project Planning and Weekly Team Progress Discussion",
  },
  {
    id: "chat-2",
    name: "Frontend Development Questions and UI Improvement Ideas",
  },
  {
    id: "chat-3",
    name: "Customer Support Issues and Resolution Follow-Up Conversation",
  },
  {
    id: "chat-4",
    name: "Marketing Campaign Strategy and Social Media Content Planning",
  },
  {
    id: "chat-5",
    name: "Website Performance Optimization and Loading Speed Improvements",
  },
  {
    id: "chat-6",
    name: "Product Design Feedback and User Experience Research Notes",
  },
  {
    id: "chat-7",
    name: "Monthly Business Review and Important Financial Updates",
  },
  {
    id: "chat-8",
    name: "Mobile Application Bugs and Feature Development Discussion",
  },
  {
    id: "chat-9",
    name: "Learning React, Tailwind CSS, and Motion Animation Concepts",
  },
  {
    id: "chat-10",
    name: "Upcoming Product Launch Checklist and Final Team Coordination",
  },
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
