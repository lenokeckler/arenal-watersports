import type { Nullable } from "@/app/types";

export const resolveConfirmingCategoryAfterCancel = (
  confirmingCategoryId: Nullable<string>,
  cancelledCategoryId: string
): Nullable<string> =>
  confirmingCategoryId === cancelledCategoryId
    ? null
    : confirmingCategoryId;
