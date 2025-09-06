"use client";

import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { Fragment, memo } from "react";
import AddPageButton from "./add-page-button";
import { InsertButton } from "./insert-button";
import { NavigationItem } from "./navigation-item";
import type { NavigationItem as NavigationItemType } from "./types";

interface NavigationListProps {
  items: NavigationItemType[];
  movableItems: NavigationItemType[];
  hoveredInsertIndex: number | null;
  firstItemRef: React.RefObject<HTMLDivElement | null>;
  lastItemRef: React.RefObject<HTMLDivElement | null>;
  onItemClick: (itemId: string) => void;
  onRightClick: (event: React.MouseEvent, itemId: string) => void;
  onInsertPageAt: (index: number) => void;
  onAddPageAtEnd: () => void;
  onInsertHover: (index: number) => void;
  onInsertLeave: () => void;
}

export const NavigationList = memo<NavigationListProps>(
  ({
    items,
    movableItems,
    hoveredInsertIndex,
    firstItemRef,
    lastItemRef,
    onItemClick,
    onRightClick,
    onInsertPageAt,
    onAddPageAtEnd,
    onInsertHover,
    onInsertLeave,
  }) => {
    return (
      <SortableContext
        items={movableItems.map((item) => item.id)}
        strategy={horizontalListSortingStrategy}
      >
        <fieldset
          className="inline-flex items-center navigation-dotted-line whitespace-nowrap"
          onMouseLeave={onInsertLeave}
          style={{ minWidth: "max-content" }}
        >
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
                  onMouseEnter={() => onInsertHover(index)}
                  onMouseLeave={onInsertLeave}
                >
                  <InsertButton
                    index={index}
                    onInsert={onInsertPageAt}
                    isVisible={hoveredInsertIndex === index}
                  />
                </fieldset>
              )}

              <NavigationItem
                item={item}
                index={index}
                onContextMenu={onRightClick}
                onClick={onItemClick}
              />
            </Fragment>
          ))}

          <AddPageButton onClick={onAddPageAtEnd} />

          {/* Invisible sentinel for last item */}
          <div
            id="last-nav-item"
            ref={lastItemRef}
            className="w-px h-px absolute right-0"
          />
        </fieldset>
      </SortableContext>
    );
  },
);

NavigationList.displayName = "NavigationList";
