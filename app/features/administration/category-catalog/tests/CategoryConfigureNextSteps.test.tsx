import {
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { STRING } from "@/app/constants";
import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import {
  CATEGORY_CONFIGURE_NEXT_STEP_COPY,
  CATEGORY_CONFIGURE_NEXT_STEPS_COPY,
} from "../constants/CategoryConfigureNextStepsCopy.constants";
import { CATEGORY_CONFIGURE_NEXT_STEP_ID } from "../constants/CategoryConfigureNextStepId.constants";
import type { CategoryConfigureNextStepId } from "../models/CategoryConfigureNextStepId.type";
import {
  buildCategoryConfiguration,
  DEFAULT_CATEGORY_CONFIGURATION,
} from "./CategoryConfiguration.constants";
import { createCategoryConfigureViewPage } from "./CategoryConfigureView.page";
import { renderCategoryConfigureView } from "./renderCategoryConfigureView";

const { behavior, image } = DEFAULT_CATEGORY_CONFIGURATION;
const NO_STOCK = 0;
const PENDING_DONE_COUNT = 1;
const RESERVABLE_REQUIRED_COUNT = 3;
const INTERNAL_REQUIRED_COUNT = 1;
const { DEPOSIT, PHOTO, STOCK } =
  CATEGORY_CONFIGURE_NEXT_STEP_ID;
const resolveActionLabel = (
  stepId: CategoryConfigureNextStepId
): string =>
  CATEGORY_CONFIGURE_NEXT_STEPS_COPY.ACTION_LABEL(
    CATEGORY_CONFIGURE_NEXT_STEP_COPY[stepId].action,
    CATEGORY_CONFIGURE_NEXT_STEP_COPY[stepId].title
  );
const PENDING_CONFIGURATION = buildCategoryConfiguration({
  currentQuantity: NO_STOCK,
  image: { ...image, imagePath: null },
});

describe("CategoryConfigureNextSteps", () => {
  beforeAll(() => {
    HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  it("shows the title, the progress and a button per pending step", () => {
    renderCategoryConfigureView(PENDING_CONFIGURATION);
    const page = createCategoryConfigureViewPage();

    expect(
      page.getHeading(
        CATEGORY_CONFIGURE_NEXT_STEPS_COPY.TITLE
      )
    ).toBeInTheDocument();
    expect(
      page.getText(
        CATEGORY_CONFIGURE_NEXT_STEPS_COPY.PROGRESS(
          PENDING_DONE_COUNT,
          RESERVABLE_REQUIRED_COUNT
        )
      )
    ).toBeInTheDocument();
    expect(
      page.queryButton(resolveActionLabel(PHOTO))
    ).toBeInTheDocument();
    expect(
      page.queryButton(resolveActionLabel(DEPOSIT))
    ).toBeInTheDocument();
  });

  it("opens the photo section when Agregar is pressed", async () => {
    renderCategoryConfigureView(PENDING_CONFIGURATION);
    const page = createCategoryConfigureViewPage();

    await page.clickButton(resolveActionLabel(PHOTO));

    expect(
      page.getSectionButton(
        CATEGORY_CONFIGURE_COPY.SECTION_PHOTO
      )
    ).toHaveAttribute("aria-expanded", STRING.TRUE);
  });

  it("hides the whole block once every required step is done", () => {
    renderCategoryConfigureView(
      buildCategoryConfiguration()
    );
    const page = createCategoryConfigureViewPage();

    expect(
      page.queryHeading(
        CATEGORY_CONFIGURE_NEXT_STEPS_COPY.TITLE
      )
    ).not.toBeInTheDocument();
  });

  it("lists only the stock step for a category that is not reservable", () => {
    renderCategoryConfigureView(
      buildCategoryConfiguration({
        currentQuantity: NO_STOCK,
        behavior: { ...behavior, isReservable: false },
      })
    );
    const page = createCategoryConfigureViewPage();

    expect(
      page.getText(
        CATEGORY_CONFIGURE_NEXT_STEPS_COPY.PROGRESS(
          NO_STOCK,
          INTERNAL_REQUIRED_COUNT
        )
      )
    ).toBeInTheDocument();
    expect(
      page.queryButton(resolveActionLabel(STOCK))
    ).toBeInTheDocument();
    expect(
      page.queryButton(resolveActionLabel(PHOTO))
    ).not.toBeInTheDocument();
  });
});
