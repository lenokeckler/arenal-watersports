import { InlineText } from "@/app/components";
import { RESERVATION_SPLIT_DRAFT } from "../constants/ReservationSplitDraft.constants";
import { RESERVATION_SPLIT_ITEM_KIND } from "../constants/ReservationSplitItemKind.constants";
import { RESERVATION_SPLIT_UI_COPY } from "../constants/ReservationSplitUiCopy.constants";
import type { ReservationSplitCardProps } from "../models/ReservationSplitCardProps.interface";
import type { ReservationSplitItem } from "../models/ReservationSplitItem.interface";
import {
  RESERVATION_SPLIT_EQUIPMENT_LIST_CLASS,
  RESERVATION_SPLIT_EQUIPMENT_ROW_CLASS,
  resolveReservationSplitEquipmentValueClassName,
} from "../styles/ReservationSplitCards.styles";

const ReservationSplitOriginalEquipment = ({
  split,
  viewModel,
}: ReservationSplitCardProps): React.JSX.Element => {
  const resolveUnitHolder = (itemId: string): string => {
    const holderKey =
      viewModel.state.unitAssignments[itemId];
    const holderIndex = viewModel.state.drafts.findIndex(
      (draft) => draft.key === holderKey
    );
    return holderIndex < 0
      ? RESERVATION_SPLIT_UI_COPY.UNIT_STAYS
      : RESERVATION_SPLIT_UI_COPY.UNIT_GOES_TO(
          holderIndex +
            RESERVATION_SPLIT_DRAFT.FIRST_NEW_DEPARTURE_NUMBER
        );
  };

  const isUnit = (item: ReservationSplitItem): boolean =>
    item.kind === RESERVATION_SPLIT_ITEM_KIND.UNIT;

  return (
    <ul className={RESERVATION_SPLIT_EQUIPMENT_LIST_CLASS}>
      {split.items.map((item) => (
        <li
          key={item.id}
          className={RESERVATION_SPLIT_EQUIPMENT_ROW_CLASS}
        >
          <InlineText>{item.label}</InlineText>
          <InlineText
            className={resolveReservationSplitEquipmentValueClassName(
              isUnit(item)
            )}
          >
            {isUnit(item)
              ? resolveUnitHolder(item.id)
              : RESERVATION_SPLIT_UI_COPY.REMAINING_OF(
                  viewModel.remainder.items[item.id],
                  item.pieces
                )}
          </InlineText>
        </li>
      ))}
    </ul>
  );
};

export default ReservationSplitOriginalEquipment;
