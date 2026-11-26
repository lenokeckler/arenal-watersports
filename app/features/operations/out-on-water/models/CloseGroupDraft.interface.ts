import type { NullableRef } from "@/app/types";

export interface CloseGroupDraft {
  cause: string;
  description: string;
  fuel: string;
  hasDamage: boolean;
  impact: string;
  impactCount: NullableRef<number>;
  maintenance: boolean;
  usage: string;
}
