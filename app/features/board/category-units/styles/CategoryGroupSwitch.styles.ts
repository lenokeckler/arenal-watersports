import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const CATEGORY_GROUP_SWITCH_CLASS =
  "flex w-full flex-wrap gap-2 md:w-fit";

export const CATEGORY_GROUP_SWITCH_LINK_CLASS =
  "inline-flex min-h-11 min-w-0 flex-1 items-center justify-center rounded-full border px-md text-center text-button font-semibold md:flex-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export const CATEGORY_GROUP_SWITCH_LINK_IDLE_CLASS =
  "border-outline-variant bg-card-tint-neutral-bg text-on-surface hover:border-primary hover:text-primary";

export const CATEGORY_GROUP_SWITCH_LINK_CURRENT_CLASS =
  "border-primary bg-primary text-on-primary";

export const resolveCategoryGroupSwitchLinkClass = (
  isCurrent: boolean
): string =>
  joinClassNames(
    CATEGORY_GROUP_SWITCH_LINK_CLASS,
    isCurrent
      ? CATEGORY_GROUP_SWITCH_LINK_CURRENT_CLASS
      : CATEGORY_GROUP_SWITCH_LINK_IDLE_CLASS
  );
