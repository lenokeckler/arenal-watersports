import { SUPABASE_WORK_AREA } from "@/app/constants";

export const REDIRECT_SIGNAL_MESSAGE = "redirected";

export const MULTI_AREA_WITHOUT_MODE = {
  areas: [
    SUPABASE_WORK_AREA.RESERVATIONS,
    SUPABASE_WORK_AREA.OPERATIONS,
  ],
  current: null,
};

export const MULTI_AREA_WITH_MODE = {
  areas: MULTI_AREA_WITHOUT_MODE.areas,
  current: SUPABASE_WORK_AREA.RESERVATIONS,
};

export const SINGLE_AREA_WITH_MODE = {
  areas: [SUPABASE_WORK_AREA.OPERATIONS],
  current: SUPABASE_WORK_AREA.OPERATIONS,
};
