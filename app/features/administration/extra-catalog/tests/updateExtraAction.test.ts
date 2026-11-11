import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  POSTGRES_ERROR_CODE,
  STRING,
} from "@/app/constants";
import { NotAuthorizedError } from "@/app/services/authorization/NotAuthorizedError";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import { EXTRA_MUTATION_STATUS } from "../constants/ExtraMutationStatus.constants";
import type { UpdateExtraInput } from "../models/UpdateExtraInput.interface";
import { updateExtraAction } from "../services/updateExtraAction";
import {
  FAKE_EXTRA_ID,
  FAKE_EXTRA_NAME,
  FAKE_EXTRA_PRICE_CRC,
  FAKE_EXTRA_PRICE_CRC_TEXT,
  FAKE_EXTRA_PRICE_USD,
} from "./Extra.constants";
import { VALID_EXTRA_FORM_VALUES } from "./ExtraForm.constants";
import {
  BLANK_EXTRA_NAME,
  NON_STRING_EXTRA_NAMES,
  EXTRA_ID_COLUMN,
  EXTRAS_TABLE,
  FAKE_EXTRA_ADMIN_WORKER_ID,
  INVALID_PRICE_INPUT_CASES,
  PADDED_EXTRA_NAME,
  SERVER_ERROR_CODE,
} from "./ExtraActions.constants";

const UPDATE_INPUT: UpdateExtraInput = {
  ...VALID_EXTRA_FORM_VALUES,
  extraId: FAKE_EXTRA_ID,
};

const mockAssertIsAdminWorker = vi.fn();
const mockMaybeSingle = vi.fn();
const mockSelect = vi.fn((_columns: string) => ({
  maybeSingle: mockMaybeSingle,
}));
const mockEq = vi.fn((_column: string, _value: string) => ({
  select: mockSelect,
}));
const mockUpdate = vi.fn((_row: object) => ({
  eq: mockEq,
}));
const mockFrom = vi.fn((_table: string) => ({
  update: mockUpdate,
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

describe("updateExtraAction", () => {
  beforeEach(() => {
    mockAssertIsAdminWorker.mockReset();
    mockMaybeSingle.mockReset();
    mockUpdate.mockClear();
    mockEq.mockClear();
    mockFrom.mockClear();
    mockAssertIsAdminWorker.mockResolvedValue(
      FAKE_EXTRA_ADMIN_WORKER_ID
    );
    mockMaybeSingle.mockResolvedValue({
      data: { id: FAKE_EXTRA_ID },
      error: null,
    });
  });

  it("rejects a caller who is not an admin before any update", async () => {
    mockAssertIsAdminWorker.mockRejectedValue(
      new NotAuthorizedError()
    );

    await expect(
      updateExtraAction(UPDATE_INPUT)
    ).rejects.toThrow(NotAuthorizedError);
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it("returns a name error without updating when the name is blank", async () => {
    const result = await updateExtraAction({
      ...UPDATE_INPUT,
      name: BLANK_EXTRA_NAME,
    });

    expect(result).toEqual({
      status: EXTRA_MUTATION_STATUS.ERROR,
      nameError: EXTRA_CATALOG_COPY.NAME_REQUIRED_ERROR,
    });
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it.each(NON_STRING_EXTRA_NAMES)(
    "returns a name error without writing when the name is the non-string value %j",
    async (name) => {
      const result = await updateExtraAction({
        ...UPDATE_INPUT,
        name: name as never,
      });

      expect(result).toEqual({
        status: EXTRA_MUTATION_STATUS.ERROR,
        nameError: EXTRA_CATALOG_COPY.NAME_REQUIRED_ERROR,
      });
      expect(mockUpdate).not.toHaveBeenCalled();
    }
  );

  it.each([null, undefined])(
    "returns a name error without writing when the whole input is %j",
    async (input) => {
      const result = await updateExtraAction(
        input as never
      );

      expect(result).toEqual({
        status: EXTRA_MUTATION_STATUS.ERROR,
        nameError: EXTRA_CATALOG_COPY.NAME_REQUIRED_ERROR,
        priceErrors: {
          prices: EXTRA_CATALOG_COPY.PRICES_REQUIRED_ERROR,
        },
      });
      expect(mockUpdate).not.toHaveBeenCalled();
    }
  );

  it.each(INVALID_PRICE_INPUT_CASES)(
    "returns price errors without updating when $description",
    async ({ values, expectedErrors }) => {
      const result = await updateExtraAction({
        ...UPDATE_INPUT,
        ...values,
      });

      expect(result).toEqual({
        status: EXTRA_MUTATION_STATUS.ERROR,
        priceErrors: expectedErrors,
      });
      expect(mockUpdate).not.toHaveBeenCalled();
    }
  );

  it("clears a price that is sent empty", async () => {
    await updateExtraAction({
      ...UPDATE_INPUT,
      priceUsd: STRING.Empty,
      priceCrc: FAKE_EXTRA_PRICE_CRC_TEXT,
    });

    expect(mockUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        price_usd: null,
        price_crc: FAKE_EXTRA_PRICE_CRC,
      })
    );
  });

  it("updates the extra by id with the trimmed name and the prices stamped with the admin worker", async () => {
    const result = await updateExtraAction({
      ...UPDATE_INPUT,
      name: PADDED_EXTRA_NAME,
    });

    expect(mockFrom).toHaveBeenCalledWith(EXTRAS_TABLE);
    expect(mockUpdate).toHaveBeenCalledWith({
      name: FAKE_EXTRA_NAME,
      price_usd: FAKE_EXTRA_PRICE_USD,
      price_crc: null,
      updated_by: FAKE_EXTRA_ADMIN_WORKER_ID,
    });
    expect(mockEq).toHaveBeenCalledWith(
      EXTRA_ID_COLUMN,
      FAKE_EXTRA_ID
    );
    expect(result).toEqual({
      status: EXTRA_MUTATION_STATUS.SUCCESS,
    });
  });

  it("maps a unique violation to a name error", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: {
        code: POSTGRES_ERROR_CODE.UNIQUE_VIOLATION,
        message: "duplicate key",
      },
    });

    const result = await updateExtraAction(UPDATE_INPUT);

    expect(result).toEqual({
      status: EXTRA_MUTATION_STATUS.ERROR,
      nameError: EXTRA_CATALOG_COPY.NAME_DUPLICATE_ERROR,
    });
  });

  it("returns the not found message when the id is malformed", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: {
        code: POSTGRES_ERROR_CODE.INVALID_TEXT_REPRESENTATION,
        message: "bad uuid",
      },
    });

    const result = await updateExtraAction(UPDATE_INPUT);

    expect(result).toEqual({
      status: EXTRA_MUTATION_STATUS.ERROR,
      message: EXTRA_CATALOG_COPY.NOT_FOUND_ERROR,
    });
  });

  it("returns the not found message when no row was updated", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: null,
    });

    const result = await updateExtraAction(UPDATE_INPUT);

    expect(result).toEqual({
      status: EXTRA_MUTATION_STATUS.ERROR,
      message: EXTRA_CATALOG_COPY.NOT_FOUND_ERROR,
    });
  });

  it("throws instead of returning success when the update fails", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: { code: SERVER_ERROR_CODE, message: "boom" },
    });

    await expect(
      updateExtraAction(UPDATE_INPUT)
    ).rejects.toThrow(SupabaseQueryError);
  });
});
