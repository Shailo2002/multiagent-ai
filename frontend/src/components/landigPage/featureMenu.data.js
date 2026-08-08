import {
  TbAppWindow,
  TbFileAnalytics,
  TbFileSpreadsheet,
  TbFileText,
  TbGlobe,
  TbLayoutDashboard,
  TbMessageCircle,
  TbPhoto,
  TbPresentation,
  TbVideo,
} from "react-icons/tb";

export const defaultFeatures = [
  {
    id: "websites",
    label: "Websites",
    description: "Build production ready sites",
    icon: TbGlobe,
  },
  {
    id: "slides",
    label: "Slides",
    description: "Make beautiful decks",
    icon: TbPresentation,
  },
  {
    id: "multimodal-chat",
    label: "Chat",
    description: "Research, talk and explore",
    icon: TbMessageCircle,
  },
  {
    id: "videos",
    label: "Videos",
    description: "Create your media content",
    icon: TbVideo,
  },
  {
    id: "reports",
    label: "Reports",
    description: "Create structured reports",
    icon: TbFileText,
  },
  {
    id: "sheets",
    label: "Sheets",
    description: "Analyze and organize data",
    icon: TbFileSpreadsheet,
  },
  {
    id: "apps",
    label: "Apps",
    description: "Build functional applications",
    icon: TbAppWindow,
  },
  {
    id: "images",
    label: "Images",
    description: "Generate and edit visuals",
    icon: TbPhoto,
  },
  {
    id: "dashboard",
    label: "Dashboard",
    description: "Visualize important information",
    icon: TbLayoutDashboard,
  },
];
