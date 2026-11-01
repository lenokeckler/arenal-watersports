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
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import { updateCategoryDepositAction } from "../services/updateCategoryDepositAction";
import { mapUpdateCategoryDepositInputToRow } from "../utils/mapUpdateCategoryDepositInputToRow";
import { CATEGORY_DEPOSIT_ID } from "./CategoryDepositFormValues.constants";
import {
  DEFAULT_UPDATE_CATEGORY_DEPOSIT_INPUT,
  FAKE_DEPOSIT_ADMIN_WORKER_ID,
} from "./UpdateCategoryDepositInput.constants";
import { DEPOSIT_ROW_COLUMNS } from "./CategoryDepositRow.constants";

const ID_COLUMN = "id";

const mockAssertIsAdminWorker = vi.fn();
const mockMaybeSingle = vi.fn();
const mockSelect = vi.fn(() => ({
  maybeSingle: mockMaybeSingle,
}));
const mockUpdateEq = vi.fn(() => ({ select: mockSelect }));
const mockUpdate = vi.fn((_row: object) => ({
  eq: mockUpdateEq,
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

describe("updateCategoryDepositAction", () => {
  beforeEach(() => {
    mockAssertIsAdminWorker.mockReset();
    mockUpdate.mockClear();
    mockUpdateEq.mockClear();
    mockSelect.mockClear();
    mockMaybeSingle.mockReset();
    mockAssertIsAdminWorker.mockResolvedValue(
      FAKE_DEPOSIT_ADMIN_WORKER_ID
    );
    mockMaybeSingle.mockResolvedValue({
      data: { id: CATEGORY_DEPOSIT_ID },
      error: null,
    });
  });

  it("rejects a caller who is not an admin before any update", async () => {
    mockAssertIsAdminWorker.mockRejectedValue(
      new NotAuthorizedError()
    );

    await expect(
      updateCategoryDepositAction(
        DEFAULT_UPDATE_CATEGORY_DEPOSIT_INPUT
      )
    ).rejects.toThrow(NotAuthorizedError);
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it("sends only the mapped deposit payload, filtered by category id", async () => {
    await updateCategoryDepositAction(
      DEFAULT_UPDATE_CATEGORY_DEPOSIT_INPUT
    );

    const [payload] = mockUpdate.mock.calls[0];
    expect(payload).toEqual(
      mapUpdateCategoryDepositInputToRow(
        DEFAULT_UPDATE_CATEGORY_DEPOSIT_INPUT,
        FAKE_DEPOSIT_ADMIN_WORKER_ID
      )
    );
    expect(Object.keys(payload).sort()).toEqual(
      DEPOSIT_ROW_COLUMNS
    );
    expect(mockUpdateEq).toHaveBeenCalledWith(
      ID_COLUMN,
      CATEGORY_DEPOSIT_ID
    );
  });

  it("returns success when the update matched a row", async () => {
    expect(
      await updateCategoryDepositAction(
        DEFAULT_UPDATE_CATEGORY_DEPOSIT_INPUT
      )
    ).toEqual({ status: CATEGORY_MUTATION_STATUS.SUCCESS });
  });

  it("returns the not-found error when the update matched no row", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: null,
    });

    expect(
      await updateCategoryDepositAction(
        DEFAULT_UPDATE_CATEGORY_DEPOSIT_INPUT
      )
    ).toEqual({
      status: CATEGORY_MUTATION_STATUS.ERROR,
      message:
        CATEGORY_CATALOG_COPY.DEPOSIT_CATEGORY_NOT_FOUND_ERROR,
    });
  });

  it("throws instead of returning an error result when the database rejects the update", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: {
        code: POSTGRES_ERROR_CODE.CHECK_VIOLATION,
        message: "boom",
      },
    });

    await expect(
      updateCategoryDepositAction(
        DEFAULT_UPDATE_CATEGORY_DEPOSIT_INPUT
      )
    ).rejects.toThrow(SupabaseQueryError);
  });
});
