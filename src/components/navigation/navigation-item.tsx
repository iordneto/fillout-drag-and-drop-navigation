"use client";

import { MoreVertical } from "lucide-react";
import { memo } from "react";

import type { NavigationItemProps } from "./types";

export const NavigationItem = memo<NavigationItemProps>(
  ({ item, onContextMenu, onClick }) => {
    const getButtonStyles = () => {
      const baseStyles =
        "group flex items-center gap-1.5 px-2.5 py-1.5 rounded-md cursor-pointer transition-all duration-200 m-0";

      if (item.isActive) {
        return `${baseStyles} bg-[var(--navigation-item-active-bg)] text-[var(--navigation-item-active-text)] shadow-[inset_0_0_0_0.5px_#E1E1E1,0_1px_1px_rgba(0,0,0,0.02),0_1px_3px_rgba(0,0,0,0.04)]`;
      }

      return `${baseStyles} bg-[var(--navigation-item-inactive-bg)] text-[var(--navigation-item-inactive-text)] hover:bg-[var(--navigation-item-inactive-hover)]`;
    };

    const getIconStyles = () => {
      const baseStyles = "w-5 h-5 p-0.5";
      const colorClass = item.isActive
        ? "text-[var(--navigation-item-active-icon)]"
        : "text-[var(--navigation-item-inactive-icon)]";

      return `${baseStyles} ${colorClass}`;
    };

    const getMenuIconStyles = () => {
      const baseStyles =
        "ml-0.5 w-0 h-4 transition-all duration-300 ease-out transform";
      const colorClass = item.isActive
        ? "opacity-100 w-4 scale-100"
        : "opacity-0 scale-95 pointer-events-none";
      return `${baseStyles} ${colorClass} text-[var(--navigation-item-menu-icon)] hover:text-[var(--navigation-item-menu-icon-hover)]`;
    };

    return (
      <div className="relative group flex items-center">
        <button
          className={getButtonStyles()}
          onContextMenu={(e) => onContextMenu(e, item.id)}
          onClick={() => onClick(item.id)}
          type="button"
        >
          <item.icon className={getIconStyles()} />
          <span className="text-sm font-medium">{item.label}</span>
          <MoreVertical
            onClick={(e) => onContextMenu(e, item.id)}
            className={getMenuIconStyles()}
          />
        </button>
      </div>
    );
  },
);

NavigationItem.displayName = "NavigationItem";
