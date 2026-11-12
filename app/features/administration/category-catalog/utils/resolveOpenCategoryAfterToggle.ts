import type { NullableRef } from "@/app/types";

export const resolveOpenCategoryAfterToggle = (
  openCategoryId: NullableRef<string>,
  toggledCategoryId: string
): NullableRef<string> =>
  openCategoryId === toggledCategoryId
    ? null
    : toggledCategoryId;
