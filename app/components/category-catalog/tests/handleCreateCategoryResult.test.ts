import { describe, expect, it, vi } from "vitest";
import { STATUS } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import { handleCreateCategoryResult } from "../utils/handleCreateCategoryResult";

const FAKE_NAME_ERROR = "fake-name-error";
const FAKE_GROUP_NAME_ERROR = "fake-group-name-error";

const buildOptions = () => ({
  showToast: vi.fn(),
  onSuccess: vi.fn(),
  onGroupNameError: vi.fn(),
  onNameError: vi.fn(),
});

describe("handleCreateCategoryResult", () => {
  it("shows the success toast and calls onSuccess when the category was created", () => {
    const options = buildOptions();

    handleCreateCategoryResult(
      { status: CATEGORY_MUTATION_STATUS.SUCCESS },
      options
    );

    expect(options.showToast).toHaveBeenCalledWith(
      STATUS.SUCCESS,
      CATEGORY_CATALOG_COPY.CREATE_SUCCESS_TOAST
    );
    expect(options.onSuccess).toHaveBeenCalledOnce();
  });

  it("routes a name error to the name field without a toast", () => {
    const options = buildOptions();

    handleCreateCategoryResult(
      {
        status: CATEGORY_MUTATION_STATUS.ERROR,
        nameError: FAKE_NAME_ERROR,
      },
      options
    );

    expect(options.onNameError).toHaveBeenCalledWith(
      FAKE_NAME_ERROR
    );
    expect(options.showToast).not.toHaveBeenCalled();
  });

  it("routes a group name error to the group field without a toast", () => {
    const options = buildOptions();

    handleCreateCategoryResult(
      {
        status: CATEGORY_MUTATION_STATUS.ERROR,
        groupNameError: FAKE_GROUP_NAME_ERROR,
      },
      options
    );

    expect(options.onGroupNameError).toHaveBeenCalledWith(
      FAKE_GROUP_NAME_ERROR
    );
    expect(options.showToast).not.toHaveBeenCalled();
  });

  it("shows the generic error toast when the error has no field", () => {
    const options = buildOptions();

    handleCreateCategoryResult(
      { status: CATEGORY_MUTATION_STATUS.ERROR },
      options
    );

    expect(options.showToast).toHaveBeenCalledWith(
      STATUS.ERROR,
      CATEGORY_CATALOG_COPY.GENERIC_MUTATION_ERROR
    );
    expect(options.onNameError).not.toHaveBeenCalled();
  });
});
