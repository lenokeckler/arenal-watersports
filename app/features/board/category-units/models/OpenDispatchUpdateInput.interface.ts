import type { NullableRef } from "@/app/types";

export interface OpenDispatchUpdateInput {
  departureAt: string;
  dispatchId: string;
  radioChannel: NullableRef<number>;
  returnsAt: string;
}
