import { describe, expect, it } from "vitest";
import { mapCategoryRowToAlerts } from "../utils/mapCategoryRowToAlerts";
import { mapUpdateCategoryAlertsInputToRow } from "../utils/mapUpdateCategoryAlertsInputToRow";
import {
  ALERT_ROW_COLUMNS,
  buildUpdateCategoryAlertsInput,
  INPUT_WITHOUT_ALERTS,
  DEFAULT_CATEGORY_ALERTS,
  DEFAULT_EXPIRY_DAYS,
  DEFAULT_MIN_QUANTITY,
  FAKE_ALERT_ADMIN_WORKER_ID,
} from "./CategoryAlerts.constants";
import {
  buildCategoryAlertsRow,
  DEFAULT_CATEGORY_ALERTS_ROW,
} from "./CategoryAlertsRow.constants";

describe("mapCategoryRowToAlerts", () => {
  it("maps the row columns to the alerts", () => {
    expect(
      mapCategoryRowToAlerts(DEFAULT_CATEGORY_ALERTS_ROW)
    ).toEqual(DEFAULT_CATEGORY_ALERTS);
  });

  it("keeps null columns as null", () => {
    const alerts = mapCategoryRowToAlerts(
      buildCategoryAlertsRow({
        alert_min_quantity: null,
        alert_expiry_days: null,
      })
    );

    expect(alerts.alertMinQuantity).toBeNull();
    expect(alerts.alertExpiryDays).toBeNull();
  });
});

describe("mapUpdateCategoryAlertsInputToRow", () => {
  it("maps only the two alert columns and the signer", () => {
    const row = mapUpdateCategoryAlertsInputToRow(
      buildUpdateCategoryAlertsInput(),
      FAKE_ALERT_ADMIN_WORKER_ID
    );

    expect(Object.keys(row).sort()).toEqual(
      ALERT_ROW_COLUMNS
    );
    expect(row.updated_by).toBe(FAKE_ALERT_ADMIN_WORKER_ID);
  });

  it("puts each alert value in its own column", () => {
    const row = mapUpdateCategoryAlertsInputToRow(
      buildUpdateCategoryAlertsInput(),
      FAKE_ALERT_ADMIN_WORKER_ID
    );

    expect(row).toEqual({
      alert_min_quantity: DEFAULT_MIN_QUANTITY,
      alert_expiry_days: DEFAULT_EXPIRY_DAYS,
      updated_by: FAKE_ALERT_ADMIN_WORKER_ID,
    });
  });

  it("sends explicit nulls for missing values", () => {
    const row = mapUpdateCategoryAlertsInputToRow(
      INPUT_WITHOUT_ALERTS,
      FAKE_ALERT_ADMIN_WORKER_ID
    );

    expect(row.alert_min_quantity).toBeNull();
    expect(row.alert_expiry_days).toBeNull();
  });
});
