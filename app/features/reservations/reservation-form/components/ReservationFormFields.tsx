import type { ReservationFormFieldsProps } from "../models/ReservationFormFieldsProps.interface";
import { RESERVATION_FORM_GRID_CLASS } from "../styles/ReservationFormView.styles";
import ReservationCustomerScheduleFields from "./ReservationCustomerScheduleFields";
import ReservationEquipmentFields from "./ReservationEquipmentFields";
import ReservationTypeField from "./ReservationTypeField";
import ReservationGuideAssignmentField from "./ReservationGuideAssignmentField";
import { RESERVATION_TYPE } from "../constants/ReservationType.constants";

const ReservationFormFields = ({
  categories,
  viewModel,
}: ReservationFormFieldsProps): React.JSX.Element => (
  <div className={RESERVATION_FORM_GRID_CLASS}>
    <ReservationTypeField viewModel={viewModel} />
    {viewModel.values.reservationType ===
    RESERVATION_TYPE.TOUR ? (
      <ReservationGuideAssignmentField
        viewModel={viewModel}
      />
    ) : null}
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
