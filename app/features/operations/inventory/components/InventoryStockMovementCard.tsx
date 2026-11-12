import { INVENTORY_MOVEMENT_CARD_CLASS } from "../styles/InventoryCategory.styles";
import type { InventoryStockMovementCardProps } from "../models/InventoryStockMovementCardProps.interface";
import InventoryStockMovementMetadata from "./InventoryStockMovementMetadata";
import InventoryStockMovementChanges from "./InventoryStockMovementChanges";

const InventoryStockMovementCard = ({
  movement,
}: InventoryStockMovementCardProps): React.JSX.Element => (
  <article className={INVENTORY_MOVEMENT_CARD_CLASS}>
    <InventoryStockMovementMetadata movement={movement} />
    <InventoryStockMovementChanges movement={movement} />
  </article>
);

export default InventoryStockMovementCard;
