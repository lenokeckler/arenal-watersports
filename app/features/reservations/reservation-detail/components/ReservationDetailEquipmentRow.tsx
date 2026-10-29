import InlineText from "@/app/components/text/InlineText";
import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import Text from "@/app/components/text/Text";
import { MATERIAL_ICON_NAME } from "@/app/constants";
import { RESERVATION_DETAIL_SECTIONS_COPY as copy } from "../constants/ReservationDetailSectionsCopy.constants";
import type { ReservationDetailEquipmentRowProps } from "../models/ReservationDetailEquipmentRowProps.interface";
import {
  RESERVATION_DETAIL_CHIP_CLASS,
  RESERVATION_DETAIL_ICON_CLASS,
  RESERVATION_DETAIL_ROW_CLASS,
  RESERVATION_DETAIL_ROW_MAIN_CLASS,
  RESERVATION_DETAIL_ROW_TITLE_CLASS,
} from "../styles/ReservationDetailSections.styles";

const ReservationDetailEquipmentRow = ({
  equipment,
}: ReservationDetailEquipmentRowProps): React.JSX.Element => (
  <div className={RESERVATION_DETAIL_ROW_CLASS}>
    <div className={RESERVATION_DETAIL_ROW_MAIN_CLASS}>
      <MaterialIcon
        name={MATERIAL_ICON_NAME.DIRECTIONS_BOAT}
        className={RESERVATION_DETAIL_ICON_CLASS}
      />
      <div>
        <Text
          className={RESERVATION_DETAIL_ROW_TITLE_CLASS}
        >
          {equipment.unitCode ??
            equipment.categoryName ??
            copy.MISSING_CATEGORY}
        </Text>
        {equipment.unitCode !== null &&
        equipment.categoryName !== null ? (
          <Text>{equipment.categoryName}</Text>
        ) : null}
      </div>
    </div>
    {equipment.quantity === null ? null : (
      <InlineText className={RESERVATION_DETAIL_CHIP_CLASS}>
        {`${copy.QUANTITY}: ${equipment.quantity}`}
      </InlineText>
    )}
  </div>
);

export default ReservationDetailEquipmentRow;
