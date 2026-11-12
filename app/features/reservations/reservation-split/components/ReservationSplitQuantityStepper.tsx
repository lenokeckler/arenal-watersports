import { useId } from "react";
import { ARIA_ROLE } from "@/app/constants";
import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/components/button/constants";
import { InlineText } from "@/app/components/text/InlineText";
import { Text } from "@/app/components/text/Text";
import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { RESERVATION_SPLIT_UI_COPY } from "../constants/ReservationSplitUiCopy.constants";
import type { ReservationSplitQuantityStepperProps } from "../models/ReservationSplitQuantityStepperProps.interface";
import {
  RESERVATION_SPLIT_STEPPER_ERROR_CLASS,
  RESERVATION_SPLIT_STEPPER_GROUP_CLASS,
  RESERVATION_SPLIT_STEPPER_HELPER_CLASS,
  RESERVATION_SPLIT_STEPPER_LABEL_CLASS,
  RESERVATION_SPLIT_STEPPER_ROW_CLASS,
  RESERVATION_SPLIT_STEPPER_SCREEN_READER_CLASS,
  RESERVATION_SPLIT_STEPPER_VALUE_CLASS,
  RESERVATION_SPLIT_STEPPER_WRAPPER_CLASS,
  resolveReservationSplitStepperButtonClassName,
} from "../styles/ReservationSplitQuantityStepper.styles";

const ReservationSplitQuantityStepper = ({
  canDecrease,
  canIncrease,
  controlId,
  departureNumber,
  error,
  isFrozen = false,
  label,
  onDecrease,
  onIncrease,
  value,
}: ReservationSplitQuantityStepperProps): React.JSX.Element => {
  const maxId = useId();
  const errorId = useId();
  const describedBy =
    [!canIncrease && maxId, error && errorId]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <div
      className={RESERVATION_SPLIT_STEPPER_WRAPPER_CLASS}
    >
      <div className={RESERVATION_SPLIT_STEPPER_ROW_CLASS}>
        <InlineText
          className={RESERVATION_SPLIT_STEPPER_LABEL_CLASS}
        >
          {label}
        </InlineText>
        <div
          role={ARIA_ROLE.GROUP}
          aria-label={RESERVATION_SPLIT_UI_COPY.STEPPER_GROUP_ARIA(
            label,
            departureNumber
          )}
          aria-describedby={describedBy}
          className={RESERVATION_SPLIT_STEPPER_GROUP_CLASS}
        >
          <Button
            variant={BUTTON.BASE}
            type="button"
            aria-label={RESERVATION_SPLIT_UI_COPY.STEPPER_REMOVE_ARIA(
              label,
              departureNumber
            )}
            aria-disabled={!canDecrease || isFrozen}
            className={resolveReservationSplitStepperButtonClassName(
              !canDecrease || isFrozen
            )}
            onClick={
              canDecrease && !isFrozen
                ? onDecrease
                : undefined
            }
          >
            <MaterialIcon
              name={MATERIAL_ICON_NAME.REMOVE}
            />
          </Button>
          <InlineText
            aria-hidden
            className={
              RESERVATION_SPLIT_STEPPER_VALUE_CLASS
            }
          >
            {value}
          </InlineText>
          <InlineText
            className={
              RESERVATION_SPLIT_STEPPER_SCREEN_READER_CLASS
            }
          >
            {RESERVATION_SPLIT_UI_COPY.STEPPER_VALUE_SR(
              value
            )}
          </InlineText>
          <Button
            id={controlId}
            variant={BUTTON.BASE}
            type="button"
            aria-label={RESERVATION_SPLIT_UI_COPY.STEPPER_ADD_ARIA(
              label,
              departureNumber
            )}
            aria-disabled={!canIncrease || isFrozen}
            className={resolveReservationSplitStepperButtonClassName(
              !canIncrease || isFrozen
            )}
            onClick={
              canIncrease && !isFrozen
                ? onIncrease
                : undefined
            }
          >
            <MaterialIcon name={MATERIAL_ICON_NAME.ADD} />
          </Button>
        </div>
      </div>
      {!canIncrease && (
        <Text
          id={maxId}
          className={RESERVATION_SPLIT_STEPPER_HELPER_CLASS}
        >
          {RESERVATION_SPLIT_UI_COPY.STEPPER_AT_MAX}
        </Text>
      )}
      {error && (
        <Text
          id={errorId}
          className={RESERVATION_SPLIT_STEPPER_ERROR_CLASS}
        >
          {error}
        </Text>
      )}
    </div>
  );
};

export default ReservationSplitQuantityStepper;
