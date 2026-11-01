import { Title } from "@/app/components";
import BackLink from "@/app/components/back-link/BackLink";
import { TitleVariant } from "@/app/components/title/constants";
import { RESERVATION_HISTORY_STATUS } from "@/app/constants";
import { RESERVATION_HISTORY_COPY } from "../constants/ReservationHistoryCopy.constants";
import { RESERVATION_HISTORY_DOM_ID } from "../constants/ReservationHistoryDomId.constants";
import type { ReservationHistoryDetailInnerProps } from "../models/ReservationHistoryDetailInnerProps.interface";
import {
  RESERVATION_HISTORY_PAGE_CLASS,
  RESERVATION_HISTORY_TITLE_CLASS,
} from "../styles/ReservationHistory.styles";
import ReservationHistoryCancellationBlock from "./ReservationHistoryCancellationBlock";
import ReservationHistorySignatureCard from "./ReservationHistorySignatureCard";
import ReservationHistorySummaryCard from "./ReservationHistorySummaryCard";

const ReservationHistoryDetailInner = ({
  backHref,
  record,
}: ReservationHistoryDetailInnerProps): React.JSX.Element => (
  <main
    className={RESERVATION_HISTORY_PAGE_CLASS}
    aria-labelledby={
      RESERVATION_HISTORY_DOM_ID.DETAIL_TITLE
    }
  >
    <Title
      id={RESERVATION_HISTORY_DOM_ID.DETAIL_TITLE}
      variant={TitleVariant.PRIMARY}
      text={RESERVATION_HISTORY_COPY.DETAIL_TITLE}
      className={RESERVATION_HISTORY_TITLE_CLASS}
    />
    <ReservationHistorySummaryCard record={record} />
    {record.status ===
    RESERVATION_HISTORY_STATUS.CANCELLED ? (
      <ReservationHistoryCancellationBlock
        reason={record.cancellationReason}
      />
    ) : null}
    <ReservationHistorySignatureCard record={record} />
    <BackLink
      href={backHref}
      label={RESERVATION_HISTORY_COPY.BACK_TO_HISTORY}
    />
  </main>
);

export default ReservationHistoryDetailInner;
