import { compareBoardCategories } from "@/app/utils/board-categories/compareBoardCategories";
import { resolveBoardGroupKey } from "@/app/utils/board-categories/resolveBoardGroupKey";
import type { NullableRef } from "@/app/types";
import { safeString } from "@/app/utils/safe-value/SafeValue";
import type { BoardCard } from "../models/BoardCard.interface";
import type { BoardCategory } from "../models/BoardCategory.interface";

const sumCounts = (
  members: BoardCategory[],
  pickCount: (member: BoardCategory) => number
): number =>
  members.reduce(
    (total, member) => total + pickCount(member),
    0
  );

const resolveTargetCategoryId = (
  members: BoardCategory[]
): string =>
  [...members].sort(compareBoardCategories)[0].id;

const resolveImagePath = (
  members: BoardCategory[]
): NullableRef<string> =>
  [...members]
    .sort(compareBoardCategories)
    .find((member) => member.imagePath !== null)
    ?.imagePath ?? null;

export const buildBoardCard = (
  members: BoardCategory[]
): BoardCard => {
  const [firstMember] = members;
  const isGrouped = members.length > 1;
  const groupKey = resolveBoardGroupKey(
    firstMember.groupName
  );

  return {
    categories: members,
    freeCount: sumCounts(
      members,
      (member) => member.freeCount
    ),
    id: isGrouped && groupKey ? groupKey : firstMember.id,
    imagePath: resolveImagePath(members),
    inUseCount: sumCounts(
      members,
      (member) => member.inUseCount
    ),
    isGrouped,
    label: isGrouped
      ? safeString(firstMember.groupName)
      : firstMember.name,
    targetCategoryId: resolveTargetCategoryId(members),
    totalCount: sumCounts(
      members,
      (member) => member.totalCount
    ),
  };
};
