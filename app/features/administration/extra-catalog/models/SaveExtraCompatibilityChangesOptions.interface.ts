import type { useToast } from "@/app/components/toast/utils/useToast";
import type { SetExtraCompatibilityInput } from "./SetExtraCompatibilityInput.interface";

export interface SaveExtraCompatibilityChangesOptions {
  changes: Omit<SetExtraCompatibilityInput, "extraId">[];
  extraId: string;
  showToast: ReturnType<typeof useToast>["showToast"];
}
