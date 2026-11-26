import type { BoardUnitCounts } from "@/app/components/board-unit-filter/models/BoardUnitCounts.interface";
import type { BoardCard } from "../models/BoardCard.interface";

export const buildBoardUnitCounts = (
  cards: BoardCard[]
): BoardUnitCounts =>
  cards.reduce<BoardUnitCounts>(
    (counts, card) => ({
      available: counts.available + card.freeCount,
      damaged: counts.damaged + card.damagedCount,
      maintenance:
        counts.maintenance + card.maintenanceCount,
      total: counts.total + card.totalCount,
    }),
    { available: 0, damaged: 0, maintenance: 0, total: 0 }
  );
