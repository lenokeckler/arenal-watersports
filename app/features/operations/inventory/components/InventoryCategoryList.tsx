import { Text, UnorderedList } from "@/app/components";
import { UNORDERED_LIST } from "@/app/constants";
import InventoryCategoryCard from "./InventoryCategoryCard";
import { INVENTORY_COPY } from "../constants/InventoryCopy.constants";
import type { InventoryOverviewViewProps } from "../models/InventoryOverviewViewProps.interface";
import { INVENTORY_CATEGORY_LIST_CLASS } from "../styles/InventoryOverview.styles";

const InventoryCategoryList = ({
  inventoryPage,
}: InventoryOverviewViewProps): React.JSX.Element => {
  if (inventoryPage.items.length === 0) {
    return <Text>{INVENTORY_COPY.INVENTORY_EMPTY}</Text>;
  }

  const categoryItems = inventoryPage.items.map(
    (category) => ({
      id: category.id,
      text: <InventoryCategoryCard category={category} />,
    })
  );

  return (
    <UnorderedList
      variant={UNORDERED_LIST.VARIANTS.DEFAULT}
      className={INVENTORY_CATEGORY_LIST_CLASS}
      items={categoryItems}
    />
  );
};

export default InventoryCategoryList;
