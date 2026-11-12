import { MaterialIcon, Text } from "@/app/components";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { RESERVATION_CANCELLATION_FORM_COPY as COPY } from "../constants/ReservationCancellationFormCopy.constants";
import type { ReservationCancellationNoteProps } from "../models/ReservationCancellationNoteProps.interface";
import {
  RESERVATION_CANCELLATION_NOTE_CLASS,
  RESERVATION_CANCELLATION_NOTE_ICON_CLASS,
} from "../styles/ReservationCancellationForm.styles";

const ReservationCancellationNote = ({
  requiresCause,
}: ReservationCancellationNoteProps): React.JSX.Element => (
  <Text className={RESERVATION_CANCELLATION_NOTE_CLASS}>
    <MaterialIcon
      name={MATERIAL_ICON_NAME.ERROR}
      className={RESERVATION_CANCELLATION_NOTE_ICON_CLASS}
    />
    {requiresCause ? COPY.NOTE_DISPATCHED : COPY.NOTE}
  </Text>
);

export default ReservationCancellationNote;
