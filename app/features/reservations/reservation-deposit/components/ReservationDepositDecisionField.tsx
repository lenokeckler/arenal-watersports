import { RESERVATION_DEPOSIT_FORM_COPY as COPY } from "../constants/ReservationDepositFormCopy.constants";
import { RESERVATION_DEPOSIT_FIELD_ID as FIELD_ID } from "../constants/ReservationDepositUi.constants";
import type { ReservationDepositDecisionFieldProps } from "../models/ReservationDepositDecisionFieldProps.interface";
import {
  RESERVATION_DEPOSIT_CHOICE_FIELDSET_CLASS,
  RESERVATION_DEPOSIT_CHOICE_GRID_CLASS,
  RESERVATION_DEPOSIT_CHOICE_LEGEND_CLASS,
  resolveReservationDepositDecisionOptionClassName,
} from "../styles/ReservationDepositChoice.styles";
import ReservationDepositChoiceOption from "./ReservationDepositChoiceOption";

const DECISION_OPTIONS = [
  {
    hasDeposit: true,
    id: FIELD_ID.DECISION_RECEIVED,
    label: COPY.DECISION_RECEIVED,
  },
  {
    hasDeposit: false,
    id: FIELD_ID.DECISION_DECLINED,
    label: COPY.DECISION_DECLINED,
  },
] as const;

const ReservationDepositDecisionField = ({
  hasDeposit: selected,
  isPending,
  onSelect,
}: ReservationDepositDecisionFieldProps): React.JSX.Element => (
  <fieldset
    className={RESERVATION_DEPOSIT_CHOICE_FIELDSET_CLASS}
  >
    <legend
      className={RESERVATION_DEPOSIT_CHOICE_LEGEND_CLASS}
    >
      {COPY.DECISION_LEGEND}
    </legend>
    <div className={RESERVATION_DEPOSIT_CHOICE_GRID_CLASS}>
      {DECISION_OPTIONS.map(({ hasDeposit, id, label }) => (
        <ReservationDepositChoiceOption
          key={id}
          className={resolveReservationDepositDecisionOptionClassName(
            {
              isDisabled: isPending,
              isSelected: selected === hasDeposit,
            }
          )}
          id={id}
          isDisabled={isPending}
          isSelected={selected === hasDeposit}
          label={label}
          name={FIELD_ID.DECISION}
          onSelect={() => onSelect(hasDeposit)}
        />
      ))}
    </div>
  </fieldset>
);

export default ReservationDepositDecisionField;
