import {
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
import { RESERVATION_CATEGORY_CONFLICT_WARNING_TEST as fixture } from "./ReservationCategoryConflictWarning.constants";

vi.mock(
  "../actions/getReservationCategoryConflictsAction",
  () => ({
    getReservationCategoryConflictsAction: vi.fn(),
  })
);

beforeEach(() => vi.clearAllMocks());

describe("custom combo conflict advisory", () => {
  it("does not block reservation submission when a schedule conflict is shown", async () => {
    vi.mocked(
      getReservationCategoryConflictsAction
    ).mockResolvedValue([fixture.RPC_ROW]);
    const { result } = renderHook(() =>
      useCustomComboConflictWarning(
        [fixture.FIRST_SELECTION],
        fixture.REQUEST.date,
        fixture.DURATION_HOURS,
        fixture.TIME
      )
    );

    await waitFor(() =>
      expect(result.current.items).toHaveLength(1)
    );
    expect(result.current.hasError).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });
});
