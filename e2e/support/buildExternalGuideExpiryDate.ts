import { getCalendarToday } from "@/app/components/calendar/utils/getCalendarToday";
import { E2E_EXTERNAL_GUIDE } from "../constants/E2eExternalGuideRegistration.constants";

export const buildExternalGuideExpiryDate = (): string => {
  const today = getCalendarToday(new Date());
  return new Date(
    Date.UTC(
      today.year,
      today.month - E2E_EXTERNAL_GUIDE.MONTH_INDEX_OFFSET,
      today.day + E2E_EXTERNAL_GUIDE.EXPIRY_OFFSET_DAYS
    )
  )
    .toISOString()
    .slice(0, E2E_EXTERNAL_GUIDE.ISO_DATE_LENGTH);
};
