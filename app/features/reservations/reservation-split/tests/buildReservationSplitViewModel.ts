import { vi } from "vitest";
import type { ReservationSplit } from "../models/ReservationSplit.interface";
import type { ReservationSplitDraftsState } from "../models/ReservationSplitDraftsState.interface";
import type { ReservationSplitViewModel } from "../models/ReservationSplitViewModel.interface";
import { buildReservationSplitInitialState } from "../utils/buildReservationSplitInitialState";
import { resolveReservationSplitRemainder } from "../utils/resolveReservationSplitRemainder";
import { SPLIT_DRAFT_KEY } from "./ReservationSplit.constants";

export const buildReservationSplitViewModel = (
  split: ReservationSplit,
  overrides: Partial<ReservationSplitViewModel> = {}
): ReservationSplitViewModel => {
  const state: ReservationSplitDraftsState =
    buildReservationSplitInitialState(
      split,
      SPLIT_DRAFT_KEY
    );

  return {
    addDeparture: vi.fn(),
    announcement: "",
    assignUnit: vi.fn(),
    canAddDeparture: true,
    createdDepartures: [],
    errors: { departures: [] },
    formError: "",
    handleSubmit: vi.fn(),
    isPending: false,
    isStale: false,
    isSubmitDisabled: false,
    remainder: resolveReservationSplitRemainder(
      split,
      state
    ),
    removeDeparture: vi.fn(),
    setTime: vi.fn(),
    state,
    stepPeopleCount: vi.fn(),
    stepQuantity: vi.fn(),
    ...overrides,
  };
};
