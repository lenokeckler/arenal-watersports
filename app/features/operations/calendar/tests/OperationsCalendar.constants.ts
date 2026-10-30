import type { OperationsCalendarViewProps } from "../models/OperationsCalendarViewProps.interface";
import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";
import { RESERVATION_CALENDAR_GUIDE_TYPE } from "@/app/constants";
import { RESERVATION_CALENDAR_GUIDE_COPY } from "@/app/components/reservation-calendar/constants/ReservationCalendarGuideCopy.constants";

export const OPERATIONS_CALENDAR_DEFAULTS: OperationsCalendarViewProps =
  {
    snapshot: undefined,
    today: { day: 15, month: 10, year: 2026 },
  };

export const OPERATIONS_CALENDAR_TEST = {
  CUSTOMER: "Operations calendar customer",
  DAY_COUNT: 1,
  EXTERNAL_GUIDE_TYPE:
    RESERVATION_CALENDAR_GUIDE_COPY.EXTERNAL,
  INTERNAL_GUIDE_TYPE:
    RESERVATION_CALENDAR_GUIDE_COPY.ACCOUNT,
  GUIDE_LABEL: RESERVATION_CALENDAR_GUIDE_COPY.LABEL,
  INTERNAL_GUIDE_NAME: "Carlos Andrés Vargas Solís",
  EXTERNAL_GUIDE_NAME: "María José Fernández Rodríguez",
  MONEY_PATTERN: /₡|\$|Total|Pago|Depósito/,
  PRESSED: "aria-pressed",
  TRUE: "true",
  WEEK_COUNT: 7,
} as const;

export const OPERATIONS_CALENDAR_SNAPSHOT: ReservationCalendarSnapshot =
  {
    endDateExclusive: { day: 19, month: 10, year: 2026 },
    entries: [
      {
        customerName: OPERATIONS_CALENDAR_TEST.CUSTOMER,
        dispatches: [],
        endsAt: "2026-10-15T18:00:00Z",
        equipment: [],
        guides: [
          {
            fullName:
              OPERATIONS_CALENDAR_TEST.INTERNAL_GUIDE_NAME,
            id: "operations-internal-guide",
            type: RESERVATION_CALENDAR_GUIDE_TYPE.INTERNAL,
          },
          {
            fullName:
              OPERATIONS_CALENDAR_TEST.EXTERNAL_GUIDE_NAME,
            id: "operations-external-guide",
            type: RESERVATION_CALENDAR_GUIDE_TYPE.EXTERNAL,
          },
        ],
        id: "operations-calendar-reservation",
        startsAt: "2026-10-15T16:00:00Z",
        status: "scheduled",
      },
    ],
    startDate: { day: 12, month: 10, year: 2026 },
    totalCount: 1,
  };

export const OPERATIONS_CALENDAR_EMPTY: ReservationCalendarSnapshot =
  {
    ...OPERATIONS_CALENDAR_SNAPSHOT,
    entries: [],
    totalCount: 0,
  };

export const OPERATIONS_CALENDAR_PARTIAL: ReservationCalendarSnapshot =
  {
    ...OPERATIONS_CALENDAR_SNAPSHOT,
    endDateExclusive: {
      ...OPERATIONS_CALENDAR_DEFAULTS.today,
      day: 16,
    },
    startDate: OPERATIONS_CALENDAR_DEFAULTS.today,
  };

export const OPERATIONS_CALENDAR_INCOMPLETE: ReservationCalendarSnapshot =
  {
    ...OPERATIONS_CALENDAR_SNAPSHOT,
    totalCount: 2,
  };
