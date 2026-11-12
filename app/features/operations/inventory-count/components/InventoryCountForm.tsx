"use client";

import { useSyncExternalStore } from "react";
import type { InventoryCountFormProps } from "../models/InventoryCountFormProps.interface";
import InventoryCountFormContent from "./InventoryCountFormContent";

const subscribe = (): (() => void) => () => undefined;

const InventoryCountForm = (
  props: InventoryCountFormProps
): React.JSX.Element | null => {
  const isClient = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  return isClient ? (
    <InventoryCountFormContent {...props} />
  ) : null;
};

export default InventoryCountForm;
