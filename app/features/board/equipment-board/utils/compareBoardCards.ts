import { CALENDAR_PRESENTATION } from "@/app/constants";
import type { BoardCard } from "../models/BoardCard.interface";

export const compareBoardCards = (
  left: BoardCard,
  right: BoardCard
): number =>
  left.label.localeCompare(
    right.label,
    CALENDAR_PRESENTATION.LOCALE
  ) ||
  left.id.localeCompare(
    right.id,
    CALENDAR_PRESENTATION.LOCALE
  );
