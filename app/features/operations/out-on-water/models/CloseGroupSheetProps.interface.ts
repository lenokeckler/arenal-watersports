import type { DispatchedGroupOut } from "./DispatchedGroupOut.interface";

export interface CloseGroupSheetProps {
  group: DispatchedGroupOut;
  onClose: () => void;
}
