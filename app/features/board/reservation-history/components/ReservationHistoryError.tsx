import { MaterialIcon, Text } from "@/app/components";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import BackLink from "@/app/components/back-link/BackLink";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_HISTORY_COPY } from "../constants/ReservationHistoryCopy.constants";
import type { ReservationHistoryErrorProps } from "../models/ReservationHistoryErrorProps.interface";
import { RESERVATION_HISTORY_PAGE_CLASS } from "../styles/ReservationHistory.styles";
import {
  RESERVATION_HISTORY_ERROR_BODY_CLASS,
  RESERVATION_HISTORY_ERROR_CLASS,
  RESERVATION_HISTORY_ERROR_ICON_CLASS,
  RESERVATION_HISTORY_ERROR_MESSAGE_CLASS,
  RESERVATION_HISTORY_ERROR_TEXT_CLASS,
  RESERVATION_HISTORY_ERROR_TITLE_CLASS,
} from "../styles/ReservationHistoryState.styles";
import ReservationHistoryHeader from "./ReservationHistoryHeader";
import ReservationHistoryRetryButton from "./ReservationHistoryRetryButton";

const ReservationHistoryError = ({
  backHref,
  reset,
  title,
}: ReservationHistoryErrorProps): React.JSX.Element => (
  <main className={RESERVATION_HISTORY_PAGE_CLASS}>
    <ReservationHistoryHeader />
    <div
      role={ARIA_ROLE.ALERT}
      className={RESERVATION_HISTORY_ERROR_CLASS}
    >
      <div
        className={RESERVATION_HISTORY_ERROR_MESSAGE_CLASS}
      >
        <MaterialIcon
          name={MATERIAL_ICON_NAME.ERROR}
          className={RESERVATION_HISTORY_ERROR_ICON_CLASS}
        />
        <div
          className={RESERVATION_HISTORY_ERROR_TEXT_CLASS}
        >
          <Text
            className={
              RESERVATION_HISTORY_ERROR_TITLE_CLASS
            }
          >
            {title}
          </Text>
          <Text
            className={RESERVATION_HISTORY_ERROR_BODY_CLASS}
          >
            {RESERVATION_HISTORY_COPY.ERROR_BODY}
          </Text>
        </div>
      </div>
      <ReservationHistoryRetryButton reset={reset} />
    </div>
    {backHref === undefined ? null : (
      <BackLink
        href={backHref}
        label={RESERVATION_HISTORY_COPY.BACK_TO_HISTORY}
      />
    )}
  </main>
);

export default ReservationHistoryError;
