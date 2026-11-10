import { InlineText } from "@/app/components";
import { RESERVATION_POSTPONEMENT_UI_COPY } from "../constants/ReservationPostponementUiCopy.constants";
import type { ReservationPostponementSummaryProps } from "../models/ReservationPostponementSummaryProps.interface";
import {
  RESERVATION_POSTPONEMENT_EQUIPMENT_LIST_CLASS,
  RESERVATION_POSTPONEMENT_EQUIPMENT_QUANTITY_CLASS,
  RESERVATION_POSTPONEMENT_EQUIPMENT_ROW_CLASS,
} from "../styles/ReservationPostponementSummary.styles";

const ReservationPostponementSummaryEquipment = ({
  postponement,
}: ReservationPostponementSummaryProps): React.JSX.Element => (
  <ul
    className={
      RESERVATION_POSTPONEMENT_EQUIPMENT_LIST_CLASS
    }
  >
    {postponement.equipment.map((line) => (
      <li
        key={line.id}
        className={
          RESERVATION_POSTPONEMENT_EQUIPMENT_ROW_CLASS
        }
      >
        <InlineText>{line.label}</InlineText>
        {line.quantity !== null && (
          <InlineText
            className={
              RESERVATION_POSTPONEMENT_EQUIPMENT_QUANTITY_CLASS
            }
          >
            {RESERVATION_POSTPONEMENT_UI_COPY.QUANTITY_OF(
              line.quantity
            )}
          </InlineText>
        )}
      </li>
    ))}
  </ul>
);

export default ReservationPostponementSummaryEquipment;
