import type { ElementType } from "react";

/*
 * @param id - The unique identifier for the navigation item.
 * @param label - The text label for the navigation item.
 * @param icon - The icon component for the navigation item.
 * @param isActive - Whether the navigation item is active.
 * @param isFixed - Whether the navigation item is fixed.
 * @param isNew - Whether the navigation item is new.
 */
export interface NavigationItem {
  id: string;
  label: string;
  icon: ElementType;
  isActive?: boolean;
  isFixed?: boolean;
  isNew?: boolean;
}

export interface Position {
  x: number;
  y: number;
}

export interface ContextMenuState {
  isOpen: boolean;
  position: Position;
  itemId: string | null;
}

export type ContextMenuAction =
  | "setFirst"
  | "rename"
  | "copy"
  | "duplicate"
  | "delete";

export interface ContextMenuProps {
  isOpen: boolean;
  position: Position;
  onClose: () => void;
  onAction: (action: ContextMenuAction) => void;
}

export interface NavigationItemProps {
  item: NavigationItem;
  index: number;
  onContextMenu: (e: React.MouseEvent, itemId: string) => void;
  onClick: (itemId: string) => void;
  isDragging?: boolean;
}

export interface InsertButtonProps {
  index: number;
  onInsert: (index: number) => void;
  isVisible: boolean;
}
