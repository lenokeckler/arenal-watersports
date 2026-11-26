import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  POSTGRES_ERROR_CODE,
  STATUS,
  SUPABASE_RPC,
} from "@/app/constants";
import { NotAuthorizedError } from "@/app/services/authorization/NotAuthorizedError";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { COMBO_CATALOG_COPY } from "../constants/ComboCatalogCopy.constants";
import { COMBO_FORM_COPY } from "../constants/ComboFormCopy.constants";
import { saveComboAction } from "../services/saveComboAction";
import { buildPostgrestError } from "./buildPostgrestError";
import {
  EXPECTED_SAVE_PAYLOAD,
  SAVED_COMBO_ID,
} from "./ComboForm.constants";

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

describe("saveComboAction", () => {
  beforeEach(() => {
    mockAssertIsAdminWorker.mockReset();
    mockRpc.mockReset();
    mockAssertIsAdminWorker.mockResolvedValue(undefined);
  });

  it("sends the payload to save_combo and returns the saved id", async () => {
    mockRpc.mockResolvedValue({
      data: SAVED_COMBO_ID,
      error: null,
    });

    const result = await saveComboAction(
      EXPECTED_SAVE_PAYLOAD
    );

    expect(mockRpc).toHaveBeenCalledWith(
      SUPABASE_RPC.SAVE_COMBO,
      { p_payload: EXPECTED_SAVE_PAYLOAD }
    );
    expect(result).toEqual({
      comboId: SAVED_COMBO_ID,
      status: STATUS.SUCCESS,
    });
  });

  it.each([
    [
      POSTGRES_ERROR_CODE.INSUFFICIENT_PRIVILEGE,
      COMBO_CATALOG_COPY.FORBIDDEN_ERROR,
    ],
    [
      POSTGRES_ERROR_CODE.OBJECT_NOT_IN_PREREQUISITE_STATE,
      COMBO_FORM_COPY.SOLD_COMBO_LOCKED_ERROR,
    ],
    [
      POSTGRES_ERROR_CODE.NO_DATA_FOUND,
      COMBO_FORM_COPY.NOT_FOUND_ERROR,
    ],
  ])(
    "returns the message of the database error %s",
    async (code, message) => {
      mockRpc.mockResolvedValue({
        data: null,
        error: buildPostgrestError(code),
      });

      expect(
        await saveComboAction(EXPECTED_SAVE_PAYLOAD)
      ).toEqual({ message, status: STATUS.ERROR });
    }
  );

  it("shows the database message of an invalid parameter", async () => {
    const error = buildPostgrestError(
      POSTGRES_ERROR_CODE.INVALID_PARAMETER_VALUE
    );
    mockRpc.mockResolvedValue({ data: null, error });

    expect(
      await saveComboAction(EXPECTED_SAVE_PAYLOAD)
    ).toEqual({
      message: error.message,
      status: STATUS.ERROR,
    });
  });

  it("throws on an unmapped database error", async () => {
    mockRpc.mockResolvedValue({
      data: null,
      error: buildPostgrestError(
        POSTGRES_ERROR_CODE.RAISE_EXCEPTION
      ),
    });

    await expect(
      saveComboAction(EXPECTED_SAVE_PAYLOAD)
    ).rejects.toBeInstanceOf(SupabaseQueryError);
  });

  it("never reaches the database for a non-administrator", async () => {
    mockAssertIsAdminWorker.mockRejectedValue(
      new NotAuthorizedError()
    );

    await expect(
      saveComboAction(EXPECTED_SAVE_PAYLOAD)
    ).rejects.toBeInstanceOf(NotAuthorizedError);
    expect(mockRpc).not.toHaveBeenCalled();
  });
});
