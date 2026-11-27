import type { CauseCounts } from "@/app/components/cause-chart/models/CauseCounts.type";
import type { EquipmentReport } from "@/app/services/equipment/models/EquipmentReport.interface";

export const countDamageByCause = (
  reports: EquipmentReport[]
): CauseCounts =>
  reports.reduce<CauseCounts>(
    (counts, report) =>
      report.cause && !report.isPending
        ? {
            ...counts,
            [report.cause]: counts[report.cause] + 1,
          }
        : counts,
    {
      collision: 0,
      machine_failure: 0,
      other: 0,
      rollover: 0,
    }
  );
