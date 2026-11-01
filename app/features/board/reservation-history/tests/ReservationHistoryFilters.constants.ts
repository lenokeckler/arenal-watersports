import {
  RESERVATION_HISTORY_FILTER_PARAM,
  RESERVATION_TYPE,
} from "@/app/constants";

export const FILTER_CHANGE_FROM = "2026-09-01";

export const FILTER_CHANGE_TYPE = RESERVATION_TYPE.COMBO;

export const FILTER_FROM_EVENT = {
  target: {
    name: RESERVATION_HISTORY_FILTER_PARAM.FROM,
    value: FILTER_CHANGE_FROM,
  },
};

export const FILTER_TYPE_EVENT = {
  target: {
    name: RESERVATION_HISTORY_FILTER_PARAM.TYPE,
    value: FILTER_CHANGE_TYPE,
  },
};
