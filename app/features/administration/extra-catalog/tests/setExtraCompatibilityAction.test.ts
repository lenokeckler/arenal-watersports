import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  POSTGRES_ERROR_CODE,
  SUPABASE_RPC,
} from "@/app/constants";
import { NotAuthorizedError } from "@/app/services/authorization/NotAuthorizedError";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { EXTRA_COMPATIBILITY_COPY } from "../constants/ExtraCompatibilityCopy.constants";
import { EXTRA_MUTATION_STATUS } from "../constants/ExtraMutationStatus.constants";
import { setExtraCompatibilityAction } from "../services/setExtraCompatibilityAction";
import { SERVER_ERROR_CODE } from "./ExtraActions.constants";
import {
  COMPATIBILITY_CATEGORY_ID,
  COMPATIBILITY_CATEGORY_ROW,
  COMPATIBILITY_EXTRA_ID,
  FREE_UNIT_ID,
  LINKED_UNIT_ID,
  OTHER_CATEGORY_UNIT_ID,
} from "./ExtraCompatibility.constants";

const INPUT = {
  extraId: COMPATIBILITY_EXTRA_ID,
  categoryId: COMPATIBILITY_CATEGORY_ID,
  unitIds: [FREE_UNIT_ID],
};

const mockAssertIsAdminWorker = vi.fn();
const mockFetchCategory = vi.fn();
const mockFetchLinkedUnitIds = vi.fn();
const mockRpc = vi.fn();

vi.mock(
  "@/app/services/authorization/assertIsAdminWorker",
  () => ({
    assertIsAdminWorker: (...args: unknown[]): unknown =>
      mockAssertIsAdminWorker(...args),
  })
);

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn().mockResolvedValue({
    rpc: (...args: unknown[]): unknown => mockRpc(...args),
  }),
}));

vi.mock(
  "../services/fetchExtraCompatibilityCategory",
  () => ({
    fetchExtraCompatibilityCategory: (
      ...args: unknown[]
    ): unknown => mockFetchCategory(...args),
  })
);

vi.mock("../services/fetchExtraLinkedUnitIds", () => ({
  fetchExtraLinkedUnitIds: (...args: unknown[]): unknown =>
    mockFetchLinkedUnitIds(...args),
}));

describe("setExtraCompatibilityAction", () => {
  beforeEach(() => {
    mockAssertIsAdminWorker.mockReset();
    mockFetchCategory.mockReset();
    mockFetchLinkedUnitIds.mockReset();
    mockRpc.mockReset();
    mockFetchCategory.mockResolvedValue(
      COMPATIBILITY_CATEGORY_ROW
    );
    mockFetchLinkedUnitIds.mockResolvedValue([
      LINKED_UNIT_ID,
      OTHER_CATEGORY_UNIT_ID,
    ]);
    mockRpc.mockResolvedValue({ data: 2, error: null });
  });

  it("rejects a caller who is not an admin before any read", async () => {
    mockAssertIsAdminWorker.mockRejectedValue(
      new NotAuthorizedError()
    );

    await expect(
      setExtraCompatibilityAction(INPUT)
    ).rejects.toThrow(NotAuthorizedError);
    expect(mockFetchCategory).not.toHaveBeenCalled();
    expect(mockRpc).not.toHaveBeenCalled();
  });

  it("returns an input error without reading when the input is malformed", async () => {
    expect(await setExtraCompatibilityAction(null)).toEqual(
      {
        status: EXTRA_MUTATION_STATUS.ERROR,
        message:
          EXTRA_COMPATIBILITY_COPY.INVALID_INPUT_ERROR,
      }
    );
    expect(mockRpc).not.toHaveBeenCalled();
  });

  it("returns the category not found message when the category is unknown", async () => {
    mockFetchCategory.mockResolvedValue(null);

    expect(
      await setExtraCompatibilityAction(INPUT)
    ).toEqual({
      status: EXTRA_MUTATION_STATUS.ERROR,
      message:
        EXTRA_COMPATIBILITY_COPY.CATEGORY_NOT_FOUND_ERROR,
    });
    expect(mockRpc).not.toHaveBeenCalled();
  });

  it("returns a selection error when a unit is not in the category", async () => {
    expect(
      await setExtraCompatibilityAction({
        ...INPUT,
        unitIds: [OTHER_CATEGORY_UNIT_ID],
      })
    ).toEqual({
      status: EXTRA_MUTATION_STATUS.ERROR,
      message:
        EXTRA_COMPATIBILITY_COPY.INVALID_SELECTION_ERROR,
    });
    expect(mockRpc).not.toHaveBeenCalled();
  });

  it("replaces the links of the category and keeps the ones of other categories", async () => {
    const result = await setExtraCompatibilityAction(INPUT);

    expect(mockRpc).toHaveBeenCalledWith(
      SUPABASE_RPC.SET_EXTRA_COMPATIBILITY,
      {
        p_extra_id: COMPATIBILITY_EXTRA_ID,
        p_unit_ids: [OTHER_CATEGORY_UNIT_ID, FREE_UNIT_ID],
      }
    );
    expect(result).toEqual({
      status: EXTRA_MUTATION_STATUS.SUCCESS,
    });
  });

  it("maps a database privilege error to a result", async () => {
    mockRpc.mockResolvedValue({
      data: null,
      error: {
        code: POSTGRES_ERROR_CODE.INSUFFICIENT_PRIVILEGE,
        message: "denied",
      },
    });

    expect(
      await setExtraCompatibilityAction(INPUT)
    ).toEqual({
      status: EXTRA_MUTATION_STATUS.ERROR,
      message: EXTRA_COMPATIBILITY_COPY.FORBIDDEN_ERROR,
    });
  });

  it("throws instead of returning success on an unexpected error", async () => {
    mockRpc.mockResolvedValue({
      data: null,
      error: { code: SERVER_ERROR_CODE, message: "boom" },
    });

    await expect(
      setExtraCompatibilityAction(INPUT)
    ).rejects.toThrow(SupabaseQueryError);
  });
});
