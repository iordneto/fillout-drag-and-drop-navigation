"use client";

import { FileText } from "lucide-react";
import { useCallback, useState } from "react";
import {
  DEFAULT_CONTEXT_MENU_STATE,
  DEFAULT_NAVIGATION_ITEMS,
} from "../constants";
import type {
  ContextMenuAction,
  ContextMenuState,
  NavigationItem,
} from "../types";

export const useNavigationItems = () => {
  const [items, setItems] = useState<NavigationItem[]>(
    DEFAULT_NAVIGATION_ITEMS,
  );
  const [contextMenu, setContextMenu] = useState<ContextMenuState>(
    DEFAULT_CONTEXT_MENU_STATE,
  );
  const [hoveredInsertIndex, setHoveredInsertIndex] = useState<number | null>(
    null,
  );

  // ✅ ÚNICA memoização que faz sentido - evita recriar JSX

  // ✅ useCallback apenas para funções passadas como props
  const handleItemClick = useCallback((itemId: string) => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        isActive: item.id === itemId,
      })),
    );
  }, []);

  const handleRightClick = useCallback(
    (event: React.MouseEvent, itemId: string) => {
      event.preventDefault();
      setContextMenu({
        isOpen: true,
        position: { x: event.clientX, y: event.clientY },
        itemId,
      });
    },
    [],
  );

  const handleContextMenuAction = useCallback(
    (action: ContextMenuAction) => {
      if (!contextMenu.itemId) return;

      const itemId = contextMenu.itemId;

      switch (action) {
        case "setFirst":
          setItems((prev) =>
            prev.map((item) => ({
              ...item,
              isActive: item.id === itemId,
            })),
          );
          break;

        case "rename": {
          const newName = prompt("Enter new name:");
          if (newName?.trim()) {
            setItems((prev) =>
              prev.map((item) =>
                item.id === itemId ? { ...item, label: newName.trim() } : item,
              ),
            );
          }
          break;
        }

        case "copy":
          navigator.clipboard?.writeText(
            `Navigation item: ${
              items.find((item) => item.id === itemId)?.label
            }`,
          );
          break;

        case "duplicate": {
          const itemToDuplicate = items.find((item) => item.id === itemId);
          if (itemToDuplicate) {
            const newItem: NavigationItem = {
              ...itemToDuplicate,
              id: crypto.randomUUID(),
              label: `${itemToDuplicate.label} Copy`,
              isActive: false,
            };

            setItems((prev) => {
              const index = prev.findIndex((item) => item.id === itemId);
              return [
                ...prev.slice(0, index + 1),
                newItem,
                ...prev.slice(index + 1),
              ];
            });
          }
          break;
        }

        case "delete":
          setItems((prev) => prev.filter((item) => item.id !== itemId));
          break;
      }

      setContextMenu(DEFAULT_CONTEXT_MENU_STATE);
    },
    [contextMenu.itemId, items],
  );

  const insertPageAt = useCallback(
    (index: number) => {
      const newItem: NavigationItem = {
        id: crypto.randomUUID(),
        label: `Page ${items.length + 1}`,
        icon: FileText,
        isActive: false,
      };

      setItems((prev) => [
        ...prev.slice(0, index),
        newItem,
        ...prev.slice(index),
      ]);
      setHoveredInsertIndex(null);
    },
    [items.length],
  );

  const addPageAtEnd = useCallback(() => {
    const newItem: NavigationItem = {
      id: crypto.randomUUID(),
      label: `Page ${items.length + 1}`,
      icon: FileText,
      isActive: false,
    };
    setItems((prev) => [...prev, newItem]);
  }, [items.length]);

  const closeContextMenu = useCallback(() => {
    setContextMenu(DEFAULT_CONTEXT_MENU_STATE);
  }, []);

  const reorderItems = useCallback((newItems: NavigationItem[]) => {
    setItems(newItems);
  }, []);

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
