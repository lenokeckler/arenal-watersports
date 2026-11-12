"use client";

import DispatchSheet from "@/app/components/dispatch-board/components/DispatchSheet";
import { CATEGORY_UNITS_DISPATCH_STEP } from "../constants/CategoryUnits.constants";
import { useCategoryUnitsDispatch } from "../hooks/useCategoryUnitsDispatch";
import type { CategoryUnitsDispatchProps } from "../models/CategoryUnitsDispatchProps.interface";
import { CATEGORY_UNITS_DISPATCH_SPACER_CLASS } from "../styles/CategoryUnits.styles";
import CategoryDispatchReservationPicker from "./CategoryDispatchReservationPicker";
import CategoryUnitsDispatchBar from "./CategoryUnitsDispatchBar";
import CategoryUnitsList from "./CategoryUnitsList";

const CategoryUnitsDispatch = ({
  categoryId,
  categoryName,
  units,
}: CategoryUnitsDispatchProps): React.JSX.Element => {
  const dispatch = useCategoryUnitsDispatch();
  const selectedCount = dispatch.selectedUnitIds.length;

  return (
    <>
      <CategoryUnitsList
        categoryName={categoryName}
        selection={{
          onToggle: dispatch.handleToggleUnit,
          selectedUnitIds: dispatch.selectedUnitIds,
        }}
        units={units}
      />
      {selectedCount > 0 && (
        <>
          <div
            aria-hidden
            className={CATEGORY_UNITS_DISPATCH_SPACER_CLASS}
          />
          <CategoryUnitsDispatchBar
            onCancel={dispatch.handleCancel}
            onDispatch={dispatch.handleOpenPicker}
            selectedCount={selectedCount}
          />
        </>
      )}
      {dispatch.step ===
        CATEGORY_UNITS_DISPATCH_STEP.PICKING && (
        <CategoryDispatchReservationPicker
          categoryId={categoryId}
          onChoose={dispatch.handleChooseReservation}
          onClose={dispatch.handleClosePicker}
          selectedCount={selectedCount}
        />
      )}
      {dispatch.step ===
        CATEGORY_UNITS_DISPATCH_STEP.DISPATCHING &&
        dispatch.chosenReservation && (
          <DispatchSheet
            customerName={
              dispatch.chosenReservation.customerName
            }
            initialCategoryId={categoryId}
            onClose={dispatch.handleCloseSheet}
            onDispatched={dispatch.handleCloseSheet}
            preselectedUnitIds={dispatch.selectedUnitIds}
            reservationId={
              dispatch.chosenReservation.reservationId
            }
          />
        )}
    </>
  );
};

export default CategoryUnitsDispatch;
