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
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Fragment, useState } from "react";
import AddPageButton from "./add-page-button";
import { NavigationContextMenu } from "./context-menu";
import { useNavigationItems } from "./hooks/use-navigation-items";
import { useScrollNavigation } from "./hooks/use-scroll-navigation";
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

  const {
    scrollContainerRef,
    firstItemRef,
    lastItemRef,
    canScrollLeft,
    canScrollRight,
    scrollNavigation,
  } = useScrollNavigation();

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
      <div className="relative flex items-center">
        {/* Left Arrow */}
        <button
          type="button"
          onClick={() => scrollNavigation("left")}
          disabled={!canScrollLeft}
          className={`
            flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 transition-all duration-200
            ${
              canScrollLeft
                ? "bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
                : "bg-gray-50 text-gray-300 cursor-not-allowed"
            }
          `}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Scrollable Navigation Container */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-x-auto overflow-y-hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

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
                className="inline-flex items-center navigation-dotted-line whitespace-nowrap"
                onMouseLeave={handleInsertLeave}
                style={{ minWidth: "max-content" }}
              >
                {/* Invisible sentinel for first item */}
                <div
                  id="first-nav-item"
                  ref={firstItemRef}
                  className="w-px h-px absolute left-0"
                />

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

                {/* Invisible sentinel for last item */}
                <div
                  id="last-nav-item"
                  ref={lastItemRef}
                  className="w-px h-px absolute right-0"
                />
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
        </div>

        {/* Right Arrow */}
        <button
          type="button"
          onClick={() => scrollNavigation("right")}
          disabled={!canScrollRight}
          className={`
            flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ml-3 transition-all duration-200
            ${
              canScrollRight
                ? "bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
                : "bg-gray-50 text-gray-300 cursor-not-allowed"
            }
          `}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

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
