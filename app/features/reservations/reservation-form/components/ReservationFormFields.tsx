import type { ReservationFormFieldsProps } from "../models/ReservationFormFieldsProps.interface";
import { RESERVATION_FORM_GRID_CLASS } from "../styles/ReservationFormView.styles";
import ReservationCustomerScheduleFields from "./ReservationCustomerScheduleFields";
import ReservationEquipmentFields from "./ReservationEquipmentFields";
import ReservationTypeField from "./ReservationTypeField";
import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import ReservationComboFields from "./ReservationComboFields";
import ReservationGuideAssignmentField from "./ReservationGuideAssignmentField";
import ReservationExtrasField from "./ReservationExtrasField";
import { shouldShowReservationExtras } from "../utils/shouldShowReservationExtras";

const ReservationFormFields = ({
  categories,
  guideAssignmentViewModel,
  viewModel,
}: ReservationFormFieldsProps): React.JSX.Element => {
  const isCombo =
    viewModel.values.reservationType ===
      RESERVATION_TYPE.COMBO &&
    viewModel.customCombo !== undefined;

  return (
    <div className={RESERVATION_FORM_GRID_CLASS}>
      <ReservationTypeField viewModel={viewModel} />
      {isCombo ? (
        <ReservationComboFields
          categories={categories}
          guideAssignmentViewModel={
            guideAssignmentViewModel
          }
          viewModel={viewModel}
        />
      ) : null}
      {viewModel.values.reservationType ===
        RESERVATION_TYPE.TOUR &&
      guideAssignmentViewModel ? (
        <ReservationGuideAssignmentField
          viewModel={guideAssignmentViewModel}
        />
      ) : null}
      <ReservationCustomerScheduleFields
        viewModel={viewModel}
      />
      {isCombo ? null : (
        <ReservationEquipmentFields
          categories={categories}
          viewModel={viewModel}
        />
      )}
      {shouldShowReservationExtras(viewModel) ? (
        <ReservationExtrasField viewModel={viewModel} />
      ) : null}
    </div>
  );
};

export default ReservationFormFields;
