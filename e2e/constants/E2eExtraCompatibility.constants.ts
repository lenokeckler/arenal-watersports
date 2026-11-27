import {
  UNIT_STATUS,
  type UnitStatus,
} from "@/app/features/administration/unit-catalog/constants/UnitStatus.constants";

export const E2E_COMPATIBILITY_SCENARIO = {
  CANCEL: "compat_cancel",
  CLEAR: "compat_clear",
  HELPERS: "compat_helpers",
  JOURNEY: "compat_journey",
  OTHER_CATEGORY: "compat_other",
  OTHER_CATEGORY_KEEPS_LINKS: "compat_keeps",
  REDIRECT: "compat_redirect",
  SAVE_DISABLED: "compat_disabled",
  TAP_TARGETS: "compat_targets",
} as const;

export const E2E_COMPATIBILITY_UNIT_STATUSES: UnitStatus[] =
  [
    UNIT_STATUS.AVAILABLE,
    UNIT_STATUS.AVAILABLE,
    UNIT_STATUS.DAMAGED,
  ];

export const E2E_COMPATIBILITY_OTHER_UNIT_STATUSES: UnitStatus[] =
  [UNIT_STATUS.AVAILABLE, UNIT_STATUS.AVAILABLE];

export const E2E_COMPATIBILITY_UNIT_INDEX = {
  FIRST: 0,
  SECOND: 1,
  THIRD: 2,
} as const;

export const E2E_COMPATIBILITY_LINKED_COUNT = {
  ALL: 3,
  NONE: 0,
  ONE: 1,
  OTHER_CATEGORY_ONE: 1,
  TWO: 2,
} as const;

export const E2E_COMPATIBILITY_CATEGORY_UNIT_COUNT = {
  MAIN: 3,
  OTHER: 2,
} as const;

export const E2E_COMPATIBILITY_SELECTOR = {
  OPEN_SECTION_TOGGLE: "button[aria-expanded=true]",
  SECTION_TOGGLE: "button[aria-expanded]",
  UNIT_ROW: "label",
} as const;

export const E2E_COMPATIBILITY_ATTRIBUTE = {
  EXPANDED: "aria-expanded",
} as const;

export const E2E_COMPATIBILITY_SAVE_ENABLED_TIMEOUT_MS = 2_000;
