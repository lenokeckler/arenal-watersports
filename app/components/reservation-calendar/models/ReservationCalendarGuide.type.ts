import { RESERVATION_CALENDAR_GUIDE_TYPE } from "@/app/constants";

export type ReservationCalendarGuide =
  | {
      fullName: string;
      type: typeof RESERVATION_CALENDAR_GUIDE_TYPE.EXTERNAL;
    }
  | {
      fullName: string;
      type: typeof RESERVATION_CALENDAR_GUIDE_TYPE.INTERNAL;
    };
