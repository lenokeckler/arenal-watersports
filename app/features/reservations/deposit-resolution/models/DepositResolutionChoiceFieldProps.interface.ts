import type { DepositResolution } from "./DepositResolution.interface";

export interface DepositResolutionChoiceFieldProps {
  deposit: Pick<DepositResolution, "amount" | "currency">;
  isPending: boolean;
  onSelect: (returnsAll: boolean) => void;
  returnsAll: boolean;
}
