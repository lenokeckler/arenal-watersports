import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import { ARIA_ROLE, TitleVariant } from "@/app/constants";
import InventoryCountForm from "./components/InventoryCountForm";
import { INVENTORY_COUNT_COPY } from "./constants/InventoryCountCopy.constants";
import type { InventoryCountCategory } from "./models/InventoryCountCategory.type";
import { getInventoryCountCategories } from "./services/getInventoryCountCategories";
import {
  INVENTORY_COUNT_ERROR_CLASS,
  INVENTORY_COUNT_HEADING_CLASS,
  INVENTORY_COUNT_NOTE_CLASS,
  INVENTORY_COUNT_PAGE_CLASS,
} from "./styles/InventoryCount.styles";

const InventoryCount =
  async (): Promise<React.JSX.Element> => {
    let categories: InventoryCountCategory[] = [];
    let hasLoadError = false;

    try {
      categories = await getInventoryCountCategories();
    } catch {
      hasLoadError = true;
    }

    return (
      <main className={INVENTORY_COUNT_PAGE_CLASS}>
        <Title
          variant={TitleVariant.PRIMARY}
          text={INVENTORY_COUNT_COPY.HEADING}
          className={INVENTORY_COUNT_HEADING_CLASS}
        />
        {hasLoadError ? (
          <Text
            className={INVENTORY_COUNT_ERROR_CLASS}
            role={ARIA_ROLE.ALERT}
          >
            {INVENTORY_COUNT_COPY.ERROR_LOAD}
          </Text>
        ) : categories.length === 0 ? (
          <Text className={INVENTORY_COUNT_NOTE_CLASS}>
            {INVENTORY_COUNT_COPY.EMPTY}
          </Text>
        ) : (
          <>
            <Text className={INVENTORY_COUNT_NOTE_CLASS}>
              {INVENTORY_COUNT_COPY.INTRO}
            </Text>
            <InventoryCountForm categories={categories} />
          </>
        )}
      </main>
    );
  };

export default InventoryCount;
