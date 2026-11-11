import type { NullableRef } from "@/app/types";
import type { CloseGroupDamage } from "./CloseGroupDamage.interface";

export interface CloseGroupReturn {
  damage: NullableRef<CloseGroupDamage>;
  fuel: NullableRef<number>;
  maintenance: boolean;
  unitId: string;
  usage: NullableRef<number>;
}
