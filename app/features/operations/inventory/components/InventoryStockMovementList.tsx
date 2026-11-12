import { UnorderedList } from "@/app/components";
import { UNORDERED_LIST } from "@/app/constants";
import type { InventoryStockMovementListProps } from "../models/InventoryStockMovementListProps.interface";
import { INVENTORY_MOVEMENT_LIST_CLASS } from "../styles/InventoryCategory.styles";
import InventoryStockMovementCard from "./InventoryStockMovementCard";

const InventoryStockMovementList = ({
  movements,
}: InventoryStockMovementListProps): React.JSX.Element => (
  <UnorderedList
    variant={UNORDERED_LIST.VARIANTS.PLAIN}
    className={INVENTORY_MOVEMENT_LIST_CLASS}
    items={movements.map((movement) => ({
      id: movement.id,
      text: (
        <InventoryStockMovementCard movement={movement} />
      ),
    }))}
  />
);

export default InventoryStockMovementList;
