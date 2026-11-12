import { Section, Text, Title } from "@/app/components";
import { TitleVariant } from "@/app/constants";
import {
  RESERVATION_CHARGE_CURRENCY_ORDER,
  RESERVATION_CHARGE_FIELD_ID,
} from "../constants/ReservationChargeUi.constants";
import { RESERVATION_CHARGE_UI_COPY as COPY } from "../constants/ReservationChargeUiCopy.constants";
import type { ReservationChargeSummaryProps } from "../models/ReservationChargeSummaryProps.interface";
import {
  RESERVATION_CHARGE_CODE_CLASS,
  RESERVATION_CHARGE_DETAILS_CLASS,
  RESERVATION_CHARGE_NOTE_CLASS,
  RESERVATION_CHARGE_PROPOSAL_CLASS,
  RESERVATION_CHARGE_SUMMARY_CLASS,
  RESERVATION_CHARGE_SUMMARY_HEADING_CLASS,
} from "../styles/ReservationCharge.styles";
import { formatReservationChargeDate } from "../utils/formatReservationChargeDate";
import { formatReservationChargeDuration } from "../utils/formatReservationChargeDuration";
import { formatReservationChargeProposal } from "../utils/formatReservationChargeProposal";
import ReservationChargeSummaryRow from "./ReservationChargeSummaryRow";

const ReservationChargeSummary = ({
  charge,
}: ReservationChargeSummaryProps): React.JSX.Element => (
  <Section
    ariaLabel={RESERVATION_CHARGE_FIELD_ID.SUMMARY_HEADING}
    className={RESERVATION_CHARGE_SUMMARY_CLASS}
  >
    <div>
      <Title
        id={RESERVATION_CHARGE_FIELD_ID.SUMMARY_HEADING}
        variant={TitleVariant.SECONDARY}
        text={COPY.SUMMARY_HEADING}
        className={RESERVATION_CHARGE_SUMMARY_HEADING_CLASS}
      />
      <Text className={RESERVATION_CHARGE_CODE_CLASS}>
        {charge.code}
      </Text>
    </div>
    <dl className={RESERVATION_CHARGE_DETAILS_CLASS}>
      <ReservationChargeSummaryRow
        label={COPY.LABEL_CUSTOMER}
        value={charge.customerName}
      />
      <ReservationChargeSummaryRow
        label={COPY.LABEL_DATE_TIME}
        value={COPY.CURRENT_DATE_TIME(
          formatReservationChargeDate(charge.date),
          charge.time
        )}
      />
      <ReservationChargeSummaryRow
        label={COPY.LABEL_DURATION}
        value={formatReservationChargeDuration(
          charge.durationMinutes
        )}
      />
      <ReservationChargeSummaryRow
        label={COPY.LABEL_PEOPLE}
        value={String(charge.peopleCount)}
      />
    </dl>
    {RESERVATION_CHARGE_CURRENCY_ORDER.map((currency) => (
      <Text
        key={currency}
        className={RESERVATION_CHARGE_PROPOSAL_CLASS}
      >
        {formatReservationChargeProposal(
          charge.proposal[currency],
          currency
        )}
      </Text>
    ))}
    <Text className={RESERVATION_CHARGE_NOTE_CLASS}>
      {COPY.PER_RESERVATION_NOTE}
    </Text>
  </Section>
);

export default ReservationChargeSummary;
