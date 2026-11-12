import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { getReservationExtrasAction } from "../actions/getReservationExtrasAction";
import { getReservationExtras } from "../services/getReservationExtras";
import { RESERVATION_EXTRA_TEST } from "./getReservationExtras.constants";

vi.mock("../services/getReservationExtras", () => ({
  getReservationExtras: vi.fn(),
}));

describe("getReservationExtrasAction", () => {
  beforeEach(() => vi.clearAllMocks());

  it.each(RESERVATION_EXTRA_TEST.INVALID_INPUTS)(
    "rejects invalid unit input before querying",
    async (input) => {
      await expect(
        getReservationExtrasAction(input)
      ).resolves.toEqual([]);
      expect(getReservationExtras).not.toHaveBeenCalled();
    }
  );

  it.each([
    RESERVATION_EXTRA_TEST.UNIT_ID,
    RESERVATION_EXTRA_TEST.BROAD_CANONICAL_UUID,
  ])(
    "loads extras for canonical UUID %s",
    async (unitId) => {
      vi.mocked(getReservationExtras).mockResolvedValue([]);

      await expect(
        getReservationExtrasAction({ unitId })
      ).resolves.toEqual([]);
      expect(getReservationExtras).toHaveBeenCalledWith({
        unitId,
      });
    }
  );
});
