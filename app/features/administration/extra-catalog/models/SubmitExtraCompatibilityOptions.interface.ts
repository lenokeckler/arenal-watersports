import type { useToast } from "@/app/components/toast/utils/useToast";
import type { SetExtraCompatibilityInput } from "./SetExtraCompatibilityInput.interface";

export interface SubmitExtraCompatibilityOptions {
  input: SetExtraCompatibilityInput;
  onSaved: () => void;
  showToast: ReturnType<typeof useToast>["showToast"];
}
