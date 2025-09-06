"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { memo } from "react";

interface ScrollArrowButtonProps {
  direction: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}

export const ScrollArrowButton = memo<ScrollArrowButtonProps>(
  ({ direction, disabled, onClick }) => {
    const Icon = direction === "left" ? ChevronLeft : ChevronRight;
    const marginClass = direction === "left" ? "mr-3" : "ml-3";

    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-label={`Scroll navigation ${direction}`}
        className={`
          flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${marginClass} transition-all duration-200
          ${
            !disabled
              ? "bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
              : "bg-gray-50 text-gray-300 cursor-not-allowed"
          }
        `}
      >
        <Icon className="w-4 h-4" />
      </button>
    );
  },
);

ScrollArrowButton.displayName = "ScrollArrowButton";
