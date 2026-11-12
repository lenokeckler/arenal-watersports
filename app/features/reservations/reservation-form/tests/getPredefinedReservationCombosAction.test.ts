import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import type { ReservationPredefinedCombo } from "../models/ReservationPredefinedCombo.interface";
import { getPredefinedReservationCombos } from "../services/getPredefinedReservationCombos";
import { getPredefinedReservationCombosAction } from "../actions/getPredefinedReservationCombosAction";

vi.mock(
  "../services/getPredefinedReservationCombos",
  () => ({
    getPredefinedReservationCombos: vi.fn(),
  })
);

const ACTION_RESULT: ReservationPredefinedCombo[] = [];

describe("getPredefinedReservationCombosAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns the authorized service catalog", async () => {
    vi.mocked(
      getPredefinedReservationCombos
    ).mockResolvedValue(ACTION_RESULT);

    await expect(
      getPredefinedReservationCombosAction()
    ).resolves.toBe(ACTION_RESULT);
    expect(
      getPredefinedReservationCombos
    ).toHaveBeenCalledOnce();
  });

  it("propagates service failures", async () => {
    vi.mocked(
      getPredefinedReservationCombos
    ).mockRejectedValue(
      new Error("Combo catalog unavailable")
    );

    await expect(
      getPredefinedReservationCombosAction()
    ).rejects.toThrow("Combo catalog unavailable");
  });
});
