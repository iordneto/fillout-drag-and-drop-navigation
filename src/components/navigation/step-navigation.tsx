"use client";

import { DndContext, DragOverlay } from "@dnd-kit/core";
import { memo } from "react";
import { DRAG_OVERLAY_STYLES, SCROLL_CONTAINER_STYLES } from "./constants";
import { NavigationContextMenu } from "./context-menu";
import { useDragAndDrop } from "./hooks/use-drag-and-drop";
import { useNavigationItems } from "./hooks/use-navigation-items";
import { useScrollNavigation } from "./hooks/use-scroll-navigation";
import { NavigationItem } from "./navigation-item";
import { NavigationList } from "./navigation-list";
import { ScrollArrowButton } from "./scroll-arrow-button";
import { useNavigationStore } from "./store";

const StepNavigation = memo(() => {
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

  const { sensors, handleDragStart, handleDragEnd, activeItem } =
    useDragAndDrop(items, isValidDropPosition, reorderItems);

  const handleInsertHover = (index: number) => {
    setHoveredInsertIndex(index);
  };

  const handleInsertLeave = () => {
    setHoveredInsertIndex(null);
  };

  const movableItems = getMovableItems();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="relative flex items-center">
        <ScrollArrowButton
          direction="left"
          disabled={!canScrollLeft}
          onClick={() => scrollNavigation("left")}
        />

        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-x-auto overflow-y-hidden scrollbar-hide"
          style={SCROLL_CONTAINER_STYLES}
        >
          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <NavigationList
              items={items}
              movableItems={movableItems}
              hoveredInsertIndex={hoveredInsertIndex}
              firstItemRef={firstItemRef}
              lastItemRef={lastItemRef}
              onItemClick={handleItemClick}
              onRightClick={handleRightClick}
              onInsertPageAt={insertPageAt}
              onAddPageAtEnd={addPageAtEnd}
              onInsertHover={handleInsertHover}
              onInsertLeave={handleInsertLeave}
            />

            <DragOverlay>
              {activeItem ? (
                <div className={DRAG_OVERLAY_STYLES}>
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

        <ScrollArrowButton
          direction="right"
          disabled={!canScrollRight}
          onClick={() => scrollNavigation("right")}
        />
      </div>

      <NavigationContextMenu
        isOpen={contextMenu.isOpen}
        position={contextMenu.position}
        onClose={closeContextMenu}
        onAction={handleContextMenuAction}
      />
    </div>
  );
});

StepNavigation.displayName = "StepNavigation";

export default StepNavigation;
