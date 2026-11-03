import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const CATEGORY_GROUP_SWITCH_CLASS =
  "flex flex-wrap gap-xs";

export const CATEGORY_GROUP_SWITCH_LINK_CLASS =
  "inline-flex min-h-11 items-center rounded-full border px-md text-button font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export const CATEGORY_GROUP_SWITCH_LINK_IDLE_CLASS =
  "border-outline-variant bg-card-tint-neutral-bg text-on-surface-variant hover:border-primary hover:text-primary";

export const CATEGORY_GROUP_SWITCH_LINK_CURRENT_CLASS =
  "border-primary bg-primary/15 text-primary";

export const resolveCategoryGroupSwitchLinkClass = (
  isCurrent: boolean
): string =>
  joinClassNames(
    CATEGORY_GROUP_SWITCH_LINK_CLASS,
    isCurrent
      ? CATEGORY_GROUP_SWITCH_LINK_CURRENT_CLASS
      : CATEGORY_GROUP_SWITCH_LINK_IDLE_CLASS
  );
