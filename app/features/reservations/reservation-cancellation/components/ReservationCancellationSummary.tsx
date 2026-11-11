import { Section, Text, Title } from "@/app/components";
import { TitleVariant } from "@/app/constants";
import { RESERVATION_CANCELLATION_FIELD_ID } from "../constants/ReservationCancellationUi.constants";
import { RESERVATION_CANCELLATION_UI_COPY as COPY } from "../constants/ReservationCancellationUiCopy.constants";
import type { ReservationCancellationViewProps } from "../models/ReservationCancellationViewProps.interface";
import {
  RESERVATION_CANCELLATION_CODE_CLASS,
  RESERVATION_CANCELLATION_DEFINITION_CLASS,
  RESERVATION_CANCELLATION_DETAILS_CLASS,
  RESERVATION_CANCELLATION_EQUIPMENT_QUANTITY_CLASS,
  RESERVATION_CANCELLATION_EQUIPMENT_ROW_CLASS,
  RESERVATION_CANCELLATION_SUMMARY_CLASS,
  RESERVATION_CANCELLATION_SUMMARY_HEADING_CLASS,
  RESERVATION_CANCELLATION_TERM_CLASS,
} from "../styles/ReservationCancellation.styles";
import { formatReservationCancellationDate } from "../utils/formatReservationCancellationDate";

const ReservationCancellationSummary = ({
  cancellation,
}: ReservationCancellationViewProps): React.JSX.Element => (
  <Section
    ariaLabel={
      RESERVATION_CANCELLATION_FIELD_ID.SUMMARY_HEADING
    }
    className={RESERVATION_CANCELLATION_SUMMARY_CLASS}
  >
    <div>
      <Title
        id={
          RESERVATION_CANCELLATION_FIELD_ID.SUMMARY_HEADING
        }
        variant={TitleVariant.SECONDARY}
        text={COPY.SUMMARY_HEADING}
        className={
          RESERVATION_CANCELLATION_SUMMARY_HEADING_CLASS
        }
      />
      <Text className={RESERVATION_CANCELLATION_CODE_CLASS}>
        {cancellation.code}
      </Text>
    </div>
    <dl className={RESERVATION_CANCELLATION_DETAILS_CLASS}>
      <div>
        <dt className={RESERVATION_CANCELLATION_TERM_CLASS}>
          {COPY.LABEL_CUSTOMER}
        </dt>
        <dd
          className={
            RESERVATION_CANCELLATION_DEFINITION_CLASS
          }
        >
          {cancellation.customerName}
        </dd>
      </div>
      <div>
        <dt className={RESERVATION_CANCELLATION_TERM_CLASS}>
          {COPY.LABEL_DATE_TIME}
        </dt>
        <dd
          className={
            RESERVATION_CANCELLATION_DEFINITION_CLASS
          }
        >
          {COPY.CURRENT_DATE_TIME(
            formatReservationCancellationDate(
              cancellation.date
            ),
            cancellation.time
          )}
        </dd>
      </div>
      <div>
        <dt className={RESERVATION_CANCELLATION_TERM_CLASS}>
          {COPY.LABEL_EQUIPMENT}
        </dt>
        <dd>
          <ul>
            {cancellation.equipment.map((line) => (
              <li
                key={line.id}
                className={
                  RESERVATION_CANCELLATION_EQUIPMENT_ROW_CLASS
                }
              >
                {line.label}
                {line.quantity !== null && (
                  <Text
                    className={
                      RESERVATION_CANCELLATION_EQUIPMENT_QUANTITY_CLASS
                    }
                  >
                    {COPY.QUANTITY_OF(line.quantity)}
                  </Text>
                )}
              </li>
            ))}
          </ul>
        </dd>
      </div>
    </dl>
  </Section>
);

export default ReservationCancellationSummary;
