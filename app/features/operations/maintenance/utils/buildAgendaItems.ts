import type { EquipmentJob } from "@/app/services/equipment/models/EquipmentJob.interface";
import type { EquipmentReport } from "@/app/services/equipment/models/EquipmentReport.interface";
import type { MaintenanceAgendaItem } from "../models/MaintenanceAgendaItem.interface";
import { buildJobEntry } from "./buildJobEntry";
import { buildReportEntry } from "./buildReportEntry";

export const buildAgendaItems = (
  jobs: EquipmentJob[],
  reports: EquipmentReport[]
): MaintenanceAgendaItem[] => [
  ...jobs.map((job) => ({
    entry: buildJobEntry(job),
    id: job.id,
  })),
  ...reports.map((report) => ({
    entry: buildReportEntry(report),
    id: report.id,
  })),
];
