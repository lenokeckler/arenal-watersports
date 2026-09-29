import type { CalendarPreviewProps } from "./CalendarPreviewProps.interface";

export interface CalendarPreviewPageProps {
  searchParams: Promise<Partial<CalendarPreviewProps>>;
}
