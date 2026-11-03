import { STRING } from "@/app/constants";
import { RESERVATION_CATEGORY_AVAILABILITY_PANEL_STATE } from "../constants/ReservationCategoryAvailabilityPanelState.constants";
import type { CategoryAvailabilityPanelStateInput } from "../models/CategoryAvailabilityPanelStateInput.interface";
import type { ReservationCategoryAvailabilityPanelState } from "../models/ReservationCategoryAvailabilityPanelState.type";
import { RESERVATION_CATEGORY_AVAILABILITY_PANEL_TEST } from "./ReservationCategoryAvailabilityPanel.constants";
import { RESERVATION_CATEGORY_AVAILABILITY_INPUT } from "./getReservationInterval.constants";

const VALID_CATEGORY_ID =
  RESERVATION_CATEGORY_AVAILABILITY_INPUT.categoryId;

export const CATEGORY_AVAILABILITY_PANEL_STATE_CASES = [
  {
    caseName: "inactive when no category is selected",
    expectedState:
      RESERVATION_CATEGORY_AVAILABILITY_PANEL_STATE.INACTIVE,
    input: {
      availability: null,
      categoryId: STRING.Empty,
      hasError: false,
      isLoading: false,
      isValidInterval: true,
    },
  },
  {
    caseName: "inactive when the interval is invalid",
    expectedState:
      RESERVATION_CATEGORY_AVAILABILITY_PANEL_STATE.INACTIVE,
    input: {
      availability: null,
      categoryId: VALID_CATEGORY_ID,
      hasError: false,
      isLoading: false,
      isValidInterval: false,
    },
  },
  {
    caseName:
      "loading while the availability request is pending",
    expectedState:
      RESERVATION_CATEGORY_AVAILABILITY_PANEL_STATE.LOADING,
    input: {
      availability: null,
      categoryId: VALID_CATEGORY_ID,
      hasError: false,
      isLoading: true,
      isValidInterval: true,
    },
  },
  {
    caseName: "loading when no result is available yet",
    expectedState:
      RESERVATION_CATEGORY_AVAILABILITY_PANEL_STATE.LOADING,
    input: {
      availability: null,
      categoryId: VALID_CATEGORY_ID,
      hasError: false,
      isLoading: false,
      isValidInterval: true,
    },
  },
  {
    caseName: "error when the availability request fails",
    expectedState:
      RESERVATION_CATEGORY_AVAILABILITY_PANEL_STATE.ERROR,
    input: {
      availability: null,
      categoryId: VALID_CATEGORY_ID,
      hasError: true,
      isLoading: false,
      isValidInterval: true,
    },
  },
  {
    caseName: "available when free equipment is positive",
    expectedState:
      RESERVATION_CATEGORY_AVAILABILITY_PANEL_STATE.AVAILABLE,
    input: {
      availability:
        RESERVATION_CATEGORY_AVAILABILITY_PANEL_TEST.POSITIVE_COUNT,
      categoryId: VALID_CATEGORY_ID,
      hasError: false,
      isLoading: false,
      isValidInterval: true,
    },
  },
  {
    caseName: "unavailable when no equipment is free",
    expectedState:
      RESERVATION_CATEGORY_AVAILABILITY_PANEL_STATE.UNAVAILABLE,
    input: {
      availability:
        RESERVATION_CATEGORY_AVAILABILITY_PANEL_TEST.ZERO_COUNT,
      categoryId: VALID_CATEGORY_ID,
      hasError: false,
      isLoading: false,
      isValidInterval: true,
    },
  },
  {
    caseName:
      "overcommitted when free equipment is negative",
    expectedState:
      RESERVATION_CATEGORY_AVAILABILITY_PANEL_STATE.OVERCOMMITTED,
    input: {
      availability:
        RESERVATION_CATEGORY_AVAILABILITY_PANEL_TEST.NEGATIVE_COUNT,
      categoryId: VALID_CATEGORY_ID,
      hasError: false,
      isLoading: false,
      isValidInterval: true,
    },
  },
] satisfies Array<{
  caseName: string;
  expectedState: ReservationCategoryAvailabilityPanelState;
  input: CategoryAvailabilityPanelStateInput;
}>;
