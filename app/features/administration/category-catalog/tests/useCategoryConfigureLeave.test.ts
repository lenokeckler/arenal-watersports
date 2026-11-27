import { act, renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import { CATEGORY_CONFIGURE_SAVE_STATUS } from "../constants/CategoryConfigureSaveStatus.constants";
import { useCategoryConfigureLeave } from "../hooks/useCategoryConfigureLeave";
import { categoryConfigureActions } from "../store/categoryConfigureSlice";
import { resolveDirtyLabel } from "../utils/resolveDirtyLabel";
import { DEFAULT_CATEGORY_CONFIGURATION } from "./CategoryConfiguration.constants";
import { createCategoryConfigureStoreWrapper } from "./createCategoryConfigureStoreWrapper";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

const { name } = DEFAULT_CATEGORY_CONFIGURATION;
const CHANGED_COUNT = 2;

const renderLeave = (
  onSave: () => Promise<boolean> = () =>
    Promise.resolve(true),
  changedCount = CHANGED_COUNT
) => {
  const { store, wrapper } =
    createCategoryConfigureStoreWrapper();
  const rendered = renderHook(
    () =>
      useCategoryConfigureLeave({
        name,
        changedCount,
        onSave,
      }),
    { wrapper }
  );

  return { ...rendered, store };
};

describe("useCategoryConfigureLeave", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("has nothing to guard and no sheet without changes", () => {
    const { result } = renderLeave(undefined, 0);

    expect(result.current.hasUnsavedChanges).toBe(false);
    expect(result.current.sheet).toBeNull();
  });

  it("opens the sheet with the dirty count and the category name", () => {
    const { result } = renderLeave();

    act(() => result.current.onRequestLeave());

    expect(result.current.sheet?.body).toBe(
      CATEGORY_CONFIGURE_COPY.LEAVE_BODY(
        resolveDirtyLabel(CHANGED_COUNT),
        name
      )
    );
  });

  it("goes to the list and closes the sheet when the changes are discarded", () => {
    const { result } = renderLeave();
    act(() => result.current.onRequestLeave());

    act(() => result.current.sheet?.onDiscard());

    expect(mockPush).toHaveBeenCalledWith(
      PATHS.ADMINISTRATION.CATEGORIES
    );
    expect(result.current.sheet).toBeNull();
  });

  it.each([
    { saved: true, pushes: 1 },
    { saved: false, pushes: 0 },
  ])(
    "closes the sheet and goes to the list only when the save succeeded (saved: $saved)",
    async ({ saved, pushes }) => {
      const { result } = renderLeave(() =>
        Promise.resolve(saved)
      );
      act(() => result.current.onRequestLeave());

      await act(async () => {
        await result.current.sheet?.onSaveAndLeave();
      });

      expect(mockPush).toHaveBeenCalledTimes(pushes);
      expect(result.current.sheet).toBeNull();
    }
  );

  it("does not close the sheet from cancel while saving", () => {
    const { result, store } = renderLeave();
    act(() => {
      store.dispatch(
        categoryConfigureActions.setSaveStatus(
          CATEGORY_CONFIGURE_SAVE_STATUS.SAVING
        )
      );
      result.current.onRequestLeave();
    });

    act(() => result.current.sheet?.onCancel());

    expect(result.current.sheet?.isSaving).toBe(true);
  });

  it("closes the sheet from cancel when not saving", () => {
    const { result } = renderLeave();
    act(() => result.current.onRequestLeave());

    act(() => result.current.sheet?.onCancel());

    expect(result.current.sheet).toBeNull();
  });
});
