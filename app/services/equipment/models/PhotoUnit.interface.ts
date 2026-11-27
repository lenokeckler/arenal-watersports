import type { NullableRef } from "@/app/types";
import type { Database } from "@/app/types";

export interface PhotoUnit {
  basicCount: number;
  categoryId: string;
  categoryName: string;
  code: string;
  id: string;
  imagePath: NullableRef<string>;
  impactCount: number;
}

export type PhotoAngle =
  Database["public"]["Enums"]["photo_angle"];
