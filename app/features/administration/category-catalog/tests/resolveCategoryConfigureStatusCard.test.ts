import { describe, expect, it } from "vitest";
import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import { CATEGORY_CONFIGURE_TONE } from "../constants/CategoryConfigureTone.constants";
import { CATEGORY_STATUS } from "../constants/CategoryStatus.constants";
import { resolveCategoryConfigureStatusCard } from "../utils/resolveCategoryConfigureStatusCard";
import {
  buildCategoryConfiguration,
  DEFAULT_CATEGORY_CONFIGURATION,
} from "./CategoryConfiguration.constants";

const { behavior, image } = DEFAULT_CATEGORY_CONFIGURATION;
const NO_STOCK = 0;

describe("resolveCategoryConfigureStatusCard", () => {
  it.each([
    {
      scenario: "an active reservable category",
      configuration: buildCategoryConfiguration(),
      chips: [
        {
          label: CATEGORY_CONFIGURE_COPY.STATUS_ON_BOARD,
          tone: CATEGORY_CONFIGURE_TONE.SUCCESS,
        },
      ],
      detail:
        CATEGORY_CONFIGURE_COPY.STATUS_ON_BOARD_DETAIL,
    },
    {
      scenario: "an active guide only category",
      configuration: buildCategoryConfiguration({
        behavior: { ...behavior, guideOnly: true },
      }),
      chips: [
        {
          label: CATEGORY_CONFIGURE_COPY.STATUS_ON_BOARD,
          tone: CATEGORY_CONFIGURE_TONE.SUCCESS,
        },
        {
          label: CATEGORY_CONFIGURE_COPY.STATUS_GUIDE_ONLY,
          tone: CATEGORY_CONFIGURE_TONE.INFO,
        },
      ],
      detail:
        CATEGORY_CONFIGURE_COPY.STATUS_ON_BOARD_DETAIL,
    },
    {
      scenario: "an active internal category",
      configuration: buildCategoryConfiguration({
        behavior: { ...behavior, isReservable: false },
      }),
      chips: [
        {
          label:
            CATEGORY_CONFIGURE_COPY.STATUS_INVENTORY_ONLY,
          tone: CATEGORY_CONFIGURE_TONE.NEUTRAL,
        },
      ],
      detail:
        CATEGORY_CONFIGURE_COPY.STATUS_INVENTORY_ONLY_DETAIL,
    },
    {
      scenario: "an inactive category",
      configuration: buildCategoryConfiguration({
        status: CATEGORY_STATUS.INACTIVE,
      }),
      chips: [
        {
          label: CATEGORY_CONFIGURE_COPY.STATUS_INACTIVE,
          tone: CATEGORY_CONFIGURE_TONE.ERROR,
        },
      ],
      detail:
        CATEGORY_CONFIGURE_COPY.STATUS_INACTIVE_DETAIL,
    },
  ])("$scenario", ({ configuration, chips, detail }) => {
    const statusCard =
      resolveCategoryConfigureStatusCard(configuration);

    expect(statusCard.chips).toEqual(chips);
    expect(statusCard.detail).toBe(detail);
  });

  it("flags only an inactive category as not active", () => {
    expect(
      resolveCategoryConfigureStatusCard(
        buildCategoryConfiguration()
      ).isActive
    ).toBe(true);
    expect(
      resolveCategoryConfigureStatusCard(
        buildCategoryConfiguration({
          status: CATEGORY_STATUS.INACTIVE,
        })
      ).isActive
    ).toBe(false);
  });

  it("has no missing note when stock, duration and photo are set", () => {
    expect(
      resolveCategoryConfigureStatusCard(
        buildCategoryConfiguration()
      ).missingNote
    ).toBeNull();
  });

  it("lists every missing item in order", () => {
    const configuration = buildCategoryConfiguration({
      currentQuantity: NO_STOCK,
      behavior: {
        ...behavior,
        defaultDurationMinutes: null,
      },
      image: { ...image, imagePath: null },
    });

    expect(
      resolveCategoryConfigureStatusCard(configuration)
        .missingNote
    ).toBe("Falta: existencias, duración, foto (opcional)");
  });

  it("does not ask for a duration when the category is not reservable", () => {
    const configuration = buildCategoryConfiguration({
      behavior: {
        ...behavior,
        isReservable: false,
        defaultDurationMinutes: null,
      },
    });

    expect(
      resolveCategoryConfigureStatusCard(configuration)
        .missingNote
    ).toBeNull();
  });

  it("does not ask for a photo when the category is not reservable", () => {
    const configuration = buildCategoryConfiguration({
      behavior: { ...behavior, isReservable: false },
      image: { ...image, imagePath: null },
    });

    expect(
      resolveCategoryConfigureStatusCard(configuration)
        .missingNote
    ).toBeNull();
  });
});
