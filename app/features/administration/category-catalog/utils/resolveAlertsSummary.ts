import { LENGTH, STRING } from "@/app/constants";
import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import type { CategoryAlerts } from "../models/CategoryAlerts.interface";
import { joinSummaryParts } from "./joinSummaryParts";
import { resolveCountLabel } from "./resolveCountLabel";

export const resolveAlertsSummary = (
  alerts: CategoryAlerts
): string => {
  const parts: string[] = [];
  if (alerts.alertMinQuantity !== null) {
    parts.push(
      [
        CATEGORY_CONFIGURE_COPY.ALERTS_QUANTITY_PREFIX,
        alerts.alertMinQuantity,
      ].join(STRING.SPACE)
    );
  }
  if (alerts.alertExpiryDays !== null) {
    parts.push(
      [
        CATEGORY_CONFIGURE_COPY.ALERTS_EXPIRY_PREFIX,
        resolveCountLabel(
          alerts.alertExpiryDays,
          CATEGORY_CONFIGURE_COPY.ALERTS_EXPIRY_DAY_SINGULAR,
          CATEGORY_CONFIGURE_COPY.ALERTS_EXPIRY_DAY_PLURAL
        ),
      ].join(STRING.SPACE)
    );
  }

  return parts.length === LENGTH.ZERO
    ? CATEGORY_CONFIGURE_COPY.ALERTS_NONE
    : joinSummaryParts(parts);
};
