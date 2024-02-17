import {
  Code,
  ImageIcon,
  Languages,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  StickyNote,
  VideoIcon
} from "lucide-react";

export const MAX_FREE_COUNTS = 5;

export const tools = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: "text-sky-500",
    bgColor: "white",
  },
  {
    label: 'Note',
    icon: StickyNote,
    color: "text-green-700",
    href: '/note',
    bgColor: "bg-violet-500/10",
  },
  {
    label: 'Code',
    icon: Code,
    color: "text-yellow-500",
    href: '/code',
    bgColor: "bg-violet-500/10",
  },
  {
    label: 'Language',
    icon: Languages,
    color: "text-red-500",
    href: '/language',
    bgColor: "bg-pink-700/10",
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
    bgColor: "bg-orange-700/10",
  },
];
