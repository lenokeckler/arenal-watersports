"use client";

import Button from "@/app/components/button/Button";
import Text from "@/app/components/text/Text";
import { RESERVATION_DETAIL_COPY as copy } from "./constants/ReservationDetailCopy.constants";
import type { ReservationDetailErrorProps } from "./models/ReservationDetailErrorProps.interface";
import {
  RESERVATION_DETAIL_FALLBACK_CLASS,
  RESERVATION_DETAIL_FALLBACK_COPY_CLASS,
  RESERVATION_DETAIL_FALLBACK_TITLE_CLASS,
  RESERVATION_DETAIL_PAGE_CLASS,
  RESERVATION_DETAIL_RETRY_BUTTON_CLASS,
} from "./styles/ReservationDetail.styles";

const ReservationDetailError = ({
  reset,
}: ReservationDetailErrorProps): React.JSX.Element => (
  <main className={RESERVATION_DETAIL_PAGE_CLASS}>
    <div className={RESERVATION_DETAIL_FALLBACK_CLASS}>
      <Text
        className={RESERVATION_DETAIL_FALLBACK_TITLE_CLASS}
      >
        {copy.ERROR_TITLE}
      </Text>
      <Text
        className={RESERVATION_DETAIL_FALLBACK_COPY_CLASS}
      >
        {copy.UNKNOWN_ERROR}
      </Text>
      <Button
        className={RESERVATION_DETAIL_RETRY_BUTTON_CLASS}
        onClick={reset}
        type="button"
      >
        {copy.RETRY}
      </Button>
    </div>
  </main>
);

export default ReservationDetailError;
