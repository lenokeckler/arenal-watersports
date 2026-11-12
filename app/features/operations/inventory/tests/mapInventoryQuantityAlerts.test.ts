import { expect, it } from "vitest";
import { mapInventoryQuantityAlerts } from "../utils/mapInventoryQuantityAlerts";
import {
  QUANTITY_ALERT,
  QUANTITY_ALERT_ROW,
} from "./InventoryQuantityAlerts.constants";

it("maps the alert rows of the database", () => {
  expect(
    mapInventoryQuantityAlerts([QUANTITY_ALERT_ROW])
  ).toEqual([QUANTITY_ALERT]);
});

it("leaves out a row with a missing value", () => {
  expect(
    mapInventoryQuantityAlerts([
      { ...QUANTITY_ALERT_ROW, category_id: null },
      { ...QUANTITY_ALERT_ROW, alert_min_quantity: null },
      { ...QUANTITY_ALERT_ROW, quantity_available: null },
    ])
  ).toEqual([]);
});
