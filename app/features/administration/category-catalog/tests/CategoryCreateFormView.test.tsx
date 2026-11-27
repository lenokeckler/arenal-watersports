import { render } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import CategoryCreateFormView from "../CategoryCreateFormView";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
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

describe("CategoryCreateFormView", () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockShowToast.mockClear();
    mockCreateCategoryAction.mockReset();
  });

  it("renders the heading and the three fields with their labels", () => {
    render(<CategoryCreateFormView />);
    const categoryCreateFormPage =
      createCategoryCreateFormPage();

    expect(
      categoryCreateFormPage.getHeading()
    ).toBeInTheDocument();
    expect(
      categoryCreateFormPage.getNameInput()
    ).toBeInTheDocument();
    expect(
      categoryCreateFormPage.getChoiceCard(
        CATEGORY_CATALOG_COPY.TRACKING_MODE_BY_UNIT_LABEL
      )
    ).toBeInTheDocument();
    expect(
      categoryCreateFormPage.isChoiceSelected(
        CATEGORY_CATALOG_COPY.CREATE_RESERVABLE_YES
      )
    ).toBe(true);
    expect(
      categoryCreateFormPage.getGroupNameInput()
    ).toBeInTheDocument();
  });

  it("shows the required-field errors and never calls the server when submitted empty", async () => {
    render(<CategoryCreateFormView />);
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
    render(<CategoryCreateFormView />);
    const categoryCreateFormPage =
      createCategoryCreateFormPage();

    await categoryCreateFormPage.submit();

    const nameInput = categoryCreateFormPage.getNameInput();

    expect(nameInput).toHaveAttribute(
      "aria-invalid",
      "true"
    );
    expect(nameInput).toHaveAccessibleDescription(
      expect.stringContaining(
        CATEGORY_CATALOG_COPY.NAME_FIELD_REQUIRED_ERROR
      )
    );
  });
});
