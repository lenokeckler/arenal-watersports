import { EQUIPMENT_HOURS_FORMAT } from "../constants/EquipmentHoursReport.constants";

export const formatEquipmentHours = (
  hours: number
): string =>
  new Intl.NumberFormat(
    EQUIPMENT_HOURS_FORMAT.locale,
    EQUIPMENT_HOURS_FORMAT.hoursOptions
  ).format(hours);

export const formatEquipmentDate = (date: string): string =>
  new Intl.DateTimeFormat(
    EQUIPMENT_HOURS_FORMAT.locale,
    EQUIPMENT_HOURS_FORMAT.dateOptions
  ).format(new Date(date));
