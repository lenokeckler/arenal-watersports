"use client";

import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/components/button/constants";
import InlineText from "@/app/components/text/InlineText";
import Text from "@/app/components/text/Text";
import { ARIA_ROLE, BUTTON_TYPES } from "@/app/constants";
import {
  RESERVATION_DOCK_NOTICE_COPY,
  RESERVATION_DOCK_NOTICE_STATUSES,
} from "../constants/ReservationDockNotice.constants";
import { useReservationDockNotice } from "../hooks/useReservationDockNotice";
import type { ReservationDetailDockActionProps } from "../models/ReservationDetailDockActionProps.interface";
import {
  RESERVATION_DETAIL_DOCK_ACTION_CLASS,
  RESERVATION_DETAIL_DOCK_ERROR_CLASS,
  RESERVATION_DETAIL_DOCK_SENT_CLASS,
} from "../styles/ReservationDetail.styles";

const ReservationDetailDockAction = ({
  dockNotifiedAt,
  reservationId,
  status,
}: ReservationDetailDockActionProps): React.JSX.Element | null => {
  const notice = useReservationDockNotice({
    dockNotifiedAt,
    reservationId,
  });

  if (!RESERVATION_DOCK_NOTICE_STATUSES.includes(status)) {
    return null;
  }

  return (
    <div className={RESERVATION_DETAIL_DOCK_ACTION_CLASS}>
      {notice.isNotified && (
        <InlineText
          className={RESERVATION_DETAIL_DOCK_SENT_CLASS}
        >
          {RESERVATION_DOCK_NOTICE_COPY.SENT}
        </InlineText>
      )}
      <Button
        type={BUTTON_TYPES.BUTTON}
        variant={
          notice.isNotified
            ? BUTTON.SECONDARY
            : BUTTON.PRIMARY
        }
        isLoading={notice.isPending}
        loadingText={RESERVATION_DOCK_NOTICE_COPY.SENDING}
        onClick={notice.handleToggle}
      >
        {notice.isNotified
          ? RESERVATION_DOCK_NOTICE_COPY.REMOVE
          : RESERVATION_DOCK_NOTICE_COPY.SEND}
      </Button>
      {notice.errorMessage && (
        <Text
          role={ARIA_ROLE.ALERT}
          className={RESERVATION_DETAIL_DOCK_ERROR_CLASS}
        >
          {notice.errorMessage}
        </Text>
      )}
    </div>
  );
};

export default ReservationDetailDockAction;
