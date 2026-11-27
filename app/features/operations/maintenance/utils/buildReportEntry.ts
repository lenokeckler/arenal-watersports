import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import {
  DAMAGE_CAUSE_LABELS,
  DAMAGE_PENDING_LABEL,
  EQUIPMENT_RETIRED,
  PATHS,
} from "@/app/constants";
import type { EquipmentReport } from "@/app/services/equipment/models/EquipmentReport.interface";
import { MAINTENANCE_COPY } from "../constants/MaintenanceCopy.constants";
import type { MaintenanceAgendaEntryProps } from "../models/MaintenanceAgendaEntryProps.interface";
import { AGENDA_DAMAGE_MARK_CLASS } from "../styles/MaintenanceCalendar.styles";

export const buildReportEntry = (
  report: EquipmentReport
): MaintenanceAgendaEntryProps => ({
  description: report.description,
  detail: report.isRetired ? EQUIPMENT_RETIRED.LABEL : null,
  href: report.isRetired
    ? null
    : PATHS.OPERATIONS.UNIT_HISTORY(report.unitId),
  icon: MATERIAL_ICON_NAME.WARNING,
  markClassName: AGENDA_DAMAGE_MARK_CLASS,
  title: MAINTENANCE_COPY.SUMMARY_TITLE(
    report.unitCode,
    report.isPending || !report.cause
      ? DAMAGE_PENDING_LABEL
      : DAMAGE_CAUSE_LABELS[report.cause]
  ),
});
