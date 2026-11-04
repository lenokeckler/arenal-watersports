import { RESERVATION_CATEGORY_AVAILABILITY_PANEL_STATE } from "../constants/ReservationCategoryAvailabilityPanelState.constants";
import type { ReservationCategoryAvailabilityPanelProps } from "../models/ReservationCategoryAvailabilityPanelProps.interface";

export const RESERVATION_CATEGORY_AVAILABILITY_PANEL_TEST =
  {
    CATEGORY_NAME: "Kayak",
    INTERVAL_LABEL: "sábado, 18 de octubre · 10:00–12:00",
    POSITIVE_COUNT: 3,
    ZERO_COUNT: 0,
    NEGATIVE_COUNT: -1,
  } as const;

export const RESERVATION_CATEGORY_AVAILABILITY_PANEL_CASES =
  [
    {
      freeEquipmentCount:
        RESERVATION_CATEGORY_AVAILABILITY_PANEL_TEST.POSITIVE_COUNT,
      state:
        RESERVATION_CATEGORY_AVAILABILITY_PANEL_STATE.AVAILABLE,
    },
    {
      freeEquipmentCount:
        RESERVATION_CATEGORY_AVAILABILITY_PANEL_TEST.ZERO_COUNT,
      state:
        RESERVATION_CATEGORY_AVAILABILITY_PANEL_STATE.UNAVAILABLE,
    },
    {
      freeEquipmentCount:
        RESERVATION_CATEGORY_AVAILABILITY_PANEL_TEST.NEGATIVE_COUNT,
      state:
        RESERVATION_CATEGORY_AVAILABILITY_PANEL_STATE.OVERCOMMITTED,
    },
  ] satisfies Array<
    Pick<
      ReservationCategoryAvailabilityPanelProps,
      "freeEquipmentCount" | "state"
    >
  >;
