import { refreshMock } from "./tariffList.harness";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { TARIFF_CATALOG_COPY } from "../constants/TariffCatalogCopy.constants";
import TariffListView from "../TariffListView";
import {
  buildCatalogRow,
  DEFAULT_CATALOG_ROW,
  FAKE_CATEGORY_NAME,
  SECOND_CATEGORY_ID,
  SECOND_CATEGORY_NAME,
} from "./TariffCatalog.constants";
import { createTariffListPage } from "./TariffList.page";

const MISSING_FILTER_NAME = new RegExp(
  `^${TARIFF_CATALOG_COPY.FILTER_MISSING}`
);

const getMissingFilter = () =>
  screen.getByRole(ARIA_ROLE.BUTTON, {
    name: MISSING_FILTER_NAME,
  });

describe("TariffListView filters", () => {
  beforeEach(() => {
    refreshMock.mockClear();
  });

  it("shows only the categories missing a tariff after choosing that filter", async () => {
    const user = userEvent.setup();
    render(
      <TariffListView
        categories={[
          DEFAULT_CATALOG_ROW,
          buildCatalogRow({
            categoryId: SECOND_CATEGORY_ID,
            categoryName: SECOND_CATEGORY_NAME,
            tour: null,
          }),
        ]}
        fetchFailed={false}
      />
    );
    const page = createTariffListPage();

    await user.click(getMissingFilter());

    expect(getMissingFilter()).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    expect(page.queryCard(FAKE_CATEGORY_NAME)).toBeNull();
    expect(
      page.queryCard(SECOND_CATEGORY_NAME)
    ).toBeInTheDocument();
  });

  it("tells that every category has its tariffs when none is missing", async () => {
    const user = userEvent.setup();
    render(
      <TariffListView
        categories={[DEFAULT_CATALOG_ROW]}
        fetchFailed={false}
      />
    );

    await user.click(getMissingFilter());

    expect(
      screen.getByText(
        TARIFF_CATALOG_COPY.FILTER_MISSING_EMPTY
      )
    ).toBeInTheDocument();
  });

  it("links back to the home screen", () => {
    render(
      <TariffListView
        categories={[DEFAULT_CATALOG_ROW]}
        fetchFailed={false}
      />
    );

    expect(
      screen.getByRole(ARIA_ROLE.LINK, {
        name: new RegExp(
          TARIFF_CATALOG_COPY.BACK_TO_HOME,
          "i"
        ),
      })
    ).toHaveAttribute("href", PATHS.HOME);
  });

  it("shows no filters when there are no categories", () => {
    render(
      <TariffListView
        categories={[]}
        fetchFailed={false}
      />
    );

    expect(
      screen.queryByRole(ARIA_ROLE.BUTTON, {
        name: MISSING_FILTER_NAME,
      })
    ).toBeNull();
  });
});
