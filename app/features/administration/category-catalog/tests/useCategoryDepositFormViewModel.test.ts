import { act } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import type { UpdateCategoryDepositInput } from "../models/UpdateCategoryDepositInput.interface";
import { buildCategoryFormFieldChangeEvent } from "./buildCategoryFormFieldChangeEvent";
import {
  renderCategoryDepositViewModel,
  submitCategoryDepositViewModel,
} from "./CategoryDepositViewModel.harness";
import {
  DECIMAL_DEPOSIT,
  DECIMAL_DEPOSIT_TEXT,
  DEFAULT_CATEGORY_DEPOSIT_FORM_VALUES,
  INVALID_FORMAT_TEXT,
} from "./CategoryDepositFormValues.constants";
import { buildUpdateCategoryDepositInput } from "./UpdateCategoryDepositInput.constants";
import {
  EDITED_DEPOSIT_CRC_AMOUNT,
  EDITED_DEPOSIT_CRC_TEXT,
  FORMAT_ERRORS,
} from "./useCategoryDepositForm.constants";

const mockPush = vi.fn();
const mockUpdateCategoryDepositAction = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush, refresh: vi.fn() }),
  unstable_rethrow: vi.fn(),
}));

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: vi.fn() }),
}));

vi.mock("../services/updateCategoryDepositAction", () => ({
  updateCategoryDepositAction: (
    input: UpdateCategoryDepositInput
  ) => mockUpdateCategoryDepositAction(input),
}));

describe("useCategoryDepositFormViewModel", () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockUpdateCategoryDepositAction.mockReset();
    mockUpdateCategoryDepositAction.mockResolvedValue({
      status: CATEGORY_MUTATION_STATUS.SUCCESS,
    });
  });

  it("exposes the seeded values and an idle form", () => {
    const { result } = renderCategoryDepositViewModel();

    expect(result.current.values).toStrictEqual(
      DEFAULT_CATEGORY_DEPOSIT_FORM_VALUES
    );
    expect(result.current.errors).toStrictEqual({});
    expect(result.current.isSubmitting).toBe(false);
  });

  it("shows the field error without calling the server, then clears it when the field is edited", async () => {
    const { result } = renderCategoryDepositViewModel();
    act(() => {
      result.current.onDepositUsdChange(
        buildCategoryFormFieldChangeEvent({
          value: INVALID_FORMAT_TEXT,
        })
      );
    });

    await submitCategoryDepositViewModel(result);

    expect(result.current.errors).toStrictEqual({
      depositUsd: FORMAT_ERRORS.depositUsd,
    });
    expect(
      mockUpdateCategoryDepositAction
    ).not.toHaveBeenCalled();

    act(() => {
      result.current.onDepositUsdChange(
        buildCategoryFormFieldChangeEvent({
          value: DECIMAL_DEPOSIT_TEXT,
        })
      );
    });

    expect(result.current.errors).toStrictEqual({});
  });

  it.each([
    {
      description: "USD",
      change: "onDepositUsdChange",
      text: DECIMAL_DEPOSIT_TEXT,
      input: buildUpdateCategoryDepositInput({
        depositUsd: DECIMAL_DEPOSIT,
      }),
    },
    {
      description: "CRC",
      change: "onDepositCrcChange",
      text: EDITED_DEPOSIT_CRC_TEXT,
      input: buildUpdateCategoryDepositInput({
        depositCrc: EDITED_DEPOSIT_CRC_AMOUNT,
      }),
    },
  ] as const)(
    "submits the edited $description value and keeps the other amount",
    async ({ change, text, input }) => {
      const { result } = renderCategoryDepositViewModel();
      act(() => {
        result.current[change](
          buildCategoryFormFieldChangeEvent({ value: text })
        );
      });

      await submitCategoryDepositViewModel(result);

      expect(
        mockUpdateCategoryDepositAction
      ).toHaveBeenCalledWith(input);
    }
  );

  it("goes back to the category list", () => {
    const { result } = renderCategoryDepositViewModel();

    act(() => {
      result.current.onBack();
    });

    expect(mockPush).toHaveBeenCalledWith(
      PATHS.ADMINISTRATION.CATEGORIES
    );
  });
});
