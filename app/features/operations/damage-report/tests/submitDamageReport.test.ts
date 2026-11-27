import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { DAMAGE_REPORT_COPY } from "../constants/DamageReportCopy.constants";
import { submitDamageReport } from "../actions/submitDamageReport";
import {
  REPORT_ID,
  REPORT_UNIT_ID,
  VALID_REPORT_INPUT,
} from "./DamageReport.constants";

const mocks = vi.hoisted(() => ({
  revalidatePath: vi.fn(),
  rpc: vi.fn(),
}));

vi.mock("next/cache", () => ({
  revalidatePath: mocks.revalidatePath,
}));

vi.mock(
  "@/app/services/operations/getOperationsSupabaseClient",
  () => ({
    OperationsAccessError: class extends Error {},
    getOperationsSupabaseClient: () =>
      Promise.resolve({ rpc: mocks.rpc }),
  })
);

describe("submitDamageReport", () => {
  beforeEach(() => {
    mocks.rpc
      .mockReset()
      .mockResolvedValue({ error: null });
    mocks.revalidatePath.mockReset();
  });

  it("creates a new report through the database function", async () => {
    await expect(
      submitDamageReport(VALID_REPORT_INPUT)
    ).resolves.toEqual({ ok: true });
    expect(mocks.rpc).toHaveBeenCalledWith(
      "create_damage_report",
      {
        p_cause: "collision",
        p_description: "Golpe en la proa",
        p_detail_later: false,
        p_impact_delta: 1,
        p_reservation_id: undefined,
        p_unit_id: REPORT_UNIT_ID,
        p_unit_status: "damaged",
      }
    );
    expect(mocks.revalidatePath).toHaveBeenCalled();
  });

  it("completes a pending report through its own function", async () => {
    await submitDamageReport({
      ...VALID_REPORT_INPUT,
      reportId: REPORT_ID,
    });

    expect(mocks.rpc).toHaveBeenCalledWith(
      "complete_damage_report",
      expect.objectContaining({ p_report_id: REPORT_ID })
    );
  });

  it("never reaches the database with a forged request", async () => {
    await expect(
      submitDamageReport({
        ...VALID_REPORT_INPUT,
        unitStatus: "available" as never,
      })
    ).resolves.toEqual({
      message: DAMAGE_REPORT_COPY.INVALID,
      ok: false,
    });
    expect(mocks.rpc).not.toHaveBeenCalled();
  });

  it("does not leak the database error", async () => {
    mocks.rpc.mockResolvedValue({
      error: {
        code: "XX000",
        message: "relation damage_reports",
      },
    });

    await expect(
      submitDamageReport(VALID_REPORT_INPUT)
    ).resolves.toEqual({
      message: DAMAGE_REPORT_COPY.ERROR,
      ok: false,
    });
    expect(mocks.revalidatePath).not.toHaveBeenCalled();
  });
});
