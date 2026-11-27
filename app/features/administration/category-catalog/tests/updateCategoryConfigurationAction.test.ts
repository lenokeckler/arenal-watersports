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
import { updateCategoryConfigurationAction } from "../services/updateCategoryConfigurationAction";
import { mapUpdateCategoryAlertsInputToRow } from "../utils/mapUpdateCategoryAlertsInputToRow";
import { mapUpdateCategoryBehaviorInputToRow } from "../utils/mapUpdateCategoryBehaviorInputToRow";
import { mapUpdateCategoryDepositInputToRow } from "../utils/mapUpdateCategoryDepositInputToRow";
import { DEFAULT_UPDATE_CATEGORY_CONFIGURATION_INPUT as INPUT } from "./CategoryConfigureSave.constants";
import { FAKE_UPDATE_ADMIN_WORKER_ID as WORKER_ID } from "./UpdateCategoryBehaviorInput.constants";

const ID_COLUMN = "id";
const AUDIT_COLUMN = "updated_by";

const mockAssertIsAdminWorker = vi.fn();
const mockMaybeSingle = vi.fn();
const mockSelect = vi.fn(() => ({
  maybeSingle: mockMaybeSingle,
}));
const mockUpdateEq = vi.fn(() => ({ select: mockSelect }));
const mockUpdate = vi.fn(() => ({ eq: mockUpdateEq }));

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

const buildPartials = (): object[] => [
  mapUpdateCategoryBehaviorInputToRow(
    INPUT.behavior,
    WORKER_ID
  ),
  mapUpdateCategoryDepositInputToRow(
    INPUT.deposit,
    WORKER_ID
  ),
  mapUpdateCategoryAlertsInputToRow(
    INPUT.alerts,
    WORKER_ID
  ),
];

const rejectWith = (message: string): void => {
  mockMaybeSingle.mockResolvedValue({
    data: null,
    error: {
      code: POSTGRES_ERROR_CODE.CHECK_VIOLATION,
      message,
    },
  });
};

describe("updateCategoryConfigurationAction", () => {
  beforeEach(() => {
    mockAssertIsAdminWorker.mockReset();
    mockUpdate.mockClear();
    mockUpdateEq.mockClear();
    mockMaybeSingle.mockReset();
    mockAssertIsAdminWorker.mockResolvedValue(WORKER_ID);
    mockMaybeSingle.mockResolvedValue({
      data: { id: INPUT.categoryId },
      error: null,
    });
  });

  it("propagates NotAuthorizedError without updating when the caller is not an admin", async () => {
    mockAssertIsAdminWorker.mockRejectedValue(
      new NotAuthorizedError()
    );

    await expect(
      updateCategoryConfigurationAction(INPUT)
    ).rejects.toThrow(NotAuthorizedError);
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it("sends one update with the three partials, filtered by category id", async () => {
    const result =
      await updateCategoryConfigurationAction(INPUT);

    expect(mockAssertIsAdminWorker).toHaveBeenCalledOnce();
    expect(mockUpdate).toHaveBeenCalledOnce();
    expect(mockUpdate).toHaveBeenCalledWith(
      Object.assign({}, ...buildPartials())
    );
    expect(mockUpdateEq).toHaveBeenCalledWith(
      ID_COLUMN,
      INPUT.categoryId
    );
    expect(result).toEqual({
      status: CATEGORY_MUTATION_STATUS.SUCCESS,
    });
  });

  it("shares only the audit column between the three partials", () => {
    const columns = buildPartials().flatMap(Object.keys);
    const sharedColumns = columns.filter(
      (column, index) => columns.indexOf(column) !== index
    );

    expect(new Set(sharedColumns)).toEqual(
      new Set([AUDIT_COLUMN])
    );
  });

  it("returns the not-found error when the update matched no row", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: null,
    });

    await expect(
      updateCategoryConfigurationAction(INPUT)
    ).resolves.toEqual({
      status: CATEGORY_MUTATION_STATUS.ERROR,
      message:
        CATEGORY_CATALOG_COPY.BEHAVIOR_CATEGORY_NOT_FOUND_ERROR,
    });
  });

  it("returns the low fuel message when the warning is above a gauge", async () => {
    rejectWith(
      "The low fuel warning cannot exceed the lines of the gauge"
    );

    await expect(
      updateCategoryConfigurationAction(INPUT)
    ).resolves.toEqual({
      status: CATEGORY_MUTATION_STATUS.ERROR,
      message:
        CATEGORY_CATALOG_COPY.LOW_FUEL_LINES_TOO_HIGH_ERROR,
    });
  });

  it("throws when the database rejects the update for another reason", async () => {
    rejectWith("boom");

    await expect(
      updateCategoryConfigurationAction(INPUT)
    ).rejects.toThrow(SupabaseQueryError);
  });
});
