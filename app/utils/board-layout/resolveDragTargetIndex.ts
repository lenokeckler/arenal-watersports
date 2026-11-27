import type { DragSlot } from "./models/DragSlot.interface";

const NOT_FOUND_INDEX = -1;
const FIRST_INDEX = 0;

export const resolveDragTargetIndex = (
  slots: DragSlot[],
  pointerY: number
): number => {
  if (slots.length === 0) {
    return NOT_FOUND_INDEX;
  }

  const slotsAboveOrUnderPointer = slots.filter(
    (slot) => slot.top <= pointerY
  ).length;

  return Math.max(
    slotsAboveOrUnderPointer - 1,
    FIRST_INDEX
  );
};
