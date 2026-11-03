import { Text, Title } from "@/app/components";
import { TitleVariant } from "@/app/constants";
import { INVENTORY_COPY } from "../constants/InventoryCopy.constants";
import {
  INVENTORY_OVERVIEW_DESCRIPTION_CLASS,
  INVENTORY_OVERVIEW_HEADER_CLASS,
  INVENTORY_OVERVIEW_TITLE_CLASS,
} from "../styles/InventoryOverview.styles";

const InventoryOverviewHeader = (): React.JSX.Element => (
  <header className={INVENTORY_OVERVIEW_HEADER_CLASS}>
    <Title
      variant={TitleVariant.PRIMARY}
      className={INVENTORY_OVERVIEW_TITLE_CLASS}
      text={INVENTORY_COPY.TITLE}
    />
    <Text className={INVENTORY_OVERVIEW_DESCRIPTION_CLASS}>
      {INVENTORY_COPY.DESCRIPTION}
    </Text>
  </header>
);

export default InventoryOverviewHeader;
