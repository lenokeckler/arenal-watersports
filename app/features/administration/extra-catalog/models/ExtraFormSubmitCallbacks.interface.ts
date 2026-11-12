import type { useToast } from "@/app/components/toast/utils/useToast";

export interface ExtraFormSubmitCallbacks {
  showToast: ReturnType<typeof useToast>["showToast"];
  onSaved: () => void;
}
