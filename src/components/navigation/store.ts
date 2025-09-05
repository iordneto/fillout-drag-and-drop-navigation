"use client";

import { FileText } from "lucide-react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  DEFAULT_CONTEXT_MENU_STATE,
  DEFAULT_NAVIGATION_ITEMS,
  FIXED_PAGE_IDS,
} from "./constants";
import type {
  ContextMenuAction,
  ContextMenuState,
  NavigationItem,
} from "./types";

interface NavigationStore {
  // States
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

  // Helpers
  getMovableItems: () => NavigationItem[];
  isValidDropPosition: (activeId: string, overId: string) => boolean;
}

export const useNavigationStore = create<NavigationStore>()(
  devtools(
    (set, get) => ({
      items: DEFAULT_NAVIGATION_ITEMS,
      contextMenu: DEFAULT_CONTEXT_MENU_STATE,
      hoveredInsertIndex: null,

      getMovableItems: () => {
        const { items } = get();
        return items.filter((item) => !item.isFixed);
      },

      isValidDropPosition: (activeId: string, overId: string) => {
        const { items } = get();
        const activeItem = items.find((item) => item.id === activeId);
        const overItem = items.find((item) => item.id === overId);

        if (activeItem?.isFixed) return false;

        if (overItem?.isFixed) return false;

        const overIndex = items.findIndex((item) => item.id === overId);
        if (overIndex === 0) return false;

        if (overIndex === items.length - 1) return false;

        return true;
      },

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

      handleContextMenuAction: (_action: ContextMenuAction) => {
        /*
         * action: "setFirst" | "rename" | "copy" | "duplicate" | "delete"
         * setFirst: Set the item as the first item
         * rename: Rename the item
         * copy: Copy the item
         * duplicate: Duplicate the item
         * delete: Delete the item
         */
      },

      insertPageAt: (index: number) => {
        const { items } = get();
        const endingIndex = items.findIndex(
          (item) => item.id === FIXED_PAGE_IDS.ENDING,
        );

        const finalIndex = index >= endingIndex ? endingIndex : index;

        const newItem: NavigationItem = {
          id: crypto.randomUUID(),
          label: `Page ${items.filter((item) => !item.isFixed).length + 1}`,
          icon: FileText,
          isActive: false,
          isFixed: false,
        };

        set((state) => ({
          items: [
            ...state.items.slice(0, finalIndex),
            newItem,
            ...state.items.slice(finalIndex),
          ],
          hoveredInsertIndex: null,
        }));
      },

      addPageAtEnd: () => {
        const { items } = get();
        const endingIndex = items.findIndex(
          (item) => item.id === FIXED_PAGE_IDS.ENDING,
        );

        const newItem: NavigationItem = {
          id: crypto.randomUUID(),
          label: `Page ${items.filter((item) => !item.isFixed).length + 1}`,
          icon: FileText,
          isActive: false,
          isFixed: false,
        };

        set((state) => ({
          items: [
            ...state.items.slice(0, endingIndex),
            newItem,
            ...state.items.slice(endingIndex),
          ],
        }));
      },

      closeContextMenu: () => {
        set({ contextMenu: DEFAULT_CONTEXT_MENU_STATE });
      },

      setHoveredInsertIndex: (index: number | null) => {
        set({ hoveredInsertIndex: index });
      },

      reorderItems: (newItems: NavigationItem[]) => {
        const { items } = get();

        const infoIndex = newItems.findIndex(
          (item) => item.id === FIXED_PAGE_IDS.INFO,
        );
        const endingIndex = newItems.findIndex(
          (item) => item.id === FIXED_PAGE_IDS.ENDING,
        );

        if (infoIndex !== 0 || endingIndex !== newItems.length - 1) {
          const movableItems = newItems.filter((item) => !item.isFixed);
          const infoItem = items.find(
            (item) => item.id === FIXED_PAGE_IDS.INFO,
          );
          const endingItem = items.find(
            (item) => item.id === FIXED_PAGE_IDS.ENDING,
          );

          if (!infoItem || !endingItem) return;

          set({
            items: [infoItem, ...movableItems, endingItem],
          });
        } else {
          set({ items: newItems });
        }
      },
    }),
    {
      name: "navigation-store",
    },
  ),
);
