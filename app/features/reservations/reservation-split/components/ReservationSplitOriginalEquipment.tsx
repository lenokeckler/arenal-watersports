import { InlineText } from "@/app/components";
import { RESERVATION_SPLIT_DRAFT } from "../constants/ReservationSplitDraft.constants";
import { RESERVATION_SPLIT_UI_COPY } from "../constants/ReservationSplitUiCopy.constants";
import type { ReservationSplitCardProps } from "../models/ReservationSplitCardProps.interface";
import {
  RESERVATION_SPLIT_EQUIPMENT_LIST_CLASS,
  RESERVATION_SPLIT_EQUIPMENT_ROW_CLASS,
  resolveReservationSplitEquipmentValueClassName,
} from "../styles/ReservationSplitCards.styles";
import { isReservationSplitUnit } from "../utils/isReservationSplitUnit";
import { resolveReservationSplitUnitHolder } from "../utils/resolveReservationSplitUnitHolder";

const ReservationSplitOriginalEquipment = ({
  split,
  viewModel,
}: ReservationSplitCardProps): React.JSX.Element => (
  <ul className={RESERVATION_SPLIT_EQUIPMENT_LIST_CLASS}>
    {split.items.map((item) => {
      const isUnit = isReservationSplitUnit(item);

      return (
        <li
          key={item.id}
          className={RESERVATION_SPLIT_EQUIPMENT_ROW_CLASS}
        >
          <InlineText>{item.label}</InlineText>
          <InlineText
            className={resolveReservationSplitEquipmentValueClassName(
              isUnit,
              viewModel.remainder.pieces <=
                RESERVATION_SPLIT_DRAFT.MIN_PIECES
            )}
          >
            {isUnit
              ? resolveReservationSplitUnitHolder(
                  viewModel.state,
                  item.id
                )
              : RESERVATION_SPLIT_UI_COPY.REMAINING_OF(
                  viewModel.remainder.items[item.id],
                  item.pieces
                )}
          </InlineText>
        </li>
      );
    })}
  </ul>
);

export default ReservationSplitOriginalEquipment;
