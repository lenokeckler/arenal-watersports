import InlineText from "@/app/components/text/InlineText";
import Label from "@/app/components/text/Label";
import type { ReservationGuideAssignmentOptionsProps } from "../models/ReservationGuideAssignmentOptionsProps.interface";
import {
  RESERVATION_GUIDE_ASSIGNMENT_CHECKBOX_CLASS,
  RESERVATION_GUIDE_ASSIGNMENT_GRID_CLASS,
  RESERVATION_GUIDE_ASSIGNMENT_OPTION_CLASS,
} from "../styles/ReservationGuideAssignmentField.styles";

const ReservationGuideAssignmentOptions = ({
  guides,
  onToggle,
  selectedGuideIds,
}: ReservationGuideAssignmentOptionsProps): React.JSX.Element => (
  <div className={RESERVATION_GUIDE_ASSIGNMENT_GRID_CLASS}>
    {guides.map((guide) => (
      <Label
        className={
          RESERVATION_GUIDE_ASSIGNMENT_OPTION_CLASS
        }
        key={guide.id}
      >
        <input
          checked={selectedGuideIds.includes(guide.id)}
          className={
            RESERVATION_GUIDE_ASSIGNMENT_CHECKBOX_CLASS
          }
          onChange={() => onToggle(guide.id)}
          type="checkbox"
          value={guide.id}
        />
        <InlineText>{guide.name}</InlineText>
      </Label>
    ))}
  </div>
);

export default ReservationGuideAssignmentOptions;
