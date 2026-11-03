import type { NullableRef } from "@/app/types";
import type { UnitCardMotorTexts } from "./UnitCardMotorTexts.interface";

export interface UnitCardViewModel extends UnitCardMotorTexts {
  id: string;
  code: string;
  editHref: NullableRef<string>;
  isDimmed: boolean;
  statusLabel: string;
}
