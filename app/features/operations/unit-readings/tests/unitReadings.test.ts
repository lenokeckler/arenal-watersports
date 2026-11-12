import { createOperationsClient } from "@/app/components/dispatch-board/tests/getPendingDispatchReservations.test-utils";
import { describe, expect, it, vi } from "vitest";
import { OperationsAccessError } from "@/app/services/operations/getOperationsSupabaseClient";
import {
  UNIT_READINGS_DATABASE_ERROR,
  UNIT_READINGS_RESULT,
} from "../constants/UnitReadings.constants";
import { correctUnitReadings } from "../services/correctUnitReadings";
import {
  getMotorUnitReading,
  getMotorUnitReadings,
} from "../services/getMotorUnitReadings";
import { buildUnitCorrectionForm } from "../utils/buildUnitCorrectionForm";
import { getUsageText } from "../utils/getUsageText";
import { isOilOverdue } from "../utils/isOilOverdue";
import { isOutOfService } from "../utils/isOutOfService";
import {
  CORRECTION_INPUT,
  CORRECTION_RPC_ARGS,
  DRAFT_CASES,
  INVALID_CORRECTIONS,
  UNIT,
  UNIT_ID,
  UNIT_ROW,
  UNIT_WITHOUT_READING,
} from "./UnitReadings.constants";

const queueList = (rows: unknown) => {
  const { client } = createOperationsClient(true, true);
  const limit = vi
    .fn()
    .mockResolvedValue({ data: rows, error: null });
  const order = vi.fn().mockReturnValue({ limit });
  const neq = vi.fn().mockReturnValue({ order });
  const eq = vi.fn().mockReturnValue({ neq });
  const select = vi.fn().mockReturnValue({ eq });
  Object.assign(client, {
    from: vi.fn().mockReturnValue({ select }),
  });

  return { eq, neq };
};

const queueOne = (row: unknown) => {
  const { client } = createOperationsClient(true, true);
  const maybeSingle = vi
    .fn()
    .mockResolvedValue({ data: row, error: null });
  const neq = vi.fn().mockReturnValue({ maybeSingle });
  const secondEq = vi.fn().mockReturnValue({ neq });
  const firstEq = vi.fn().mockReturnValue({ eq: secondEq });
  const select = vi.fn().mockReturnValue({ eq: firstEq });
  Object.assign(client, {
    from: vi.fn().mockReturnValue({ select }),
  });

  return { firstEq, secondEq };
};

describe("getMotorUnitReadings", () => {
  it("reads only the units with a motor that are still in service", async () => {
    const { eq, neq } = queueList([UNIT_ROW]);

    await expect(getMotorUnitReadings()).resolves.toEqual([
      UNIT,
    ]);
    expect(eq).toHaveBeenCalledWith(
      "category.has_motor",
      true
    );
    expect(neq).toHaveBeenCalledWith(
      "status",
      "decommissioned"
    );
  });

  it("answers an empty list when there are no units", async () => {
    queueList(null);

    await expect(getMotorUnitReadings()).resolves.toEqual(
      []
    );
  });

  it("refuses a worker without the operations area", async () => {
    createOperationsClient(true, false);

    await expect(
      getMotorUnitReadings()
    ).rejects.toBeInstanceOf(OperationsAccessError);
  });
});

describe("getMotorUnitReading", () => {
  it("reads one unit by its id", async () => {
    const { firstEq, secondEq } = queueOne(UNIT_ROW);

    await expect(
      getMotorUnitReading(UNIT_ID)
    ).resolves.toEqual(UNIT);
    expect(firstEq).toHaveBeenCalledWith("id", UNIT_ID);
    expect(secondEq).toHaveBeenCalledWith(
      "category.has_motor",
      true
    );
  });

  it("answers nothing when the unit is not there", async () => {
    queueOne(null);

    await expect(
      getMotorUnitReading(UNIT_ID)
    ).resolves.toBeNull();
  });
});

describe("correctUnitReadings", () => {
  it("sends the correction with the new gauge, usage, impacts and status", async () => {
    const { rpc } = createOperationsClient(true, true);
    rpc.mockReset();
    rpc.mockResolvedValueOnce({ data: true, error: null });
    rpc.mockResolvedValueOnce({ data: null, error: null });

    await expect(
      correctUnitReadings(CORRECTION_INPUT)
    ).resolves.toEqual({
      status: UNIT_READINGS_RESULT.CORRECTED,
    });
    expect(rpc).toHaveBeenLastCalledWith(
      "correct_unit_readings",
      CORRECTION_RPC_ARGS
    );
  });

  it.each([
    [
      UNIT_READINGS_DATABASE_ERROR.NOTHING_TO_CORRECT,
      UNIT_READINGS_RESULT.UNCHANGED,
    ],
    [
      UNIT_READINGS_DATABASE_ERROR.UNIT_NOT_CORRECTABLE,
      UNIT_READINGS_RESULT.NOT_CORRECTABLE,
    ],
    [
      UNIT_READINGS_DATABASE_ERROR.INVALID_VALUE,
      UNIT_READINGS_RESULT.INVALID,
    ],
  ])("answers %s as %s", async (code, status) => {
    const { rpc } = createOperationsClient(true, true);
    rpc.mockReset();
    rpc.mockResolvedValueOnce({ data: true, error: null });
    rpc.mockResolvedValueOnce({
      data: null,
      error: { code, message: "refused" },
    });

    await expect(
      correctUnitReadings(CORRECTION_INPUT)
    ).resolves.toEqual({ status });
  });

  it("throws any other database error", async () => {
    const { rpc } = createOperationsClient(true, true);
    rpc.mockReset();
    rpc.mockResolvedValueOnce({ data: true, error: null });
    rpc.mockResolvedValueOnce({
      data: null,
      error: { code: "XX000", message: "boom" },
    });

    await expect(
      correctUnitReadings(CORRECTION_INPUT)
    ).rejects.toThrow();
  });

  it.each(INVALID_CORRECTIONS)(
    "refuses %j before reaching the database",
    async (input) => {
      const { rpc } = createOperationsClient(true, true);

      await expect(
        correctUnitReadings(input)
      ).rejects.toThrow(RangeError);
      expect(rpc).not.toHaveBeenCalled();
    }
  );
});

describe("buildUnitCorrectionForm", () => {
  const draft = {
    fuelLevel: "3",
    fuelMax: "8",
    impactCount: "2",
    status: "in_maintenance",
    usageTotal: "61,25",
  };

  it("builds the input from what was typed, accepting a comma", () => {
    expect(buildUnitCorrectionForm(draft, UNIT_ID)).toEqual(
      {
        errors: {
          fuelLevel: null,
          fuelMax: null,
          impactCount: null,
          usageTotal: null,
        },
        input: CORRECTION_INPUT,
      }
    );
  });

  it.each(DRAFT_CASES)(
    "refuses $text in $field",
    ({ field, text }) => {
      const result = buildUnitCorrectionForm(
        { ...draft, [field]: text },
        UNIT_ID
      );

      expect(result.input).toBeNull();
      expect(result.errors[field]).not.toBeNull();
    }
  );

  it("refuses a status that cannot be chosen", () => {
    expect(
      buildUnitCorrectionForm(
        { ...draft, status: "decommissioned" },
        UNIT_ID
      ).input
    ).toBeNull();
  });
});

describe("unit readings utils", () => {
  it("flags the oil as overdue only when the usage reached the threshold", () => {
    expect(isOilOverdue(UNIT)).toBe(true);
    expect(
      isOilOverdue({ ...UNIT, nextOilChangeAt: 80 })
    ).toBe(false);
    expect(isOilOverdue(UNIT_WITHOUT_READING)).toBe(false);
  });

  it("flags a unit out of service for damaged, repair or maintenance", () => {
    expect(isOutOfService(UNIT)).toBe(false);
    expect(isOutOfService(UNIT_WITHOUT_READING)).toBe(true);
    expect(
      isOutOfService({ ...UNIT, status: "in_repair" })
    ).toBe(true);
    expect(
      isOutOfService({ ...UNIT, status: "in_maintenance" })
    ).toBe(true);
  });

  it("writes the usage with the metric of the unit", () => {
    expect(getUsageText(UNIT)).toBe("60.5 h");
    expect(getUsageText(UNIT_WITHOUT_READING)).toBe(
      "12 km"
    );
    expect(
      getUsageText({ ...UNIT, usageMetric: null })
    ).toBe("Sin medidor");
  });
});
