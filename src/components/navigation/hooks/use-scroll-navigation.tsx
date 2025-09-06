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

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.target.id === "first-nav-item") {
          setCanScrollLeft(!entry.isIntersecting);
        } else if (entry.target.id === "last-nav-item") {
          setCanScrollRight(!entry.isIntersecting);
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
      threshold: 0.99,
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
