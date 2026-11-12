import { expect, it } from "vitest";
import { mapInventoryExpiryAlerts } from "../utils/mapInventoryExpiryAlerts";
import {
  EXPIRY_ALERT,
  EXPIRY_ALERT_ROW,
} from "./InventoryExpiryAlerts.constants";

it("maps the alert rows of the database", () => {
  expect(
    mapInventoryExpiryAlerts([EXPIRY_ALERT_ROW])
  ).toEqual([EXPIRY_ALERT]);
});

it("leaves out a row with a missing value", () => {
  expect(
    mapInventoryExpiryAlerts([
      { ...EXPIRY_ALERT_ROW, category_id: null },
      { ...EXPIRY_ALERT_ROW, alert_expiry_days: null },
      { ...EXPIRY_ALERT_ROW, expiry_date: null },
      { ...EXPIRY_ALERT_ROW, is_expired: null },
    ])
  ).toEqual([]);
});
