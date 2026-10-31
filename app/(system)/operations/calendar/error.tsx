"use client";

import type { OperationsCalendarRouteErrorProps } from "@/app/features/operations/calendar/models/OperationsCalendarRouteErrorProps.interface";
import OperationsCalendarRouteError from "@/app/features/operations/calendar/OperationsCalendarRouteError";

const OperationsCalendarError = (
  props: OperationsCalendarRouteErrorProps
): React.JSX.Element => (
  <OperationsCalendarRouteError {...props} />
);

export default OperationsCalendarError;
