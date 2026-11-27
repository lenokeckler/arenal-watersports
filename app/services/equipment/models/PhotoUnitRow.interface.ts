import type { NullableRef } from "@/app/types";
import type { PhotoAngle } from "./PhotoUnit.interface";

export interface PhotoUnitRow {
  category: {
    id: string;
    image_path: NullableRef<string>;
    name: string;
  };
  code: string;
  id: string;
  impact_count: number;
  photos: { angle: PhotoAngle }[];
}
