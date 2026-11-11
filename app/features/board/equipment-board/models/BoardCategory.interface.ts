import type { NullableRef } from "@/app/types";

export interface BoardCategory {
  freeCount: number;
  groupName: NullableRef<string>;
  id: string;
  inUseCount: number;
  name: string;
  totalCount: number;
}
