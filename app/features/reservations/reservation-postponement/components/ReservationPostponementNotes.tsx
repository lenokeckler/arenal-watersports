import { MaterialIcon, Text } from "@/app/components";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { RESERVATION_POSTPONEMENT_FORM_COPY } from "../constants/ReservationPostponementFormCopy.constants";
import type { ReservationPostponementNotesProps } from "../models/ReservationPostponementNotesProps.interface";
import {
  RESERVATION_POSTPONEMENT_NOTE_INFO_CLASS,
  RESERVATION_POSTPONEMENT_NOTE_INFO_ICON_CLASS,
  RESERVATION_POSTPONEMENT_NOTE_WARN_CLASS,
  RESERVATION_POSTPONEMENT_NOTE_WARN_ICON_CLASS,
  RESERVATION_POSTPONEMENT_NOTES_CLASS,
} from "../styles/ReservationPostponementForm.styles";

const ReservationPostponementNotes = ({
  isDispatched,
}: ReservationPostponementNotesProps): React.JSX.Element => (
  <div className={RESERVATION_POSTPONEMENT_NOTES_CLASS}>
    <Text
      className={RESERVATION_POSTPONEMENT_NOTE_INFO_CLASS}
    >
      <MaterialIcon
        name={MATERIAL_ICON_NAME.PAYMENTS}
        className={
          RESERVATION_POSTPONEMENT_NOTE_INFO_ICON_CLASS
        }
      />
      {RESERVATION_POSTPONEMENT_FORM_COPY.NOTE_KEPT}
    </Text>
    {isDispatched && (
      <Text
        className={RESERVATION_POSTPONEMENT_NOTE_WARN_CLASS}
      >
        <MaterialIcon
          name={MATERIAL_ICON_NAME.ERROR}
          className={
            RESERVATION_POSTPONEMENT_NOTE_WARN_ICON_CLASS
          }
        />
        {
          RESERVATION_POSTPONEMENT_FORM_COPY.NOTE_WEATHER_ONLY
        }
      </Text>
    )}
  </div>
);

export default ReservationPostponementNotes;
