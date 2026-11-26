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
import { COMBO_REMOVAL_OUTCOME } from "../constants/ComboRemovalOutcome.constants";
import { COMBO_REMOVAL_OUTCOME_COPY } from "../constants/ComboRemovalOutcomeCopy.constants";
import { deleteOrDeactivateComboAction } from "../services/deleteOrDeactivateComboAction";
import { reactivateComboAction } from "../services/reactivateComboAction";
import { buildPostgrestError } from "./buildPostgrestError";
import {
  FAKE_COMBO_ID,
  UNKNOWN_REMOVAL_OUTCOME,
} from "./Combo.constants";

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

describe("combo actions", () => {
  beforeEach(() => {
    mockAssertIsAdminWorker.mockReset();
    mockRpc.mockReset();
    mockAssertIsAdminWorker.mockResolvedValue(undefined);
  });

  describe("deleteOrDeactivateComboAction", () => {
    it.each(Object.values(COMBO_REMOVAL_OUTCOME))(
      "says which outcome the database chose: %s",
      async (outcome) => {
        mockRpc.mockResolvedValue({
          data: outcome,
          error: null,
        });

        const result =
          await deleteOrDeactivateComboAction(
            FAKE_COMBO_ID
          );

        expect(mockRpc).toHaveBeenCalledWith(
          SUPABASE_RPC.DELETE_OR_DEACTIVATE_COMBO,
          { p_combo_id: FAKE_COMBO_ID }
        );
        expect(result).toEqual({
          message: COMBO_REMOVAL_OUTCOME_COPY[outcome],
          status: STATUS.SUCCESS,
        });
      }
    );

    it("returns the forbidden message for a non-administrator error", async () => {
      mockRpc.mockResolvedValue({
        data: null,
        error: buildPostgrestError(
          POSTGRES_ERROR_CODE.INSUFFICIENT_PRIVILEGE
        ),
      });

      expect(
        await deleteOrDeactivateComboAction(FAKE_COMBO_ID)
      ).toEqual({
        message: COMBO_CATALOG_COPY.FORBIDDEN_ERROR,
        status: STATUS.ERROR,
      });
    });

    it("shows the database message when the combo cannot be deactivated", async () => {
      const error = buildPostgrestError(
        POSTGRES_ERROR_CODE.OBJECT_NOT_IN_PREREQUISITE_STATE
      );
      mockRpc.mockResolvedValue({ data: null, error });

      expect(
        await deleteOrDeactivateComboAction(FAKE_COMBO_ID)
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
        deleteOrDeactivateComboAction(FAKE_COMBO_ID)
      ).rejects.toBeInstanceOf(SupabaseQueryError);
    });

    it("throws on an unknown outcome", async () => {
      mockRpc.mockResolvedValue({
        data: UNKNOWN_REMOVAL_OUTCOME,
        error: null,
      });

      await expect(
        deleteOrDeactivateComboAction(FAKE_COMBO_ID)
      ).rejects.toThrow();
    });

    it("never reaches the database for a non-administrator", async () => {
      mockAssertIsAdminWorker.mockRejectedValue(
        new NotAuthorizedError()
      );

      await expect(
        deleteOrDeactivateComboAction(FAKE_COMBO_ID)
      ).rejects.toBeInstanceOf(NotAuthorizedError);
      expect(mockRpc).not.toHaveBeenCalled();
    });
  });

  describe("reactivateComboAction", () => {
    it("sets the combo active and reports it", async () => {
      mockRpc.mockResolvedValue({
        data: null,
        error: null,
      });

      const result =
        await reactivateComboAction(FAKE_COMBO_ID);

      expect(mockRpc).toHaveBeenCalledWith(
        SUPABASE_RPC.SET_COMBO_ACTIVE,
        { p_active: true, p_combo_id: FAKE_COMBO_ID }
      );
      expect(result).toEqual({
        message:
          COMBO_CATALOG_COPY.REACTIVATE_SUCCESS_TOAST,
        status: STATUS.SUCCESS,
      });
    });

    it("returns the not found message for an unknown combo", async () => {
      mockRpc.mockResolvedValue({
        data: null,
        error: buildPostgrestError(
          POSTGRES_ERROR_CODE.NO_DATA_FOUND
        ),
      });

      expect(
        await reactivateComboAction(FAKE_COMBO_ID)
      ).toEqual({
        message: COMBO_CATALOG_COPY.NOT_FOUND_ERROR,
        status: STATUS.ERROR,
      });
    });

    it("shows the database message when the combo has unavailable equipment", async () => {
      const error = buildPostgrestError(
        POSTGRES_ERROR_CODE.OBJECT_NOT_IN_PREREQUISITE_STATE
      );
      mockRpc.mockResolvedValue({ data: null, error });

      expect(
        await reactivateComboAction(FAKE_COMBO_ID)
      ).toEqual({
        message: error.message,
        status: STATUS.ERROR,
      });
    });

    it("never reaches the database for a non-administrator", async () => {
      mockAssertIsAdminWorker.mockRejectedValue(
        new NotAuthorizedError()
      );

      await expect(
        reactivateComboAction(FAKE_COMBO_ID)
      ).rejects.toBeInstanceOf(NotAuthorizedError);
      expect(mockRpc).not.toHaveBeenCalled();
    });
  });
});
