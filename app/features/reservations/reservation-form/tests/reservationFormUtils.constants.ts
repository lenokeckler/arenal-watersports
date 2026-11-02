import type { ReservationFormInput } from "../models/ReservationFormInput.interface";

export const VALID_RESERVATION_FORM_INPUT: ReservationFormInput =
  {
    categoryId: "category-kayak",
    customerName: "Lake group",
    date: "2028-02-29",
    durationHours: 1.5,
    peopleCount: 2,
    quantity: 1,
    time: "09:30",
    unitId: "",
  };

export const COSTA_RICA_DATE_CASE = {
  INSTANT: "2028-01-01T05:30:00.000Z",
  EXPECTED_DATE: "2027-12-31",
} as const;
