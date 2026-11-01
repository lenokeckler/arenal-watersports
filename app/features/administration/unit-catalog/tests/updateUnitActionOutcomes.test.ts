import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { POSTGRES_ERROR_CODE } from "@/app/constants";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { UNIT_CATALOG_COPY } from "../constants/UnitCatalogCopy.constants";
import { UNIT_MUTATION_STATUS } from "../constants/UnitMutationStatus.constants";
import { updateUnitAction } from "../services/updateUnitAction";
import {
  DEFAULT_UPDATE_UNIT_INPUT,
  FAKE_UNIT_ADMIN_WORKER_ID,
  FAKE_UNIT_ID,
} from "./Unit.constants";

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

describe("updateUnitAction outcomes", () => {
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

  it("returns success when the update matched a row", async () => {
    expect(
      await updateUnitAction(DEFAULT_UPDATE_UNIT_INPUT)
    ).toEqual({ status: UNIT_MUTATION_STATUS.SUCCESS });
  });

  it("returns the not-editable error when no row matched", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: null,
    });

    expect(
      await updateUnitAction(DEFAULT_UPDATE_UNIT_INPUT)
    ).toEqual({
      status: UNIT_MUTATION_STATUS.ERROR,
      message: UNIT_CATALOG_COPY.UNIT_NOT_EDITABLE_ERROR,
    });
  });

  it("returns the duplicate code error on a unique violation", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: {
        code: POSTGRES_ERROR_CODE.UNIQUE_VIOLATION,
        message: "boom",
      },
    });

    expect(
      await updateUnitAction(DEFAULT_UPDATE_UNIT_INPUT)
    ).toEqual({
      status: UNIT_MUTATION_STATUS.ERROR,
      codeError: UNIT_CATALOG_COPY.CODE_DUPLICATE_ERROR,
    });
  });

  it("throws on any other database error", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: {
        code: POSTGRES_ERROR_CODE.CHECK_VIOLATION,
        message: "boom",
      },
    });

    await expect(
      updateUnitAction(DEFAULT_UPDATE_UNIT_INPUT)
    ).rejects.toThrow(SupabaseQueryError);
  });
});
