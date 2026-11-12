import { act, renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { STATUS } from "@/app/constants";
import { CATEGORY_IMAGE_COPY } from "../constants/CategoryImageCopy.constants";
import { useCategoryImageRemoval } from "../hooks/useCategoryImageRemoval";
import type { CategoryImageSaveOutcome } from "../models/CategoryImageSaveOutcome.interface";
import { IMAGE_CATEGORY_ID } from "./CategoryImage.constants";

const mockShowToast = vi.fn();
const mockRemoveCategoryImage = vi.fn();
const mockOnRemoved = vi.fn();

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: mockShowToast }),
}));

vi.mock("../utils/removeCategoryImage", () => ({
  removeCategoryImage: (categoryId: string) =>
    mockRemoveCategoryImage(categoryId),
}));

const REMOVED_OUTCOME: CategoryImageSaveOutcome = {
  hasLeftoverObject: false,
  message: CATEGORY_IMAGE_COPY.REMOVE_SUCCESS_TOAST,
  status: STATUS.SUCCESS,
};

const renderRemoval = () =>
  renderHook(() =>
    useCategoryImageRemoval({
      categoryId: IMAGE_CATEGORY_ID,
      onRemoved: mockOnRemoved,
    })
  );

describe("useCategoryImageRemoval", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockRemoveCategoryImage.mockResolvedValue(
      REMOVED_OUTCOME
    );
  });

  it("asks for confirmation first and removes nothing yet", () => {
    const { result } = renderRemoval();

    act(() => result.current.requestRemoval());

    expect(result.current.isConfirmingRemoval).toBe(true);
    expect(mockRemoveCategoryImage).not.toHaveBeenCalled();
  });

  it("cancels the confirmation", () => {
    const { result } = renderRemoval();

    act(() => result.current.requestRemoval());
    act(() => result.current.cancelRemoval());

    expect(result.current.isConfirmingRemoval).toBe(false);
  });

  it("removes after confirming, toasts and notifies the screen", async () => {
    const { result } = renderRemoval();

    act(() => result.current.requestRemoval());
    await act(() => result.current.confirmRemoval());

    expect(mockRemoveCategoryImage).toHaveBeenCalledWith(
      IMAGE_CATEGORY_ID
    );
    expect(mockShowToast).toHaveBeenCalledWith(
      STATUS.SUCCESS,
      CATEGORY_IMAGE_COPY.REMOVE_SUCCESS_TOAST
    );
    expect(mockOnRemoved).toHaveBeenCalledOnce();
    expect(result.current.isConfirmingRemoval).toBe(false);
  });

  it("toasts the error and does not notify the screen when removal fails", async () => {
    mockRemoveCategoryImage.mockResolvedValue({
      ...REMOVED_OUTCOME,
      message: CATEGORY_IMAGE_COPY.REMOVE_ERROR,
      status: STATUS.ERROR,
    });
    const { result } = renderRemoval();

    act(() => result.current.requestRemoval());
    await act(() => result.current.confirmRemoval());

    expect(mockShowToast).toHaveBeenCalledWith(
      STATUS.ERROR,
      CATEGORY_IMAGE_COPY.REMOVE_ERROR
    );
    expect(mockOnRemoved).not.toHaveBeenCalled();
  });
});
