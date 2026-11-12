import { useId } from "react";
import {
  InlineText,
  Label,
  MaterialIcon,
  Text,
} from "@/app/components";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { INPUT_TYPES } from "@/app/constants";
import type { ReservationSplitUnitChoiceProps } from "../models/ReservationSplitUnitChoiceProps.interface";
import {
  RESERVATION_SPLIT_UNIT_CHOICE_CLASS,
  RESERVATION_SPLIT_UNIT_CHOICE_ERROR_CLASS,
  RESERVATION_SPLIT_UNIT_CHOICE_GRID_CLASS,
  RESERVATION_SPLIT_UNIT_CHOICE_INPUT_CLASS,
  RESERVATION_SPLIT_UNIT_CHOICE_LEGEND_CLASS,
  RESERVATION_SPLIT_UNIT_OPTION_ICON_CLASS,
  resolveReservationSplitUnitOptionClassName,
  resolveReservationSplitUnitOptionTextClassName,
} from "../styles/ReservationSplitUnitChoice.styles";
import { buildReservationSplitUnitOptions } from "../utils/buildReservationSplitUnitOptions";

const ReservationSplitUnitChoice = ({
  drafts,
  error,
  isFrozen = false,
  onSelect,
  originalTime,
  selectedKey,
  unit,
}: ReservationSplitUnitChoiceProps): React.JSX.Element => {
  const errorId = useId();

  return (
    <fieldset
      className={RESERVATION_SPLIT_UNIT_CHOICE_CLASS}
      aria-describedby={error ? errorId : undefined}
      aria-invalid={Boolean(error)}
    >
      <legend
        className={
          RESERVATION_SPLIT_UNIT_CHOICE_LEGEND_CLASS
        }
      >
        {unit.label}
      </legend>
      <div
        className={RESERVATION_SPLIT_UNIT_CHOICE_GRID_CLASS}
      >
        {buildReservationSplitUnitOptions(
          originalTime,
          drafts
        ).map((option) => {
          const isSelected = option.key === selectedKey;

          return (
            <Label
              key={option.key ?? unit.id}
              className={resolveReservationSplitUnitOptionClassName(
                isSelected
              )}
            >
              <input
                type={INPUT_TYPES.RADIO}
                name={unit.id}
                checked={isSelected}
                disabled={isFrozen}
                className={
                  RESERVATION_SPLIT_UNIT_CHOICE_INPUT_CLASS
                }
                onChange={() => onSelect(option.key)}
              />
              <InlineText
                className={resolveReservationSplitUnitOptionTextClassName(
                  isSelected
                )}
              >
                {option.label}
              </InlineText>
              {isSelected && (
                <MaterialIcon
                  name={MATERIAL_ICON_NAME.CHECK}
                  className={
                    RESERVATION_SPLIT_UNIT_OPTION_ICON_CLASS
                  }
                />
              )}
            </Label>
          );
        })}
      </div>
      {error && (
        <Text
          id={errorId}
          className={
            RESERVATION_SPLIT_UNIT_CHOICE_ERROR_CLASS
          }
        >
          {error}
        </Text>
      )}
    </fieldset>
  );
};

export default ReservationSplitUnitChoice;
