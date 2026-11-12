import type { ReservationFormFieldsProps } from "../models/ReservationFormFieldsProps.interface";
import CustomComboNoGuideState from "./CustomComboNoGuideState";
import PredefinedComboSummary from "./PredefinedComboSummary";
import ReservationGuideAssignmentField from "./ReservationGuideAssignmentField";

const PredefinedComboFormFields = ({
  guideAssignmentViewModel,
  viewModel,
}: ReservationFormFieldsProps): React.JSX.Element | null => {
  const { predefinedCombo } = viewModel;

  if (!predefinedCombo) {
    return null;
  }

  return (
    <>
      <PredefinedComboSummary viewModel={predefinedCombo} />
      {predefinedCombo.selectedCombo ? (
        predefinedCombo.hasGuideOnlyItem &&
        guideAssignmentViewModel ? (
          <ReservationGuideAssignmentField
            viewModel={guideAssignmentViewModel}
          />
        ) : (
          <CustomComboNoGuideState />
        )
      ) : null}
    </>
  );
};

export default PredefinedComboFormFields;
