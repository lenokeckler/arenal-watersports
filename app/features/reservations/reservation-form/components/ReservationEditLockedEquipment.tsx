import UnorderedList from "@/app/components/list/UnorderedList";
import Text from "@/app/components/text/Text";
import { RESERVATION_EDIT_COPY } from "../constants/ReservationEditCopy.constants";
import type { ReservationEditLockedEquipmentProps } from "../models/ReservationEditLockedEquipmentProps.interface";
import {
  RESERVATION_EDIT_LOCKED_EQUIPMENT_CLASS,
  RESERVATION_EDIT_LOCKED_EQUIPMENT_LIST_CLASS,
} from "../styles/ReservationEdit.styles";
import {
  RESERVATION_FORM_CATEGORY_LEGEND_CLASS,
  RESERVATION_FORM_EQUIPMENT_NOTE_CLASS,
} from "../styles/ReservationFormView.styles";

const ReservationEditLockedEquipment = ({
  equipmentLabels,
  notice,
}: ReservationEditLockedEquipmentProps): React.JSX.Element => (
  <div className={RESERVATION_EDIT_LOCKED_EQUIPMENT_CLASS}>
    <Text
      className={RESERVATION_FORM_CATEGORY_LEGEND_CLASS}
    >
      {RESERVATION_EDIT_COPY.LOCKED_EQUIPMENT_LABEL}
    </Text>
    <UnorderedList
      ariaLabel={
        RESERVATION_EDIT_COPY.LOCKED_EQUIPMENT_LABEL
      }
      className={
        RESERVATION_EDIT_LOCKED_EQUIPMENT_LIST_CLASS
      }
      items={equipmentLabels}
    />
    <Text className={RESERVATION_FORM_EQUIPMENT_NOTE_CLASS}>
      {notice}
    </Text>
  </div>
);

export default ReservationEditLockedEquipment;
