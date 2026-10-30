import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { UNIT_CATALOG_COPY } from "../constants/UnitCatalogCopy.constants";
import { UNIT_MUTATION_STATUS } from "../constants/UnitMutationStatus.constants";
import {
  UNIT_EFFECTIVE_STATUS,
  UNIT_STATUS,
} from "../constants/UnitStatus.constants";
import { decommissionUnitAction } from "../services/decommissionUnitAction";
import {
  DEFAULT_DECOMMISSION_UNIT_INPUT,
  FAKE_UNIT_ADMIN_WORKER_ID,
  FAKE_UNIT_ID,
} from "./Unit.constants";

const STATE_VIEW = "unit_current_state";
const UNITS_TABLE = "equipment_units";
const DECOMMISSION_COLUMNS = [
  "decommission_reason",
  "decommissioned_at",
  "status",
  "updated_by",
];

const mockAssertIsAdminWorker = vi.fn();
const mockStateMaybeSingle = vi.fn();
const mockUpdateMaybeSingle = vi.fn();
const mockUpdate = vi.fn((_row: object) => ({
  eq: () => ({
    neq: () => ({
      select: () => ({
        maybeSingle: mockUpdateMaybeSingle,
      }),
    }),
  }),
}));
const mockFrom = vi.fn((table: string) =>
  table === STATE_VIEW
    ? {
        select: () => ({
          eq: () => ({ maybeSingle: mockStateMaybeSingle }),
        }),
      }
    : { update: mockUpdate }
);

vi.mock(
  "@/app/services/authorization/assertIsAdminWorker",
  () => ({
    assertIsAdminWorker: (...args: unknown[]): unknown =>
      mockAssertIsAdminWorker(...args),
  })
);

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn().mockResolvedValue({
    from: (table: string) => mockFrom(table),
  }),
}));

const mockState = (effectiveStatus: string): void => {
  mockStateMaybeSingle.mockResolvedValue({
    data: { effective_status: effectiveStatus },
    error: null,
  });
};

describe("decommissionUnitAction outcomes", () => {
  beforeEach(() => {
    mockAssertIsAdminWorker.mockReset();
    mockFrom.mockClear();
    mockUpdate.mockClear();
    mockAssertIsAdminWorker.mockResolvedValue(
      FAKE_UNIT_ADMIN_WORKER_ID
    );
    mockState(UNIT_EFFECTIVE_STATUS.AVAILABLE);
    mockUpdateMaybeSingle.mockResolvedValue({
      data: { id: FAKE_UNIT_ID },
      error: null,
    });
  });

  it("sets status, date and reason together on the units table", async () => {
    expect(
      await decommissionUnitAction(
        DEFAULT_DECOMMISSION_UNIT_INPUT
      )
    ).toEqual({ status: UNIT_MUTATION_STATUS.SUCCESS });

    expect(mockFrom).toHaveBeenCalledWith(UNITS_TABLE);
    const [payload] = mockUpdate.mock.calls[0];
    expect(Object.keys(payload).sort()).toEqual(
      DECOMMISSION_COLUMNS
    );
    expect(payload).toMatchObject({
      status: UNIT_STATUS.DECOMMISSIONED,
      decommission_reason:
        DEFAULT_DECOMMISSION_UNIT_INPUT.reason.trim(),
      updated_by: FAKE_UNIT_ADMIN_WORKER_ID,
    });
  });

  it("returns the not-editable error when the unit was already decommissioned", async () => {
    mockUpdateMaybeSingle.mockResolvedValue({
      data: null,
      error: null,
    });

    expect(
      await decommissionUnitAction(
        DEFAULT_DECOMMISSION_UNIT_INPUT
      )
    ).toMatchObject({
      status: UNIT_MUTATION_STATUS.ERROR,
      message: UNIT_CATALOG_COPY.UNIT_NOT_EDITABLE_ERROR,
    });
  });

  it("throws when the database rejects the update", async () => {
    mockUpdateMaybeSingle.mockResolvedValue({
      data: null,
      error: { code: "500", message: "boom" },
    });

    await expect(
      decommissionUnitAction(
        DEFAULT_DECOMMISSION_UNIT_INPUT
      )
    ).rejects.toThrow(SupabaseQueryError);
  });
});
