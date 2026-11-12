import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { POSTGRES_ERROR_CODE } from "@/app/constants";
import { NotAuthorizedError } from "@/app/services/authorization/NotAuthorizedError";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import { EXTRA_MUTATION_STATUS } from "../constants/ExtraMutationStatus.constants";
import { EXTRA_STATUS } from "../constants/ExtraStatus.constants";
import { reactivateExtraAction } from "../services/reactivateExtraAction";
import { FAKE_EXTRA_ID } from "./Extra.constants";
import {
  EXTRA_ID_COLUMN,
  EXTRA_STATUS_COLUMN,
  EXTRAS_TABLE,
  FAKE_EXTRA_ADMIN_WORKER_ID,
  SERVER_ERROR_CODE,
} from "./ExtraActions.constants";

const mockAssertIsAdminWorker = vi.fn();
const mockMaybeSingle = vi.fn();
const mockSelect = vi.fn((_columns: string) => ({
  maybeSingle: mockMaybeSingle,
}));
const mockStatusEq = vi.fn(
  (_column: string, _value: string) => ({
    select: mockSelect,
  })
);
const mockIdEq = vi.fn(
  (_column: string, _value: string) => ({
    eq: mockStatusEq,
  })
);
const mockUpdate = vi.fn((_row: object) => ({
  eq: mockIdEq,
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

describe("reactivateExtraAction", () => {
  beforeEach(() => {
    mockAssertIsAdminWorker.mockReset();
    mockMaybeSingle.mockReset();
    mockStatusEq.mockClear();
    mockUpdate.mockClear();
    mockIdEq.mockClear();
    mockFrom.mockClear();
    mockAssertIsAdminWorker.mockResolvedValue(
      FAKE_EXTRA_ADMIN_WORKER_ID
    );
    mockMaybeSingle.mockResolvedValue({
      data: { id: FAKE_EXTRA_ID },
      error: null,
    });
  });

  it("rejects a caller who is not an admin before any update", async () => {
    mockAssertIsAdminWorker.mockRejectedValue(
      new NotAuthorizedError()
    );

    await expect(
      reactivateExtraAction(FAKE_EXTRA_ID)
    ).rejects.toThrow(NotAuthorizedError);
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it("activates only the inactive extra with the given id", async () => {
    const result =
      await reactivateExtraAction(FAKE_EXTRA_ID);

    expect(mockFrom).toHaveBeenCalledWith(EXTRAS_TABLE);
    expect(mockUpdate).toHaveBeenCalledWith({
      status: EXTRA_STATUS.ACTIVE,
      updated_by: FAKE_EXTRA_ADMIN_WORKER_ID,
    });
    expect(mockIdEq).toHaveBeenCalledWith(
      EXTRA_ID_COLUMN,
      FAKE_EXTRA_ID
    );
    expect(mockStatusEq).toHaveBeenCalledWith(
      EXTRA_STATUS_COLUMN,
      EXTRA_STATUS.INACTIVE
    );
    expect(result).toEqual({
      status: EXTRA_MUTATION_STATUS.SUCCESS,
    });
  });

  it.each([
    { data: null, error: null },
    {
      data: null,
      error: {
        code: POSTGRES_ERROR_CODE.INVALID_TEXT_REPRESENTATION,
        message: "bad uuid",
      },
    },
  ])(
    "returns the not found message when no row is reactivated",
    async (outcome) => {
      mockMaybeSingle.mockResolvedValue(outcome);

      const result =
        await reactivateExtraAction(FAKE_EXTRA_ID);

      expect(result).toEqual({
        status: EXTRA_MUTATION_STATUS.ERROR,
        message: EXTRA_CATALOG_COPY.NOT_FOUND_ERROR,
      });
    }
  );

  it("throws instead of returning success when the update fails", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: { code: SERVER_ERROR_CODE, message: "boom" },
    });

    await expect(
      reactivateExtraAction(FAKE_EXTRA_ID)
    ).rejects.toThrow(SupabaseQueryError);
  });
});
