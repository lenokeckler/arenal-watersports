import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const CATEGORY_LIST_CONTENT_CLASS =
  "flex w-full flex-col gap-gutter";

export const CATEGORY_LIST_PAGE_CONTENT_CLASS =
  joinClassNames(
    CATEGORY_LIST_CONTENT_CLASS,
    "mx-auto max-w-3xl px-margin-mobile py-md md:px-margin-desktop md:py-lg"
  );

export const CATEGORY_LIST_CARDS_CLASS =
  "flex flex-col gap-3";
