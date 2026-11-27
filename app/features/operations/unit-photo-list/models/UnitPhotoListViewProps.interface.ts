import type { NullableRef } from "@/app/types";
import type { UnitPhotoListData } from "./UnitPhotoListData.interface";

export interface UnitPhotoListViewProps {
  data: NullableRef<UnitPhotoListData>;
  errorMessage: NullableRef<string>;
}
