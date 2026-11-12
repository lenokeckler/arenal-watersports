import type { MaterialIconName } from "@/app/components/icons/material-icon/models/MaterialIconName.type";
import type { NullableRef } from "@/app/types";
import type { ProfileEntryId } from "./ProfileEntryId.type";

export interface ProfileEntry {
  href: string;
  icon: MaterialIconName;
  id: ProfileEntryId;
  label: string;
  status: NullableRef<string>;
}
