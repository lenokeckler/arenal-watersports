import { PREDEFINED_COMBO_SELECTION_MODE } from "../constants/PredefinedComboSelectionMode.constants";
import type { ReservationFormFieldsProps } from "../models/ReservationFormFieldsProps.interface";
import CustomComboFormFields from "./CustomComboFormFields";
import PredefinedComboFormFields from "./PredefinedComboFormFields";
import PredefinedComboSelection from "./PredefinedComboSelection";

const ReservationComboFields = ({
  categories,
  viewModel,
}: ReservationFormFieldsProps): React.JSX.Element => (
  <>
    <PredefinedComboSelection
      viewModel={viewModel.predefinedCombo}
    />
    {viewModel.predefinedCombo.mode ===
    PREDEFINED_COMBO_SELECTION_MODE.PREDEFINED ? (
      <PredefinedComboFormFields
        categories={categories}
        viewModel={viewModel}
      />
    ) : (
      <CustomComboFormFields
        categories={categories}
        viewModel={viewModel}
      />
    )}
  </>
);

export default ReservationComboFields;
