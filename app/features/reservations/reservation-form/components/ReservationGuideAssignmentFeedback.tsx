import Button from "@/app/components/button/Button";
import Text from "@/app/components/text/Text";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { RESERVATION_GUIDE_LOAD_RESULT_KIND } from "../constants/ReservationGuideLoad.constants";
import type { ReservationGuideAssignmentFeedbackProps } from "../models/ReservationGuideAssignmentFeedbackProps.interface";
import {
  RESERVATION_GUIDE_ASSIGNMENT_ERROR_CLASS,
  RESERVATION_GUIDE_ASSIGNMENT_RETRY_CLASS,
} from "../styles/ReservationGuideAssignmentField.styles";

const ReservationGuideAssignmentFeedback = ({
  isLoading,
  result,
  retry,
}: ReservationGuideAssignmentFeedbackProps): React.JSX.Element | null => {
  if (isLoading) {
    return (
      <Text role="status">
        {RESERVATION_FORM_UI_COPY.GUIDES_LOADING}
      </Text>
    );
  }
  if (
    result.kind ===
    RESERVATION_GUIDE_LOAD_RESULT_KIND.FAILURE
  ) {
    return (
      <div
        className={RESERVATION_GUIDE_ASSIGNMENT_ERROR_CLASS}
        role="alert"
      >
        <Text>{RESERVATION_FORM_UI_COPY.GUIDES_ERROR}</Text>
        <Button
          className={
            RESERVATION_GUIDE_ASSIGNMENT_RETRY_CLASS
          }
          disabled={isLoading}
          onClick={retry}
          type="button"
        >
          {RESERVATION_FORM_UI_COPY.GUIDES_RETRY}
        </Button>
      </div>
    );
  }
  if (result.guides.length === 0) {
    return (
      <Text>{RESERVATION_FORM_UI_COPY.GUIDES_EMPTY}</Text>
    );
  }
  return null;
};

export default ReservationGuideAssignmentFeedback;
