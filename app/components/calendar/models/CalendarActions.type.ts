import type { CalendarToolbarProps } from "./CalendarToolbarProps.interface";

export type CalendarActions = Pick<
  CalendarToolbarProps,
  "onSelect" | "onPrevious" | "onToday" | "onNext"
>;
