import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { LENGTH, PATHS } from "@/app/constants";
import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import { CATEGORY_CONFIGURE_SAVE_COPY } from "../constants/CategoryConfigureSaveCopy.constants";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import { resolveDirtyLabel } from "../utils/resolveDirtyLabel";
import { DEFAULT_CATEGORY_CONFIGURATION } from "./CategoryConfiguration.constants";
import { createCategoryConfigureViewPage } from "./CategoryConfigureView.page";
import {
  categoryConfigureRouter,
  renderCategoryConfigureView,
} from "./renderCategoryConfigureView";

const mockUpdateConfiguration = vi.fn();

vi.mock(
  "../services/updateCategoryConfigurationAction",
  () => ({
    updateCategoryConfigurationAction: (input: object) =>
      mockUpdateConfiguration(input),
  })
);

const { name } = DEFAULT_CATEGORY_CONFIGURATION;
const {
  BACK,
  CANCEL,
  GUIDE_ONLY_LABEL,
  LEAVE_BODY,
  LEAVE_DISCARD,
  LEAVE_SAVE,
  LEAVE_TITLE,
} = CATEGORY_CONFIGURE_COPY;

const openLeaveSheet = async () => {
  renderCategoryConfigureView();
  const page = createCategoryConfigureViewPage();
  await page.toggleSwitch(GUIDE_ONLY_LABEL);
  await page.requestLeave(BACK);

  return page;
};

describe("CategoryConfigureLeaveSheet", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUpdateConfiguration.mockResolvedValue({
      status: CATEGORY_MUTATION_STATUS.SUCCESS,
    });
  });

  it("opens with the dirty count and the category name when leaving with changes", async () => {
    const page = await openLeaveSheet();

    expect(page.getDialog(LEAVE_TITLE)).toBeInTheDocument();
    expect(
      page.getText(
        LEAVE_BODY(resolveDirtyLabel(LENGTH.ONE), name)
      )
    ).toBeInTheDocument();
  });

  it("goes to the list without saving on Regresar sin guardar", async () => {
    const page = await openLeaveSheet();

    await page.clickButton(LEAVE_DISCARD);

    expect(
      categoryConfigureRouter.push
    ).toHaveBeenCalledWith(PATHS.ADMINISTRATION.CATEGORIES);
    expect(mockUpdateConfiguration).not.toHaveBeenCalled();
  });

  it("closes and stays on the screen on Cancelar", async () => {
    const page = await openLeaveSheet();

    await page.clickButton(CANCEL);

    expect(
      page.getDialog(LEAVE_TITLE)
    ).not.toBeInTheDocument();
    expect(
      categoryConfigureRouter.push
    ).not.toHaveBeenCalled();
  });

  it("closes and stays on the screen on Escape", async () => {
    const page = await openLeaveSheet();

    await page.pressEscape();

    expect(
      page.getDialog(LEAVE_TITLE)
    ).not.toBeInTheDocument();
    expect(
      categoryConfigureRouter.push
    ).not.toHaveBeenCalled();
  });

  it("saves and then goes to the list on Guardar y regresar", async () => {
    const page = await openLeaveSheet();

    await page.clickButton(LEAVE_SAVE);

    expect(mockUpdateConfiguration).toHaveBeenCalledTimes(
      LENGTH.ONE
    );
    expect(
      categoryConfigureRouter.push
    ).toHaveBeenCalledWith(PATHS.ADMINISTRATION.CATEGORIES);
  });

  it("stays on the screen with the failure message when the save failed", async () => {
    mockUpdateConfiguration.mockResolvedValue({
      status: CATEGORY_MUTATION_STATUS.ERROR,
    });
    const page = await openLeaveSheet();

    await page.clickButton(LEAVE_SAVE);

    expect(
      categoryConfigureRouter.push
    ).not.toHaveBeenCalled();
    expect(
      page.getDialog(LEAVE_TITLE)
    ).not.toBeInTheDocument();
    expect(page.getAlert()).toHaveTextContent(
      CATEGORY_CONFIGURE_SAVE_COPY.FAILED
    );
  });

  it("cannot be dismissed while the save runs", async () => {
    mockUpdateConfiguration.mockReturnValue(
      new Promise(() => undefined)
    );
    const page = await openLeaveSheet();

    await page.clickButton(LEAVE_SAVE);
    await page.pressEscape();

    expect(page.getDialog(LEAVE_TITLE)).toBeInTheDocument();
    expect(page.queryButton(LEAVE_DISCARD)).toBeDisabled();
    expect(page.queryButton(CANCEL)).toBeDisabled();
  });
});
