import {
  RESERVATIONS_CALENDAR_COPY,
  RESERVATION_CALENDAR_GUIDE_TYPE,
  STRING,
} from "@/app/constants";
import { RESERVATION_CALENDAR_GUIDE_COPY as guideCopy } from "../constants/ReservationCalendarGuideCopy.constants";
import type { ReservationCalendarBlock } from "../models/ReservationCalendarBlock.interface";
import type { ReservationCalendarGuide } from "../models/ReservationCalendarGuide.type";

const getGuideLabel = (
  guide: ReservationCalendarGuide
): string => {
  if (
    guide.type ===
    RESERVATION_CALENDAR_GUIDE_TYPE.UNAVAILABLE
  ) {
    return guideCopy.UNAVAILABLE;
  }
  const guideType =
    guide.type === RESERVATION_CALENDAR_GUIDE_TYPE.INTERNAL
      ? guideCopy.ACCOUNT
      : guideCopy.EXTERNAL;
  return [guide.fullName, guideType].join(STRING.SPACE);
};

export const buildReservationCalendarBlockAccessibleLabel =
  (
    block: ReservationCalendarBlock,
    showGuides: boolean
  ): string => {
    if (!showGuides || block.guides === undefined) {
      return block.accessibleLabel;
    }
    const guideLabels =
      block.guides.length === 0
        ? [guideCopy.UNASSIGNED]
        : block.guides.map(getGuideLabel);
    return [
      block.accessibleLabel,
      guideCopy.LABEL,
      ...guideLabels,
    ].join(RESERVATIONS_CALENDAR_COPY.DETAIL_SEPARATOR);
  };
