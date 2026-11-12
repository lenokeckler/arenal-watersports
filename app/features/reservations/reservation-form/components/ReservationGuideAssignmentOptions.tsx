import { FormField } from "@/app/components";
import { INPUT_TYPES } from "@/app/constants";
import type { ReservationGuideAssignmentOptionsProps } from "../models/ReservationGuideAssignmentOptionsProps.interface";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import {
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
      <div
        className={
          RESERVATION_GUIDE_ASSIGNMENT_OPTION_CLASS
        }
        key={guide.id}
      >
        <FormField
          checked={selectedGuideIds.includes(guide.id)}
          id={guide.id}
          label={guide.name}
          name={RESERVATION_FORM_FIELD.GUIDE_IDS}
          onChange={() => onToggle(guide.id)}
          type={INPUT_TYPES.CHECKBOX}
          value={guide.name}
        />
      </div>
    ))}
  </div>
);

export default ReservationGuideAssignmentOptions;
