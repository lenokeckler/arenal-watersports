import { act, renderHook } from "@testing-library/react";
import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { STORE_SLICES } from "@/app/constants";
import { CATEGORY_CONFIGURE_NEXT_STEP_ID } from "../constants/CategoryConfigureNextStepId.constants";
import { CATEGORY_CONFIGURE_NEXT_STEPS_COPY } from "../constants/CategoryConfigureNextStepsCopy.constants";
import { CATEGORY_CONFIGURE_SECTION_ID } from "../constants/CategoryConfigureSectionId.constants";
import { useCategoryConfigureNextSteps } from "../hooks/useCategoryConfigureNextSteps";
import { resolveCategoryConfigureSectionAnchorId } from "../utils/resolveCategoryConfigureSectionAnchorId";
import {
  buildCategoryConfiguration,
  DEFAULT_CATEGORY_CONFIGURATION,
} from "./CategoryConfiguration.constants";
import { createCategoryConfigureStoreWrapper } from "./createCategoryConfigureStoreWrapper";

const { behavior, image } = DEFAULT_CATEGORY_CONFIGURATION;
const NO_STOCK = 0;
const INTERNAL_STEP_COUNT = 1;
const FIRST_STEP_INDEX = 0;
const PENDING_CONFIGURATION = buildCategoryConfiguration({
  currentQuantity: NO_STOCK,
  image: { ...image, imagePath: null },
});

describe("useCategoryConfigureNextSteps", () => {
  afterEach(() => {
    document.body.replaceChildren();
  });

  it("uses the internal body for a category that is not reservable", () => {
    const { wrapper } =
      createCategoryConfigureStoreWrapper();
    const internalConfiguration =
      buildCategoryConfiguration({
        currentQuantity: NO_STOCK,
        behavior: { ...behavior, isReservable: false },
      });

    const { result } = renderHook(
      () =>
        useCategoryConfigureNextSteps(
          internalConfiguration
        ),
      { wrapper }
    );

    expect(result.current?.body).toBe(
      CATEGORY_CONFIGURE_NEXT_STEPS_COPY.BODY_INTERNAL(
        internalConfiguration.name
      )
    );
    expect(result.current?.steps).toHaveLength(
      INTERNAL_STEP_COUNT
    );
  });

  it("opens the step section and scrolls it into view", () => {
    const { store, wrapper } =
      createCategoryConfigureStoreWrapper();
    const anchor = document.createElement("div");
    anchor.id = resolveCategoryConfigureSectionAnchorId(
      CATEGORY_CONFIGURE_SECTION_ID.PHOTO
    );
    anchor.scrollIntoView = vi.fn();
    document.body.append(anchor);
    const { result } = renderHook(
      () =>
        useCategoryConfigureNextSteps(
          PENDING_CONFIGURATION
        ),
      { wrapper }
    );

    act(() => {
      result.current?.steps[FIRST_STEP_INDEX].onAction(
        CATEGORY_CONFIGURE_NEXT_STEP_ID.PHOTO
      );
    });

    expect(
      store.getState()[STORE_SLICES.CATEGORY_CONFIGURE]
        .openSectionIds
    ).toContain(CATEGORY_CONFIGURE_SECTION_ID.PHOTO);
    expect(anchor.scrollIntoView).toHaveBeenCalledOnce();
  });
});
