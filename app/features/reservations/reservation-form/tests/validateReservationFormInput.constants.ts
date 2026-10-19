import type { ReservationFormInput } from "../models/ReservationFormInput.interface";

export const VALID_RESERVATION_FORM_INPUT: ReservationFormInput =
  {
    categoryId: "aaaaaaaa-0000-0000-0000-000000000001",
    customerName: "  María López  ",
    date: "2028-02-29",
    durationHours: 1.5,
    peopleCount: 3,
    quantity: 2,
    time: "09:30",
    unitId: "",
  };

export const INVALID_DATE = "2027-02-29";
export const INVALID_TIME = "24:00";
export const EARLY_VALID_DATE = "0099-01-01";
export const SUBMINUTE_DURATION_HOURS = 0.01;
export const ZERO_DURATION_HOURS = 0;
export const EXPECTED_DURATION_MINUTES = 90;
export const VALID_GUIDE_IDS = [
  "e2500000-0000-4000-8000-000000000301",
  "e2500000-0000-4000-8000-000000000302",
];
export const FRACTIONAL_COUNT = 1.5;
export const INVALID_QUANTITY = 0;
export const NEGATIVE_VALUE = -1;
export const INVALID_FIELD_COUNT = 4;
export const CONCRETE_UNIT_ID =
  "e2500000-0000-4000-8000-000000000201";
export const EXPECTED_TRIMMED_CUSTOMER_NAME = "María López";
