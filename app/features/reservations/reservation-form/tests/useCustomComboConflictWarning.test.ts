import {
  act,
  renderHook,
  waitFor,
} from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { getReservationCategoryConflictsAction } from "../actions/getReservationCategoryConflictsAction";
import { useCustomComboConflictWarning } from "../hooks/useCustomComboConflictWarning";
import type { ReservationCategoryConflict } from "../models/ReservationCategoryConflict.type";
import { createDeferred } from "./reservationAvailability.testHarness";
import { RESERVATION_CATEGORY_CONFLICT_WARNING_TEST } from "./ReservationCategoryConflictWarning.constants";

const FIRST_SELECTION =
  RESERVATION_CATEGORY_CONFLICT_WARNING_TEST.FIRST_SELECTION;
const SECOND_SELECTION =
  RESERVATION_CATEGORY_CONFLICT_WARNING_TEST.NEXT_SELECTION;
const MULTIPLE_SELECTIONS = [
  FIRST_SELECTION,
  SECOND_SELECTION,
];
const INITIAL_DATE =
  RESERVATION_CATEGORY_CONFLICT_WARNING_TEST.REQUEST.date;
const INITIAL_TIME =
  RESERVATION_CATEGORY_CONFLICT_WARNING_TEST.TIME;
const DURATION_HOURS =
  RESERVATION_CATEGORY_CONFLICT_WARNING_TEST.DURATION_HOURS;
const CONFLICT_ROW = {
  ...RESERVATION_CATEGORY_CONFLICT_WARNING_TEST.RPC_ROW,
  ends_at: "2030-01-01T17:00:00.000Z",
  reservation_id: "reservation-custom-combo",
  starts_at: "2030-01-01T15:00:00.000Z",
} satisfies ReservationCategoryConflict;

vi.mock(
  "../actions/getReservationCategoryConflictsAction",
  () => ({
    getReservationCategoryConflictsAction: vi.fn(),
  })
);

describe("useCustomComboConflictWarning", () => {
  beforeEach(() => vi.clearAllMocks());

  it("checks each selected category and combines conflict details", async () => {
    vi.mocked(getReservationCategoryConflictsAction)
      .mockResolvedValueOnce([CONFLICT_ROW])
      .mockResolvedValueOnce([]);
    const { result } = renderHook(() =>
      useCustomComboConflictWarning(
        MULTIPLE_SELECTIONS,
        INITIAL_DATE,
        DURATION_HOURS,
        INITIAL_TIME
      )
    );

    await waitFor(() =>
      expect(result.current.items).toHaveLength(1)
    );
    expect(
      getReservationCategoryConflictsAction
    ).toHaveBeenCalledTimes(2);
    expect(result.current.items[0].id).toBe(
      CONFLICT_ROW.reservation_id
    );
  });

  it("shows no warning when selected categories have no conflicts", async () => {
    vi.mocked(
      getReservationCategoryConflictsAction
    ).mockResolvedValue([]);
    const { result } = renderHook(() =>
      useCustomComboConflictWarning(
        MULTIPLE_SELECTIONS,
        INITIAL_DATE,
        DURATION_HOURS,
        INITIAL_TIME
      )
    );

    await waitFor(() =>
      expect(result.current.isLoading).toBe(false)
    );
    expect(result.current.items).toEqual([]);
    expect(result.current.hasError).toBe(false);
  });

  it("hides stale responses after the selection and interval change", async () => {
    const oldResponse =
      createDeferred<ReservationCategoryConflict[]>();
    const currentResponse =
      createDeferred<ReservationCategoryConflict[]>();
    vi.mocked(getReservationCategoryConflictsAction)
      .mockReturnValueOnce(oldResponse.promise)
      .mockReturnValueOnce(currentResponse.promise);
    const { result, rerender } = renderHook(
      ({ selected, date }) =>
        useCustomComboConflictWarning(
          selected,
          date,
          DURATION_HOURS,
          INITIAL_TIME
        ),
      {
        initialProps: {
          selected: [FIRST_SELECTION],
          date: INITIAL_DATE,
        },
      }
    );

    rerender({
      selected: [SECOND_SELECTION],
      date: RESERVATION_CATEGORY_CONFLICT_WARNING_TEST.NEXT_DATE,
    });
    await act(async () => {
      oldResponse.resolve([CONFLICT_ROW]);
      await Promise.resolve();
    });
    expect(result.current.items).toEqual([]);
    await act(async () => {
      currentResponse.resolve([]);
      await Promise.resolve();
    });
    await waitFor(() =>
      expect(result.current.isLoading).toBe(false)
    );
    expect(result.current.items).toEqual([]);
    expect(
      getReservationCategoryConflictsAction
    ).toHaveBeenCalledTimes(2);
  });
});
