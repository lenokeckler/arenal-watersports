import type { ReservationFormFieldsProps } from "../models/ReservationFormFieldsProps.interface";
import { RESERVATION_FORM_GRID_CLASS } from "../styles/ReservationFormView.styles";
import ReservationCustomerScheduleFields from "./ReservationCustomerScheduleFields";
import ReservationEquipmentFields from "./ReservationEquipmentFields";
import ReservationTypeField from "./ReservationTypeField";
import ReservationGuideAssignmentField from "./ReservationGuideAssignmentField";
import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import CustomComboEquipmentSelection from "./CustomComboEquipmentSelection";
import CustomComboPricingSummary from "./CustomComboPricingSummary";
import CustomComboNoGuideState from "./CustomComboNoGuideState";

const CustomComboFields = ({
  categories,
  viewModel,
}: ReservationFormFieldsProps): React.JSX.Element => (
  <>
    <CustomComboEquipmentSelection
      categories={categories}
      date={viewModel.values.date}
      durationHours={viewModel.resolvedDurationHours}
      time={viewModel.values.time}
      viewModel={viewModel.customCombo}
    />
    {viewModel.customCombo.hasGuideOnlyItem ? (
      <ReservationGuideAssignmentField
        viewModel={viewModel}
      />
    ) : (
      <CustomComboNoGuideState />
    )}
    <CustomComboPricingSummary
      errors={viewModel.errors}
      viewModel={viewModel.customCombo}
    />
  </>
);

const ReservationFormFields = ({
  categories,
  viewModel,
}: ReservationFormFieldsProps): React.JSX.Element => {
  const reservationType = viewModel.values.reservationType;
  return (
    <div className={RESERVATION_FORM_GRID_CLASS}>
      <ReservationTypeField viewModel={viewModel} />
      {reservationType === RESERVATION_TYPE.COMBO ? (
        <CustomComboFields
          categories={categories}
          viewModel={viewModel}
        />
      ) : null}
      {reservationType === RESERVATION_TYPE.TOUR ? (
        <ReservationGuideAssignmentField
          viewModel={viewModel}
        />
      ) : null}
      <ReservationCustomerScheduleFields
        viewModel={viewModel}
      />
      {reservationType === RESERVATION_TYPE.COMBO ? null : (
        <ReservationEquipmentFields
          categories={categories}
          viewModel={viewModel}
        />
      )}
    </div>
  );
};

export default ReservationFormFields;
