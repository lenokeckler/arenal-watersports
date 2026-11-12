import type { NullableRef } from "@/app/types";
import type { CategoryDispatchReservation } from "@/app/components/dispatch-board/models/CategoryDispatchReservation.interface";
import type { CategoryUnitsDispatchStep } from "./CategoryUnitsDispatchStep.type";

export interface CategoryUnitsDispatchViewModel {
  chosenReservation: NullableRef<CategoryDispatchReservation>;
  handleCancel: () => void;
  handleChooseReservation: (
    reservation: CategoryDispatchReservation
  ) => void;
  handleClosePicker: () => void;
  handleCloseSheet: () => void;
  handleOpenPicker: () => void;
  handleToggleUnit: (unitId: string) => void;
  selectedUnitIds: string[];
  step: CategoryUnitsDispatchStep;
}
