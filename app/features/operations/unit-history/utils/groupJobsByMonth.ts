import { EQUIPMENT_PERIOD } from "@/app/constants";
import type { EquipmentJob } from "@/app/services/equipment/models/EquipmentJob.interface";
import type { UnitJobMonth } from "../models/UnitJobMonth.interface";

export const groupJobsByMonth = (
  jobs: EquipmentJob[]
): UnitJobMonth[] =>
  jobs.reduce<UnitJobMonth[]>((groups, job) => {
    const month = job.date.slice(
      0,
      EQUIPMENT_PERIOD.MONTH_KEY_LENGTH
    );
    const last = groups.at(-1);

    if (last?.month === month) {
      last.jobs.push(job);
      return groups;
    }

    return [...groups, { jobs: [job], month }];
  }, []);
