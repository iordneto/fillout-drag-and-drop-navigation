import { CircleCheck, FileText, InfoIcon } from "lucide-react";
import type { NavigationItem } from "./types";

export const FIXED_PAGE_IDS = {
  INFO: crypto.randomUUID(),
  ENDING: crypto.randomUUID(),
} as const;

export const DEFAULT_NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: FIXED_PAGE_IDS.INFO,
    label: "Info",
    icon: InfoIcon,
    isActive: true,
    isFixed: true, // Sempre primeira
  },
  {
    id: crypto.randomUUID(),
    label: "Details",
    icon: FileText,
  },
  {
    id: crypto.randomUUID(),
    label: "Other",
    icon: FileText,
  },
  {
    id: FIXED_PAGE_IDS.ENDING,
    label: "Ending",
    icon: CircleCheck,
    isFixed: true, // Sempre última
  },
];

export const DEFAULT_CONTEXT_MENU_STATE = {
  isOpen: false,
  position: { x: 0, y: 0 },
  itemId: null,
} as const;

export const DRAG_OVERLAY_STYLES = "rotate-3 scale-105 opacity-90";

export const SCROLL_CONTAINER_STYLES = {
  scrollbarWidth: "none" as const,
  msOverflowStyle: "none" as const,
};

export const DRAG_SENSOR_CONFIG = {
  activationConstraint: {
    distance: 8,
  },
};
