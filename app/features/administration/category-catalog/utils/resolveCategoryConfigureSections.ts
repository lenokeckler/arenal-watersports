import type { NullableRef } from "@/app/types";
import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import { CATEGORY_CONFIGURE_SECTION_ID } from "../constants/CategoryConfigureSectionId.constants";
import { CATEGORY_CONFIGURE_SECTION_ORDER } from "../constants/CategoryConfigureSectionOrder.constants";
import { CATEGORY_CONFIGURE_TONE } from "../constants/CategoryConfigureTone.constants";
import { CATEGORY_TRACKING_MODE } from "../constants/CategoryTrackingMode.constants";
import type { CategoryConfiguration } from "../models/CategoryConfiguration.interface";
import type { CategoryConfigureChipProps } from "../models/CategoryConfigureChipProps.interface";
import type { CategoryConfigureSectionId } from "../models/CategoryConfigureSectionId.type";
import type { CategoryConfigureSectionModel } from "../models/CategoryConfigureSectionModel.interface";
import { resolveAlertsSummary } from "./resolveAlertsSummary";
import { resolveDepositSummary } from "./resolveDepositSummary";
import { resolvePhotoSummary } from "./resolvePhotoSummary";
import { resolveReservationsSummary } from "./resolveReservationsSummary";
import { resolveStockSummary } from "./resolveStockSummary";
import { resolveTraitsSummary } from "./resolveTraitsSummary";

const resolveInventoryTitle = ({
  behavior,
}: CategoryConfiguration): string =>
  behavior.trackingMode === CATEGORY_TRACKING_MODE.BY_UNIT
    ? CATEGORY_CONFIGURE_COPY.SECTION_INVENTORY_BY_UNIT
    : CATEGORY_CONFIGURE_COPY.SECTION_INVENTORY_BY_QUANTITY;

const resolveTitle = (
  sectionId: CategoryConfigureSectionId,
  configuration: CategoryConfiguration
): string => {
  const titles: Record<CategoryConfigureSectionId, string> =
    {
      [CATEGORY_CONFIGURE_SECTION_ID.ALERTS]:
        CATEGORY_CONFIGURE_COPY.SECTION_ALERTS,
      [CATEGORY_CONFIGURE_SECTION_ID.DEPOSIT]:
        CATEGORY_CONFIGURE_COPY.SECTION_DEPOSIT,
      [CATEGORY_CONFIGURE_SECTION_ID.INVENTORY]:
        resolveInventoryTitle(configuration),
      [CATEGORY_CONFIGURE_SECTION_ID.PHOTO]:
        CATEGORY_CONFIGURE_COPY.SECTION_PHOTO,
      [CATEGORY_CONFIGURE_SECTION_ID.RESERVATIONS]:
        CATEGORY_CONFIGURE_COPY.SECTION_RESERVATIONS,
      [CATEGORY_CONFIGURE_SECTION_ID.TRAITS]:
        CATEGORY_CONFIGURE_COPY.SECTION_TRAITS,
    };

  return titles[sectionId];
};

const resolveSummary = (
  sectionId: CategoryConfigureSectionId,
  configuration: CategoryConfiguration
): string => {
  const summaries: Record<
    CategoryConfigureSectionId,
    string
  > = {
    [CATEGORY_CONFIGURE_SECTION_ID.ALERTS]:
      resolveAlertsSummary(configuration.alerts),
    [CATEGORY_CONFIGURE_SECTION_ID.DEPOSIT]:
      resolveDepositSummary(configuration.deposit),
    [CATEGORY_CONFIGURE_SECTION_ID.INVENTORY]:
      resolveStockSummary(configuration.currentQuantity),
    [CATEGORY_CONFIGURE_SECTION_ID.PHOTO]:
      resolvePhotoSummary(configuration.image),
    [CATEGORY_CONFIGURE_SECTION_ID.RESERVATIONS]:
      resolveReservationsSummary(configuration.behavior),
    [CATEGORY_CONFIGURE_SECTION_ID.TRAITS]:
      resolveTraitsSummary(configuration.behavior),
  };

  return summaries[sectionId];
};

const resolveBadge = (
  sectionId: CategoryConfigureSectionId,
  { behavior, image }: CategoryConfiguration
): NullableRef<CategoryConfigureChipProps> => {
  if (
    sectionId === CATEGORY_CONFIGURE_SECTION_ID.PHOTO &&
    behavior.isReservable &&
    !image.imagePath
  ) {
    return {
      label: CATEGORY_CONFIGURE_COPY.BADGE_MISSING,
      tone: CATEGORY_CONFIGURE_TONE.WARNING,
    };
  }
  if (sectionId === CATEGORY_CONFIGURE_SECTION_ID.TRAITS) {
    return {
      label: CATEGORY_CONFIGURE_COPY.BADGE_OPTIONAL,
      tone: CATEGORY_CONFIGURE_TONE.NEUTRAL,
    };
  }

  return null;
};

export const resolveCategoryConfigureSections = (
  configuration: CategoryConfiguration,
  openSectionIds: CategoryConfigureSectionId[]
): CategoryConfigureSectionModel[] =>
  CATEGORY_CONFIGURE_SECTION_ORDER.map((sectionId) => ({
    id: sectionId,
    title: resolveTitle(sectionId, configuration),
    summary: resolveSummary(sectionId, configuration),
    badge: resolveBadge(sectionId, configuration),
    isOpen: openSectionIds.includes(sectionId),
  }));
