import type { useToast } from "@/app/components/toast/utils/useToast";
import type { SaveUnitOptions } from "./SaveUnitOptions.interface";

export interface SubmitUnitFormOptions extends SaveUnitOptions {
  setCodeError: (message: string) => void;
  showToast: ReturnType<typeof useToast>["showToast"];
  onSaved: () => void;
}
