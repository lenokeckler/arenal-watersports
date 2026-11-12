import type { NullableRef } from "@/app/types";
import type { UnitCorrectionInput } from "./UnitCorrectionInput.interface";

export interface UnitCorrectionErrors {
  fuelLevel: NullableRef<string>;
  fuelMax: NullableRef<string>;
  impactCount: NullableRef<string>;
  usageTotal: NullableRef<string>;
}

export interface UnitCorrectionFormResult {
  errors: UnitCorrectionErrors;
  input: NullableRef<UnitCorrectionInput>;
}
