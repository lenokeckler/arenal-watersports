import type { CalendarView } from "@/app/types";

export interface CalendarToolbarProps {
  heading: string;
  title: string;
  selectedView: CalendarView;
  allowedViews: readonly CalendarView[];
  onSelect: (view: CalendarView) => void;
  onPrevious: () => void;
  onToday: () => void;
  onNext: () => void;
}
