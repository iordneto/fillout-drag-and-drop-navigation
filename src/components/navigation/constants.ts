import { CircleCheck, FileText, InfoIcon } from "lucide-react";
import type { NavigationItem } from "./types";

export const DEFAULT_NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: "1",
    label: "Info",
    icon: InfoIcon,
    isActive: true,
  },
  {
    id: "2",
    label: "Details",
    icon: FileText,
  },
  {
    id: "3",
    label: "Other",
    icon: FileText,
  },
  {
    id: "4",
    label: "Ending",
    icon: CircleCheck,
  },
];

export const DEFAULT_CONTEXT_MENU_STATE = {
  isOpen: false,
  position: { x: 0, y: 0 },
  itemId: null,
} as const;
