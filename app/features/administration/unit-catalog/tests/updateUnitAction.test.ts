import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { NotAuthorizedError } from "@/app/services/authorization/NotAuthorizedError";
import { UNIT_STATUS } from "../constants/UnitStatus.constants";
import { updateUnitAction } from "../services/updateUnitAction";
import {
  buildUpdateUnitInput,
  DEFAULT_UPDATE_UNIT_INPUT,
  FAKE_UNIT_ADMIN_WORKER_ID,
  FAKE_UNIT_ID,
  UNIT_ROW_COLUMNS,
} from "./Unit.constants";

const ID_COLUMN = "id";
const STATUS_COLUMN = "status";

const mockAssertIsAdminWorker = vi.fn();
const mockMaybeSingle = vi.fn();
const mockSelect = vi.fn(() => ({
  maybeSingle: mockMaybeSingle,
}));
const mockNeq = vi.fn(
  (_column: string, _value: string) => ({
    select: mockSelect,
  })
);
const mockEq = vi.fn((_column: string, _value: string) => ({
  neq: mockNeq,
}));
const mockUpdate = vi.fn((_row: object) => ({
  eq: mockEq,
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
    from: vi.fn(() => ({ update: mockUpdate })),
  }),
}));

describe("updateUnitAction", () => {
  beforeEach(() => {
    mockAssertIsAdminWorker.mockReset();
    mockUpdate.mockClear();
    mockEq.mockClear();
    mockNeq.mockClear();
    mockMaybeSingle.mockReset();
    mockAssertIsAdminWorker.mockResolvedValue(
      FAKE_UNIT_ADMIN_WORKER_ID
    );
    mockMaybeSingle.mockResolvedValue({
      data: { id: FAKE_UNIT_ID },
      error: null,
    });
  });

  it("rejects a caller who is not an admin before any update", async () => {
    mockAssertIsAdminWorker.mockRejectedValue(
      new NotAuthorizedError()
    );

    await expect(
      updateUnitAction(DEFAULT_UPDATE_UNIT_INPUT)
    ).rejects.toThrow(NotAuthorizedError);
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it("sends only the editable columns, filtered by id and never on a decommissioned unit", async () => {
    await updateUnitAction(DEFAULT_UPDATE_UNIT_INPUT);

    const [payload] = mockUpdate.mock.calls[0];
    expect(Object.keys(payload).sort()).toEqual(
      UNIT_ROW_COLUMNS
    );
    expect(mockEq).toHaveBeenCalledWith(
      ID_COLUMN,
      FAKE_UNIT_ID
    );
    expect(mockNeq).toHaveBeenCalledWith(
      STATUS_COLUMN,
      UNIT_STATUS.DECOMMISSIONED
    );
  });

  it("sends explicit nulls for the missing readings", async () => {
    await updateUnitAction(
      buildUpdateUnitInput({
        fuelLevel: null,
        nextOilChangeAt: null,
      })
    );

    expect(mockUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        fuel_level: null,
        next_oil_change_at: null,
      })
    );
  });
});
