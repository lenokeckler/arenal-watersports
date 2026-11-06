import type { NullableUndefined } from "@/app/types";
import type { UnitFormFieldChangeHandler } from "./UnitFormFieldChangeHandler.type";

export interface UnitDecommissionViewModel {
  isConfirming: boolean;
  isSubmitting: boolean;
  reason: string;
  error: NullableUndefined<string>;
  onStartClick: () => void;
  onCancelClick: () => void;
  onReasonChange: UnitFormFieldChangeHandler;
  onConfirmClick: () => Promise<void>;
}
