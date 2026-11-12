import type { useToast } from "@/app/components/toast/utils/useToast";
import type { AdjustStockInput } from "./AdjustStockInput.interface";

export interface SubmitStockCountOptions {
  input: AdjustStockInput;
  onSaved: () => void;
  showToast: ReturnType<typeof useToast>["showToast"];
}
