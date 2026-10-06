import {
  INVENTORY_TRACKING_MODE,
  STORYBOOK_LAYOUT,
  STORYBOOK_TITLE,
} from "@/app/constants";
import mocks from "@/app/constants/storybook/storybookMocks.json";
import InventoryCounts from "./InventoryCounts";
import type { InventoryCountsProps } from "./models/InventoryCountsProps.interface";

const meta = {
  component: InventoryCounts,
  parameters: { layout: STORYBOOK_LAYOUT.FULLSCREEN },
  title: STORYBOOK_TITLE.INVENTORY_COUNTS,
};

export default meta;

export const Default = {
  args: {
    category: {
      ...mocks.inventoryCounts.quantity,
      trackingMode: INVENTORY_TRACKING_MODE.BY_QUANTITY,
    },
  } satisfies InventoryCountsProps,
};

export const ByUnit = {
  args: {
    category: {
      ...mocks.inventoryCounts.unit,
      trackingMode: INVENTORY_TRACKING_MODE.BY_UNIT,
    },
  } satisfies InventoryCountsProps,
};

export const Empty = {
  args: {
    category: {
      ...Default.args.category,
      available: 0,
      damaged: 0,
      inRepair: 0,
      total: 0,
    },
  } satisfies InventoryCountsProps,
};
