import { render } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS, STATUS } from "@/app/constants";
import CategoryCreateForm from "../CategoryCreateForm";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import { createCategoryCreateFormPage } from "./CategoryCreateForm.page";
import { VALID_CATEGORY_CREATE_FORM_VALUES } from "./CategoryCreateFormValues.constants";

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
    input: typeof VALID_CATEGORY_CREATE_FORM_VALUES
  ) => mockCreateCategoryAction(input),
}));

describe("CategoryCreateForm", () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockShowToast.mockClear();
    mockCreateCategoryAction.mockReset();
  });

  it("renders the heading and the three fields with their labels", () => {
    render(<CategoryCreateForm />);
    const categoryCreateFormPage =
      createCategoryCreateFormPage();

    expect(
      categoryCreateFormPage.getHeading()
    ).toBeInTheDocument();
    expect(
      categoryCreateFormPage.getNameInput()
    ).toBeInTheDocument();
    expect(
      categoryCreateFormPage.getTrackingModeInput()
    ).toBeInTheDocument();
    expect(
      categoryCreateFormPage.getGroupNameInput()
    ).toBeInTheDocument();
  });

  it("shows the required-field errors and never calls the server when submitted empty", async () => {
    render(<CategoryCreateForm />);
    const categoryCreateFormPage =
      createCategoryCreateFormPage();

    await categoryCreateFormPage.submit();

    expect(
      categoryCreateFormPage.getNameError()
    ).toBeInTheDocument();
    expect(
      categoryCreateFormPage.getTrackingModeError()
    ).toBeInTheDocument();
    expect(mockCreateCategoryAction).not.toHaveBeenCalled();
    expect(mockShowToast).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("marks the invalid fields with aria-invalid and points aria-describedby at their error text", async () => {
    render(<CategoryCreateForm />);
    const categoryCreateFormPage =
      createCategoryCreateFormPage();

    await categoryCreateFormPage.submit();

    const nameInput = categoryCreateFormPage.getNameInput();
    const trackingModeInput =
      categoryCreateFormPage.getTrackingModeInput();

    expect(nameInput).toHaveAttribute(
      "aria-invalid",
      "true"
    );
    expect(trackingModeInput).toHaveAttribute(
      "aria-invalid",
      "true"
    );
    expect(
      document.getElementById(
        nameInput.getAttribute("aria-describedby") ?? ""
      )
    ).toHaveTextContent(
      CATEGORY_CATALOG_COPY.NAME_FIELD_REQUIRED_ERROR
    );
    expect(
      document.getElementById(
        trackingModeInput.getAttribute(
          "aria-describedby"
        ) ?? ""
      )
    ).toHaveTextContent(
      CATEGORY_CATALOG_COPY.TRACKING_MODE_REQUIRED_ERROR
    );
  });

  it("creates the category and navigates back when submitted with valid values", async () => {
    mockCreateCategoryAction.mockResolvedValue({
      status: CATEGORY_MUTATION_STATUS.SUCCESS,
      categoryId: "some-id",
    });
    render(<CategoryCreateForm />);
    const categoryCreateFormPage =
      createCategoryCreateFormPage();

    await categoryCreateFormPage.fillName(
      VALID_CATEGORY_CREATE_FORM_VALUES.name
    );
    await categoryCreateFormPage.selectTrackingMode(
      VALID_CATEGORY_CREATE_FORM_VALUES.trackingMode
    );
    await categoryCreateFormPage.fillGroupName(
      VALID_CATEGORY_CREATE_FORM_VALUES.groupName
    );
    await categoryCreateFormPage.submit();

    expect(mockCreateCategoryAction).toHaveBeenCalledWith(
      VALID_CATEGORY_CREATE_FORM_VALUES
    );
    expect(mockShowToast).toHaveBeenCalledWith(
      STATUS.SUCCESS,
      CATEGORY_CATALOG_COPY.CREATE_SUCCESS_TOAST
    );
    expect(mockPush).toHaveBeenCalledWith(
      PATHS.ADMINISTRATION.CATEGORIES
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
    render(<CategoryCreateForm />);
    const categoryCreateFormPage =
      createCategoryCreateFormPage();

    await categoryCreateFormPage.fillName(
      VALID_CATEGORY_CREATE_FORM_VALUES.name
    );
    await categoryCreateFormPage.selectTrackingMode(
      VALID_CATEGORY_CREATE_FORM_VALUES.trackingMode
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
      categoryId: "some-id",
    });
  });

  it("navigates back to the category list when Cancelar is clicked", async () => {
    render(<CategoryCreateForm />);
    const categoryCreateFormPage =
      createCategoryCreateFormPage();

    await categoryCreateFormPage.cancel();

    expect(mockPush).toHaveBeenCalledWith(
      PATHS.ADMINISTRATION.CATEGORIES
    );
  });
});
