import { InlineText } from "@/app/components";
import { RESERVATION_POSTPONEMENT_UI_COPY } from "../constants/ReservationPostponementUiCopy.constants";
import type { ReservationPostponementEquipmentRowProps } from "../models/ReservationPostponementEquipmentRowProps.interface";
import {
  RESERVATION_POSTPONEMENT_EQUIPMENT_QUANTITY_CLASS,
  RESERVATION_POSTPONEMENT_EQUIPMENT_ROW_CLASS,
} from "../styles/ReservationPostponementSummary.styles";

const ReservationPostponementEquipmentRow = ({
  line,
}: ReservationPostponementEquipmentRowProps): React.JSX.Element => (
  <span
    className={RESERVATION_POSTPONEMENT_EQUIPMENT_ROW_CLASS}
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
  </span>
);

export default ReservationPostponementEquipmentRow;
