import { SUPABASE_WORK_AREA } from "@/app/constants";

export const CHILD_TEXT = "System screen test child";

export const SECOND_CHILD_TEXT =
  "System screen test second child";

export const MIN_VIEWPORT_HEIGHT_CLASS = "min-h-dvh";

export const SYSTEM_SCREEN_TEST_OVERVIEW = {
  areas: [SUPABASE_WORK_AREA.OPERATIONS],
  current: SUPABASE_WORK_AREA.OPERATIONS,
} as const;
