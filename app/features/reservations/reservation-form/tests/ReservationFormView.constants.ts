import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import type { ReservationFormViewProps } from "../models/ReservationFormViewProps.interface";

export const RESERVATION_FORM_VIEW_FIXTURE: ReservationFormViewProps =
  {
    categories: [
      { id: "category-kayak", name: "Kayak individual" },
    ] satisfies ReservationCategoryOption[],
    initialDate: "2028-02-29",
  };

export const RESERVATION_FORM_TEST_COPY = {
  CATEGORY_LABEL: "Equipo *",
  PRESET_90_MINUTES: "1 h 30",
  PRESET_90_MINUTES_VALUE: 1.5,
  SUBMIT: "Registrar reserva",
} as const;
