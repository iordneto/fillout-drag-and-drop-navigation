import type { ElementType } from "react";

export interface NavigationItem {
  id: string;
  label: string;
  icon: ElementType;
  isActive?: boolean;
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
  onContextMenu: (event: React.MouseEvent, itemId: string) => void;
  onClick: (itemId: string) => void;
  onHoverInsert?: (index: number | null) => void;
  showInsertButton?: boolean;
}

export interface InsertButtonProps {
  index: number;
  onInsert: (index: number) => void;
  isVisible: boolean;
}
