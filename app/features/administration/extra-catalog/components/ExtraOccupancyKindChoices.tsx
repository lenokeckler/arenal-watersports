import InlineText from "@/app/components/text/InlineText";
import Label from "@/app/components/text/Label";
import { INPUT_TYPES } from "@/app/constants";
import { EXTRA_FORM_FIELD_ID } from "../constants/ExtraFormFieldId.constants";
import { EXTRA_OCCUPANCY_COPY } from "../constants/ExtraOccupancyCopy.constants";
import type { ExtraOccupancyKindChoicesProps } from "../models/ExtraOccupancyKindChoicesProps.type";
import {
  EXTRA_OCCUPANCY_CHOICE_RADIO_CLASS,
  EXTRA_OCCUPANCY_CHOICES_CLASS,
  resolveExtraOccupancyChoiceClassName,
  resolveExtraOccupancyChoiceHintClassName,
  resolveExtraOccupancyChoiceTitleClassName,
} from "../styles/ExtraOccupancy.styles";

const ExtraOccupancyKindChoices = ({
  isOccupancyEnabled,
  isOccupancyDisabled,
  onOccupancySelect,
}: ExtraOccupancyKindChoicesProps): React.JSX.Element => {
  const choices = [
    {
      hint: EXTRA_OCCUPANCY_COPY.CHARGE_ONLY_HINT,
      id: EXTRA_FORM_FIELD_ID.OCCUPANCY_CHARGE_ONLY,
      isSelected: !isOccupancyEnabled,
      title: EXTRA_OCCUPANCY_COPY.CHARGE_ONLY_OPTION,
      value: false,
    },
    {
      hint: EXTRA_OCCUPANCY_COPY.EQUIPMENT_HINT,
      id: EXTRA_FORM_FIELD_ID.OCCUPANCY_TOGGLE,
      isSelected: isOccupancyEnabled,
      title: EXTRA_OCCUPANCY_COPY.EQUIPMENT_OPTION,
      value: true,
    },
  ];

  return (
    <div className={EXTRA_OCCUPANCY_CHOICES_CLASS}>
      {choices.map((choice) => (
        <Label
          key={choice.id}
          htmlFor={choice.id}
          className={resolveExtraOccupancyChoiceClassName(
            choice.isSelected,
            isOccupancyDisabled
          )}
        >
          <input
            id={choice.id}
            name={EXTRA_FORM_FIELD_ID.OCCUPANCY_KIND}
            type={INPUT_TYPES.RADIO}
            checked={choice.isSelected}
            disabled={isOccupancyDisabled}
            onChange={onOccupancySelect(choice.value)}
            className={EXTRA_OCCUPANCY_CHOICE_RADIO_CLASS}
          />
          <InlineText
            className={resolveExtraOccupancyChoiceTitleClassName(
              choice.isSelected
            )}
          >
            {choice.title}
          </InlineText>
          <InlineText
            className={resolveExtraOccupancyChoiceHintClassName(
              choice.isSelected
            )}
          >
            {choice.hint}
          </InlineText>
        </Label>
      ))}
    </div>
  );
};

export default ExtraOccupancyKindChoices;
