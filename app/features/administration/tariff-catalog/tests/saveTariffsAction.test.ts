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
import { TARIFF_FORM_COPY } from "../constants/TariffFormCopy.constants";
import { saveTariffsAction } from "../services/saveTariffsAction";
import { buildPostgrestError } from "./buildPostgrestError";
import { EXPECTED_SAVE_PAYLOAD } from "./TariffForm.constants";

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

describe("saveTariffsAction", () => {
  beforeEach(() => {
    mockAssertIsAdminWorker.mockReset();
    mockRpc.mockReset();
    mockAssertIsAdminWorker.mockResolvedValue(undefined);
  });

  it("sends the payload to save_category_tariffs", async () => {
    mockRpc.mockResolvedValue({ data: 2, error: null });

    const result = await saveTariffsAction(
      EXPECTED_SAVE_PAYLOAD
    );

    expect(mockRpc).toHaveBeenCalledWith(
      SUPABASE_RPC.SAVE_CATEGORY_TARIFFS,
      { p_payload: EXPECTED_SAVE_PAYLOAD }
    );
    expect(result).toEqual({ status: STATUS.SUCCESS });
  });

  it("returns the message of a refused tariff removal", async () => {
    mockRpc.mockResolvedValue({
      data: null,
      error: buildPostgrestError(
        POSTGRES_ERROR_CODE.OBJECT_NOT_IN_PREREQUISITE_STATE
      ),
    });

    expect(
      await saveTariffsAction(EXPECTED_SAVE_PAYLOAD)
    ).toEqual({
      message: TARIFF_FORM_COPY.REMOVE_TARIFF_ERROR,
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
      saveTariffsAction(EXPECTED_SAVE_PAYLOAD)
    ).rejects.toBeInstanceOf(SupabaseQueryError);
  });

  it("never reaches the database for a non-administrator", async () => {
    mockAssertIsAdminWorker.mockRejectedValue(
      new NotAuthorizedError()
    );

    await expect(
      saveTariffsAction(EXPECTED_SAVE_PAYLOAD)
    ).rejects.toBeInstanceOf(NotAuthorizedError);
    expect(mockRpc).not.toHaveBeenCalled();
  });
});
