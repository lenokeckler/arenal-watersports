import type { Nullable } from "@/app/types";
import type { useToast } from "@/app/components/toast/utils/useToast";
import type { CategoryMutationResult } from "./CategoryMutationResult.interface";

export interface RunCategoryCardMutationOptions {
  categoryId: string;
  mutate: (
    categoryId: string
  ) => Promise<CategoryMutationResult>;
  successMessage: string;
  showToast: ReturnType<typeof useToast>["showToast"];
  onSuccess: () => void;
  setPendingCategoryId: (
    categoryId: Nullable<string>
  ) => void;
  onSettled?: () => void;
}
