"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/components/button/constants";
import { BUTTON_TYPES } from "@/app/constants";
import { DISPATCH_SHEET_COPY } from "../constants/DispatchSheetCopy.constants";
import type { DispatchReservationActionProps } from "../models/DispatchReservationActionProps.interface";
import { DISPATCH_ACTION_CLASS } from "../styles/DispatchSheet.styles";
import DispatchSheet from "./DispatchSheet";

const DispatchReservationAction = ({
  customerName,
  reservationId,
}: DispatchReservationActionProps): React.JSX.Element => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = (): void => {
    setIsOpen(false);
    router.refresh();
  };

  return (
    <>
      <Button
        type={BUTTON_TYPES.BUTTON}
        variant={BUTTON.PRIMARY}
        aria-label={`${DISPATCH_SHEET_COPY.ACTION_LABEL_PREFIX}${customerName}`}
        className={DISPATCH_ACTION_CLASS}
        onClick={() => setIsOpen(true)}
      >
        {DISPATCH_SHEET_COPY.ACTION}
      </Button>
      {isOpen && (
        <DispatchSheet
          customerName={customerName}
          onClose={handleClose}
          onDispatched={handleClose}
          reservationId={reservationId}
        />
      )}
    </>
  );
};

export default DispatchReservationAction;
