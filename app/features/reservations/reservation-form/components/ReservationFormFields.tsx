import type { ReservationFormFieldsProps } from "../models/ReservationFormFieldsProps.interface";
import { RESERVATION_FORM_GRID_CLASS } from "../styles/ReservationFormView.styles";
import ReservationCustomerScheduleFields from "./ReservationCustomerScheduleFields";
import ReservationEquipmentFields from "./ReservationEquipmentFields";
import ReservationTypeField from "./ReservationTypeField";

const ReservationFormFields = ({
  categories,
  viewModel,
}: ReservationFormFieldsProps): React.JSX.Element => (
  <div className={RESERVATION_FORM_GRID_CLASS}>
    <ReservationTypeField viewModel={viewModel} />
    <ReservationCustomerScheduleFields
      viewModel={viewModel}
    />
    <ReservationEquipmentFields
      categories={categories}
      viewModel={viewModel}
    />
  </div>
);

export default ReservationFormFields;
