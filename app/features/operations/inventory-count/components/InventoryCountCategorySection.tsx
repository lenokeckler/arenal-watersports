import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import {
  INVENTORY_TRACKING_MODE,
  STRING,
  TitleVariant,
} from "@/app/constants";
import { INVENTORY_COUNT_COPY } from "../constants/InventoryCountCopy.constants";
import type { InventoryCountCategorySectionProps } from "../models/InventoryCountCategorySectionProps.interface";
import {
  INVENTORY_COUNT_NOTE_CLASS,
  INVENTORY_COUNT_SECTION_CLASS,
  INVENTORY_COUNT_SECTION_TITLE_CLASS,
} from "../styles/InventoryCount.styles";
import InventoryCountQuantityFields from "./InventoryCountQuantityFields";
import InventoryCountUnitRow from "./InventoryCountUnitRow";

const InventoryCountCategorySection = ({
  category,
  form,
}: InventoryCountCategorySectionProps): React.JSX.Element => (
  <section className={INVENTORY_COUNT_SECTION_CLASS}>
    <Title
      variant={TitleVariant.SECONDARY}
      text={category.name}
      className={INVENTORY_COUNT_SECTION_TITLE_CLASS}
    />
    {category.trackingMode ===
    INVENTORY_TRACKING_MODE.BY_UNIT ? (
      category.units.map((unit) => (
        <InventoryCountUnitRow
          key={unit.id}
          unit={unit}
          value={
            form.draft.unitStatuses[unit.id] ?? STRING.Empty
          }
          onChange={form.handleUnitStatusChange(unit.id)}
        />
      ))
    ) : (
      <>
        <Text className={INVENTORY_COUNT_NOTE_CLASS}>
          {INVENTORY_COUNT_COPY.SYSTEM_SUMMARY(
            category.system.available,
            category.system.damaged,
            category.system.inRepair
          )}
        </Text>
        <InventoryCountQuantityFields
          categoryId={category.id}
          form={form}
          hasError={form.invalidCategoryIds.has(
            category.id
          )}
        />
      </>
    )}
  </section>
);

export default InventoryCountCategorySection;
