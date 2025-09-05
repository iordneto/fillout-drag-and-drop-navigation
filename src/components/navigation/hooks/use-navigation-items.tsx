"use client";

import { useCallback } from "react";
import { useNavigationStore } from "../store";
import type { ContextMenuAction, NavigationItem } from "../types";

export const useNavigationItems = () => {
  const {
    items,
    contextMenu,
    hoveredInsertIndex,
    handleItemClick: storeHandleItemClick,
    handleRightClick: storeHandleRightClick,
    handleContextMenuAction: storeHandleContextMenuAction,
    insertPageAt: storeInsertPageAt,
    addPageAtEnd: storeAddPageAtEnd,
    closeContextMenu: storeCloseContextMenu,
    setHoveredInsertIndex: storeSetHoveredInsertIndex,
    reorderItems: storeReorderItems,
  } = useNavigationStore();

  const handleItemClick = useCallback(
    (itemId: string) => {
      storeHandleItemClick(itemId);
    },
    [storeHandleItemClick],
  );

  const handleRightClick = useCallback(
    (event: React.MouseEvent, itemId: string) => {
      storeHandleRightClick(event, itemId);
    },
    [storeHandleRightClick],
  );

  const handleContextMenuAction = useCallback(
    (action: ContextMenuAction) => {
      storeHandleContextMenuAction(action);
    },
    [storeHandleContextMenuAction],
  );

  const insertPageAt = useCallback(
    (index: number) => {
      storeInsertPageAt(index);
    },
    [storeInsertPageAt],
  );

  const addPageAtEnd = useCallback(() => {
    storeAddPageAtEnd();
  }, [storeAddPageAtEnd]);

  const closeContextMenu = useCallback(() => {
    storeCloseContextMenu();
  }, [storeCloseContextMenu]);

  const setHoveredInsertIndex = useCallback(
    (index: number | null) => {
      storeSetHoveredInsertIndex(index);
    },
    [storeSetHoveredInsertIndex],
  );

  const reorderItems = useCallback(
    (newItems: NavigationItem[]) => {
      storeReorderItems(newItems);
    },
    [storeReorderItems],
  );

  // Retorna exatamente a mesma interface de antes
  return {
    items,
    contextMenu,
    hoveredInsertIndex,
    handleItemClick,
    handleRightClick,
    handleContextMenuAction,
    insertPageAt,
    addPageAtEnd,
    closeContextMenu,
    setHoveredInsertIndex,
    reorderItems,
  };
};
