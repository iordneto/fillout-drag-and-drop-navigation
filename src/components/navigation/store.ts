"use client";

import { FileText } from "lucide-react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  DEFAULT_CONTEXT_MENU_STATE,
  DEFAULT_NAVIGATION_ITEMS,
} from "./constants";
import type {
  ContextMenuAction,
  ContextMenuState,
  NavigationItem,
} from "./types";

interface NavigationStore {
  // Estados
  items: NavigationItem[];
  contextMenu: ContextMenuState;
  hoveredInsertIndex: number | null;

  // Actions
  handleItemClick: (itemId: string) => void;
  handleRightClick: (event: React.MouseEvent, itemId: string) => void;
  handleContextMenuAction: (action: ContextMenuAction) => void;
  insertPageAt: (index: number) => void;
  addPageAtEnd: () => void;
  closeContextMenu: () => void;
  setHoveredInsertIndex: (index: number | null) => void;
  reorderItems: (newItems: NavigationItem[]) => void;
}

export const useNavigationStore = create<NavigationStore>()(
  devtools(
    (set, get) => ({
      items: DEFAULT_NAVIGATION_ITEMS,
      contextMenu: DEFAULT_CONTEXT_MENU_STATE,
      hoveredInsertIndex: null,

      handleItemClick: (itemId: string) => {
        set((state) => ({
          items: state.items.map((item) => ({
            ...item,
            isActive: item.id === itemId,
          })),
        }));
      },

      handleRightClick: (event: React.MouseEvent, itemId: string) => {
        event.preventDefault();
        set({
          contextMenu: {
            isOpen: true,
            position: { x: event.clientX, y: event.clientY },
            itemId,
          },
        });
      },

      handleContextMenuAction: (action: ContextMenuAction) => {
        const { contextMenu, items } = get();
        if (!contextMenu.itemId) return;

        const itemId = contextMenu.itemId;

        switch (action) {
          case "setFirst":
            set((state) => ({
              items: state.items.map((item) => ({
                ...item,
                isActive: item.id === itemId,
              })),
            }));
            break;

          case "rename": {
            const newName = prompt("Enter new name:");
            if (newName?.trim()) {
              set((state) => ({
                items: state.items.map((item) =>
                  item.id === itemId
                    ? { ...item, label: newName.trim() }
                    : item,
                ),
              }));
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

              set((state) => {
                const index = state.items.findIndex(
                  (item) => item.id === itemId,
                );
                return {
                  items: [
                    ...state.items.slice(0, index + 1),
                    newItem,
                    ...state.items.slice(index + 1),
                  ],
                };
              });
            }
            break;
          }

          case "delete":
            set((state) => ({
              items: state.items.filter((item) => item.id !== itemId),
            }));
            break;
        }

        set({ contextMenu: DEFAULT_CONTEXT_MENU_STATE });
      },

      insertPageAt: (index: number) => {
        const { items } = get();
        const newItem: NavigationItem = {
          id: crypto.randomUUID(),
          label: `Page ${items.length + 1}`,
          icon: FileText,
          isActive: false,
        };

        set((state) => ({
          items: [
            ...state.items.slice(0, index),
            newItem,
            ...state.items.slice(index),
          ],
          hoveredInsertIndex: null,
        }));
      },

      addPageAtEnd: () => {
        const { items } = get();
        const newItem: NavigationItem = {
          id: crypto.randomUUID(),
          label: `Page ${items.length + 1}`,
          icon: FileText,
          isActive: false,
        };

        set((state) => ({
          items: [...state.items, newItem],
        }));
      },

      closeContextMenu: () => {
        set({ contextMenu: DEFAULT_CONTEXT_MENU_STATE });
      },

      setHoveredInsertIndex: (index: number | null) => {
        set({ hoveredInsertIndex: index });
      },

      reorderItems: (newItems: NavigationItem[]) => {
        set({ items: newItems });
      },
    }),
    {
      name: "navigation-store",
    },
  ),
);
