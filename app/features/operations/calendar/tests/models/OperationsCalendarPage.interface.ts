import type {
  CalendarView,
  NullableRef,
} from "@/app/types";

export interface OperationsCalendarPage {
  getBlocks: () => HTMLElement[];
  getHeading: () => HTMLElement;
  getMessages: (message: string) => HTMLElement[];
  getView: (view: CalendarView) => NullableRef<HTMLElement>;
  navigate: (label: string) => Promise<void>;
  queryAgenda: () => NullableRef<HTMLElement>;
  queryMoney: () => NullableRef<HTMLElement>;
  selectView: (view: CalendarView) => Promise<void>;
}
