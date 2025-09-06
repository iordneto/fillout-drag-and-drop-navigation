"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface UseScrollNavigationReturn {
  // Refs
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  firstItemRef: React.RefObject<HTMLDivElement | null>;
  lastItemRef: React.RefObject<HTMLDivElement | null>;

  // States
  canScrollLeft: boolean;
  canScrollRight: boolean;

  // Actions
  scrollNavigation: (direction: "left" | "right") => void;
}

export const useScrollNavigation = (): UseScrollNavigationReturn => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLDivElement>(null);
  const lastItemRef = useRef<HTMLDivElement>(null);

  const scrollNavigation = useCallback((direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 200;
    const targetScrollLeft =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScrollLeft,
      behavior: "smooth",
    });
  }, []);

  /**
   * Determines scroll button visibility based on sentinel elements.
   * When first/last items go OUT OF VIEW, their respective scroll buttons appear.
   */
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.target.id === "first-nav-item") {
          setCanScrollLeft(!entry.isIntersecting); // Not visible = can scroll left
        } else if (entry.target.id === "last-nav-item") {
          setCanScrollRight(!entry.isIntersecting); // Not visible = can scroll right
        }
      });
    },
    [],
  );

  useEffect(() => {
    const container = scrollContainerRef.current;
    const firstItem = firstItemRef.current;
    const lastItem = lastItemRef.current;

    if (!container || !firstItem || !lastItem) return;

    const observer = new IntersectionObserver(handleIntersection, {
      root: container,
      rootMargin: "0px",
      threshold: 0.99, // Nearly fully visible = considered "intersecting"
    });

    observer.observe(firstItem);
    observer.observe(lastItem);

    return () => {
      observer.disconnect();
    };
  }, [handleIntersection]);

  return {
    scrollContainerRef,
    firstItemRef,
    lastItemRef,
    canScrollLeft,
    canScrollRight,
    scrollNavigation,
  };
};
