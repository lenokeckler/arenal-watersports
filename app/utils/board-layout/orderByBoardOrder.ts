import type { BoardOrderable } from "@/app/types";

const NOT_FOUND_INDEX = -1;

export const orderByBoardOrder = <
  Item extends BoardOrderable,
>(
  items: Item[],
  savedOrder: string[]
): Item[] => {
  const recognized = items.flatMap((item) => {
    const position = savedOrder.indexOf(item.id);
    return position === NOT_FOUND_INDEX
      ? []
      : [{ item, position }];
  });
  const unmentioned = items.filter(
    (item) => !savedOrder.includes(item.id)
  );

  return [
    ...recognized
      .sort(
        (first, second) => first.position - second.position
      )
      .map(({ item }) => item),
    ...unmentioned,
  ];
};
