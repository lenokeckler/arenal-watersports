import { InlineText, Label } from "@/app/components";
import { INPUT_TYPES } from "@/app/constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { DEPOSIT_RESOLUTION_FORM_COPY as COPY } from "../constants/DepositResolutionFormCopy.constants";
import { DEPOSIT_RESOLUTION_FIELD_ID as FIELD_ID } from "../constants/DepositResolutionUi.constants";
import type { DepositResolutionChoiceFieldProps } from "../models/DepositResolutionChoiceFieldProps.interface";
import {
  DEPOSIT_RESOLUTION_CHOICE_DESCRIPTION_CLASS,
  DEPOSIT_RESOLUTION_CHOICE_FIELDSET_CLASS,
  DEPOSIT_RESOLUTION_CHOICE_GRID_CLASS,
  DEPOSIT_RESOLUTION_CHOICE_LABEL_CLASS,
  DEPOSIT_RESOLUTION_CHOICE_LEGEND_CLASS,
  DEPOSIT_RESOLUTION_CHOICE_RADIO_CLASS,
  resolveDepositResolutionChoiceClassName,
} from "../styles/DepositResolutionForm.styles";

const DepositResolutionChoiceField = ({
  deposit,
  isPending,
  onSelect,
  returnsAll,
}: DepositResolutionChoiceFieldProps): React.JSX.Element => {
  const options = [
    {
      description: COPY.CHOICE_ALL_DESCRIPTION(
        formatMoney(deposit)
      ),
      id: FIELD_ID.CHOICE_ALL,
      label: COPY.CHOICE_ALL,
      value: true,
    },
    {
      description: COPY.CHOICE_PART_DESCRIPTION,
      id: FIELD_ID.CHOICE_PART,
      label: COPY.CHOICE_PART,
      value: false,
    },
  ];

  return (
    <fieldset
      className={DEPOSIT_RESOLUTION_CHOICE_FIELDSET_CLASS}
    >
      <legend
        className={DEPOSIT_RESOLUTION_CHOICE_LEGEND_CLASS}
      >
        {COPY.CHOICE_LEGEND}
      </legend>
      <div className={DEPOSIT_RESOLUTION_CHOICE_GRID_CLASS}>
        {options.map(
          ({ description, id, label, value }) => (
            <Label
              key={id}
              className={resolveDepositResolutionChoiceClassName(
                {
                  isDisabled: isPending,
                  isSelected: returnsAll === value,
                }
              )}
              htmlFor={id}
            >
              <input
                checked={returnsAll === value}
                className={
                  DEPOSIT_RESOLUTION_CHOICE_RADIO_CLASS
                }
                disabled={isPending}
                id={id}
                name={FIELD_ID.CHOICE}
                onChange={() => onSelect(value)}
                type={INPUT_TYPES.RADIO}
                value={id}
              />
              <InlineText
                className={
                  DEPOSIT_RESOLUTION_CHOICE_LABEL_CLASS
                }
              >
                {label}
              </InlineText>
              <InlineText
                className={
                  DEPOSIT_RESOLUTION_CHOICE_DESCRIPTION_CLASS
                }
              >
                {description}
              </InlineText>
            </Label>
          )
        )}
      </div>
    </fieldset>
  );
};

export default DepositResolutionChoiceField;
