"use client";

import type {
  DragEndEvent,
  DragStartEvent,
  SensorDescriptor,
  SensorOptions,
} from "@dnd-kit/core";
import { PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import type { NavigationItem } from "../types";

export interface UseDragAndDropReturn {
  activeId: string | null;
  sensors: SensorDescriptor<SensorOptions>[];
  handleDragStart: (event: DragStartEvent) => void;
  handleDragEnd: (event: DragEndEvent) => void;
  activeItem: NavigationItem | null;
  modifiers: (typeof restrictToHorizontalAxis)[];
}

export const useDragAndDrop = (
  items: NavigationItem[],
  isValidDropPosition: (activeId: string, overId: string) => boolean,
  reorderItems: (newItems: NavigationItem[]) => void,
): UseDragAndDropReturn => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      /**
       * Prevents accidental drags - user must drag 8px before drag starts.
       * This allows for normal clicks without triggering drag operations.
       */
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const activeItem = items.find((item) => item.id === event.active.id);

    if (activeItem?.isFixed) {
      return;
    }

    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveId(null);

    if (!over || active.id === over.id) return;

    if (!isValidDropPosition(active.id as string, over.id as string)) {
      return;
    }

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const newItems = arrayMove(items, oldIndex, newIndex);
      reorderItems(newItems);
    }
  };

  const activeItem = activeId
    ? (items.find((item) => item.id === activeId) ?? null)
    : null;

  return {
    activeId,
    sensors,
    handleDragStart,
    handleDragEnd,
    activeItem,
    modifiers: [restrictToHorizontalAxis],
  };
};
