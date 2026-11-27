import { CATEGORY_CONFIGURE_SECTION_ID } from "../constants/CategoryConfigureSectionId.constants";
import type { CategoryConfigurationErrors } from "../models/CategoryConfigurationErrors.interface";
import type { CategoryConfigureSectionId } from "../models/CategoryConfigureSectionId.type";

const hasErrors = (sectionErrors: object): boolean =>
  Object.keys(sectionErrors).length > 0;

export const resolveInvalidSectionIds = ({
  behavior,
  deposit,
  alerts,
}: CategoryConfigurationErrors): CategoryConfigureSectionId[] => {
  const invalidSectionIds: CategoryConfigureSectionId[] =
    [];
  if (behavior.defaultDurationMinutes !== undefined) {
    invalidSectionIds.push(
      CATEGORY_CONFIGURE_SECTION_ID.RESERVATIONS
    );
  }
  if (hasErrors(deposit)) {
    invalidSectionIds.push(
      CATEGORY_CONFIGURE_SECTION_ID.DEPOSIT
    );
  }
  if (hasErrors(alerts)) {
    invalidSectionIds.push(
      CATEGORY_CONFIGURE_SECTION_ID.ALERTS
    );
  }
  if (behavior.lowFuelLines !== undefined) {
    invalidSectionIds.push(
      CATEGORY_CONFIGURE_SECTION_ID.TRAITS
    );
  }

  return invalidSectionIds;
};
