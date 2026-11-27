import type {
  BoardUnitDamageRow,
  BoardUnitJobRow,
} from "@/app/services/board";
import type { CategoryUnitStatusDetails } from "../models/CategoryUnitStatusDetails.interface";
import { formatMaintenanceCost } from "./formatMaintenanceCost";

const RECENT_JOBS_LIMIT = 5;

export const buildUnitStatusDetails = (
  unitId: string,
  jobs: BoardUnitJobRow[],
  damages: BoardUnitDamageRow[]
): CategoryUnitStatusDetails => {
  const latestDamage = damages.find(
    (row) => row.unit_id === unitId
  );

  return {
    damage:
      latestDamage?.cause && latestDamage.description
        ? {
            cause: latestDamage.cause,
            description: latestDamage.description,
            reportedAt: latestDamage.created_at,
          }
        : null,
    jobs: jobs
      .filter((row) => row.unit_id === unitId)
      .slice(0, RECENT_JOBS_LIMIT)
      .map((row) => ({
        cost: formatMaintenanceCost(
          row.cost_amount,
          row.cost_currency
        ),
        description: row.description,
        isExternal: row.is_external,
        performedAt: row.performed_at,
        workType: row.work_type,
      })),
  };
};
