import { Section, Text, Title } from "@/app/components";
import { TitleVariant } from "@/app/constants";
import { RESERVATION_DEPOSIT_FIELD_ID } from "../constants/ReservationDepositUi.constants";
import { RESERVATION_DEPOSIT_UI_COPY as COPY } from "../constants/ReservationDepositUiCopy.constants";
import type { ReservationDepositSummaryProps } from "../models/ReservationDepositSummaryProps.interface";
import {
  RESERVATION_DEPOSIT_CODE_CLASS,
  RESERVATION_DEPOSIT_DETAILS_CLASS,
  RESERVATION_DEPOSIT_SUMMARY_CLASS,
  RESERVATION_DEPOSIT_SUMMARY_HEADING_CLASS,
} from "../styles/ReservationDeposit.styles";
import { formatReservationDepositDate } from "../utils/formatReservationDepositDate";
import ReservationDepositSummaryRow from "./ReservationDepositSummaryRow";

const ReservationDepositSummary = ({
  deposit,
}: ReservationDepositSummaryProps): React.JSX.Element => (
  <Section
    ariaLabel={RESERVATION_DEPOSIT_FIELD_ID.SUMMARY_HEADING}
    className={RESERVATION_DEPOSIT_SUMMARY_CLASS}
  >
    <div>
      <Title
        id={RESERVATION_DEPOSIT_FIELD_ID.SUMMARY_HEADING}
        variant={TitleVariant.SECONDARY}
        text={COPY.SUMMARY_HEADING}
        className={
          RESERVATION_DEPOSIT_SUMMARY_HEADING_CLASS
        }
      />
      <Text className={RESERVATION_DEPOSIT_CODE_CLASS}>
        {deposit.code}
      </Text>
    </div>
    <dl className={RESERVATION_DEPOSIT_DETAILS_CLASS}>
      <ReservationDepositSummaryRow
        label={COPY.LABEL_CUSTOMER}
        value={deposit.customerName}
      />
      <ReservationDepositSummaryRow
        label={COPY.LABEL_DATE_TIME}
        value={COPY.CURRENT_DATE_TIME(
          formatReservationDepositDate(deposit.date),
          deposit.time
        )}
      />
    </dl>
  </Section>
);

export default ReservationDepositSummary;
