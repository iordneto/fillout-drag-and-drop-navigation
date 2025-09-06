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

      /**
       * Validates if a drag-drop operation is allowed.
       * Fixed items (Info/Ending) cannot be moved or be drop targets.
       * Items cannot be dropped at first (0) or last position to preserve fixed items.
       */
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

      handleContextMenuAction: (action: ContextMenuAction) => {
        const { contextMenu, items } = get();
        if (!contextMenu.itemId) return;

        const itemId = contextMenu.itemId;
        const targetItem = items.find((item) => item.id === itemId);

        switch (action) {
          case "delete":
            if (!targetItem?.isFixed) {
              set((state) => ({
                items: state.items.filter((item) => item.id !== itemId),
              }));
            }
            break;
          default:
            break;
        }

        set({ contextMenu: DEFAULT_CONTEXT_MENU_STATE });
      },

      /**
       * Inserts a new page at the specified index.
       * Always inserts before the Ending item, even if index is beyond it.
       */
      /**
       * Inserts a new page at the specified index.
       * Always inserts before the Ending item, even if index is beyond it.
       * Auto-activates the new page and applies fade-in animation.
       */
      insertPageAt: (index: number) => {
        const { items } = get();
        const endingIndex = items.findIndex(
          (item) => item.id === FIXED_PAGE_IDS.ENDING,
        );

        const finalIndex = index >= endingIndex ? endingIndex : index;
        const newItemId = crypto.randomUUID();

        const newItem: NavigationItem = {
          id: newItemId,
          label: `Page ${items.filter((item) => !item.isFixed).length + 1}`,
          icon: FileText,
          isActive: true, // Auto-ativa a nova página
          isFixed: false,
          isNew: true, // Aplica animação fade-in
        };

        set((state) => ({
          items: [
            ...state.items
              .slice(0, finalIndex)
              .map((item) => ({ ...item, isActive: false })),
            newItem,
            ...state.items
              .slice(finalIndex)
              .map((item) => ({ ...item, isActive: false })),
          ],
          hoveredInsertIndex: null,
        }));

        // Remove o estado isNew após a animação
        setTimeout(() => {
          set((state) => ({
            items: state.items.map((item) =>
              item.id === newItemId ? { ...item, isNew: false } : item,
            ),
          }));
        }, 300);
      },

      addPageAtEnd: () => {
        const { items } = get();
        const endingIndex = items.findIndex(
          (item) => item.id === FIXED_PAGE_IDS.ENDING,
        );
        const newItemId = crypto.randomUUID();

        const newItem: NavigationItem = {
          id: newItemId,
          label: `Page ${items.filter((item) => !item.isFixed).length + 1}`,
          icon: FileText,
          isActive: true, // Auto-ativa a nova página
          isFixed: false,
          isNew: true, // Aplica animação fade-in
        };

        set((state) => ({
          items: [
            ...state.items
              .slice(0, endingIndex)
              .map((item) => ({ ...item, isActive: false })),
            newItem,
            ...state.items
              .slice(endingIndex)
              .map((item) => ({ ...item, isActive: false })),
          ],
        }));

        // Remove o estado isNew após a animação
        setTimeout(() => {
          set((state) => ({
            items: state.items.map((item) =>
              item.id === newItemId ? { ...item, isNew: false } : item,
            ),
          }));
        }, 300);
      },

      closeContextMenu: () => {
        set({ contextMenu: DEFAULT_CONTEXT_MENU_STATE });
      },

      setHoveredInsertIndex: (index: number | null) => {
        set({ hoveredInsertIndex: index });
      },

      /**
       * Reorders items while ensuring fixed items stay in correct positions.
       * If Info is not first or Ending is not last, automatically corrects the order.
       */
      reorderItems: (newItems: NavigationItem[]) => {
        const { items } = get();

        const infoIndex = newItems.findIndex(
          (item) => item.id === FIXED_PAGE_IDS.INFO,
        );
        const endingIndex = newItems.findIndex(
          (item) => item.id === FIXED_PAGE_IDS.ENDING,
        );

        if (infoIndex !== 0 || endingIndex !== newItems.length - 1) {
          // Auto-correct the order
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
