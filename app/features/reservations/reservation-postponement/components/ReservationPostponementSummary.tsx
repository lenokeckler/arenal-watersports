import { Section, Text, Title } from "@/app/components";
import { TitleVariant } from "@/app/constants";
import { RESERVATION_POSTPONEMENT_FIELD_ID } from "../constants/ReservationPostponementUi.constants";
import { RESERVATION_POSTPONEMENT_UI_COPY } from "../constants/ReservationPostponementUiCopy.constants";
import type { ReservationPostponementSummaryProps } from "../models/ReservationPostponementSummaryProps.interface";
import {
  RESERVATION_POSTPONEMENT_CODE_CLASS,
  RESERVATION_POSTPONEMENT_DEFINITION_CLASS,
  RESERVATION_POSTPONEMENT_DETAILS_CLASS,
  RESERVATION_POSTPONEMENT_SUMMARY_CLASS,
  RESERVATION_POSTPONEMENT_SUMMARY_HEADING_CLASS,
  RESERVATION_POSTPONEMENT_TERM_CLASS,
} from "../styles/ReservationPostponementSummary.styles";
import { formatReservationPostponementDate } from "../utils/formatReservationPostponementDate";
import ReservationPostponementSummaryEquipment from "./ReservationPostponementSummaryEquipment";

const ReservationPostponementSummary = ({
  postponement,
}: ReservationPostponementSummaryProps): React.JSX.Element => (
  <Section
    ariaLabel={
      RESERVATION_POSTPONEMENT_FIELD_ID.SUMMARY_HEADING
    }
    className={RESERVATION_POSTPONEMENT_SUMMARY_CLASS}
  >
    <div>
      <Title
        id={
          RESERVATION_POSTPONEMENT_FIELD_ID.SUMMARY_HEADING
        }
        variant={TitleVariant.SECONDARY}
        text={
          RESERVATION_POSTPONEMENT_UI_COPY.SUMMARY_HEADING
        }
        className={
          RESERVATION_POSTPONEMENT_SUMMARY_HEADING_CLASS
        }
      />
      <Text className={RESERVATION_POSTPONEMENT_CODE_CLASS}>
        {postponement.code}
      </Text>
    </div>
    <dl className={RESERVATION_POSTPONEMENT_DETAILS_CLASS}>
      <div>
        <dt className={RESERVATION_POSTPONEMENT_TERM_CLASS}>
          {RESERVATION_POSTPONEMENT_UI_COPY.LABEL_CUSTOMER}
        </dt>
        <dd
          className={
            RESERVATION_POSTPONEMENT_DEFINITION_CLASS
          }
        >
          {postponement.customerName}
        </dd>
      </div>
      <div>
        <dt className={RESERVATION_POSTPONEMENT_TERM_CLASS}>
          {
            RESERVATION_POSTPONEMENT_UI_COPY.LABEL_CURRENT_DATE_TIME
          }
        </dt>
        <dd
          className={
            RESERVATION_POSTPONEMENT_DEFINITION_CLASS
          }
        >
          {RESERVATION_POSTPONEMENT_UI_COPY.CURRENT_DATE_TIME(
            formatReservationPostponementDate(
              postponement.date
            ),
            postponement.time
          )}
        </dd>
      </div>
      <div>
        <dt className={RESERVATION_POSTPONEMENT_TERM_CLASS}>
          {RESERVATION_POSTPONEMENT_UI_COPY.LABEL_EQUIPMENT}
        </dt>
        <dd>
          <ReservationPostponementSummaryEquipment
            postponement={postponement}
          />
        </dd>
      </div>
    </dl>
  </Section>
);

export default ReservationPostponementSummary;
