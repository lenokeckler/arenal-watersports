import type { PhotoUnit } from "@/app/services/equipment/models/PhotoUnit.interface";
import type { NullableRef } from "@/app/types";

export interface UnitPhotoListItem extends PhotoUnit {
  coverUrl: NullableRef<string>;
}
