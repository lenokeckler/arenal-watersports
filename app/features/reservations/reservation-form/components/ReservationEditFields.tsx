import { RESERVATION_EDIT_LOCK_COPY } from "../constants/ReservationEditCopy.constants";
import { RESERVATION_EQUIPMENT_LOCK } from "../constants/ReservationEquipmentLock.constants";
import type { ReservationEditFieldsProps } from "../models/ReservationEditFieldsProps.interface";
import { RESERVATION_FORM_GRID_CLASS } from "../styles/ReservationFormView.styles";
import ReservationCustomerScheduleFields from "./ReservationCustomerScheduleFields";
import ReservationEditLockedEquipment from "./ReservationEditLockedEquipment";
import ReservationEquipmentFields from "./ReservationEquipmentFields";

const ReservationEditFields = ({
  categories,
  reservation,
  viewModel,
}: ReservationEditFieldsProps): React.JSX.Element => (
  <div className={RESERVATION_FORM_GRID_CLASS}>
    <ReservationCustomerScheduleFields
      hidesCustomerAndDate
      viewModel={viewModel}
    />
    {reservation.equipmentLock ===
    RESERVATION_EQUIPMENT_LOCK.NONE ? (
      <ReservationEquipmentFields
        categories={categories}
        viewModel={viewModel}
      />
    ) : (
      <ReservationEditLockedEquipment
        equipmentLabels={reservation.equipmentLabels}
        notice={
          RESERVATION_EDIT_LOCK_COPY[
            reservation.equipmentLock
          ]
        }
      />
    )}
  </div>
);

export default ReservationEditFields;
