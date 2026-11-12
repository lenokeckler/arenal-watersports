"use client";

import type { ReactElement } from "react";
import { Button, Section, Text } from "@/app/components";
import {
  ARIA_ROLE,
  BUTTON,
  RESERVATIONS_CALENDAR_COPY,
} from "@/app/constants";
import type { ReservationsCalendarRouteErrorProps } from "./models/ReservationsCalendarRouteErrorProps.interface";
import { RESERVATIONS_CALENDAR_REFRESH_ERROR_CLASS } from "./styles/ReservationsCalendarRefreshStatus.styles";

const ReservationsCalendarRouteError = ({
  reset,
}: ReservationsCalendarRouteErrorProps): ReactElement => (
  <Section
    role={ARIA_ROLE.ALERT}
    className={RESERVATIONS_CALENDAR_REFRESH_ERROR_CLASS}
  >
    <Text>{RESERVATIONS_CALENDAR_COPY.LOAD_ERROR}</Text>
    <Button
      variant={BUTTON.BASE}
      onClick={reset}
    >
      {RESERVATIONS_CALENDAR_COPY.RETRY}
    </Button>
  </Section>
);

export default ReservationsCalendarRouteError;
