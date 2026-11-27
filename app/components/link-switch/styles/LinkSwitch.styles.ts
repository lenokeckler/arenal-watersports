import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const LINK_SWITCH_CLASS =
  "flex flex-wrap gap-1 rounded-xl border border-outline-variant bg-surface-container/80 p-1";

const LINK_SWITCH_OPTION_CLASS =
  "inline-flex min-h-11 flex-1 items-center justify-center rounded-lg px-3 text-center text-body-base font-semibold whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export const resolveLinkSwitchOptionClass = (
  isCurrent: boolean
): string =>
  joinClassNames(
    LINK_SWITCH_OPTION_CLASS,
    isCurrent
      ? "bg-primary text-on-primary"
      : "text-on-surface-variant hover:bg-on-surface/10"
  );
