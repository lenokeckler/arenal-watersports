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
import { useReservationCategoryConflictWarning } from "../hooks/useReservationCategoryConflictWarning";
import type { ReservationCategoryConflict } from "../models/ReservationCategoryConflict.type";
import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";
import { createDeferred } from "./reservationAvailability.testHarness";
import { RESERVATION_CATEGORY_CONFLICT_WARNING_TEST } from "./ReservationCategoryConflictWarning.constants";

const RESERVATION_CONFLICT_INPUT = {
  categoryId: "category-1",
  date: "2030-01-01",
  durationMinutes: 120,
  time: "10:00",
} satisfies ReservationUnitAvailabilityInput;

const RESERVATION_CONFLICT_ROW = {
  code: "RES-2030-001",
  customer_name: "Ana Solís",
  ends_at: "2030-01-01T17:00:00.000Z",
  reservation_id: "reservation-1",
  starts_at: "2030-01-01T15:00:00.000Z",
} satisfies ReservationCategoryConflict;

vi.mock(
  "../actions/getReservationCategoryConflictsAction",
  () => ({
    getReservationCategoryConflictsAction: vi.fn(),
  })
);

describe("useReservationCategoryConflictWarning", () => {
  beforeEach(() => vi.clearAllMocks());

  it("loads conflict details for the selected category interval", async () => {
    vi.mocked(
      getReservationCategoryConflictsAction
    ).mockResolvedValue([RESERVATION_CONFLICT_ROW]);
    const { result } = renderHook(() =>
      useReservationCategoryConflictWarning(
        RESERVATION_CONFLICT_INPUT,
        RESERVATION_CATEGORY_CONFLICT_WARNING_TEST.INITIAL_REFRESH_KEY
      )
    );

    await waitFor(() =>
      expect(result.current.items).toHaveLength(1)
    );
    expect(
      getReservationCategoryConflictsAction
    ).toHaveBeenCalledWith(RESERVATION_CONFLICT_INPUT);
    expect(result.current.items[0]).toEqual({
      code: RESERVATION_CONFLICT_ROW.code,
      customerName: RESERVATION_CONFLICT_ROW.customer_name,
      id: RESERVATION_CONFLICT_ROW.reservation_id,
      intervalLabel:
        "martes, 1 de enero de 2030 · 09:00 a. m.–11:00 a. m.",
    });
  });

  it("reports lookup errors separately from an empty result", async () => {
    vi.mocked(
      getReservationCategoryConflictsAction
    ).mockRejectedValue(new Error("Lookup unavailable"));
    const { result } = renderHook(() =>
      useReservationCategoryConflictWarning(
        RESERVATION_CONFLICT_INPUT,
        RESERVATION_CATEGORY_CONFLICT_WARNING_TEST.INITIAL_REFRESH_KEY
      )
    );

    await waitFor(() =>
      expect(result.current.hasError).toBe(true)
    );
    expect(result.current.items).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });

  it("hides the warning when the lookup returns no conflicting reservations", async () => {
    vi.mocked(
      getReservationCategoryConflictsAction
    ).mockResolvedValue([]);
    const { result } = renderHook(() =>
      useReservationCategoryConflictWarning(
        RESERVATION_CONFLICT_INPUT,
        RESERVATION_CATEGORY_CONFLICT_WARNING_TEST.INITIAL_REFRESH_KEY
      )
    );

    await waitFor(() =>
      expect(result.current.isLoading).toBe(false)
    );

    expect(result.current).toEqual({
      hasError: false,
      isLoading: false,
      items: [],
      retry: expect.any(Function),
    });
  });

  it("hides a previous category warning while the selected category changes", async () => {
    vi.mocked(getReservationCategoryConflictsAction)
      .mockResolvedValueOnce([RESERVATION_CONFLICT_ROW])
      .mockResolvedValueOnce([]);
    const { rerender, result } = renderHook(
      ({ request }) =>
        useReservationCategoryConflictWarning(
          request,
          RESERVATION_CATEGORY_CONFLICT_WARNING_TEST.INITIAL_REFRESH_KEY
        ),
      {
        initialProps: {
          request: RESERVATION_CONFLICT_INPUT,
        },
      }
    );

    await waitFor(() =>
      expect(result.current.items).toHaveLength(1)
    );
    rerender({
      request: {
        ...RESERVATION_CONFLICT_INPUT,
        categoryId:
          RESERVATION_CATEGORY_CONFLICT_WARNING_TEST.NEXT_CATEGORY_ID,
      },
    });

    expect(result.current.items).toEqual([]);
    await waitFor(() =>
      expect(result.current.isLoading).toBe(false)
    );
    expect(result.current.items).toEqual([]);
  });

  it("hides a previous interval warning while the reservation interval changes", async () => {
    vi.mocked(getReservationCategoryConflictsAction)
      .mockResolvedValueOnce([RESERVATION_CONFLICT_ROW])
      .mockResolvedValueOnce([]);
    const { rerender, result } = renderHook(
      ({ request }) =>
        useReservationCategoryConflictWarning(
          request,
          RESERVATION_CATEGORY_CONFLICT_WARNING_TEST.INITIAL_REFRESH_KEY
        ),
      {
        initialProps: {
          request: RESERVATION_CONFLICT_INPUT,
        },
      }
    );

    await waitFor(() =>
      expect(result.current.items).toHaveLength(1)
    );
    rerender({
      request: {
        ...RESERVATION_CONFLICT_INPUT,
        date: RESERVATION_CATEGORY_CONFLICT_WARNING_TEST.NEXT_DATE,
      },
    });

    expect(result.current.items).toEqual([]);
    await waitFor(() =>
      expect(result.current.isLoading).toBe(false)
    );
    expect(result.current.items).toEqual([]);
  });

  it("keeps the warning loading when the selected category changes A to B to A", async () => {
    const categoryBRequest = {
      ...RESERVATION_CONFLICT_INPUT,
      categoryId:
        RESERVATION_CATEGORY_CONFLICT_WARNING_TEST.NEXT_CATEGORY_ID,
    };
    const categoryBLookup =
      createDeferred<ReservationCategoryConflict[]>();
    const latestCategoryALookup =
      createDeferred<ReservationCategoryConflict[]>();
    vi.mocked(getReservationCategoryConflictsAction)
      .mockResolvedValueOnce([RESERVATION_CONFLICT_ROW])
      .mockReturnValueOnce(categoryBLookup.promise)
      .mockReturnValueOnce(latestCategoryALookup.promise);
    const { rerender, result } = renderHook(
      ({ request }) =>
        useReservationCategoryConflictWarning(
          request,
          RESERVATION_CATEGORY_CONFLICT_WARNING_TEST.INITIAL_REFRESH_KEY
        ),
      {
        initialProps: {
          request: RESERVATION_CONFLICT_INPUT,
        },
      }
    );

    await waitFor(() =>
      expect(result.current.items).toHaveLength(1)
    );
    rerender({ request: categoryBRequest });
    await waitFor(() =>
      expect(
        getReservationCategoryConflictsAction
      ).toHaveBeenCalledTimes(2)
    );
    rerender({ request: RESERVATION_CONFLICT_INPUT });
    await waitFor(() =>
      expect(
        getReservationCategoryConflictsAction
      ).toHaveBeenCalledTimes(3)
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.items).toEqual([]);

    await act(async () => {
      latestCategoryALookup.resolve([]);
      await latestCategoryALookup.promise;
    });
    await waitFor(() =>
      expect(result.current.isLoading).toBe(false)
    );
    await act(async () => {
      categoryBLookup.resolve([RESERVATION_CONFLICT_ROW]);
      await categoryBLookup.promise;
    });

    expect(result.current.items).toEqual([]);
  });
  it("does not query or report a warning for an invalid interval", () => {
    const { result } = renderHook(() =>
      useReservationCategoryConflictWarning(
        {
          ...RESERVATION_CONFLICT_INPUT,
          date: "",
        },
        RESERVATION_CATEGORY_CONFLICT_WARNING_TEST.INITIAL_REFRESH_KEY
      )
    );

    expect(
      getReservationCategoryConflictsAction
    ).not.toHaveBeenCalled();
    expect(result.current).toEqual({
      hasError: false,
      isLoading: false,
      items: [],
      retry: expect.any(Function),
    });
  });
});
