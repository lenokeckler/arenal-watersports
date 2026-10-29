import type { CalendarViewModel } from "./CalendarViewModel.interface";

export type CalendarPresentation = Pick<
  CalendarViewModel,
  "days" | "months"
>;
