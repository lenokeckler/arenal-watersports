import { useId } from "react";
import { Text } from "@/app/components";
import type { Nullable } from "@/app/types";
import { RESERVATION_SPLIT_DRAFT } from "../constants/ReservationSplitDraft.constants";
import { RESERVATION_SPLIT_FIELD_ID } from "../constants/ReservationSplitUi.constants";
import { RESERVATION_SPLIT_ITEM_KIND } from "../constants/ReservationSplitItemKind.constants";
import { RESERVATION_SPLIT_UI_COPY } from "../constants/ReservationSplitUiCopy.constants";
import type { ReservationSplitDepartureEquipmentProps } from "../models/ReservationSplitDepartureEquipmentProps.interface";
import {
  RESERVATION_SPLIT_EQUIPMENT_ERROR_CLASS,
  RESERVATION_SPLIT_EQUIPMENT_LEGEND_CLASS,
} from "../styles/ReservationSplitCards.styles";
import { resolveReservationSplitDepartureMax } from "../utils/resolveReservationSplitDepartureMax";
import ReservationSplitQuantityStepper from "./ReservationSplitQuantityStepper";

const ReservationSplitDepartureEquipment = ({
  departureNumber,
  draft,
  error,
  split,
  viewModel,
}: ReservationSplitDepartureEquipmentProps): Nullable<React.JSX.Element> => {
  const errorId = useId();
  const max = resolveReservationSplitDepartureMax(
    draft,
    viewModel.remainder
  );

  const quantityItems = split.items.filter(
    (item) =>
      item.kind === RESERVATION_SPLIT_ITEM_KIND.QUANTITY
  );

  if (quantityItems.length === 0) {
    return null;
  }

  return (
    <fieldset
      aria-describedby={error ? errorId : undefined}
    >
      <legend
        className={RESERVATION_SPLIT_EQUIPMENT_LEGEND_CLASS}
      >
        {RESERVATION_SPLIT_UI_COPY.EQUIPMENT_LEGEND}
      </legend>
      {quantityItems.map((item, index) => {
        const value =
          draft.quantities[item.id] ??
          RESERVATION_SPLIT_DRAFT.NONE;

        return (
          <ReservationSplitQuantityStepper
            key={item.id}
            canDecrease={
              value > RESERVATION_SPLIT_DRAFT.NONE
            }
            canIncrease={value < max.quantities[item.id]}
            controlId={
              index === RESERVATION_SPLIT_DRAFT.NONE
                ? `${RESERVATION_SPLIT_FIELD_ID.ITEMS_PREFIX}${draft.key}`
                : undefined
            }
            departureNumber={departureNumber}
            isFrozen={viewModel.isPending}
            label={item.label}
            value={value}
            onDecrease={() =>
              viewModel.stepQuantity(
                draft.key,
                item.id,
                RESERVATION_SPLIT_DRAFT.STEP_DOWN
              )
            }
            onIncrease={() =>
              viewModel.stepQuantity(
                draft.key,
                item.id,
                RESERVATION_SPLIT_DRAFT.STEP_UP
              )
            }
          />
        );
      })}
      {error && (
        <Text
          id={errorId}
          className={
            RESERVATION_SPLIT_EQUIPMENT_ERROR_CLASS
          }
        >
          {error}
        </Text>
      )}
    </fieldset>
  );
};

export default ReservationSplitDepartureEquipment;
