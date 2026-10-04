import {
  STORYBOOK_LAYOUT,
  STORYBOOK_TITLE,
} from "@/app/constants";
import InventoryErrorView from "./InventoryErrorView";
import type { InventoryErrorViewProps } from "./models/InventoryErrorViewProps.interface";

const resetInventoryPreview = (): void => undefined;

const meta = {
  component: InventoryErrorView,
  parameters: { layout: STORYBOOK_LAYOUT.FULLSCREEN },
  title: STORYBOOK_TITLE.INVENTORY_ERROR,
};

export default meta;

export const Default = {
  args: {
    reset: resetInventoryPreview,
  } satisfies InventoryErrorViewProps,
};
