"use client";

import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { Fragment, useState } from "react";
import AddPageButton from "./add-page-button";
import { NavigationContextMenu } from "./context-menu";
import { useNavigationItems } from "./hooks/use-navigation-items";
import { InsertButton } from "./insert-button";
import { NavigationItem } from "./navigation-item";
import { useNavigationStore } from "./store";

const StepNavigation: React.FC = () => {
  const {
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
  } = useNavigationItems();

  const { isValidDropPosition, getMovableItems } = useNavigationStore();

  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
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

  const handleInsertHover = (index: number) => {
    setHoveredInsertIndex(index);
  };

  const handleInsertLeave = () => {
    setHoveredInsertIndex(null);
  };

  const activeItem = activeId
    ? items.find((item) => item.id === activeId)
    : null;

  const movableItems = getMovableItems();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={movableItems.map((item) => item.id)}
          strategy={horizontalListSortingStrategy}
        >
          <fieldset
            className="inline-flex items-center navigation-dotted-line"
            onMouseLeave={handleInsertLeave}
          >
            {items.map((item, index) => (
              <Fragment key={item.id}>
                {index > 0 && (
                  <fieldset
                    className="flex items-center justify-center px-5"
                    onMouseEnter={() => handleInsertHover(index)}
                    onMouseLeave={handleInsertLeave}
                  >
                    <InsertButton
                      index={index}
                      onInsert={insertPageAt}
                      isVisible={hoveredInsertIndex === index}
                    />
                  </fieldset>
                )}

                <NavigationItem
                  item={item}
                  index={index}
                  onContextMenu={handleRightClick}
                  onClick={handleItemClick}
                />
              </Fragment>
            ))}

            <AddPageButton onClick={addPageAtEnd} />
          </fieldset>
        </SortableContext>

        <DragOverlay>
          {activeItem ? (
            <div className="rotate-3 scale-105 opacity-90">
              <NavigationItem
                item={activeItem}
                index={0}
                onContextMenu={() => {}}
                onClick={() => {}}
                isDragging
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <NavigationContextMenu
        isOpen={contextMenu.isOpen}
        position={contextMenu.position}
        onClose={closeContextMenu}
        onAction={handleContextMenuAction}
      />
    </div>
  );
};

export default StepNavigation;
