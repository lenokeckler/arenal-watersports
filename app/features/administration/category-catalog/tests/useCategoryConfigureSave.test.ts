import { act, renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { LENGTH, STORE_SLICES } from "@/app/constants";
import { CATEGORY_CONFIGURE_SAVE_STATUS as SAVE_STATUS } from "../constants/CategoryConfigureSaveStatus.constants";
import { CATEGORY_CONFIGURE_SECTION_ID as SECTION } from "../constants/CategoryConfigureSectionId.constants";
import { CATEGORY_CONFIGURATION_STEP as STEP } from "../constants/CategoryConfigurationStep.constants";
import { useCategoryAlertFormFields } from "../hooks/useCategoryAlertFormFields";
import { useCategoryBehaviorFormFields } from "../hooks/useCategoryBehaviorFormFields";
import { useCategoryConfigureSave } from "../hooks/useCategoryConfigureSave";
import { useCategoryDepositFormFields } from "../hooks/useCategoryDepositFormFields";
import type { CategoryConfigurationSaveOutcome } from "../models/CategoryConfigurationSaveOutcome.interface";
import type { CategoryConfigureDraft } from "../models/CategoryConfigureDraft.interface";
import type { CategoryConfigureDraftViewModel } from "../models/CategoryConfigureDraftViewModel.interface";
import { categoryConfigureActions } from "../store/categoryConfigureSlice";
import { DEFAULT_CATEGORY_CONFIGURATION } from "./CategoryConfiguration.constants";
import {
  BASELINE_DRAFT,
  buildDraft,
  FAILED_STEP_FEEDBACK,
  INVALID_EDITED_VALUES,
  INVALID_FIELD_COUNT,
  NO_CONFIGURATION_ERRORS,
  ONE_FLAG_EDITED_VALUES,
  SAVED_STEP_FEEDBACK,
} from "./CategoryConfigureSave.constants";
import { createCategoryConfigureStoreWrapper } from "./createCategoryConfigureStoreWrapper";
import { FAKE_CATEGORY_ID } from "./EquipmentCategoryRow.constants";

const mockSave = vi.fn();
const mockRefresh = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: mockRefresh }),
}));

vi.mock("../utils/saveCategoryConfiguration", () => ({
  saveCategoryConfiguration: (options: object) =>
    mockSave(options),
}));

const { behavior, deposit, alerts } =
  DEFAULT_CATEGORY_CONFIGURATION;
const CHANGED_DRAFT = buildDraft({
  values: ONE_FLAG_EDITED_VALUES,
});
const INVALID_DRAFT = buildDraft({
  values: INVALID_EDITED_VALUES,
});

const buildOutcome = (
  steps: CategoryConfigurationSaveOutcome["steps"]
): CategoryConfigurationSaveOutcome => ({
  validation: {
    errors: NO_CONFIGURATION_ERRORS,
    invalidFieldCount: LENGTH.ZERO,
    isValid: true,
  },
  steps,
});

const useSaveWithRealFields = (
  draft: CategoryConfigureDraftViewModel
) => {
  const behaviorFields = useCategoryBehaviorFormFields({
    behavior,
  });
  const depositFields = useCategoryDepositFormFields({
    deposit,
  });
  const alertFields = useCategoryAlertFormFields({
    alerts,
  });

  return useCategoryConfigureSave({
    categoryId: FAKE_CATEGORY_ID,
    draft,
    fields: {
      behavior: behaviorFields,
      deposit: depositFields,
      alerts: alertFields,
    },
  });
};

const renderSave = (current: CategoryConfigureDraft) => {
  const { store, wrapper } =
    createCategoryConfigureStoreWrapper();
  const dispatchSpy = vi.spyOn(store, "dispatch");
  const onBaselineChange = vi.fn();
  const rendered = renderHook(
    () =>
      useSaveWithRealFields({
        baseline: BASELINE_DRAFT,
        current,
        changedCount: LENGTH.ONE,
        onToggleActive: vi.fn(),
        onBaselineChange,
      }),
    { wrapper }
  );
  const getState = () =>
    store.getState()[STORE_SLICES.CATEGORY_CONFIGURE];

  return {
    ...rendered,
    dispatchSpy,
    getState,
    onBaselineChange,
  };
};

describe("useCategoryConfigureSave", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows the errors and opens their sections without saving when the form is invalid", async () => {
    const { result, dispatchSpy, getState } =
      renderSave(INVALID_DRAFT);

    let isSaved = true;
    await act(async () => {
      isSaved = await result.current.onSave();
    });

    expect(isSaved).toBe(false);
    expect(mockSave).not.toHaveBeenCalled();
    expect(dispatchSpy).not.toHaveBeenCalledWith(
      categoryConfigureActions.setSaveStatus(
        SAVE_STATUS.SAVING
      )
    );
    expect(result.current.invalidFieldCount).toBe(
      INVALID_FIELD_COUNT
    );
    expect(getState().openSectionIds).toEqual(
      expect.arrayContaining([
        SECTION.RESERVATIONS,
        SECTION.DEPOSIT,
        SECTION.ALERTS,
      ])
    );
  });

  it("ignores a second save while the first one is still running", async () => {
    let resolveSave: (
      outcome: CategoryConfigurationSaveOutcome
    ) => void = () => undefined;
    mockSave.mockReturnValue(
      new Promise<CategoryConfigurationSaveOutcome>(
        (resolve) => {
          resolveSave = resolve;
        }
      )
    );
    const { result, getState } = renderSave(CHANGED_DRAFT);

    let secondResult = true;
    let firstSave = Promise.resolve(false);
    await act(async () => {
      firstSave = result.current.onSave();
      secondResult = await result.current.onSave();
    });

    expect(secondResult).toBe(false);
    expect(mockSave).toHaveBeenCalledTimes(LENGTH.ONE);
    expect(getState().saveStatus).toBe(SAVE_STATUS.SAVING);

    await act(async () => {
      resolveSave(
        buildOutcome({
          [STEP.SETTINGS]: SAVED_STEP_FEEDBACK,
        })
      );
      await firstSave;
    });

    expect(getState().saveStatus).toBe(SAVE_STATUS.SAVED);
  });

  it.each([
    {
      scenario: "nothing needed saving",
      steps: {},
      status: SAVE_STATUS.SAVED,
      isSaved: true,
      refreshes: LENGTH.ZERO,
    },
    {
      scenario: "the only step failed",
      steps: { [STEP.SETTINGS]: FAILED_STEP_FEEDBACK },
      status: SAVE_STATUS.FAILED,
      isSaved: false,
      refreshes: LENGTH.ZERO,
    },
    {
      scenario: "one step saved and another failed",
      steps: {
        [STEP.PHOTO]: FAILED_STEP_FEEDBACK,
        [STEP.SETTINGS]: SAVED_STEP_FEEDBACK,
      },
      status: SAVE_STATUS.FAILED,
      isSaved: false,
      refreshes: LENGTH.ONE,
    },
    {
      scenario: "every step saved",
      steps: { [STEP.SETTINGS]: SAVED_STEP_FEEDBACK },
      status: SAVE_STATUS.SAVED,
      isSaved: true,
      refreshes: LENGTH.ONE,
    },
  ])(
    "reports $status and refreshes $refreshes time(s) when $scenario",
    async ({ steps, status, isSaved, refreshes }) => {
      mockSave.mockResolvedValue(buildOutcome(steps));
      const { result, getState, onBaselineChange } =
        renderSave(CHANGED_DRAFT);

      let savedResult = !isSaved;
      await act(async () => {
        savedResult = await result.current.onSave();
      });

      expect(savedResult).toBe(isSaved);
      expect(getState().saveStatus).toBe(status);
      expect(mockRefresh).toHaveBeenCalledTimes(refreshes);
      expect(onBaselineChange).toHaveBeenCalledTimes(
        LENGTH.ONE
      );
    }
  );
});
