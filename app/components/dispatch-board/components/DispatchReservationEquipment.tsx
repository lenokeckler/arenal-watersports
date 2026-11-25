import { ARIA_ROLE, STRING } from "@/app/constants";
import { DISPATCH_BOARD_COPY } from "../constants/DispatchBoard.constants";
import type { DispatchReservationEquipmentProps } from "../models/DispatchReservationEquipmentProps.interface";
import {
  DISPATCH_BOARD_EQUIPMENT_CHIP_CLASS,
  DISPATCH_BOARD_EQUIPMENT_LIST_CLASS,
} from "../styles/DispatchBoard.styles";

const DispatchReservationEquipment = ({
  equipment,
}: DispatchReservationEquipmentProps): React.JSX.Element | null =>
  equipment.length === 0 ? null : (
    <div
      role={ARIA_ROLE.GROUP}
      aria-label={DISPATCH_BOARD_COPY.EQUIPMENT_LABEL}
      className={DISPATCH_BOARD_EQUIPMENT_LIST_CLASS}
    >
      {equipment.map((item) => (
        <span
          key={item.categoryName}
          className={DISPATCH_BOARD_EQUIPMENT_CHIP_CLASS}
        >
          {item.quantity < item.totalQuantity
            ? DISPATCH_BOARD_COPY.MISSING(
                item.categoryName,
                item.quantity,
                item.totalQuantity
              )
            : `${item.categoryName}${STRING.SPACE}${STRING.CLOSE_SIGN}${STRING.SPACE}${item.quantity}`}
        </span>
      ))}
    </div>
  );

export default DispatchReservationEquipment;
