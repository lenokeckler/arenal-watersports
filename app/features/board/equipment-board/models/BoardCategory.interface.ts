import type { NullableRef } from "@/app/types";

export interface BoardCategory {
  freeCount: number;
  groupName: NullableRef<string>;
  id: string;
  imagePath: NullableRef<string>;
  damagedCount: number;
  inUseCount: number;
  maintenanceCount: number;
  name: string;
  totalCount: number;
}
