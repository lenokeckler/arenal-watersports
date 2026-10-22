import type { ReservationFormFieldsProps } from "../models/ReservationFormFieldsProps.interface";
import CustomComboEquipmentSelection from "./CustomComboEquipmentSelection";
import CustomComboNoGuideState from "./CustomComboNoGuideState";
import CustomComboPricingSummary from "./CustomComboPricingSummary";
import ReservationGuideAssignmentField from "./ReservationGuideAssignmentField";

const CustomComboFormFields = ({
  categories,
  viewModel,
}: ReservationFormFieldsProps): React.JSX.Element => (
  <>
    <CustomComboEquipmentSelection
      categories={categories}
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
      viewModel={viewModel.customCombo}
    />
  </>
);

export default CustomComboFormFields;
