import { safeString } from "@/app/utils/safe-value/SafeValue";
import type { BoardCard } from "../models/BoardCard.interface";
import type { BoardCategory } from "../models/BoardCategory.interface";
import { resolveBoardGroupKey } from "./resolveBoardGroupKey";

const sumCounts = (
  members: BoardCategory[],
  pickCount: (member: BoardCategory) => number
): number =>
  members.reduce(
    (total, member) => total + pickCount(member),
    0
  );

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
    inUseCount: sumCounts(
      members,
      (member) => member.inUseCount
    ),
    isGrouped,
    label: isGrouped
      ? safeString(firstMember.groupName)
      : firstMember.name,
    totalCount: sumCounts(
      members,
      (member) => member.totalCount
    ),
  };
};
