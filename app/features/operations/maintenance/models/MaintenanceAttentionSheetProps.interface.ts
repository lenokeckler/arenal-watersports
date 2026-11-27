import type { MaintenanceUnit } from "./MaintenanceUnit.interface";

export interface MaintenanceAttentionSheetProps {
  closeHref: string;
  oil: MaintenanceUnit[];
  out: MaintenanceUnit[];
  title: string;
}
