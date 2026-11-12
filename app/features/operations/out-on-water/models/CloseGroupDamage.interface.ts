import type { CLOSE_GROUP_DAMAGE_CAUSE } from "../constants/CloseGroup.constants";

export type CloseGroupDamageCause =
  (typeof CLOSE_GROUP_DAMAGE_CAUSE)[keyof typeof CLOSE_GROUP_DAMAGE_CAUSE];

export interface CloseGroupDamage {
  cause: CloseGroupDamageCause;
  description: string;
  impactDelta: number;
}
