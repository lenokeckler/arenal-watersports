import type { ReservationFormFieldsProps } from "../models/ReservationFormFieldsProps.interface";
import CustomComboEquipmentSelection from "./CustomComboEquipmentSelection";
import CustomComboNoGuideState from "./CustomComboNoGuideState";
import CustomComboPricingSummary from "./CustomComboPricingSummary";
import ReservationGuideAssignmentField from "./ReservationGuideAssignmentField";

const CustomComboFormFields = ({
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

export default CustomComboFormFields;
