import userEvent from "@testing-library/user-event";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { KEYBOARD, PATHS, STATUS } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import {
  buildCategoryConfiguration,
  DEFAULT_CATEGORY_CONFIGURATION,
} from "./CategoryConfiguration.constants";
import { createCategoryConfigureViewPage } from "./CategoryConfigureView.page";
import { FAKE_CATEGORY_ID } from "./EquipmentCategoryRow.constants";
import {
  categoryConfigureRouter,
  renderCategoryConfigureView,
} from "./renderCategoryConfigureView";

const mockDeleteCategoryAction = vi.fn();
const mockMarkInactiveAction = vi.fn();

vi.mock("../services/deleteCategoryAction", () => ({
  deleteCategoryAction: (categoryId: string) =>
    mockDeleteCategoryAction(categoryId),
}));

vi.mock("../services/markCategoryInactiveAction", () => ({
  markCategoryInactiveAction: (categoryId: string) =>
    mockMarkInactiveAction(categoryId),
}));

const { name } = DEFAULT_CATEGORY_CONFIGURATION;
const { DELETE_CONFIRM, DELETE_DEACTIVATE, DELETE_TITLE } =
  CATEGORY_CONFIGURE_COPY;
const { DELETE_CATEGORY_BUTTON: DELETE_BUTTON } =
  CATEGORY_CATALOG_COPY;
const FAKE_FAILURE_MESSAGE = "The category was refused";

const openSheet = async () => {
  const store = renderCategoryConfigureView();
  const page = createCategoryConfigureViewPage();
  await page.clickButton(DELETE_BUTTON);

  return { page, store };
};

describe("CategoryConfigureDelete", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockDeleteCategoryAction.mockResolvedValue({
      status: CATEGORY_MUTATION_STATUS.SUCCESS,
    });
    mockMarkInactiveAction.mockResolvedValue({
      status: CATEGORY_MUTATION_STATUS.SUCCESS,
    });
  });

  it("offers no delete to a category that already has records", () => {
    renderCategoryConfigureView(
      buildCategoryConfiguration({ hasRecords: true })
    );

    expect(
      createCategoryConfigureViewPage().queryButton(
        DELETE_BUTTON
      )
    ).not.toBeInTheDocument();
  });

  it("asks for confirmation first, then deletes and goes back to the list", async () => {
    const { page } = await openSheet();

    expect(
      page.getDialog(DELETE_TITLE(name))
    ).toBeInTheDocument();
    expect(mockDeleteCategoryAction).not.toHaveBeenCalled();

    await page.clickButton(DELETE_CONFIRM(name));

    expect(mockDeleteCategoryAction).toHaveBeenCalledWith(
      FAKE_CATEGORY_ID
    );
    expect(
      categoryConfigureRouter.push
    ).toHaveBeenCalledWith(PATHS.ADMINISTRATION.CATEGORIES);
  });

  it("keeps the sheet open and reports the failure when the delete is refused", async () => {
    mockDeleteCategoryAction.mockResolvedValue({
      message: FAKE_FAILURE_MESSAGE,
      status: CATEGORY_MUTATION_STATUS.ERROR,
    });
    const { page, store } = await openSheet();

    await page.clickButton(DELETE_CONFIRM(name));

    expect(
      page.getDialog(DELETE_TITLE(name))
    ).toBeInTheDocument();
    expect(
      categoryConfigureRouter.push
    ).not.toHaveBeenCalled();
    expect(store.getState().toast.toasts).toMatchObject([
      { message: FAKE_FAILURE_MESSAGE, type: STATUS.ERROR },
    ]);
  });

  it("deactivates instead of deleting and closes the sheet", async () => {
    const { page } = await openSheet();

    await page.clickButton(DELETE_DEACTIVATE);

    expect(mockMarkInactiveAction).toHaveBeenCalledWith(
      FAKE_CATEGORY_ID
    );
    expect(mockDeleteCategoryAction).not.toHaveBeenCalled();
    expect(
      categoryConfigureRouter.refresh
    ).toHaveBeenCalled();
    expect(
      page.getDialog(DELETE_TITLE(name))
    ).not.toBeInTheDocument();
  });

  it("does not close the sheet while the delete is running", async () => {
    mockDeleteCategoryAction.mockReturnValue(
      new Promise(() => undefined)
    );
    const { page } = await openSheet();

    await page.clickButton(DELETE_CONFIRM(name));
    await userEvent.keyboard(`{${KEYBOARD.ESCAPE}}`);

    expect(
      page.getDialog(DELETE_TITLE(name))
    ).toBeInTheDocument();
  });
});
