"use client";

import DispatchSheet from "@/app/components/dispatch-board/components/DispatchSheet";
import { CATEGORY_UNITS_DISPATCH_STEP } from "../constants/CategoryUnits.constants";
import { useCategoryUnitsBoard } from "../hooks/useCategoryUnitsBoard";
import { useCategoryUnitsDispatch } from "../hooks/useCategoryUnitsDispatch";
import type { CategoryUnitsDispatchProps } from "../models/CategoryUnitsDispatchProps.interface";
import { CATEGORY_UNITS_DISPATCH_SPACER_CLASS } from "../styles/CategoryUnits.styles";
import CategoryDispatchReservationPicker from "./CategoryDispatchReservationPicker";
import CategoryUnitInfoSheet from "./CategoryUnitInfoSheet";
import CategoryUnitModifySheet from "./CategoryUnitModifySheet";
import CategoryUnitReceiveSheet from "./CategoryUnitReceiveSheet";
import CategoryUnitStatusSheet from "./CategoryUnitStatusSheet";
import CategoryUnitsDispatchBar from "./CategoryUnitsDispatchBar";
import CategoryUnitsEditToggle from "./CategoryUnitsEditToggle";
import CategoryUnitsHeader from "./CategoryUnitsHeader";
import CategoryUnitsList from "./CategoryUnitsList";

const CategoryUnitsDispatch = ({
  afterHeader,
  categoryId,
  categoryName,
  filterControl,
  image,
  units,
}: CategoryUnitsDispatchProps): React.JSX.Element => {
  const dispatch = useCategoryUnitsDispatch();
  const board = useCategoryUnitsBoard({
    onEditingChange: dispatch.handleCancel,
  });
  const selectedCount = dispatch.selectedUnitIds.length;
  const infoUnit = units.find(
    (unit) => unit.id === board.infoUnitId
  );
  const modifyUnit = units.find(
    (unit) => unit.id === board.modifyUnitId
  );
  const receiveUnit = units.find(
    (unit) => unit.id === board.receiveUnitId
  );
  const statusUnit = units.find(
    (unit) => unit.id === board.statusUnitId
  );

  return (
    <>
      <CategoryUnitsHeader
        categoryName={categoryName}
        filterControl={filterControl}
      >
        {units.length > 0 && (
          <CategoryUnitsEditToggle
            isEditing={board.isEditing}
            onToggle={board.handleToggleEditing}
          />
        )}
      </CategoryUnitsHeader>
      {afterHeader}
      <CategoryUnitsList
        categoryName={categoryName}
        image={image}
        interaction={{
          isEditing: board.isEditing,
          onOpenInfo: board.handleOpenInfo,
          onOpenModify: board.handleOpenModify,
          onOpenStatus: board.handleOpenStatus,
        }}
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
      {infoUnit?.occupancy && (
        <CategoryUnitInfoSheet
          occupancy={infoUnit.occupancy}
          onClose={board.handleCloseInfo}
          onReceive={() =>
            board.handleOpenReceive(infoUnit.id)
          }
          unit={infoUnit}
        />
      )}
      {receiveUnit?.occupancy && receiveUnit.readings && (
        <CategoryUnitReceiveSheet
          occupancy={receiveUnit.occupancy}
          onClose={board.handleCloseReceive}
          readings={receiveUnit.readings}
          unit={receiveUnit}
        />
      )}
      {statusUnit && (
        <CategoryUnitStatusSheet
          onClose={board.handleCloseStatus}
          unit={statusUnit}
        />
      )}
      {modifyUnit && (
        <CategoryUnitModifySheet
          onClose={board.handleCloseModify}
          readings={modifyUnit.readings}
          unit={modifyUnit}
        />
      )}
    </>
  );
};

export default CategoryUnitsDispatch;
