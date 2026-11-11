import type { ReservationFormFieldsProps } from "../models/ReservationFormFieldsProps.interface";
import { RESERVATION_FORM_GRID_CLASS } from "../styles/ReservationFormView.styles";
import ReservationCustomerScheduleFields from "./ReservationCustomerScheduleFields";
import ReservationEquipmentFields from "./ReservationEquipmentFields";
import ReservationTypeField from "./ReservationTypeField";
import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import ReservationGuideAssignmentField from "./ReservationGuideAssignmentField";
import CustomComboEquipmentSelection from "./CustomComboEquipmentSelection";
import CustomComboPricingSummary from "./CustomComboPricingSummary";
import CustomComboNoGuideState from "./CustomComboNoGuideState";

const CustomComboFields = ({
  categories,
  guideAssignmentViewModel,
  viewModel,
}: ReservationFormFieldsProps): React.JSX.Element | null => {
  const { customCombo, resolvedDurationHours } = viewModel;

  if (!customCombo || resolvedDurationHours === undefined) {
    return null;
  }

  return (
    <>
      <CustomComboEquipmentSelection
        categories={categories}
        date={viewModel.values.date}
        durationHours={resolvedDurationHours}
        time={viewModel.values.time}
        viewModel={customCombo}
      />
      {customCombo.hasGuideOnlyItem &&
      guideAssignmentViewModel ? (
        <ReservationGuideAssignmentField
          viewModel={guideAssignmentViewModel}
        />
      ) : (
        <CustomComboNoGuideState />
      )}
      <CustomComboPricingSummary
        errors={viewModel.errors}
        viewModel={customCombo}
      />
    </>
  );
};

const ReservationFormFields = ({
  categories,
  guideAssignmentViewModel,
  viewModel,
}: ReservationFormFieldsProps): React.JSX.Element => {
  const isCustomCombo =
    viewModel.values.reservationType ===
      RESERVATION_TYPE.COMBO &&
    viewModel.customCombo !== undefined;

  return (
    <div className={RESERVATION_FORM_GRID_CLASS}>
      <ReservationTypeField viewModel={viewModel} />
      {isCustomCombo ? (
        <CustomComboFields
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
      {isCustomCombo ? null : (
        <ReservationEquipmentFields
          categories={categories}
          viewModel={viewModel}
        />
      )}
    </div>
  );
};

export default ReservationFormFields;
