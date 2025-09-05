"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MoreVertical } from "lucide-react";
import { memo } from "react";

import type { NavigationItemProps } from "./types";

export const NavigationItem = memo<NavigationItemProps>(
  ({ item, onContextMenu, onClick, isDragging = false }) => {
    const getButtonStyles = () => {
      const baseStyles =
        "group flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg cursor-pointer transition-all duration-200";

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
        "ml-0.5 w-0 h-4 transition-all duration-300 ease-out transform cursor-pointer";
      const colorClass = item.isActive
        ? "opacity-100 w-4 scale-100"
        : "opacity-0 scale-95 pointer-events-none";
      return `${baseStyles} ${colorClass} text-[var(--navigation-item-menu-icon)] hover:text-[var(--navigation-item-menu-icon-hover)]`;
    };

    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging: isSortableDragging,
    } = useSortable({
      id: item.id,
      disabled: isDragging,
    });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    const getCursorStyles = () => {
      if (item.isActive) {
        return isSortableDragging
          ? "cursor-grabbing shadow-2xl scale-105"
          : "cursor-grab hover:cursor-grab";
      }
      return "cursor-pointer";
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`relative group flex items-center ${
          isSortableDragging ? "z-50" : ""
        }`}
      >
        <button
          {...attributes}
          {...listeners}
          className={`${getButtonStyles()} ${getCursorStyles()}`}
          onContextMenu={(e) => {
            e.preventDefault();
            onContextMenu(e, item.id);
          }}
          onClick={() => onClick(item.id)}
          type="button"
        >
          <item.icon className={getIconStyles()} />
          <span className="text-sm font-medium select-none">{item.label}</span>
          <MoreVertical
            className={getMenuIconStyles()}
            onClick={(e) => onContextMenu(e, item.id)}
          />
        </button>
      </div>
    );
  },
);

NavigationItem.displayName = "NavigationItem";
