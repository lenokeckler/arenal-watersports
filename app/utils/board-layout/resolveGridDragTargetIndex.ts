import type { GridDragRect } from "./models/GridDragRect.interface";

const NOT_FOUND_INDEX = -1;
const HALF = 2;

const distanceToCenter = (
  rect: GridDragRect,
  x: number,
  y: number
): number =>
  Math.hypot(
    x - (rect.left + rect.right) / HALF,
    y - (rect.top + rect.bottom) / HALF
  );

const contains = (
  rect: GridDragRect,
  x: number,
  y: number
): boolean =>
  x >= rect.left &&
  x <= rect.right &&
  y >= rect.top &&
  y <= rect.bottom;

export const resolveGridDragTargetIndex = (
  rects: GridDragRect[],
  x: number,
  y: number
): number => {
  if (rects.length === 0) {
    return NOT_FOUND_INDEX;
  }

  const containingIndex = rects.findIndex((rect) =>
    contains(rect, x, y)
  );

  if (containingIndex !== NOT_FOUND_INDEX) {
    return containingIndex;
  }

  return rects.reduce(
    (nearestIndex, rect, index) =>
      distanceToCenter(rect, x, y) <
      distanceToCenter(rects[nearestIndex], x, y)
        ? index
        : nearestIndex,
    0
  );
};
