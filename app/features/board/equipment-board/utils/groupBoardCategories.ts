import { resolveBoardGroupKey } from "@/app/utils/board-categories/resolveBoardGroupKey";
import type { BoardCategory } from "../models/BoardCategory.interface";

export const groupBoardCategories = (
  categories: BoardCategory[]
): BoardCategory[][] => {
  const groups: BoardCategory[][] = [];
  const groupByKey = new Map<string, BoardCategory[]>();

  categories.forEach((category) => {
    const groupKey = resolveBoardGroupKey(
      category.groupName
    );
    const knownGroup = groupKey
      ? groupByKey.get(groupKey)
      : undefined;

    if (knownGroup) {
      knownGroup.push(category);
      return;
    }

    const members = [category];
    groups.push(members);

    if (groupKey) {
      groupByKey.set(groupKey, members);
    }
  });

  return groups;
};
