import { RESERVATION_GUIDE_LOAD_LOG_LINE_TERMINATOR } from "../constants/ReservationGuideLoad.constants";
import { RESERVATION_SERVICE_OPERATION } from "../constants/ReservationServiceOperation.constants";

export const recordReservationGuideLoadFailure = (
  error: unknown,
  code: string
): void => {
  const causeName =
    error instanceof Error ? error.name : code;
  const logEntry = {
    operation: RESERVATION_SERVICE_OPERATION.LOAD_GUIDES,
    code,
    causeName,
  };
  process.stderr.write(
    `${JSON.stringify(logEntry)}${RESERVATION_GUIDE_LOAD_LOG_LINE_TERMINATOR}`
  );
};
