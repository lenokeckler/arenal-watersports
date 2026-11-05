import Text from "@/app/components/text/Text";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import type { ReservationGuideAssignmentHeaderProps } from "../models/ReservationGuideAssignmentHeaderProps.interface";
import {
  RESERVATION_GUIDE_ASSIGNMENT_LEGEND_CLASS,
  RESERVATION_GUIDE_ASSIGNMENT_SUMMARY_CLASS,
} from "../styles/ReservationGuideAssignmentField.styles";

const ReservationGuideAssignmentHeader = ({
  selectedGuideCount,
}: ReservationGuideAssignmentHeaderProps): React.JSX.Element => (
  <>
    <legend
      className={RESERVATION_GUIDE_ASSIGNMENT_LEGEND_CLASS}
    >
      {RESERVATION_FORM_UI_COPY.GUIDES}
    </legend>
    <Text>
      {RESERVATION_FORM_UI_COPY.GUIDES_DESCRIPTION}
    </Text>
    <Text
      aria-live="polite"
      className={RESERVATION_GUIDE_ASSIGNMENT_SUMMARY_CLASS}
      role={ARIA_ROLE.STATUS}
    >
      {RESERVATION_FORM_UI_COPY.GUIDES_SELECTED}:{" "}
      {selectedGuideCount}
    </Text>
  </>
);

export default ReservationGuideAssignmentHeader;
