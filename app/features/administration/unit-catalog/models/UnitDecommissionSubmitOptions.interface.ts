import type { useToast } from "@/app/components/toast/utils/useToast";
import type { DecommissionUnitInput } from "./DecommissionUnitInput.interface";

export interface UnitDecommissionSubmitOptions {
  input: DecommissionUnitInput;
  showToast: ReturnType<typeof useToast>["showToast"];
  onDecommissioned: () => void;
}
