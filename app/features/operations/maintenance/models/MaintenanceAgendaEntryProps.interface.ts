import type { MaterialIconName } from "@/app/components/icons/material-icon/models/MaterialIconName.type";
import type { NullableRef } from "@/app/types";

export interface MaintenanceAgendaEntryProps {
  description: NullableRef<string>;
  detail: NullableRef<string>;
  href: NullableRef<string>;
  icon: MaterialIconName;
  markClassName: string;
  title: string;
}
