"use client";

import type { ReactElement } from "react";
import {
  ARIA_ROLE,
  BUTTON,
  BUTTON_TYPES,
} from "@/app/constants";
import { Button, Text } from "@/app/components";
import type { OperationsCalendarRouteErrorProps } from "./models/OperationsCalendarRouteErrorProps.interface";
import { OPERATIONS_CALENDAR_INTEGRATION_COPY } from "./constants/OperationsCalendarIntegration.constants";

const OperationsCalendarRouteError = ({
  reset,
}: OperationsCalendarRouteErrorProps): ReactElement => (
  <main role={ARIA_ROLE.ALERT}>
    <Text>
      {OPERATIONS_CALENDAR_INTEGRATION_COPY.LOAD_ERROR}
    </Text>
    <Button
      variant={BUTTON.BASE}
      type={BUTTON_TYPES.BUTTON}
      onClick={reset}
    >
      {OPERATIONS_CALENDAR_INTEGRATION_COPY.RETRY}
    </Button>
  </main>
);

export default OperationsCalendarRouteError;
