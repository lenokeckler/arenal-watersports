import { PREDEFINED_COMBO_SELECTION_MODE } from "../constants/PredefinedComboSelectionMode.constants";
import type { ReservationFormFieldsProps } from "../models/ReservationFormFieldsProps.interface";
import CustomComboFormFields from "./CustomComboFormFields";
import PredefinedComboFormFields from "./PredefinedComboFormFields";
import PredefinedComboSelection from "./PredefinedComboSelection";

const ReservationComboFields = ({
  categories,
  guideAssignmentViewModel,
  viewModel,
}: ReservationFormFieldsProps): React.JSX.Element | null => {
  const { predefinedCombo } = viewModel;

  if (!predefinedCombo) {
    return null;
  }

  return (
    <>
      <PredefinedComboSelection
        viewModel={predefinedCombo}
      />
      {predefinedCombo.mode ===
      PREDEFINED_COMBO_SELECTION_MODE.PREDEFINED ? (
        <PredefinedComboFormFields
          categories={categories}
          guideAssignmentViewModel={
            guideAssignmentViewModel
          }
          viewModel={viewModel}
        />
      ) : (
        <CustomComboFormFields
          categories={categories}
          guideAssignmentViewModel={
            guideAssignmentViewModel
          }
          viewModel={viewModel}
        />
      )}
    </>
  );
};

export default ReservationComboFields;
