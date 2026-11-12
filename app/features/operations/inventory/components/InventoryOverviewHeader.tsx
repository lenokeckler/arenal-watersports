import { Link, Text, Title } from "@/app/components";
import { PATHS, TitleVariant } from "@/app/constants";
import { INVENTORY_COPY } from "../constants/InventoryCopy.constants";
import {
  INVENTORY_OVERVIEW_COUNT_LINK_CLASS,
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
    <Link
      href={PATHS.OPERATIONS.INVENTORY_COUNT_NEW}
      className={INVENTORY_OVERVIEW_COUNT_LINK_CLASS}
    >
      {INVENTORY_COPY.NEW_COUNT}
    </Link>
    <Link
      href={PATHS.OPERATIONS.INVENTORY_COUNTS}
      className={INVENTORY_OVERVIEW_COUNT_LINK_CLASS}
    >
      {INVENTORY_COPY.COUNT_HISTORY}
    </Link>
  </header>
);

export default InventoryOverviewHeader;
