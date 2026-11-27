import {
  CATEGORY_CONFIGURE_STATUS_DETAIL,
  CATEGORY_CONFIGURE_STATUS_LABEL,
} from "../constants/CategoryConfigureStatusLabel.constants";
import { CATEGORY_CONFIGURE_STATUS_TONE } from "../constants/CategoryConfigureStatusTone.constants";
import { CATEGORY_STATUS } from "../constants/CategoryStatus.constants";
import { CATEGORY_TRACKING_MODE_LABEL } from "../constants/CategoryTrackingModeLabel.constants";
import type { CategoryConfiguration } from "../models/CategoryConfiguration.interface";
import type { CategoryConfigureStatusCardProps } from "../models/CategoryConfigureStatusCardProps.interface";
import { resolveCategoryConfigureStatuses } from "./resolveCategoryConfigureStatuses";
import { resolveMissingNote } from "./resolveMissingNote";

export const resolveCategoryConfigureStatusCard = (
  configuration: CategoryConfiguration
): CategoryConfigureStatusCardProps => {
  const statuses =
    resolveCategoryConfigureStatuses(configuration);
  const primaryStatus = statuses[0];

  return {
    chips: statuses.map((status) => ({
      label: CATEGORY_CONFIGURE_STATUS_LABEL[status],
      tone: CATEGORY_CONFIGURE_STATUS_TONE[status],
    })),
    detail: CATEGORY_CONFIGURE_STATUS_DETAIL[primaryStatus],
    missingNote: resolveMissingNote(configuration),
    isActive:
      configuration.status === CATEGORY_STATUS.ACTIVE,
    trackingModeLabel:
      CATEGORY_TRACKING_MODE_LABEL[
        configuration.behavior.trackingMode
      ],
  };
};
