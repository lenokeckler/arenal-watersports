import type { Locator } from "@playwright/test";

export interface InventoryStockAdjustmentPage {
  fillAvailable: (value: string) => Promise<void>;
  fillDamaged: (value: string) => Promise<void>;
  fillInRepair: (value: string) => Promise<void>;
  getAuthor: (name: string) => Locator;
  getDate: () => Locator;
  getReason: (reason: string) => Locator;
  getRequiredReasonError: () => Locator;
  getSuccessMessage: () => Locator;
  save: () => Promise<void>;
  selectReason: (reason: string) => Promise<void>;
}
