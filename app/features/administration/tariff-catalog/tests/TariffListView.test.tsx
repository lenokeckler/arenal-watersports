import { refreshMock } from "./tariffList.harness";
import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { TARIFF_CATALOG_COPY } from "../constants/TariffCatalogCopy.constants";
import TariffListView from "../TariffListView";
import type { TariffListViewProps } from "../models/TariffListViewProps.interface";
import {
  buildCatalogRow,
  DEFAULT_CATALOG_ROW,
  FAKE_CATEGORY_ID,
  FAKE_CATEGORY_NAME,
  FORMATTED_BOTH_AMOUNTS,
  FORMATTED_TOUR_USD,
  SECOND_CATEGORY_ID,
  SECOND_CATEGORY_NAME,
} from "./TariffCatalog.constants";
import { resolveTariffEditPath } from "../utils/resolveTariffEditPath";
import { createTariffListPage } from "./TariffList.page";

const HREF_ATTRIBUTE = "href";
const LINES_WITH_TARIFF = 2;
const LINES_WITH_TARIFF_AFTER_MISSING_TOUR = 1;

const renderTariffListView = (
  overrides: Partial<TariffListViewProps> = {}
): void => {
  render(
    <TariffListView
      categories={[DEFAULT_CATALOG_ROW]}
      fetchFailed={false}
      {...overrides}
    />
  );
};

describe("TariffListView", () => {
  beforeEach(() => {
    refreshMock.mockClear();
  });

  it("titles the screen and shows a card per category with its amounts per hour", () => {
    renderTariffListView({
      categories: [
        DEFAULT_CATALOG_ROW,
        buildCatalogRow({
          categoryId: SECOND_CATEGORY_ID,
          categoryName: SECOND_CATEGORY_NAME,
        }),
      ],
    });
    const tariffListPage = createTariffListPage();

    expect(tariffListPage.getTitle()).toBeInTheDocument();
    expect(
      tariffListPage.queryCard(SECOND_CATEGORY_NAME)
    ).toBeInTheDocument();
    [
      TARIFF_CATALOG_COPY.TYPE_LABEL_RENTAL,
      TARIFF_CATALOG_COPY.TYPE_LABEL_TOUR,
      FORMATTED_BOTH_AMOUNTS,
      FORMATTED_TOUR_USD,
    ].forEach((text) => {
      expect(
        tariffListPage.queryCardText(
          FAKE_CATEGORY_NAME,
          text
        )
      ).toBeInTheDocument();
    });
    expect(
      tariffListPage.queryCardUnits(FAKE_CATEGORY_NAME)
    ).toHaveLength(LINES_WITH_TARIFF);
  });

  it("links each card to the edit form of its category", () => {
    renderTariffListView();
    const tariffListPage = createTariffListPage();

    expect(
      tariffListPage.getEditLink(FAKE_CATEGORY_NAME)
    ).toHaveAttribute(
      HREF_ATTRIBUTE,
      resolveTariffEditPath(FAKE_CATEGORY_ID)
    );
  });

  it("shows no tariff without the unit for a missing tariff", () => {
    renderTariffListView({
      categories: [buildCatalogRow({ tour: null })],
    });
    const tariffListPage = createTariffListPage();

    expect(
      tariffListPage.queryCardText(
        FAKE_CATEGORY_NAME,
        TARIFF_CATALOG_COPY.NO_TARIFF
      )
    ).toBeInTheDocument();
    expect(
      tariffListPage.queryCardUnits(FAKE_CATEGORY_NAME)
    ).toHaveLength(LINES_WITH_TARIFF_AFTER_MISSING_TOUR);
  });

  it("shows the empty message when there are no active categories", () => {
    renderTariffListView({ categories: [] });
    const tariffListPage = createTariffListPage();

    expect(
      tariffListPage.queryEmptyMessage()
    ).toBeInTheDocument();
  });

  it("shows the fetch error and refreshes on retry", async () => {
    renderTariffListView({
      categories: [],
      fetchFailed: true,
    });
    const tariffListPage = createTariffListPage();

    expect(
      tariffListPage.queryErrorMessage()
    ).toBeInTheDocument();
    await tariffListPage.clickRetry();

    expect(refreshMock).toHaveBeenCalledOnce();
  });
});
