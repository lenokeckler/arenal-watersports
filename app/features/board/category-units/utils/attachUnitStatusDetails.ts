import type { BoardUnitStatusDetailsRows } from "@/app/services/board";
import type { CategoryUnit } from "../models/CategoryUnit.interface";
import { buildUnitStatusDetails } from "./buildUnitStatusDetails";
import { hasStatusSheet } from "./hasStatusSheet";

export const attachUnitStatusDetails = (
  units: CategoryUnit[],
  { damages, jobs }: BoardUnitStatusDetailsRows
): CategoryUnit[] =>
  units.map((unit) =>
    hasStatusSheet(unit.status)
      ? {
          ...unit,
          statusDetails: buildUnitStatusDetails(
            unit.id,
            jobs,
            damages
          ),
        }
      : unit
  );
