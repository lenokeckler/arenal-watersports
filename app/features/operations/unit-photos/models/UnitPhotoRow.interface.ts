import type { Database } from "@/app/types";

export interface UnitPhotoRow {
  angle: Database["public"]["Enums"]["photo_angle"];
  storage_path: string;
}
