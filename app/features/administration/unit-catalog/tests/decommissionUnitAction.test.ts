import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { NotAuthorizedError } from "@/app/services/authorization/NotAuthorizedError";
import { UNIT_FORM_ERROR_COPY } from "../constants/UnitFormErrorCopy.constants";
import { UNIT_MUTATION_STATUS } from "../constants/UnitMutationStatus.constants";
import { decommissionUnitAction } from "../services/decommissionUnitAction";
import {
  DEFAULT_DECOMMISSION_UNIT_INPUT,
  FAKE_UNIT_ADMIN_WORKER_ID,
  FAKE_UNIT_ID,
} from "./Unit.constants";

const mockAssertIsAdminWorker = vi.fn();
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
const mockFrom = vi.fn((_table: string) => ({
  update: mockUpdate,
}));

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

describe("decommissionUnitAction", () => {
  beforeEach(() => {
    mockAssertIsAdminWorker.mockReset();
    mockFrom.mockClear();
    mockUpdate.mockClear();
    mockAssertIsAdminWorker.mockResolvedValue(
      FAKE_UNIT_ADMIN_WORKER_ID
    );
    mockUpdateMaybeSingle.mockResolvedValue({
      data: { id: FAKE_UNIT_ID },
      error: null,
    });
  });

  it("rejects a caller who is not an admin before any read or write", async () => {
    mockAssertIsAdminWorker.mockRejectedValue(
      new NotAuthorizedError()
    );

    await expect(
      decommissionUnitAction(
        DEFAULT_DECOMMISSION_UNIT_INPUT
      )
    ).rejects.toThrow(NotAuthorizedError);
    expect(mockFrom).not.toHaveBeenCalled();
  });

  it("refuses an empty reason before touching the database", async () => {
    expect(
      await decommissionUnitAction({
        ...DEFAULT_DECOMMISSION_UNIT_INPUT,
        reason: "  ",
      })
    ).toEqual({
      status: UNIT_MUTATION_STATUS.ERROR,
      message: UNIT_FORM_ERROR_COPY.REASON_REQUIRED,
    });
    expect(mockFrom).not.toHaveBeenCalled();
  });
});
