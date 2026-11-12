import { act, renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import { useCategoryBehaviorFormViewModel } from "../hooks/useCategoryBehaviorFormViewModel";
import type { UpdateCategoryBehaviorInput } from "../models/UpdateCategoryBehaviorInput.interface";
import { buildCategoryFormFieldChangeEvent } from "./buildCategoryFormFieldChangeEvent";
import { DEFAULT_CATEGORY_BEHAVIOR } from "./CategoryBehavior.constants";
import { VALID_CATEGORY_BEHAVIOR_FORM_VALUES } from "./CategoryBehaviorFormValues.constants";
import { DEFAULT_UPDATE_CATEGORY_BEHAVIOR_INPUT } from "./UpdateCategoryBehaviorInput.constants";

const FAKE_EDITED_DURATION_MINUTES = 90;

const mockPush = vi.fn();
const mockRefresh = vi.fn();
const mockUpdateCategoryBehaviorAction = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
}));

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: vi.fn() }),
}));

vi.mock("../services/updateCategoryBehaviorAction", () => ({
  updateCategoryBehaviorAction: (
    input: UpdateCategoryBehaviorInput
  ) => mockUpdateCategoryBehaviorAction(input),
}));

const renderViewModel = () =>
  renderHook(() =>
    useCategoryBehaviorFormViewModel({
      behavior: DEFAULT_CATEGORY_BEHAVIOR,
    })
  );

describe("useCategoryBehaviorFormViewModel", () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockRefresh.mockClear();
    mockUpdateCategoryBehaviorAction.mockReset();
  });

  it("exposes the seeded values, the tracking mode and an idle form", () => {
    const { result } = renderViewModel();

    expect(result.current.values).toEqual(
      VALID_CATEGORY_BEHAVIOR_FORM_VALUES
    );
    expect(result.current.trackingMode).toBe(
      DEFAULT_CATEGORY_BEHAVIOR.trackingMode
    );
    expect(result.current.isSubmitting).toBe(false);
  });

  it("submits the edited value", async () => {
    mockUpdateCategoryBehaviorAction.mockResolvedValue({
      status: CATEGORY_MUTATION_STATUS.SUCCESS,
    });
    const { result } = renderViewModel();

    act(() => {
      result.current.onDefaultDurationMinutesChange(
        buildCategoryFormFieldChangeEvent({
          value: FAKE_EDITED_DURATION_MINUTES.toString(),
        })
      );
    });
    await act(async () => {
      await result.current.onSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent);
    });

    expect(
      mockUpdateCategoryBehaviorAction
    ).toHaveBeenCalledWith({
      ...DEFAULT_UPDATE_CATEGORY_BEHAVIOR_INPUT,
      defaultDurationMinutes: FAKE_EDITED_DURATION_MINUTES,
    });
  });

  it("goes back to the category list", () => {
    const { result } = renderViewModel();

    act(() => {
      result.current.onBack();
    });

    expect(mockPush).toHaveBeenCalledWith(
      PATHS.ADMINISTRATION.CATEGORIES
    );
  });
});
