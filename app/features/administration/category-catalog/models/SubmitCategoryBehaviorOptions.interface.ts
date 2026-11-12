import type { useToast } from "@/app/components/toast/utils/useToast";
import type { CategoryBehaviorFormValues } from "./CategoryBehaviorFormValues.interface";

export interface SubmitCategoryBehaviorOptions {
  categoryId: string;
  values: CategoryBehaviorFormValues;
  showToast: ReturnType<typeof useToast>["showToast"];
  onSaved: () => void;
}
