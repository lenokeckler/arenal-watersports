import { useId } from "react";
import { InlineText, Label, Text } from "@/app/components";
import { INPUT_TYPES, STRING } from "@/app/constants";
import { RESERVATION_POSTPONEMENT_READINGS_COPY as COPY } from "../constants/ReservationPostponementReadingsCopy.constants";
import type { ReservationPostponementReadingUnitProps } from "../models/ReservationPostponementReadingUnitProps.interface";
import { RESERVATION_POSTPONEMENT_OPTION_INPUT_CLASS } from "../styles/ReservationPostponementCauseOption.styles";
import { RESERVATION_POSTPONEMENT_ERROR_TEXT_CLASS } from "../styles/ReservationPostponementForm.styles";
import {
  RESERVATION_POSTPONEMENT_FUEL_CLASS,
  RESERVATION_POSTPONEMENT_FUEL_GRID_CLASS,
  RESERVATION_POSTPONEMENT_FUEL_LEGEND_CLASS,
  RESERVATION_POSTPONEMENT_STRIPE_ROW_CLASS,
  resolveReservationPostponementFuelCaptionClassName,
  resolveReservationPostponementFuelOptionClassName,
} from "../styles/ReservationPostponementReadings.styles";
import { resolveReservationPostponementFuelCaption } from "../utils/resolveReservationPostponementFuelCaption";
import { resolveReservationPostponementReadingFieldId } from "../utils/resolveReservationPostponementReadingFieldId";
import { resolveReservationPostponementStripeClass } from "../utils/resolveReservationPostponementStripeClass";

const ReservationPostponementFuelChoice = ({
  unit,
  viewModel,
}: ReservationPostponementReadingUnitProps): React.JSX.Element => {
  const errorId = useId();
  const max = unit.fuelMax ?? 0;
  const levels = Array.from(
    { length: max + 1 },
    (_, level) => level
  );
  const stripes = Array.from(
    { length: max },
    (_, stripe) => stripe
  );
  const selected =
    viewModel.draft.readings[unit.itemId]?.fuelIn ??
    STRING.Empty;
  const error =
    viewModel.errors.readings[unit.itemId]?.fuelIn;

  return (
    <fieldset
      className={RESERVATION_POSTPONEMENT_FUEL_CLASS}
      aria-describedby={error ? errorId : undefined}
      aria-invalid={Boolean(error)}
    >
      <legend
        className={
          RESERVATION_POSTPONEMENT_FUEL_LEGEND_CLASS
        }
      >
        {COPY.LABEL_FUEL}
      </legend>
      <div
        className={RESERVATION_POSTPONEMENT_FUEL_GRID_CLASS}
      >
        {levels.map((level) => {
          const isSelected = selected === String(level);

          return (
            <Label
              key={level}
              className={resolveReservationPostponementFuelOptionClassName(
                isSelected
              )}
            >
              <input
                id={
                  level === 0
                    ? resolveReservationPostponementReadingFieldId(
                        unit.itemId,
                        "fuelIn"
                      )
                    : undefined
                }
                type={INPUT_TYPES.RADIO}
                name={resolveReservationPostponementReadingFieldId(
                  unit.itemId,
                  "fuelIn"
                )}
                value={level}
                checked={isSelected}
                disabled={viewModel.isPending}
                aria-label={COPY.FUEL_LEVEL_LABEL(
                  level,
                  max
                )}
                className={
                  RESERVATION_POSTPONEMENT_OPTION_INPUT_CLASS
                }
                onChange={() =>
                  viewModel.setReading(
                    unit.itemId,
                    "fuelIn",
                    String(level)
                  )
                }
              />
              <span
                aria-hidden
                className={
                  RESERVATION_POSTPONEMENT_STRIPE_ROW_CLASS
                }
              >
                {stripes.map((stripe) => (
                  <span
                    key={stripe}
                    className={resolveReservationPostponementStripeClass(
                      stripe,
                      level,
                      max
                    )}
                  />
                ))}
              </span>
              <InlineText
                className={resolveReservationPostponementFuelCaptionClassName(
                  isSelected
                )}
              >
                {resolveReservationPostponementFuelCaption(
                  level,
                  max
                )}
              </InlineText>
            </Label>
          );
        })}
      </div>
      {error && (
        <Text
          id={errorId}
          className={
            RESERVATION_POSTPONEMENT_ERROR_TEXT_CLASS
          }
        >
          {error}
        </Text>
      )}
    </fieldset>
  );
};

export default ReservationPostponementFuelChoice;
