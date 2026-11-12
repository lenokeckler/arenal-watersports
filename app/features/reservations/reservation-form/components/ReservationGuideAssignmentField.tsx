import Text from "@/app/components/text/Text";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_GUIDE_LOAD_RESULT_KIND } from "../constants/ReservationGuideLoad.constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import {
  RESERVATION_FORM_FIELD_ID,
  RESERVATION_FORM_FOCUS_TARGET,
} from "../constants/ReservationFormUi.constants";
import type { ReservationGuideAssignmentFieldProps } from "../models/ReservationGuideAssignmentFieldProps.interface";
import {
  RESERVATION_GUIDE_ASSIGNMENT_CARD_CLASS,
  RESERVATION_GUIDE_ASSIGNMENT_NOTICE_CLASS,
} from "../styles/ReservationGuideAssignmentField.styles";
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
  const hasSelectedGuides =
    (viewModel.values.guideIds?.length ?? 0) > 0;
  const showNoSelectionWarning =
    loadResult.kind ===
      RESERVATION_GUIDE_LOAD_RESULT_KIND.SUCCESS &&
    !hasSelectedGuides;
  return (
    <fieldset
      className={RESERVATION_GUIDE_ASSIGNMENT_CARD_CLASS}
      aria-describedby={
        viewModel.errors.guideIds
          ? RESERVATION_FORM_FIELD_ID.GUIDE_IDS_ERROR
          : undefined
      }
      aria-invalid={Boolean(viewModel.errors.guideIds)}
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
      {showNoSelectionWarning ? (
        <Text
          aria-live="polite"
          className={
            RESERVATION_GUIDE_ASSIGNMENT_NOTICE_CLASS
          }
          role={ARIA_ROLE.STATUS}
        >
          {
            RESERVATION_FORM_UI_COPY.GUIDES_NO_SELECTION_WARNING
          }
        </Text>
      ) : null}
      {viewModel.errors.guideIds ? (
        <Text
          id={RESERVATION_FORM_FIELD_ID.GUIDE_IDS_ERROR}
          role={ARIA_ROLE.ALERT}
          tabIndex={RESERVATION_FORM_FOCUS_TARGET.TAB_INDEX}
        >
          {viewModel.errors.guideIds}
        </Text>
      ) : null}
    </fieldset>
  );
};

export default ReservationGuideAssignmentField;
