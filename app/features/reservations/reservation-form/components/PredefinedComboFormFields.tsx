import type { ReservationFormFieldsProps } from "../models/ReservationFormFieldsProps.interface";
import PredefinedComboSummary from "./PredefinedComboSummary";
import ReservationGuideAssignmentField from "./ReservationGuideAssignmentField";
import CustomComboNoGuideState from "./CustomComboNoGuideState";

const PredefinedComboFormFields = ({
  viewModel,
}: ReservationFormFieldsProps): React.JSX.Element => (
  <>
    <PredefinedComboSummary
      viewModel={viewModel.predefinedCombo}
    />
    {viewModel.predefinedCombo.selectedCombo ? (
      viewModel.predefinedCombo.hasGuideOnlyItem ? (
        <ReservationGuideAssignmentField
          viewModel={viewModel}
        />
      ) : (
        <CustomComboNoGuideState />
      )
    ) : null}
  </>
);

export default PredefinedComboFormFields;
