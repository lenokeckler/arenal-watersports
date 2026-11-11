import type { NullableRef } from "@/app/types";
import type { DispatchedGroupOut } from "./DispatchedGroupOut.interface";

export interface OutOnWaterViewProps {
  errorMessage: NullableRef<string>;
  groups: DispatchedGroupOut[];
  nowIso: string;
}
