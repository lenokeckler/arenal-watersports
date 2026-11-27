import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import { resolveAlertsSummary } from "../utils/resolveAlertsSummary";
import { resolveDepositSummary } from "../utils/resolveDepositSummary";
import { resolveTraitsSummary } from "../utils/resolveTraitsSummary";
import {
  DEFAULT_CATEGORY_CONFIGURATION,
  FAKE_CONFIGURATION_ALERT_QUANTITY,
  FAKE_CONFIGURATION_DEPOSIT_USD,
  FAKE_INVALID_AMOUNT_TEXT,
} from "./CategoryConfiguration.constants";
import { createCategoryConfigureViewPage } from "./CategoryConfigureView.page";
import { renderCategoryConfigureView } from "./renderCategoryConfigureView";

const { behavior, deposit, alerts } =
  DEFAULT_CATEGORY_CONFIGURATION;
const {
  DEPOSIT_CRC_FIELD_LABEL,
  DEPOSIT_USD_FIELD_LABEL,
  HAS_MOTOR_FIELD_LABEL,
  CONSUMES_FUEL_FIELD_LABEL,
  LOW_FUEL_LINES_FIELD_LABEL,
  USAGE_METRIC_FIELD_LABEL,
} = CATEGORY_CATALOG_COPY;
const {
  ALERTS_EXPIRY_FIELD_LABEL,
  ALERTS_QUANTITY_FIELD_LABEL,
  ALERTS_TYPE_BOTH,
  ALERTS_TYPE_EXPIRY,
  ALERTS_TYPE_LABEL,
  ALERTS_TYPE_QUANTITY,
  DEPOSIT_HELP,
  SECTION_ALERTS,
  SECTION_DEPOSIT,
  SECTION_TRAITS,
} = CATEGORY_CONFIGURE_COPY;

describe("CategoryConfigureDetails", () => {
  it("follows the deposit amounts in the summary and ignores text that is not a number", async () => {
    renderCategoryConfigureView();
    const page = createCategoryConfigureViewPage();

    await page.toggleSection(SECTION_DEPOSIT);
    await page.fillField(
      DEPOSIT_USD_FIELD_LABEL,
      FAKE_CONFIGURATION_DEPOSIT_USD.toString()
    );
    await page.fillField(
      DEPOSIT_CRC_FIELD_LABEL,
      FAKE_INVALID_AMOUNT_TEXT
    );

    expect(page.getText(DEPOSIT_HELP)).toBeInTheDocument();
    expect(
      page.getText(
        resolveDepositSummary({
          ...deposit,
          depositUsd: FAKE_CONFIGURATION_DEPOSIT_USD,
        })
      )
    ).toBeInTheDocument();
  });

  it("shows the number field of the chosen alert type and follows it in the summary", async () => {
    renderCategoryConfigureView();
    const page = createCategoryConfigureViewPage();

    await page.toggleSection(SECTION_ALERTS);
    expect(
      page.getField(ALERTS_QUANTITY_FIELD_LABEL)
    ).not.toBeInTheDocument();

    await page.clickChip(ALERTS_TYPE_QUANTITY);
    await page.fillField(
      ALERTS_QUANTITY_FIELD_LABEL,
      FAKE_CONFIGURATION_ALERT_QUANTITY.toString()
    );
    expect(
      page.getText(
        resolveAlertsSummary({
          ...alerts,
          alertMinQuantity:
            FAKE_CONFIGURATION_ALERT_QUANTITY,
        })
      )
    ).toBeInTheDocument();

    await page.clickChip(ALERTS_TYPE_EXPIRY);
    expect(
      page.getField(ALERTS_QUANTITY_FIELD_LABEL)
    ).not.toBeInTheDocument();
    expect(
      page.getField(ALERTS_EXPIRY_FIELD_LABEL)
    ).toBeInTheDocument();
  });

  it("selects only Ambos and shows both number fields when both alerts are chosen", async () => {
    renderCategoryConfigureView();
    const page = createCategoryConfigureViewPage();

    await page.toggleSection(SECTION_ALERTS);
    await page.clickChip(ALERTS_TYPE_BOTH);

    expect(
      page.getField(ALERTS_QUANTITY_FIELD_LABEL)
    ).toBeInTheDocument();
    expect(
      page.getField(ALERTS_EXPIRY_FIELD_LABEL)
    ).toBeInTheDocument();
    expect(page.getChip(ALERTS_TYPE_BOTH)).toHaveAttribute(
      "aria-pressed",
      STRING.TRUE
    );
    expect(
      page.getChip(ALERTS_TYPE_QUANTITY)
    ).toHaveAttribute("aria-pressed", STRING.FALSE);
    expect(
      page.getChip(ALERTS_TYPE_EXPIRY)
    ).toHaveAttribute("aria-pressed", STRING.FALSE);
  });

  it("names the alert type group after its visible label", async () => {
    renderCategoryConfigureView();
    const page = createCategoryConfigureViewPage();

    await page.toggleSection(SECTION_ALERTS);

    expect(
      page.getGroup(ALERTS_TYPE_LABEL)
    ).toBeInTheDocument();
  });

  it("keeps the motor and fuel rules and follows the traits in the summary", async () => {
    renderCategoryConfigureView();
    const page = createCategoryConfigureViewPage();

    await page.toggleSection(SECTION_TRAITS);
    expect(
      page.getField(LOW_FUEL_LINES_FIELD_LABEL)
    ).toBeInTheDocument();
    expect(
      page.getField(USAGE_METRIC_FIELD_LABEL)
    ).toBeEnabled();

    await page.clickField(HAS_MOTOR_FIELD_LABEL);
    await page.clickField(CONSUMES_FUEL_FIELD_LABEL);

    expect(
      page.getField(USAGE_METRIC_FIELD_LABEL)
    ).toBeDisabled();
    expect(
      page.getField(LOW_FUEL_LINES_FIELD_LABEL)
    ).not.toBeInTheDocument();
    expect(
      page.getText(
        resolveTraitsSummary({
          ...behavior,
          hasMotor: false,
          consumesFuel: false,
        })
      )
    ).toBeInTheDocument();
  });
});
