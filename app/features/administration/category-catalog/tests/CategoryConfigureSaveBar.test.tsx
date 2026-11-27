import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { LENGTH, STRING } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import { CATEGORY_CONFIGURE_SAVE_COPY } from "../constants/CategoryConfigureSaveCopy.constants";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import { FAKE_INVALID_AMOUNT_TEXT } from "./CategoryConfiguration.constants";
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

const {
  DIRTY_PLURAL,
  DIRTY_SINGULAR,
  FAILED,
  FIX_FIELDS_SINGULAR,
  RETRY,
  SAVE,
  SAVED,
  SAVING,
} = CATEGORY_CONFIGURE_SAVE_COPY;
const { ACTIVE_LABEL, GUIDE_ONLY_LABEL, SECTION_DEPOSIT } =
  CATEGORY_CONFIGURE_COPY;
const FAKE_REFUSAL_MESSAGE = "The category was refused";

const renderWithOneChange = async () => {
  renderCategoryConfigureView();
  const page = createCategoryConfigureViewPage();
  await page.toggleSwitch(GUIDE_ONLY_LABEL);

  return page;
};

describe("CategoryConfigureSaveBar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUpdateConfiguration.mockResolvedValue({
      status: CATEGORY_MUTATION_STATUS.SUCCESS,
    });
  });

  it("shows no message and keeps Guardar cambios disabled while nothing changed", () => {
    renderCategoryConfigureView();
    const page = createCategoryConfigureViewPage();

    expect(page.getStatusMessage()).toBeEmptyDOMElement();
    expect(page.queryButton(SAVE)).toBeDisabled();
  });

  it("counts the unsaved changes and enables Guardar cambios", async () => {
    const page = await renderWithOneChange();

    expect(page.getStatusMessage()).toHaveTextContent(
      DIRTY_SINGULAR
    );

    await page.toggleSwitch(ACTIVE_LABEL);

    expect(page.getStatusMessage()).toHaveTextContent(
      DIRTY_PLURAL(LENGTH.TWO)
    );
    expect(page.queryButton(SAVE)).toBeEnabled();
  });

  it("saves, confirms with Cambios guardados and leaves the bar disabled again", async () => {
    const page = await renderWithOneChange();

    await page.clickButton(SAVE);

    expect(mockUpdateConfiguration).toHaveBeenCalledTimes(
      LENGTH.ONE
    );
    expect(page.getStatusMessage()).toHaveTextContent(
      SAVED
    );
    expect(page.queryButton(SAVE)).toBeDisabled();
    expect(
      categoryConfigureRouter.refresh
    ).toHaveBeenCalled();
  });

  it("disables the button and says Guardando while the save runs", async () => {
    mockUpdateConfiguration.mockReturnValue(
      new Promise(() => undefined)
    );
    const page = await renderWithOneChange();

    await page.clickButton(SAVE);

    expect(page.queryButton(SAVING)).toBeDisabled();
    expect(page.queryButton(SAVE)).not.toBeInTheDocument();
  });

  it("announces a failed save as an alert, keeps the edited data and saves on Reintentar", async () => {
    mockUpdateConfiguration.mockResolvedValue({
      message: FAKE_REFUSAL_MESSAGE,
      status: CATEGORY_MUTATION_STATUS.ERROR,
    });
    const page = await renderWithOneChange();

    await page.clickButton(SAVE);

    expect(page.getAlert()).toHaveTextContent(FAILED);
    expect(page.getStatusMessage()).toHaveTextContent(
      STRING.Empty
    );
    expect(
      page.getActiveSwitch(GUIDE_ONLY_LABEL)
    ).toHaveAttribute("aria-checked", STRING.TRUE);
    expect(
      categoryConfigureRouter.refresh
    ).not.toHaveBeenCalled();

    mockUpdateConfiguration.mockResolvedValue({
      status: CATEGORY_MUTATION_STATUS.SUCCESS,
    });
    await page.clickButton(RETRY);

    expect(page.getAlert()).not.toBeInTheDocument();
    expect(page.getStatusMessage()).toHaveTextContent(
      SAVED
    );
    expect(page.queryButton(RETRY)).not.toBeInTheDocument();
  });

  it("asks to fix the invalid fields and opens their section instead of saving", async () => {
    renderCategoryConfigureView();
    const page = createCategoryConfigureViewPage();
    await page.toggleSection(SECTION_DEPOSIT);
    await page.fillField(
      CATEGORY_CATALOG_COPY.DEPOSIT_USD_FIELD_LABEL,
      FAKE_INVALID_AMOUNT_TEXT
    );
    await page.toggleSection(SECTION_DEPOSIT);
    expect(
      page.getSectionButton(SECTION_DEPOSIT)
    ).toHaveAttribute("aria-expanded", STRING.FALSE);

    await page.clickButton(SAVE);

    expect(page.getStatusMessage()).toHaveTextContent(
      FIX_FIELDS_SINGULAR
    );
    expect(
      page.getSectionButton(SECTION_DEPOSIT)
    ).toHaveAttribute("aria-expanded", STRING.TRUE);
    expect(mockUpdateConfiguration).not.toHaveBeenCalled();
  });
});
