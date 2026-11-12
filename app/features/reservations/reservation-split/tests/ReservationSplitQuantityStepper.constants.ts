import type { ReservationSplitQuantityStepperProps } from "../models/ReservationSplitQuantityStepperProps.interface";

export const STEPPER_LABEL = "Kayak";
export const STEPPER_DEPARTURE_NUMBER = 2;
export const STEPPER_VALUE = 3;
export const ARIA_DISABLED_ATTRIBUTE = "aria-disabled";
export const ARIA_TRUE = "true";
export const STEPPER_ERROR =
  "Cada salida necesita al menos 1 equipo.";

export const STEPPER_PROPS: ReservationSplitQuantityStepperProps =
  {
    canDecrease: true,
    canIncrease: true,
    departureNumber: STEPPER_DEPARTURE_NUMBER,
    label: STEPPER_LABEL,
    onDecrease: () => undefined,
    onIncrease: () => undefined,
    value: STEPPER_VALUE,
  };
