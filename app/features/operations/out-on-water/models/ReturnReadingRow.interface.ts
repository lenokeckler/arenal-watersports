import type { DispatchUsageMetric } from "@/app/components/dispatch-board/models/DispatchUsageMetric.type";
import type { NullableRef } from "@/app/types";
import type { CloseGroupDamage } from "./CloseGroupDamage.interface";
import type { CloseGroupDraft } from "./CloseGroupDraft.interface";

export interface ReturnReadingRow {
  causeError: NullableRef<string>;
  code: string;
  consumesFuel: boolean;
  damage: NullableRef<CloseGroupDamage>;
  descriptionError: NullableRef<string>;
  draft: CloseGroupDraft;
  fuelError: NullableRef<string>;
  fuelLevel: NullableRef<number>;
  fuelMax: number;
  fuelOut: NullableRef<number>;
  impactError: NullableRef<string>;
  isComplete: boolean;
  unitId: string;
  usageError: NullableRef<string>;
  usageMetric: NullableRef<DispatchUsageMetric>;
  usageOut: NullableRef<number>;
  usageReading: NullableRef<number>;
}
