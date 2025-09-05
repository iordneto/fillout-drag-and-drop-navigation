"use client";

import { Plus } from "lucide-react";
import { Fragment } from "react";
import { NavigationContextMenu } from "./context-menu";
import { useNavigationItems } from "./hooks/use-navigation-items";
/* import { InsertButton } from "./insert-button"; */
import { NavigationItem } from "./navigation-item";

const StepNavigation: React.FC = () => {
  const {
    items,
    contextMenu,
    hoveredInsertIndex,
    handleItemClick,
    handleRightClick,
    handleContextMenuAction,
    /* insertPageAt, */
    addPageAtEnd,
    closeContextMenu,
    setHoveredInsertIndex,
  } = useNavigationItems();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="inline-flex items-center gap-10 navigation-dotted-line">
        {items.map((item, index) => (
          <Fragment key={item.id}>
            <NavigationItem
              item={item}
              index={index}
              onContextMenu={handleRightClick}
              onClick={handleItemClick}
              onHoverInsert={setHoveredInsertIndex}
              showInsertButton={hoveredInsertIndex === index}
            />
          </Fragment>
        ))}

        {/* Insert point after last item */}
        {/* <fieldset
          className="relative group"
          onMouseEnter={() => setHoveredInsertIndex(items.length)}
          onMouseLeave={() => setHoveredInsertIndex(null)}
        >
          <InsertButton
            index={items.length}
            onInsert={insertPageAt}
            isVisible={hoveredInsertIndex === items.length}
          />
        </fieldset> */}

        {/* Add page button */}
        <button
          onClick={addPageAtEnd}
          className="flex items-center gap-2 px-3 py-2 text-gray-600 bg-white border-[0.5px] cursor-pointer hover:text-gray-900 hover:bg-gray-50 rounded-md transition-all duration-200"
          type="button"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add page</span>
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
