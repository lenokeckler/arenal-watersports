import type { DispatchedGroupOut } from "./DispatchedGroupOut.interface";
import type { GroupReturnUnit } from "./GroupReturnUnit.interface";

export interface CloseGroupFormInput {
  group: DispatchedGroupOut;
  onClosed: () => void;
  units: GroupReturnUnit[];
}
