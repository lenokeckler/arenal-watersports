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
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import { EXTRA_MUTATION_STATUS } from "../constants/ExtraMutationStatus.constants";
import { EXTRA_REMOVAL_OUTCOME } from "../constants/ExtraRemovalOutcome.constants";
import { deleteOrDeactivateExtraAction } from "../services/deleteOrDeactivateExtraAction";
import { FAKE_EXTRA_ID } from "./Extra.constants";
import { SERVER_ERROR_CODE } from "./ExtraActions.constants";

const RPC_ARGUMENT_NAME = "p_extra_id";

const mockAssertIsAdminWorker = vi.fn();
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

describe("deleteOrDeactivateExtraAction", () => {
  beforeEach(() => {
    mockAssertIsAdminWorker.mockReset();
    mockRpc.mockReset();
    mockAssertIsAdminWorker.mockResolvedValue(undefined);
    mockRpc.mockResolvedValue({
      data: EXTRA_REMOVAL_OUTCOME.DELETED,
      error: null,
    });
  });

  it("rejects a caller who is not an admin before calling the function", async () => {
    mockAssertIsAdminWorker.mockRejectedValue(
      new NotAuthorizedError()
    );

    await expect(
      deleteOrDeactivateExtraAction(FAKE_EXTRA_ID)
    ).rejects.toThrow(NotAuthorizedError);
    expect(mockRpc).not.toHaveBeenCalled();
  });

  it("calls the removal function with the extra id", async () => {
    await deleteOrDeactivateExtraAction(FAKE_EXTRA_ID);

    expect(mockRpc).toHaveBeenCalledWith(
      SUPABASE_RPC.DELETE_OR_DEACTIVATE_EXTRA,
      { [RPC_ARGUMENT_NAME]: FAKE_EXTRA_ID }
    );
  });

  it.each(Object.values(EXTRA_REMOVAL_OUTCOME))(
    "returns the %s outcome the function reports",
    async (outcome) => {
      mockRpc.mockResolvedValue({
        data: outcome,
        error: null,
      });

      const result =
        await deleteOrDeactivateExtraAction(FAKE_EXTRA_ID);

      expect(result).toEqual({
        status: EXTRA_MUTATION_STATUS.SUCCESS,
        outcome,
      });
    }
  );

  it("translates an insufficient privilege error to the forbidden message", async () => {
    mockRpc.mockResolvedValue({
      data: null,
      error: {
        code: POSTGRES_ERROR_CODE.INSUFFICIENT_PRIVILEGE,
        message: "denied",
      },
    });

    const result =
      await deleteOrDeactivateExtraAction(FAKE_EXTRA_ID);

    expect(result).toEqual({
      status: EXTRA_MUTATION_STATUS.ERROR,
      message: EXTRA_CATALOG_COPY.FORBIDDEN_ERROR,
    });
  });

  it.each([
    POSTGRES_ERROR_CODE.NO_DATA_FOUND,
    POSTGRES_ERROR_CODE.INVALID_TEXT_REPRESENTATION,
  ])(
    "translates the %s error to the not found message",
    async (code) => {
      mockRpc.mockResolvedValue({
        data: null,
        error: { code, message: "not found" },
      });

      const result =
        await deleteOrDeactivateExtraAction(FAKE_EXTRA_ID);

      expect(result).toEqual({
        status: EXTRA_MUTATION_STATUS.ERROR,
        message: EXTRA_CATALOG_COPY.NOT_FOUND_ERROR,
      });
    }
  );

  it("throws on any other error instead of reporting an outcome", async () => {
    mockRpc.mockResolvedValue({
      data: null,
      error: { code: SERVER_ERROR_CODE, message: "boom" },
    });

    await expect(
      deleteOrDeactivateExtraAction(FAKE_EXTRA_ID)
    ).rejects.toThrow(SupabaseQueryError);
  });
});
