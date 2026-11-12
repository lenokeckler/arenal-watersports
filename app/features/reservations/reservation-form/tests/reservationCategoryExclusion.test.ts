import { waitFor } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { getReservationCategoryAvailabilityAction } from "../actions/getReservationCategoryAvailabilityAction";
import { getAuthorizedReservationFormClient } from "../services/getAuthorizedReservationFormClient";
import { getReservationCategoryAvailability } from "../services/getReservationCategoryAvailability";
import { getReservationCategoryConflicts } from "../services/getReservationCategoryConflicts";
import {
  RESERVATION_CATEGORY_AVAILABILITY_EXCLUDING_INPUT as excludingInput,
  RESERVATION_CATEGORY_AVAILABILITY_INPUT as plainInput,
  RESERVATION_CATEGORY_AVAILABILITY_ROW,
  RESERVATION_CATEGORY_EXCLUDED_RESERVATION_ID as excludedId,
} from "./getReservationInterval.constants";
import { renderReservationCategoryAvailabilityHook } from "./ReservationCategoryAvailability.testHarness";

vi.mock(
  "../services/getAuthorizedReservationFormClient",
  () => ({
    getAuthorizedReservationFormClient: vi.fn(),
  })
);

vi.mock(
  "../actions/getReservationCategoryAvailabilityAction",
  () => ({
    getReservationCategoryAvailabilityAction: vi.fn(),
  })
);

const mockRpc = () => {
  const rpc = vi.fn().mockResolvedValue({
    data: [RESERVATION_CATEGORY_AVAILABILITY_ROW],
    error: null,
  });
  vi.mocked(
    getAuthorizedReservationFormClient
  ).mockResolvedValue({ rpc } as never);
  return rpc;
};

describe("reservation category exclusion", () => {
  beforeEach(() => vi.clearAllMocks());

  it.each([
    ["availability", getReservationCategoryAvailability],
    ["conflicts", getReservationCategoryConflicts],
  ])(
    "excludes only the edited reservation from the %s RPC",
    async (_name, loadCategory) => {
      const rpc = mockRpc();

      await loadCategory(excludingInput);
      expect(rpc.mock.lastCall?.[1]).toMatchObject({
        p_exclude_reservation: excludedId,
      });

      await loadCategory(plainInput);
      expect(
        JSON.stringify(rpc.mock.lastCall?.[1])
      ).not.toContain(excludedId);
    }
  );

  it("forwards the excluded reservation from the availability hook", async () => {
    vi.mocked(
      getReservationCategoryAvailabilityAction
    ).mockResolvedValue(
      RESERVATION_CATEGORY_AVAILABILITY_ROW
    );

    renderReservationCategoryAvailabilityHook(
      excludingInput
    );

    await waitFor(() =>
      expect(
        getReservationCategoryAvailabilityAction
      ).toHaveBeenCalledWith(excludingInput)
    );
  });
});
