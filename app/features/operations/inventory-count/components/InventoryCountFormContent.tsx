"use client";

import Text from "@/app/components/text/Text";
import { INVENTORY_COUNT_COPY } from "../constants/InventoryCountCopy.constants";
import { useInventoryCountForm } from "../hooks/useInventoryCountForm";
import type { InventoryCountFormProps } from "../models/InventoryCountFormProps.interface";
import {
  INVENTORY_COUNT_FORM_CLASS,
  INVENTORY_COUNT_PANEL_CLASS,
  INVENTORY_COUNT_PROGRESS_CLASS,
  INVENTORY_COUNT_SIDE_CLASS,
  INVENTORY_COUNT_SUMMARY_WRAPPER_CLASS,
} from "../styles/InventoryCount.styles";
import InventoryCountCategoryList from "./InventoryCountCategoryList";
import InventoryCountCategoryPanel from "./InventoryCountCategoryPanel";
import InventoryCountSummary from "./InventoryCountSummary";

const InventoryCountFormContent = (
  props: InventoryCountFormProps
): React.JSX.Element => {
  const form = useInventoryCountForm(props);
  const isOpen = form.isPanelOpen;
  const panelState = isOpen ? "open" : "closed";

  return (
    <form
      className={INVENTORY_COUNT_FORM_CLASS}
      onSubmit={form.handleSubmit}
    >
      <div
        className={INVENTORY_COUNT_SIDE_CLASS[panelState]}
      >
        <Text className={INVENTORY_COUNT_PROGRESS_CLASS}>
          {INVENTORY_COUNT_COPY.PROGRESS(
            props.categories.length - form.pendingCount,
            props.categories.length
          )}
        </Text>
        <InventoryCountCategoryList
          categories={props.categories}
          form={form}
        />
      </div>
      <div
        className={INVENTORY_COUNT_PANEL_CLASS[panelState]}
      >
        <InventoryCountCategoryPanel form={form} />
      </div>
      <div
        className={
          INVENTORY_COUNT_SUMMARY_WRAPPER_CLASS[panelState]
        }
      >
        <InventoryCountSummary form={form} />
      </div>
    </form>
  );
};

export default InventoryCountFormContent;
