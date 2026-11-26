import { describe, expect, it } from "vitest";
import { CURRENCY_NAME_COPY } from "@/app/constants";
import { safeString } from "@/app/utils/safe-value/SafeValue";
import PriceLookupView from "../PriceLookupView";
import type { PriceLookupViewProps } from "../models/PriceLookupViewProps.interface";
import { PRICE_LOOKUP_COPY } from "../constants/PriceLookupCopy.constants";
import { buildPriceLookupScreen } from "../utils/buildPriceLookupScreen";
import {
  EMPTY_CATALOG,
  formatCrc,
  formatUsd,
  FULL_CATALOG,
  JET_SKI_RENTAL_CRC,
  JET_SKI_RENTAL_USD,
  JET_SKI_TARIFF,
  NATIONAL_COMBO,
  NATIONAL_COMBO_CRC,
  PARRILLA_CRC,
  PARRILLA_EXTRA,
  PARRILLA_USD,
  TUBING_USD,
  COMBO_ITEMS_TEXT,
  FOREIGN_COMBO,
  FOREIGN_COMBO_USD,
  JET_SKI_TOUR_USD,
} from "./PriceLookup.constants";
import { createPriceLookupPage } from "./PriceLookup.page";

const MONEY_MOVEMENT_PATTERN =
  /cobro|reembolso|devoluci[oó]n|dep[oó]sito/i;

const page = createPriceLookupPage();

const textOf = (element: HTMLElement): string =>
  safeString(element.textContent);

const renderView = (props: PriceLookupViewProps): void =>
  page.render(<PriceLookupView {...props} />);

const renderFullCatalog = (): void =>
  renderView({
    errorMessage: null,
    screen: buildPriceLookupScreen(FULL_CATALOG),
  });

describe("PriceLookupView tariffs", () => {
  it("lists each category with its rental and its tour on separate currency lines", () => {
    renderFullCatalog();

    const tariffs = page.getRegion(
      PRICE_LOOKUP_COPY.TARIFFS_HEADING
    );
    const [rental, tour] = page.getRows(
      tariffs,
      JET_SKI_TARIFF.categoryName
    );

    expect(rental).toHaveTextContent(
      PRICE_LOOKUP_COPY.RENTAL_LABEL
    );
    expect(textOf(rental)).toContain(
      `${CURRENCY_NAME_COPY.USD}${formatUsd(JET_SKI_RENTAL_USD)}`
    );
    expect(textOf(rental)).toContain(
      `${CURRENCY_NAME_COPY.CRC}${formatCrc(JET_SKI_RENTAL_CRC)}`
    );
    expect(tour).toHaveTextContent(
      PRICE_LOOKUP_COPY.TOUR_LABEL
    );
    expect(textOf(tour)).toContain(
      formatUsd(JET_SKI_TOUR_USD)
    );
    expect(tour).not.toHaveTextContent(
      CURRENCY_NAME_COPY.CRC
    );
  });

  it("says so when a type has no tariff", () => {
    renderView({
      errorMessage: null,
      screen: buildPriceLookupScreen({
        ...EMPTY_CATALOG,
        tariffs: [{ ...JET_SKI_TARIFF, tour: null }],
      }),
    });

    const [, tour] = page.getRows(
      page.getRegion(PRICE_LOOKUP_COPY.TARIFFS_HEADING),
      JET_SKI_TARIFF.categoryName
    );

    expect(tour).toHaveTextContent(
      PRICE_LOOKUP_COPY.NO_TARIFF
    );
  });
});

describe("PriceLookupView audience sections", () => {
  it("shows the nationals extras and combos in colones only", () => {
    renderFullCatalog();

    const nationals = page.getRegion(
      PRICE_LOOKUP_COPY.NATIONAL_HEADING
    );
    const [parrilla] = page.getRows(
      nationals,
      PRICE_LOOKUP_COPY.EXTRAS_HEADING
    );
    const [combo] = page.getRows(
      nationals,
      PRICE_LOOKUP_COPY.COMBOS_HEADING
    );

    expect(parrilla).toHaveTextContent(PARRILLA_EXTRA.name);
    expect(textOf(parrilla)).toContain(
      formatCrc(PARRILLA_CRC)
    );
    expect(textOf(parrilla)).not.toContain(
      formatUsd(PARRILLA_USD)
    );
    expect(combo).toHaveTextContent(NATIONAL_COMBO.name);
    expect(combo).toHaveTextContent(COMBO_ITEMS_TEXT);
    expect(textOf(combo)).toContain(
      formatCrc(NATIONAL_COMBO_CRC)
    );
  });

  it("shows the foreigners extras and combos in dollars only", () => {
    renderFullCatalog();

    const foreigners = page.getRegion(
      PRICE_LOOKUP_COPY.FOREIGN_HEADING
    );
    const extras = page.getRows(
      foreigners,
      PRICE_LOOKUP_COPY.EXTRAS_HEADING
    );
    const [combo] = page.getRows(
      foreigners,
      PRICE_LOOKUP_COPY.COMBOS_HEADING
    );

    expect(extras).toHaveLength(2);
    expect(
      extras.map((row) => row.textContent).join()
    ).toContain(formatUsd(TUBING_USD));
    expect(combo).toHaveTextContent(FOREIGN_COMBO.name);
    expect(textOf(combo)).toContain(
      formatUsd(FOREIGN_COMBO_USD)
    );
    expect(combo).not.toHaveTextContent(
      CURRENCY_NAME_COPY.CRC
    );
  });

  it("explains an audience with nothing to show", () => {
    renderView({
      errorMessage: null,
      screen: buildPriceLookupScreen({
        ...EMPTY_CATALOG,
        combos: [NATIONAL_COMBO],
      }),
    });

    const foreigners = page.getRegion(
      PRICE_LOOKUP_COPY.FOREIGN_HEADING
    );

    expect(foreigners).toHaveTextContent(
      PRICE_LOOKUP_COPY.EXTRAS_EMPTY
    );
    expect(foreigners).toHaveTextContent(
      PRICE_LOOKUP_COPY.COMBOS_EMPTY
    );
  });
});

describe("PriceLookupView states", () => {
  it("is read-only and shows no money movement", () => {
    renderFullCatalog();

    expect(page.countInteractiveElements()).toBe(0);
    expect(document.body.textContent).not.toMatch(
      MONEY_MOVEMENT_PATTERN
    );
  });

  it("says so when there is nothing to look up", () => {
    renderView({
      errorMessage: null,
      screen: buildPriceLookupScreen(EMPTY_CATALOG),
    });

    expect(
      page.getHeading(PRICE_LOOKUP_COPY.HEADING)
    ).toBeInTheDocument();
    expect(document.body).toHaveTextContent(
      PRICE_LOOKUP_COPY.EMPTY
    );
  });

  it("shows the error as an alert instead of the prices", () => {
    renderView({
      errorMessage: PRICE_LOOKUP_COPY.ERROR,
      screen: buildPriceLookupScreen(FULL_CATALOG),
    });

    expect(page.queryAlert()).toHaveTextContent(
      PRICE_LOOKUP_COPY.ERROR
    );
    expect(document.body).not.toHaveTextContent(
      PRICE_LOOKUP_COPY.TARIFFS_HEADING
    );
  });
});
