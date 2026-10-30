import type { ReactElement } from "react";
import type { NullableRef } from "@/app/types";
import { ARIA_ROLE, BUTTON_TYPES } from "@/app/constants";
import { Button } from "@/app/components/button/Button";
import { Text } from "@/app/components/text/Text";
import { OPERATIONS_CALENDAR_INTEGRATION_COPY } from "../constants/OperationsCalendarIntegration.constants";
import { OPERATIONS_CALENDAR_REFRESH_ERROR_CLASS } from "../styles/OperationsCalendarRefreshStatus.styles";

interface OperationsCalendarRefreshStatusProps {
  hasRefreshError: boolean;
  onRetry: () => void;
}

export const OperationsCalendarRefreshStatus = ({
  hasRefreshError,
  onRetry,
}: OperationsCalendarRefreshStatusProps): NullableRef<ReactElement> => {
  if (!hasRefreshError) {
    return null;
  }
  return (
    <div role={ARIA_ROLE.ALERT}>
      <Text>
        {OPERATIONS_CALENDAR_INTEGRATION_COPY.LOAD_ERROR}
      </Text>
      <Button
        type={BUTTON_TYPES.BUTTON}
        className={OPERATIONS_CALENDAR_REFRESH_ERROR_CLASS}
        onClick={onRetry}
      >
        {OPERATIONS_CALENDAR_INTEGRATION_COPY.RETRY}
      </Button>
    </div>
  );
};
