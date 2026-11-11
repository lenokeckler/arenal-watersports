import { INDEX } from "@/app/constants";
import { RESERVATION_EQUIPMENT_COMMITMENT_TYPE } from "../constants/ReservationEquipmentCommitmentType.constants";
import type { CustomComboEquipmentSelectionProps } from "../models/CustomComboEquipmentSelectionProps.interface";
import { CUSTOM_COMBO_CATEGORY_GRID_CLASS } from "../styles/CustomComboEquipmentSelection.styles";
import CustomComboEquipmentCard from "./CustomComboEquipmentCard";

const CustomComboEquipmentCategoryList = ({
  categories,
  date,
  durationHours,
  time,
  viewModel,
}: CustomComboEquipmentSelectionProps): React.JSX.Element => (
  <div className={CUSTOM_COMBO_CATEGORY_GRID_CLASS}>
    {categories.map((category) => {
      const selection = viewModel.draft.items.find(
        (item) => item.categoryId === category.id
      );
      const quantity =
        selection?.kind ===
        RESERVATION_EQUIPMENT_COMMITMENT_TYPE.CATEGORY
          ? selection.quantity
          : INDEX.ZERO;
      return (
        <CustomComboEquipmentCard
          category={category}
          date={date}
          durationHours={durationHours}
          key={category.id}
          onRemove={() =>
            viewModel.handleItemRemoval(category.id)
          }
          onAdd={() =>
            viewModel.handleItemChange({
              kind: RESERVATION_EQUIPMENT_COMMITMENT_TYPE.CATEGORY,
              categoryId: category.id,
              quantity: INDEX.FIRST,
            })
          }
          onDecrease={() =>
            viewModel.handleItemQuantityChange(
              category.id,
              quantity - INDEX.FIRST
            )
          }
          onIncrease={() =>
            viewModel.handleItemQuantityChange(
              category.id,
              quantity + INDEX.FIRST
            )
          }
          onUnitChange={(unitId) =>
            viewModel.handleItemUnitChange(
              category.id,
              unitId
            )
          }
          selection={selection}
          time={time}
        />
      );
    })}
  </div>
);

export default CustomComboEquipmentCategoryList;
