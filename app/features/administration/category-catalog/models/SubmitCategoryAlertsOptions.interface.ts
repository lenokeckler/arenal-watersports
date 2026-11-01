import type { useToast } from "@/app/components/toast/utils/useToast";
import type { CategoryAlertFormValues } from "./CategoryAlertFormValues.interface";

export interface SubmitCategoryAlertsOptions {
  categoryId: string;
  values: CategoryAlertFormValues;
  showToast: ReturnType<typeof useToast>["showToast"];
  onSaved: () => void;
}
