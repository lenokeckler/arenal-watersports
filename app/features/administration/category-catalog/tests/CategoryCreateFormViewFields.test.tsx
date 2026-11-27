import { render } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS, STATUS } from "@/app/constants";
import CategoryCreateFormView from "../CategoryCreateFormView";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import { createCategoryCreateFormPage } from "./CategoryCreateForm.page";
import { resolveCategoryConfigurePath } from "../utils/resolveCategoryConfigurePath";
import {
  EXPECTED_CREATE_CATEGORY_INPUT,
  FAKE_CREATED_CATEGORY_ID,
  VALID_CATEGORY_CREATE_FORM_VALUES,
} from "./CategoryCreateFormValues.constants";

const mockPush = vi.fn();
const mockShowToast = vi.fn();
const mockCreateCategoryAction = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: mockShowToast }),
}));

vi.mock("../services/createCategoryAction", () => ({
  createCategoryAction: (
    input: typeof EXPECTED_CREATE_CATEGORY_INPUT
  ) => mockCreateCategoryAction(input),
}));

describe("CategoryCreateFormView fields", () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockShowToast.mockClear();
    mockCreateCategoryAction.mockReset();
  });

  it("creates the category and opens its Configurar screen when submitted with valid values", async () => {
    mockCreateCategoryAction.mockResolvedValue({
      status: CATEGORY_MUTATION_STATUS.SUCCESS,
      categoryId: FAKE_CREATED_CATEGORY_ID,
    });
    render(<CategoryCreateFormView />);
    const categoryCreateFormPage =
      createCategoryCreateFormPage();

    await categoryCreateFormPage.fillName(
      VALID_CATEGORY_CREATE_FORM_VALUES.name
    );
    await categoryCreateFormPage.selectChoice(
      CATEGORY_CATALOG_COPY.TRACKING_MODE_BY_UNIT_LABEL
    );
    await categoryCreateFormPage.fillGroupName(
      VALID_CATEGORY_CREATE_FORM_VALUES.groupName
    );
    await categoryCreateFormPage.submit();

    expect(mockCreateCategoryAction).toHaveBeenCalledWith(
      EXPECTED_CREATE_CATEGORY_INPUT
    );
    expect(mockShowToast).toHaveBeenCalledWith(
      STATUS.SUCCESS,
      CATEGORY_CATALOG_COPY.CREATE_SUCCESS_TOAST
    );
    expect(mockPush).toHaveBeenCalledWith(
      resolveCategoryConfigurePath(FAKE_CREATED_CATEGORY_ID)
    );
  });

  it("disables Guardar after the first click so a fast second click cannot submit twice", async () => {
    let resolveCreateCategoryAction: (
      result: Awaited<
        ReturnType<typeof mockCreateCategoryAction>
      >
    ) => void = () => undefined;
    mockCreateCategoryAction.mockReturnValue(
      new Promise((resolve) => {
        resolveCreateCategoryAction = resolve;
      })
    );
    render(<CategoryCreateFormView />);
    const categoryCreateFormPage =
      createCategoryCreateFormPage();

    await categoryCreateFormPage.fillName(
      VALID_CATEGORY_CREATE_FORM_VALUES.name
    );
    await categoryCreateFormPage.selectChoice(
      CATEGORY_CATALOG_COPY.TRACKING_MODE_BY_UNIT_LABEL
    );
    await categoryCreateFormPage.submit();
    expect(
      categoryCreateFormPage.isSubmitButtonLoading()
    ).toBe(true);
    await categoryCreateFormPage.clickLoadingSubmitButton();

    expect(mockCreateCategoryAction).toHaveBeenCalledTimes(
      1
    );

    resolveCreateCategoryAction({
      status: CATEGORY_MUTATION_STATUS.SUCCESS,
      categoryId: FAKE_CREATED_CATEGORY_ID,
    });
  });

  it("navigates back to the category list when Cancelar is clicked", async () => {
    render(<CategoryCreateFormView />);
    const categoryCreateFormPage =
      createCategoryCreateFormPage();

    await categoryCreateFormPage.cancel();

    expect(mockPush).toHaveBeenCalledWith(
      PATHS.ADMINISTRATION.CATEGORIES
    );
  });

  it("creates the category as not reservable when the internal equipment option is chosen", async () => {
    mockCreateCategoryAction.mockResolvedValue({
      status: CATEGORY_MUTATION_STATUS.SUCCESS,
      categoryId: FAKE_CREATED_CATEGORY_ID,
    });
    render(<CategoryCreateFormView />);
    const categoryCreateFormPage =
      createCategoryCreateFormPage();

    await categoryCreateFormPage.fillName(
      VALID_CATEGORY_CREATE_FORM_VALUES.name
    );
    await categoryCreateFormPage.selectChoice(
      CATEGORY_CATALOG_COPY.TRACKING_MODE_BY_QUANTITY_LABEL
    );
    await categoryCreateFormPage.selectChoice(
      CATEGORY_CATALOG_COPY.CREATE_RESERVABLE_NO
    );
    await categoryCreateFormPage.submit();

    expect(mockCreateCategoryAction).toHaveBeenCalledWith(
      expect.objectContaining({ isReservable: false })
    );
  });
});
