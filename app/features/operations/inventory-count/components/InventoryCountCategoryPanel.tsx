import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/components/button/constants";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import {
  BUTTON_TYPES,
  INVENTORY_TRACKING_MODE,
  STRING,
  TitleVariant,
} from "@/app/constants";
import { INVENTORY_COUNT_COPY } from "../constants/InventoryCountCopy.constants";
import type { InventoryCountPanelProps } from "../models/InventoryCountPanelProps.interface";
import {
  INVENTORY_COUNT_ACTION_BUTTON_CLASS,
  INVENTORY_COUNT_ACTIONS_CLASS,
  INVENTORY_COUNT_BACK_BUTTON_CLASS,
  INVENTORY_COUNT_NOTE_CLASS,
  INVENTORY_COUNT_PANEL_CARD_CLASS,
  INVENTORY_COUNT_PANEL_HEADER_CLASS,
  INVENTORY_COUNT_SECTION_TITLE_CLASS,
} from "../styles/InventoryCount.styles";
import InventoryCountQuantityFields from "./InventoryCountQuantityFields";
import InventoryCountUnitRow from "./InventoryCountUnitRow";

const InventoryCountCategoryPanel = ({
  form,
}: InventoryCountPanelProps): React.JSX.Element | null => {
  const category = form.selectedCategory;

  if (category === null) {
    return null;
  }

  const isByUnit =
    category.trackingMode ===
    INVENTORY_TRACKING_MODE.BY_UNIT;

  return (
    <section className={INVENTORY_COUNT_PANEL_CARD_CLASS}>
      <div className={INVENTORY_COUNT_PANEL_HEADER_CLASS}>
        <Button
          type={BUTTON_TYPES.BUTTON}
          variant={BUTTON.BASE}
          className={INVENTORY_COUNT_BACK_BUTTON_CLASS}
          onClick={form.closeCategory}
        >
          {INVENTORY_COUNT_COPY.BACK}
        </Button>
        <Title
          variant={TitleVariant.SECONDARY}
          text={category.name}
          className={INVENTORY_COUNT_SECTION_TITLE_CLASS}
        />
        {!isByUnit && (
          <Text className={INVENTORY_COUNT_NOTE_CLASS}>
            {INVENTORY_COUNT_COPY.SYSTEM_SUMMARY(
              category.system.available,
              category.system.damaged,
              category.system.inRepair
            )}
          </Text>
        )}
      </div>
      {isByUnit ? (
        category.units.map((unit) => (
          <InventoryCountUnitRow
            key={unit.id}
            unit={unit}
            value={
              form.draft.unitStatuses[unit.id] ??
              STRING.Empty
            }
            onSelect={(status) =>
              form.setUnitStatus(
                category.id,
                unit.id,
                status
              )
            }
          />
        ))
      ) : (
        <InventoryCountQuantityFields
          categoryId={category.id}
          form={form}
          hasError={form.invalidCategoryIds.has(
            category.id
          )}
        />
      )}
      <div className={INVENTORY_COUNT_ACTIONS_CLASS}>
        {isByUnit && (
          <Button
            type={BUTTON_TYPES.BUTTON}
            variant={BUTTON.BASE}
            className={INVENTORY_COUNT_ACTION_BUTTON_CLASS}
            onClick={form.matchAll}
          >
            {INVENTORY_COUNT_COPY.MATCH_ALL}
          </Button>
        )}
        <Button
          type={BUTTON_TYPES.BUTTON}
          variant={BUTTON.PRIMARY}
          onClick={form.confirmCategory}
        >
          {INVENTORY_COUNT_COPY.CONFIRM_CATEGORY}
        </Button>
      </div>
    </section>
  );
};

export default InventoryCountCategoryPanel;
