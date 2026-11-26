export const moveBoardOrderItem = (
  ids: string[],
  fromIndex: number,
  toIndex: number
): string[] => {
  const isInRange = (index: number): boolean =>
    Number.isInteger(index) &&
    index >= 0 &&
    index < ids.length;

  if (
    fromIndex === toIndex ||
    !isInRange(fromIndex) ||
    !isInRange(toIndex)
  ) {
    return ids;
  }

  const remaining = ids.filter(
    (_, index) => index !== fromIndex
  );
  remaining.splice(toIndex, 0, ids[fromIndex]);
  return remaining;
};
