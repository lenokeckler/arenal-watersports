import type { Metadata } from "next";
import { OPERATIONS_CALENDAR_COPY } from "@/app/constants";
import OperationsCalendarScreen from "@/app/features/operations/calendar/OperationsCalendarScreen";

export const metadata: Metadata = {
  title: OPERATIONS_CALENDAR_COPY.TITLE,
};

const OperationsCalendarPage = (): React.JSX.Element => (
  <OperationsCalendarScreen />
);

export default OperationsCalendarPage;
