import type { UnitDecommissionViewModel } from "./UnitDecommissionViewModel.interface";

export type UnitDecommissionConfirmProps = Omit<
  UnitDecommissionViewModel,
  "isConfirming" | "onStartClick"
>;
