import type { useToast } from "@/app/components/toast/utils/useToast";
import type { CategoryDepositFormValues } from "./CategoryDepositFormValues.interface";

export interface SubmitCategoryDepositOptions {
  categoryId: string;
  values: CategoryDepositFormValues;
  showToast: ReturnType<typeof useToast>["showToast"];
  onSaved: () => void;
}
