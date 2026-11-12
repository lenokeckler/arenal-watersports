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
import { createExtraAction } from "../services/createExtraAction";
import { FAKE_EXTRA_NAME } from "./Extra.constants";
import {
  BLANK_EXTRA_NAME,
  NON_STRING_EXTRA_NAMES,
  EXTRAS_TABLE,
  FAKE_EXTRA_ADMIN_WORKER_ID,
  PADDED_EXTRA_NAME,
  SERVER_ERROR_CODE,
} from "./ExtraActions.constants";

const mockAssertIsAdminWorker = vi.fn();
const mockInsert = vi.fn();
const mockFrom = vi.fn((_table: string) => ({
  insert: mockInsert,
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

describe("createExtraAction", () => {
  beforeEach(() => {
    mockAssertIsAdminWorker.mockReset();
    mockInsert.mockReset();
    mockFrom.mockClear();
    mockAssertIsAdminWorker.mockResolvedValue(
      FAKE_EXTRA_ADMIN_WORKER_ID
    );
    mockInsert.mockResolvedValue({ error: null });
  });

  it("rejects a caller who is not an admin before any insert", async () => {
    mockAssertIsAdminWorker.mockRejectedValue(
      new NotAuthorizedError()
    );

    await expect(
      createExtraAction({ name: FAKE_EXTRA_NAME })
    ).rejects.toThrow(NotAuthorizedError);
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it("returns a name error without inserting when the name is blank", async () => {
    const result = await createExtraAction({
      name: BLANK_EXTRA_NAME,
    });

    expect(result).toEqual({
      status: EXTRA_MUTATION_STATUS.ERROR,
      nameError: EXTRA_CATALOG_COPY.NAME_REQUIRED_ERROR,
    });
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it.each(NON_STRING_EXTRA_NAMES)(
    "returns a name error without writing when the name is the non-string value %j",
    async (name) => {
      const result = await createExtraAction({
        name: name as never,
      });

      expect(result).toEqual({
        status: EXTRA_MUTATION_STATUS.ERROR,
        nameError: EXTRA_CATALOG_COPY.NAME_REQUIRED_ERROR,
      });
      expect(mockInsert).not.toHaveBeenCalled();
    }
  );

  it.each([null, undefined])(
    "returns a name error without writing when the whole input is %j",
    async (input) => {
      const result = await createExtraAction(
        input as never
      );

      expect(result).toEqual({
        status: EXTRA_MUTATION_STATUS.ERROR,
        nameError: EXTRA_CATALOG_COPY.NAME_REQUIRED_ERROR,
      });
      expect(mockInsert).not.toHaveBeenCalled();
    }
  );

  it("inserts the trimmed name stamped with the admin worker", async () => {
    const result = await createExtraAction({
      name: PADDED_EXTRA_NAME,
    });

    expect(mockFrom).toHaveBeenCalledWith(EXTRAS_TABLE);
    expect(mockInsert).toHaveBeenCalledWith({
      name: FAKE_EXTRA_NAME,
      created_by: FAKE_EXTRA_ADMIN_WORKER_ID,
      updated_by: FAKE_EXTRA_ADMIN_WORKER_ID,
    });
    expect(result).toEqual({
      status: EXTRA_MUTATION_STATUS.SUCCESS,
    });
  });

  it("maps a unique violation to a name error", async () => {
    mockInsert.mockResolvedValue({
      error: {
        code: POSTGRES_ERROR_CODE.UNIQUE_VIOLATION,
        message: "duplicate key",
      },
    });

    const result = await createExtraAction({
      name: FAKE_EXTRA_NAME,
    });

    expect(result).toEqual({
      status: EXTRA_MUTATION_STATUS.ERROR,
      nameError: EXTRA_CATALOG_COPY.NAME_DUPLICATE_ERROR,
    });
  });

  it("throws instead of returning success when the insert fails", async () => {
    mockInsert.mockResolvedValue({
      error: { code: SERVER_ERROR_CODE, message: "boom" },
    });

    await expect(
      createExtraAction({ name: FAKE_EXTRA_NAME })
    ).rejects.toThrow(SupabaseQueryError);
  });
});
