import { describe, expect, it } from "vitest";
import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import { CATEGORY_CONFIGURE_SECTION_ID } from "../constants/CategoryConfigureSectionId.constants";
import { CATEGORY_CONFIGURE_TONE } from "../constants/CategoryConfigureTone.constants";
import { CATEGORY_TRACKING_MODE } from "../constants/CategoryTrackingMode.constants";
import { resolveCategoryConfigureSections } from "../utils/resolveCategoryConfigureSections";
import {
  buildCategoryConfiguration,
  DEFAULT_CATEGORY_CONFIGURATION,
} from "./CategoryConfiguration.constants";

const { behavior, image } = DEFAULT_CATEGORY_CONFIGURATION;
const SECTION_COUNT = 6;

describe("resolveCategoryConfigureSections", () => {
  it("lists the six sections in screen order", () => {
    const sections = resolveCategoryConfigureSections(
      buildCategoryConfiguration(),
      []
    );

    expect(sections).toHaveLength(SECTION_COUNT);
    expect(sections.map((section) => section.id)).toEqual([
      CATEGORY_CONFIGURE_SECTION_ID.RESERVATIONS,
      CATEGORY_CONFIGURE_SECTION_ID.INVENTORY,
      CATEGORY_CONFIGURE_SECTION_ID.PHOTO,
      CATEGORY_CONFIGURE_SECTION_ID.DEPOSIT,
      CATEGORY_CONFIGURE_SECTION_ID.ALERTS,
      CATEGORY_CONFIGURE_SECTION_ID.TRAITS,
    ]);
  });

  it("marks only the given sections as open", () => {
    const sections = resolveCategoryConfigureSections(
      buildCategoryConfiguration(),
      [CATEGORY_CONFIGURE_SECTION_ID.DEPOSIT]
    );

    expect(
      sections
        .filter((section) => section.isOpen)
        .map((section) => section.id)
    ).toEqual([CATEGORY_CONFIGURE_SECTION_ID.DEPOSIT]);
  });

  it.each([
    {
      trackingMode: CATEGORY_TRACKING_MODE.BY_UNIT,
      title:
        CATEGORY_CONFIGURE_COPY.SECTION_INVENTORY_BY_UNIT,
    },
    {
      trackingMode: CATEGORY_TRACKING_MODE.BY_QUANTITY,
      title:
        CATEGORY_CONFIGURE_COPY.SECTION_INVENTORY_BY_QUANTITY,
    },
  ])(
    "titles the inventory section after the $trackingMode mode",
    ({ trackingMode, title }) => {
      const sections = resolveCategoryConfigureSections(
        buildCategoryConfiguration({
          behavior: { ...behavior, trackingMode },
        }),
        []
      );

      expect(
        sections.find(
          (section) =>
            section.id ===
            CATEGORY_CONFIGURE_SECTION_ID.INVENTORY
        )?.title
      ).toBe(title);
    }
  );

  it("badges a missing photo and always badges the traits as optional", () => {
    const sections = resolveCategoryConfigureSections(
      buildCategoryConfiguration({
        image: { ...image, imagePath: null },
      }),
      []
    );
    const badges = sections.map((section) => section.badge);

    expect(badges).toEqual([
      null,
      null,
      {
        label: CATEGORY_CONFIGURE_COPY.BADGE_MISSING,
        tone: CATEGORY_CONFIGURE_TONE.WARNING,
      },
      null,
      null,
      {
        label: CATEGORY_CONFIGURE_COPY.BADGE_OPTIONAL,
        tone: CATEGORY_CONFIGURE_TONE.NEUTRAL,
      },
    ]);
  });

  it("does not badge a missing photo when the category is not reservable", () => {
    const sections = resolveCategoryConfigureSections(
      buildCategoryConfiguration({
        behavior: { ...behavior, isReservable: false },
        image: { ...image, imagePath: null },
      }),
      []
    );

    expect(
      sections.find(
        (section) =>
          section.id === CATEGORY_CONFIGURE_SECTION_ID.PHOTO
      )?.badge
    ).toBeNull();
  });
});
