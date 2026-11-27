import { CURRENCY_CODE } from "@/app/constants";

export const E2E_RESERVATION_EXTRA_TIME = {
  AMOUNT: "15",
  CHARGE_KIND: "extra_time",
  CURRENCY: CURRENCY_CODE.USD,
  EXTENDED_DURATION: "30min",
  EXTENDED_MINUTES: 30,
  FIELD_SEPARATOR: "|",
  FIXTURE_OPERATION: "seed a reservation with extra time",
  ID_CODE_SEPARATOR: ",",
  LINE_SEPARATOR: "\n",
  OVERDUE_DURATION: "35min",
  OVERDUE_MINUTES: 35,
  POSTPONED_MINUTES: 10,
  READ_OPERATION: "read the extra time decision",
  CLEANUP_OPERATION: "remove the extra time fixtures",
  SCREEN_DURATION: {
    EXTENDED: "30 min",
    OVERDUE: "35 min",
    POSTPONED: "10 min",
  },
  SCREENSHOT_BASENAME: "reservation-extra-time",
  TEST_MODE: "serial",
} as const;

export const E2E_RESERVATION_EXTRA_TIME_SCENARIO = {
  EXTENDED: "extended",
  OUT: "out",
  OVERDUE: "overdue",
  POSTPONED: "postponed",
} as const;

export const E2E_RESERVATION_EXTRA_TIME_SCREENSHOT_STATE = {
  CHARGED: "charged",
  DETAIL: "detail",
  FORM: "form",
  POSTPONED: "postponed",
  UNAVAILABLE: "unavailable",
} as const;
