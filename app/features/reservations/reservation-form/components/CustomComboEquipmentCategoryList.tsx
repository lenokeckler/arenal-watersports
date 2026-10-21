import { INDEX } from "@/app/constants";
import type { CustomComboEquipmentSelectionProps } from "../models/CustomComboEquipmentSelectionProps.interface";
import { CUSTOM_COMBO_CATEGORY_GRID_CLASS } from "../styles/CustomComboEquipmentSelection.styles";
import CustomComboEquipmentCard from "./CustomComboEquipmentCard";

const CustomComboEquipmentCategoryList = ({
  categories,
  viewModel,
}: CustomComboEquipmentSelectionProps): React.JSX.Element => (
  <div className={CUSTOM_COMBO_CATEGORY_GRID_CLASS}>
    {categories.map((category) => {
      const selection = viewModel.draft.items.find(
        (item) => item.categoryId === category.id
      );
      return (
        <CustomComboEquipmentCard
          category={category}
          key={category.id}
          onAdd={() =>
            viewModel.handleItemChange({
              categoryId: category.id,
              quantity: INDEX.FIRST,
            })
          }
          onDecrease={() =>
            viewModel.handleItemQuantityChange(
              category.id,
              (selection?.quantity ?? INDEX.FIRST) -
                INDEX.FIRST
            )
          }
          onIncrease={() =>
            viewModel.handleItemQuantityChange(
              category.id,
              (selection?.quantity ?? INDEX.ZERO) +
                INDEX.FIRST
            )
          }
          selection={selection}
        />
      );
    })}
  </div>
);

export default CustomComboEquipmentCategoryList;
