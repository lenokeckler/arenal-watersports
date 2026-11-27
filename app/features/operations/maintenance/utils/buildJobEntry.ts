import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import {
  EQUIPMENT_RETIRED,
  MAINTENANCE_WORK_TYPE_LABELS,
  PATHS,
} from "@/app/constants";
import type { EquipmentJob } from "@/app/services/equipment/models/EquipmentJob.interface";
import { MAINTENANCE_COPY } from "../constants/MaintenanceCopy.constants";
import type { MaintenanceAgendaEntryProps } from "../models/MaintenanceAgendaEntryProps.interface";
import { AGENDA_JOB_MARK_CLASS } from "../styles/MaintenanceCalendar.styles";
import { buildJobDetail } from "./buildJobDetail";

export const buildJobEntry = (
  job: EquipmentJob
): MaintenanceAgendaEntryProps => ({
  description: job.description,
  detail: [
    buildJobDetail(job),
    job.isRetired ? EQUIPMENT_RETIRED.LABEL : null,
  ]
    .filter(Boolean)
    .join(MAINTENANCE_COPY.PART_SEPARATOR),
  href: job.isRetired
    ? null
    : PATHS.OPERATIONS.UNIT_HISTORY(job.unitId),
  icon: MATERIAL_ICON_NAME.BUILD,
  markClassName: AGENDA_JOB_MARK_CLASS,
  title: MAINTENANCE_COPY.SUMMARY_TITLE(
    job.unitCode,
    MAINTENANCE_WORK_TYPE_LABELS[job.workType] ??
      job.workType
  ),
});
