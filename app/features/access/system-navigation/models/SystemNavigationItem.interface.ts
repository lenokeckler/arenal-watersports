import type { MaterialIconName } from "@/app/components/icons/material-icon/models/MaterialIconName.type";
import type { NullableRef } from "@/app/types";

export interface SystemNavigationItem {
  label: string;
  href: NullableRef<string>;
  icon: MaterialIconName;
  disabled: boolean;
}
