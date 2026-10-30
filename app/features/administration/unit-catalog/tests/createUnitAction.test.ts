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
import { UNIT_CATALOG_COPY } from "../constants/UnitCatalogCopy.constants";
import { UNIT_MUTATION_STATUS } from "../constants/UnitMutationStatus.constants";
import { createUnitAction } from "../services/createUnitAction";
import {
  buildCreateUnitInput,
  DEFAULT_CREATE_UNIT_INPUT,
  FAKE_UNIT_ADMIN_WORKER_ID,
  FAKE_UNIT_ID,
  UNIT_INSERT_COLUMNS,
} from "./Unit.constants";

const mockAssertIsAdminWorker = vi.fn();
const mockSingle = vi.fn();
const mockSelect = vi.fn(() => ({ single: mockSingle }));
const mockInsert = vi.fn((_row: object) => ({
  select: mockSelect,
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
    from: vi.fn(() => ({ insert: mockInsert })),
  }),
}));

describe("createUnitAction", () => {
  beforeEach(() => {
    mockAssertIsAdminWorker.mockReset();
    mockInsert.mockClear();
    mockSelect.mockClear();
    mockSingle.mockReset();
    mockAssertIsAdminWorker.mockResolvedValue(
      FAKE_UNIT_ADMIN_WORKER_ID
    );
    mockSingle.mockResolvedValue({
      data: { id: FAKE_UNIT_ID },
      error: null,
    });
  });

  it("rejects a caller who is not an admin before any insert", async () => {
    mockAssertIsAdminWorker.mockRejectedValue(
      new NotAuthorizedError()
    );

    await expect(
      createUnitAction(DEFAULT_CREATE_UNIT_INPUT)
    ).rejects.toThrow(NotAuthorizedError);
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it("inserts only the allowed columns", async () => {
    await createUnitAction(DEFAULT_CREATE_UNIT_INPUT);

    const [payload] = mockInsert.mock.calls[0];
    expect(Object.keys(payload).sort()).toEqual(
      UNIT_INSERT_COLUMNS
    );
  });

  it("inserts explicit nulls for the missing readings", async () => {
    await createUnitAction(
      buildCreateUnitInput({
        fuelLevel: null,
        nextOilChangeAt: null,
      })
    );

    expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({
        fuel_level: null,
        next_oil_change_at: null,
      })
    );
  });

  it("returns success with the new unit id", async () => {
    expect(
      await createUnitAction(DEFAULT_CREATE_UNIT_INPUT)
    ).toEqual({
      status: UNIT_MUTATION_STATUS.SUCCESS,
      unitId: FAKE_UNIT_ID,
    });
  });

  it.each([
    {
      code: POSTGRES_ERROR_CODE.UNIQUE_VIOLATION,
      expected: {
        codeError: UNIT_CATALOG_COPY.CODE_DUPLICATE_ERROR,
      },
    },
    {
      code: POSTGRES_ERROR_CODE.RAISE_EXCEPTION,
      expected: {
        message:
          UNIT_CATALOG_COPY.CATEGORY_NOT_BY_UNIT_ERROR,
      },
    },
  ])(
    "returns a friendly result for the $code database error",
    async ({ code, expected }) => {
      mockSingle.mockResolvedValue({
        data: null,
        error: { code, message: "boom" },
      });

      expect(
        await createUnitAction(DEFAULT_CREATE_UNIT_INPUT)
      ).toEqual({
        status: UNIT_MUTATION_STATUS.ERROR,
        ...expected,
      });
    }
  );

  it("throws on any other database error", async () => {
    mockSingle.mockResolvedValue({
      data: null,
      error: {
        code: POSTGRES_ERROR_CODE.CHECK_VIOLATION,
        message: "boom",
      },
    });

    await expect(
      createUnitAction(DEFAULT_CREATE_UNIT_INPUT)
    ).rejects.toThrow(SupabaseQueryError);
  });
});
