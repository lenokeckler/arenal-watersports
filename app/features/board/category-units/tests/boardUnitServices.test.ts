import { createOperationsClient } from "@/app/components/dispatch-board/tests/getPendingDispatchReservations.test-utils";
import { describe, expect, it } from "vitest";
import {
  CATEGORY_UNIT_DATABASE_ERROR,
  CATEGORY_UNIT_UPDATE_STATUS,
} from "../constants/CategoryUnits.constants";
import { correctBoardUnit } from "../services/correctBoardUnit";
import { updateOpenDispatch } from "../services/updateOpenDispatch";

type Rpc = ReturnType<typeof createOperationsClient>["rpc"];

const UNIT_ID = "bbbbbbbb-0000-4000-8000-000000000001";
const DISPATCH_ID = "cccccccc-0000-4000-8000-000000000001";
const DEPARTURE_AT = "2026-11-02T16:00:00.000Z";
const RETURNS_AT = "2026-11-02T21:00:00.000Z";
const RADIO_CHANNEL = 8;
const NOT_A_UUID = "not-a-uuid";

const DISPATCH_INPUT = {
  departureAt: DEPARTURE_AT,
  dispatchId: DISPATCH_ID,
  radioChannel: RADIO_CHANNEL,
  returnsAt: RETURNS_AT,
};

const CORRECTION_INPUT = {
  fuelLevel: 3,
  fuelMax: 4,
  impactCount: 2,
  status: "available",
  unitId: UNIT_ID,
  usageTotal: 13.5,
} as const;

const queueAnswer = (
  rpc: Rpc,
  error: { code: string; message: string } | null
) => {
  rpc.mockReset();
  rpc.mockResolvedValueOnce({ data: true, error: null });
  rpc.mockResolvedValueOnce({ data: null, error });
};

describe("updateOpenDispatch", () => {
  it("sends the corrected times and the radio channel", async () => {
    const { rpc } = createOperationsClient(true, true);
    queueAnswer(rpc, null);

    await expect(
      updateOpenDispatch(DISPATCH_INPUT)
    ).resolves.toEqual({
      status: CATEGORY_UNIT_UPDATE_STATUS.UPDATED,
    });
    expect(rpc).toHaveBeenLastCalledWith(
      "update_open_dispatch",
      {
        p_dispatch_id: DISPATCH_ID,
        p_dispatched_at: DEPARTURE_AT,
        p_radio_channel: RADIO_CHANNEL,
        p_returns_at: RETURNS_AT,
      }
    );
  });

  it.each([
    [
      CATEGORY_UNIT_DATABASE_ERROR.ALREADY_CLOSED,
      CATEGORY_UNIT_UPDATE_STATUS.ALREADY_CLOSED,
    ],
    [
      CATEGORY_UNIT_DATABASE_ERROR.INVALID_VALUE,
      CATEGORY_UNIT_UPDATE_STATUS.INVALID,
    ],
  ])("answers %s as %s", async (code, status) => {
    const { rpc } = createOperationsClient(true, true);
    queueAnswer(rpc, { code, message: "refused" });

    await expect(
      updateOpenDispatch(DISPATCH_INPUT)
    ).resolves.toEqual({ status });
  });

  it("raises any other database error", async () => {
    const { rpc } = createOperationsClient(true, true);
    queueAnswer(rpc, { code: "XX000", message: "boom" });

    await expect(
      updateOpenDispatch(DISPATCH_INPUT)
    ).rejects.toThrow();
  });

  it.each([
    [
      "a dispatch that is not a uuid",
      { dispatchId: NOT_A_UUID },
    ],
    [
      "a departure that is not a date",
      { departureAt: "never" },
    ],
    [
      "a return before the departure",
      { returnsAt: DEPARTURE_AT },
    ],
    [
      "a radio channel above the range",
      { radioChannel: 100 },
    ],
    ["a radio channel of zero", { radioChannel: 0 }],
  ])(
    "refuses %s before touching the database",
    async (_name, override) => {
      const { rpc } = createOperationsClient(true, true);
      rpc.mockClear();

      await expect(
        updateOpenDispatch({
          ...DISPATCH_INPUT,
          ...override,
        })
      ).rejects.toBeInstanceOf(RangeError);
      expect(rpc).not.toHaveBeenCalled();
    }
  );
});

describe("correctBoardUnit", () => {
  it("sends the correction with the names the database expects", async () => {
    const { rpc } = createOperationsClient(true, true);
    queueAnswer(rpc, null);

    await expect(
      correctBoardUnit(CORRECTION_INPUT)
    ).resolves.toEqual({
      status: CATEGORY_UNIT_UPDATE_STATUS.UPDATED,
    });
    expect(rpc).toHaveBeenLastCalledWith(
      "correct_unit_readings",
      {
        p_fuel_level: CORRECTION_INPUT.fuelLevel,
        p_fuel_max: CORRECTION_INPUT.fuelMax,
        p_impact_count: CORRECTION_INPUT.impactCount,
        p_status: CORRECTION_INPUT.status,
        p_unit_id: UNIT_ID,
        p_usage_total: CORRECTION_INPUT.usageTotal,
      }
    );
  });

  it.each([
    [
      CATEGORY_UNIT_DATABASE_ERROR.NOTHING_TO_CORRECT,
      CATEGORY_UNIT_UPDATE_STATUS.UNCHANGED,
    ],
    [
      CATEGORY_UNIT_DATABASE_ERROR.ALREADY_CLOSED,
      CATEGORY_UNIT_UPDATE_STATUS.NOT_CORRECTABLE,
    ],
    [
      CATEGORY_UNIT_DATABASE_ERROR.INVALID_VALUE,
      CATEGORY_UNIT_UPDATE_STATUS.INVALID,
    ],
  ])("answers %s as %s", async (code, status) => {
    const { rpc } = createOperationsClient(true, true);
    queueAnswer(rpc, { code, message: "refused" });

    await expect(
      correctBoardUnit(CORRECTION_INPUT)
    ).resolves.toEqual({ status });
  });

  it("raises any other database error", async () => {
    const { rpc } = createOperationsClient(true, true);
    queueAnswer(rpc, { code: "XX000", message: "boom" });

    await expect(
      correctBoardUnit(CORRECTION_INPUT)
    ).rejects.toThrow();
  });

  it.each([
    ["a unit that is not a uuid", { unitId: NOT_A_UUID }],
    ["a fuel level above the gauge", { fuelLevel: 5 }],
    ["a negative fuel level", { fuelLevel: -1 }],
    [
      "an impact count with a fraction",
      { impactCount: 1.5 },
    ],
    ["a negative impact count", { impactCount: -1 }],
    ["negative hours", { usageTotal: -1 }],
    ["a gauge of zero lines", { fuelLevel: 0, fuelMax: 0 }],
  ])(
    "refuses %s before touching the database",
    async (_name, override) => {
      const { rpc } = createOperationsClient(true, true);
      rpc.mockClear();

      await expect(
        correctBoardUnit({
          ...CORRECTION_INPUT,
          ...override,
        })
      ).rejects.toBeInstanceOf(RangeError);
      expect(rpc).not.toHaveBeenCalled();
    }
  );
});
