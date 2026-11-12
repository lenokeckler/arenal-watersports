"use client";

import { Section, Text, Title } from "@/app/components";
import { TitleVariant } from "@/app/constants";
import { INVENTORY_COPY } from "../constants/InventoryCopy.constants";
import { INVENTORY_DOM_ID } from "../constants/InventoryDomId.constants";
import { useInventoryStockAdjustmentViewModel } from "../hooks/useInventoryStockAdjustmentViewModel";
import type { InventoryStockAdjustmentFormProps } from "../models/InventoryStockAdjustmentFormProps.interface";
import {
  INVENTORY_CATEGORY_SECTION_CLASS,
  INVENTORY_CATEGORY_SECTION_TITLE_CLASS,
  INVENTORY_STOCK_NOTICE_CLASS,
} from "../styles/InventoryCategory.styles";
import InventoryStockAdjustmentPanel from "./InventoryStockAdjustmentPanel";

const InventoryStockAdjustmentForm = ({
  category,
}: InventoryStockAdjustmentFormProps): React.JSX.Element => {
  const viewModel =
    useInventoryStockAdjustmentViewModel(category);

  return (
    <Section
      ariaLabel={INVENTORY_DOM_ID.STOCK_ADJUSTMENT}
      className={INVENTORY_CATEGORY_SECTION_CLASS}
    >
      <Title
        id={INVENTORY_DOM_ID.STOCK_ADJUSTMENT}
        variant={TitleVariant.SECONDARY}
        className={INVENTORY_CATEGORY_SECTION_TITLE_CLASS}
        text={INVENTORY_COPY.ADJUSTMENT_TITLE}
      />
      <Text className={INVENTORY_STOCK_NOTICE_CLASS}>
        {INVENTORY_COPY.ADJUSTMENT_DESCRIPTION}
      </Text>
      <InventoryStockAdjustmentPanel {...viewModel} />
    </Section>
  );
};

export default InventoryStockAdjustmentForm;
