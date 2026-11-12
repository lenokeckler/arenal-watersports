import type { Database, NullableRef } from "@/app/types";

export interface UnitPhotoSlot {
  angle: Database["public"]["Enums"]["photo_angle"];
  url: NullableRef<string>;
}
