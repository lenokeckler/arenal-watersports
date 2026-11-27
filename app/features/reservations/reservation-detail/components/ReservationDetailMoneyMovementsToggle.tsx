"use client";

import Button from "@/app/components/button/Button";
import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { BUTTON } from "@/app/constants";
import { RESERVATION_DETAIL_MOVEMENTS_COPY } from "../constants/ReservationDetailMovementsCopy.constants";
import { useReservationDetailMoneyMovementsToggleViewModel } from "../hooks/useReservationDetailMoneyMovementsToggleViewModel";
import type { ReservationDetailMoneyMovementsToggleProps } from "../models/ReservationDetailMoneyMovementsToggleProps.interface";
import {
  RESERVATION_DETAIL_MOVEMENTS_CHEVRON_CLASS,
  RESERVATION_DETAIL_MOVEMENTS_CHEVRON_OPEN_CLASS,
  RESERVATION_DETAIL_MOVEMENTS_PANEL_CLASS,
  RESERVATION_DETAIL_MOVEMENTS_TOGGLE_CLASS,
} from "../styles/ReservationDetailMoneyMovements.styles";

const ReservationDetailMoneyMovementsToggle = ({
  children,
  panelId,
}: ReservationDetailMoneyMovementsToggleProps): React.JSX.Element => {
  const { isOpen, toggle } =
    useReservationDetailMoneyMovementsToggleViewModel();
  const label = isOpen
    ? RESERVATION_DETAIL_MOVEMENTS_COPY.MOVEMENTS_HIDE
    : RESERVATION_DETAIL_MOVEMENTS_COPY.MOVEMENTS_SHOW;
  const chevronClassName = isOpen
    ? RESERVATION_DETAIL_MOVEMENTS_CHEVRON_OPEN_CLASS
    : RESERVATION_DETAIL_MOVEMENTS_CHEVRON_CLASS;

  return (
    <>
      <Button
        variant={BUTTON.BASE}
        aria-expanded={isOpen}
        aria-controls={isOpen ? panelId : undefined}
        onClick={toggle}
        className={
          RESERVATION_DETAIL_MOVEMENTS_TOGGLE_CLASS
        }
      >
        {label}
        <MaterialIcon
          name={MATERIAL_ICON_NAME.EXPAND_MORE}
          className={chevronClassName}
        />
      </Button>
      {isOpen ? (
        <div
          id={panelId}
          className={
            RESERVATION_DETAIL_MOVEMENTS_PANEL_CLASS
          }
        >
          {children}
        </div>
      ) : null}
    </>
  );
};

export default ReservationDetailMoneyMovementsToggle;
