import { RESERVATION_GUIDE_LOAD_RESULT_KIND } from "../constants/ReservationGuideLoad.constants";
import type { ReservationGuideAssignmentFieldProps } from "../models/ReservationGuideAssignmentFieldProps.interface";
import { RESERVATION_GUIDE_ASSIGNMENT_CARD_CLASS } from "../styles/ReservationGuideAssignmentField.styles";
import ReservationGuideAssignmentFeedback from "./ReservationGuideAssignmentFeedback";
import ReservationGuideAssignmentHeader from "./ReservationGuideAssignmentHeader";
import ReservationGuideAssignmentOptions from "./ReservationGuideAssignmentOptions";

const ReservationGuideAssignmentField = ({
  viewModel,
}: ReservationGuideAssignmentFieldProps): React.JSX.Element => {
  const loadResult = viewModel.guideLoadResult;
  const guides =
    loadResult.kind ===
    RESERVATION_GUIDE_LOAD_RESULT_KIND.SUCCESS
      ? loadResult.guides
      : [];
  return (
    <fieldset
      className={RESERVATION_GUIDE_ASSIGNMENT_CARD_CLASS}
    >
      <ReservationGuideAssignmentHeader
        selectedGuideCount={
          viewModel.values.guideIds?.length ?? 0
        }
      />
      <ReservationGuideAssignmentFeedback
        isLoading={viewModel.isGuideLoading}
        result={loadResult}
        retry={viewModel.handleRetryGuideLoading}
      />
      {loadResult.kind ===
      RESERVATION_GUIDE_LOAD_RESULT_KIND.SUCCESS ? (
        <ReservationGuideAssignmentOptions
          guides={guides}
          onToggle={viewModel.handleGuideToggle}
          selectedGuideIds={viewModel.values.guideIds ?? []}
        />
      ) : null}
    </fieldset>
  );
};

export default ReservationGuideAssignmentField;
