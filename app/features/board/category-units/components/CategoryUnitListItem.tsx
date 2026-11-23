import {
  CATEGORY_UNIT_ACTION,
  CATEGORY_UNIT_ROW_KIND,
} from "../constants/CategoryUnits.constants";
import type { CategoryUnitListItemProps } from "../models/CategoryUnitListItemProps.interface";
import CategoryUnitActionRow from "./CategoryUnitActionRow";
import CategoryUnitRow from "./CategoryUnitRow";
import CategoryUnitSelectRow from "./CategoryUnitSelectRow";

const CategoryUnitListItem = ({
  image,
  interaction,
  kind,
  selection,
  unit,
}: CategoryUnitListItemProps): React.JSX.Element => {
  if (kind === CATEGORY_UNIT_ROW_KIND.SELECT && selection) {
    return (
      <CategoryUnitSelectRow
        image={image}
        isSelected={selection.selectedUnitIds.includes(
          unit.id
        )}
        onToggle={selection.onToggle}
        unit={unit}
      />
    );
  }

  if (
    kind === CATEGORY_UNIT_ROW_KIND.MODIFY &&
    interaction
  ) {
    return (
      <CategoryUnitActionRow
        action={CATEGORY_UNIT_ACTION.MODIFY}
        image={image}
        onAction={interaction.onOpenModify}
        unit={unit}
      />
    );
  }

  if (kind === CATEGORY_UNIT_ROW_KIND.INFO && interaction) {
    return (
      <CategoryUnitActionRow
        action={CATEGORY_UNIT_ACTION.INFO}
        image={image}
        onAction={interaction.onOpenInfo}
        unit={unit}
      />
    );
  }

  return (
    <CategoryUnitRow
      image={image}
      unit={unit}
    />
  );
};

export default CategoryUnitListItem;
