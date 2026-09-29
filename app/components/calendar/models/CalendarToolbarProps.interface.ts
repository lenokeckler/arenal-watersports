import type { CalendarView } from "./index";

export interface CalendarToolbarProps {
  title: string;
  selectedView: CalendarView;
  allowedViews: readonly CalendarView[];
  onSelect: (view: CalendarView) => void;
  onPrevious: () => void;
  onToday: () => void;
  onNext: () => void;
}
