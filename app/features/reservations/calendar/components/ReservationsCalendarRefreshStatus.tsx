import type { ReactElement } from "react";
import type { NullableRef } from "@/app/types";
import { Button, Text } from "@/app/components";
import {
  ARIA_ROLE,
  BUTTON,
  RESERVATIONS_CALENDAR_COPY,
} from "@/app/constants";
import type { ReservationsCalendarRefreshStatusProps } from "../models/ReservationsCalendarRefreshStatusProps.interface";
import {
  RESERVATIONS_CALENDAR_REFRESH_ERROR_CLASS,
  RESERVATIONS_CALENDAR_REFRESH_STATUS_CLASS,
} from "../styles/ReservationsCalendarRefreshStatus.styles";

export const ReservationsCalendarRefreshStatus = ({
  hasRefreshError,
  isRefreshing,
  onRetry,
}: ReservationsCalendarRefreshStatusProps): NullableRef<ReactElement> => {
  if (!hasRefreshError && !isRefreshing) {
    return null;
  }
  if (hasRefreshError) {
    return (
      <div
        role={ARIA_ROLE.ALERT}
        className={
          RESERVATIONS_CALENDAR_REFRESH_ERROR_CLASS
        }
      >
        <Text>
          {RESERVATIONS_CALENDAR_COPY.REFRESH_ERROR}
        </Text>
        <Button
          variant={BUTTON.BASE}
          onClick={onRetry}
        >
          {RESERVATIONS_CALENDAR_COPY.RETRY}
        </Button>
      </div>
    );
  }
  return (
    <div
      className={RESERVATIONS_CALENDAR_REFRESH_STATUS_CLASS}
    >
      <Text role={ARIA_ROLE.STATUS}>
        {RESERVATIONS_CALENDAR_COPY.REFRESHING}
      </Text>
    </div>
  );
};
