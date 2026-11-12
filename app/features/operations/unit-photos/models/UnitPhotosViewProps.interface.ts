import type { NullableRef } from "@/app/types";
import type { UnitPhotosData } from "./UnitPhotosData.interface";

export interface UnitPhotosViewProps {
  data: NullableRef<UnitPhotosData>;
  errorMessage: NullableRef<string>;
}
