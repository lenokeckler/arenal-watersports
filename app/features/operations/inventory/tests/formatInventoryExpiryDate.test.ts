import { expect, it } from "vitest";
import { formatInventoryExpiryDate } from "../utils/formatInventoryExpiryDate";
import {
  EXPIRY_ALERT,
  EXPIRY_DATE_TEXT,
} from "./InventoryExpiryAlerts.constants";

it("writes the date of the day it was stored, whatever the timezone of the server", () => {
  expect(
    formatInventoryExpiryDate(EXPIRY_ALERT.expiryDate)
  ).toBe(EXPIRY_DATE_TEXT.DECEMBER_FIFTH);
});
