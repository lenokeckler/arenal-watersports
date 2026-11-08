import type { ReservationFormFieldsProps } from "../models/ReservationFormFieldsProps.interface";
import { RESERVATION_FORM_GRID_CLASS } from "../styles/ReservationFormView.styles";
import ReservationCustomerScheduleFields from "./ReservationCustomerScheduleFields";
import ReservationEquipmentFields from "./ReservationEquipmentFields";

const ReservationEditFields = ({
  categories,
  viewModel,
}: ReservationFormFieldsProps): React.JSX.Element => (
  <div className={RESERVATION_FORM_GRID_CLASS}>
    <ReservationCustomerScheduleFields
      hidesCustomerAndDate
      viewModel={viewModel}
    />
    <ReservationEquipmentFields
      categories={categories}
      viewModel={viewModel}
    />
  </div>
);

export default ReservationEditFields;
