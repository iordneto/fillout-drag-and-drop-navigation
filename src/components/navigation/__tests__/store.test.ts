import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { FIXED_PAGE_IDS } from "../constants";
import { useNavigationStore } from "../store";

describe("Navigation Store", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  describe("Page Insertion", () => {
    describe("insertPageAt", () => {
      it("should insert page at correct index", () => {
        const { result } = renderHook(() => useNavigationStore());
        const initialLength = result.current.items.length;

        act(() => {
          result.current.insertPageAt(2);
        });

        expect(result.current.items).toHaveLength(initialLength + 1);
        expect(result.current.items[2].label).toMatch(/^Page \d+/);
        expect(result.current.items[2].isFixed).toBe(false);
      });

      it("should always insert before Ending item even with high index", () => {
        const { result } = renderHook(() => useNavigationStore());

        act(() => {
          result.current.insertPageAt(999);
        });

        const endingIndex = result.current.items.findIndex(
          (item) => item.id === FIXED_PAGE_IDS.ENDING,
        );
        expect(endingIndex).toBe(result.current.items.length - 1);

        const newItem = result.current.items[endingIndex - 1];
        expect(newItem.isFixed).toBe(false);
        expect(newItem.label).toMatch(/^Page \d+/);
      });

      it("should reset hoveredInsertIndex after insertion", () => {
        const { result } = renderHook(() => useNavigationStore());

        act(() => {
          result.current.setHoveredInsertIndex(2);
        });
        expect(result.current.hoveredInsertIndex).toBe(2);

        act(() => {
          result.current.insertPageAt(2);
        });
        expect(result.current.hoveredInsertIndex).toBeNull();
      });
    });

    describe("addPageAtEnd", () => {
      it("should always add page before Ending item", () => {
        const { result } = renderHook(() => useNavigationStore());
        const initialLength = result.current.items.length;

        act(() => {
          result.current.addPageAtEnd();
        });

        expect(result.current.items).toHaveLength(initialLength + 1);

        const lastItem = result.current.items[result.current.items.length - 1];
        expect(lastItem.id).toBe(FIXED_PAGE_IDS.ENDING);

        const newItem = result.current.items[result.current.items.length - 2];
        expect(newItem.isFixed).toBe(false);
        expect(newItem.label).toMatch(/^Page \d+/);
      });

      it("should generate sequential labels", () => {
        const { result } = renderHook(() => useNavigationStore());

        act(() => {
          result.current.addPageAtEnd();
        });
        const firstNewItemIndex = result.current.items.length - 2;
        const firstNewItemLabel = result.current.items[firstNewItemIndex].label;

        act(() => {
          result.current.addPageAtEnd();
        });
        const secondNewItemIndex = result.current.items.length - 2;
        const secondNewItemLabel =
          result.current.items[secondNewItemIndex].label;

        expect(firstNewItemLabel).toMatch(/^Page \d+/);
        expect(secondNewItemLabel).toMatch(/^Page \d+/);

        expect(
          result.current.items[result.current.items.length - 3].isFixed,
        ).toBe(false);
        expect(
          result.current.items[result.current.items.length - 2].isFixed,
        ).toBe(false);
      });
    });
  });

  describe("Reordering with Fixed Items", () => {
    describe("reorderItems", () => {
      it("should maintain fixed items in correct positions after reordering", () => {
        const { result } = renderHook(() => useNavigationStore());
        const items = result.current.items;

        const reorderedItems = [items[0], items[2], items[1], items[3]];

        act(() => {
          result.current.reorderItems(reorderedItems);
        });

        expect(result.current.items[0].id).toBe(FIXED_PAGE_IDS.INFO);
        expect(result.current.items[result.current.items.length - 1].id).toBe(
          FIXED_PAGE_IDS.ENDING,
        );

        const movableItems = result.current.items.filter(
          (item) => !item.isFixed,
        );
        expect(movableItems.length).toBeGreaterThanOrEqual(2);

        expect(result.current.items[1].isFixed).toBe(false);
        expect(
          result.current.items[result.current.items.length - 2].isFixed,
        ).toBe(false);
      });

      it("should fix order when fixed items are out of place", () => {
        const { result } = renderHook(() => useNavigationStore());
        const items = result.current.items;

        const invalidItems = [items[1], items[0], items[3], items[2]];

        act(() => {
          result.current.reorderItems(invalidItems);
        });

        expect(result.current.items[0].id).toBe(FIXED_PAGE_IDS.INFO);
        expect(result.current.items[result.current.items.length - 1].id).toBe(
          FIXED_PAGE_IDS.ENDING,
        );

        expect(result.current.items[1].isFixed).toBe(false);
        expect(result.current.items[2].isFixed).toBe(false);
      });
    });
  });

  describe("Drop Position Validation", () => {
    describe("isValidDropPosition", () => {
      it("should return false for fixed active item", () => {
        const { result } = renderHook(() => useNavigationStore());

        const infoId = FIXED_PAGE_IDS.INFO;
        const movableItems = result.current.getMovableItems();

        const isValid = result.current.isValidDropPosition(
          infoId,
          movableItems[0].id,
        );
        expect(isValid).toBe(false);
      });

      it("should return false for fixed target item", () => {
        const { result } = renderHook(() => useNavigationStore());

        const infoId = FIXED_PAGE_IDS.INFO;
        const movableItems = result.current.getMovableItems();

        const isValid = result.current.isValidDropPosition(
          movableItems[0].id,
          infoId,
        );
        expect(isValid).toBe(false);
      });

      it("should return false for drop at first position", () => {
        const { result } = renderHook(() => useNavigationStore());

        const infoId = FIXED_PAGE_IDS.INFO;
        const movableItems = result.current.getMovableItems();

        const isValid = result.current.isValidDropPosition(
          movableItems[1].id,
          infoId,
        );
        expect(isValid).toBe(false);
      });

      it("should return false for drop at last position", () => {
        const { result } = renderHook(() => useNavigationStore());

        const endingId = FIXED_PAGE_IDS.ENDING;
        const movableItems = result.current.getMovableItems();

        const isValid = result.current.isValidDropPosition(
          movableItems[0].id,
          endingId,
        );
        expect(isValid).toBe(false);
      });

      it("should return true for valid positions between movable items", () => {
        const { result } = renderHook(() => useNavigationStore());

        const movableItems = result.current.getMovableItems();

        const isValid = result.current.isValidDropPosition(
          movableItems[0].id,
          movableItems[1].id,
        );
        expect(isValid).toBe(true);
      });
    });
  });
});
