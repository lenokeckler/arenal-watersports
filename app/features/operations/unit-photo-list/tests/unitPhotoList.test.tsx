import {
  cleanup,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { mapPhotoUnit } from "@/app/services/equipment/mapPhotoUnit";
import UnitPhotoListView from "../UnitPhotoListView";
import { UNIT_PHOTO_LIST_COPY } from "../constants/UnitPhotoListCopy.constants";
import { pagePhotoUnits } from "../utils/pagePhotoUnits";
import {
  LIST_PHOTO_ROW,
  LIST_UNITS,
  PHOTO_COVER,
} from "./unitPhotoList.constants";

describe("state photo list rules", () => {
  it("counts only the basic angles and keeps the category photo", () => {
    expect(mapPhotoUnit(LIST_PHOTO_ROW)).toMatchObject({
      basicCount: 2,
      imagePath: null,
    });
  });

  it("pages twelve machines and ignores forged parameters", () => {
    const page = pagePhotoUnits(
      LIST_UNITS,
      "unknown",
      "99"
    );

    expect(page).toMatchObject({
      categoryId: null,
      page: 1,
      pageCount: 2,
    });
    expect(page.units).toHaveLength(12);
  });

  it("filters by category", () => {
    const page = pagePhotoUnits(
      LIST_UNITS,
      "kayak",
      undefined
    );

    expect(page.categoryId).toBe("kayak");
    expect(page.units).toHaveLength(1);
    expect(
      page.categories.map((category) => category.name)
    ).toEqual(["Jet Ski", "Kayak"]);
  });
});

describe("UnitPhotoListView", () => {
  afterEach(cleanup);

  it("opens the photos of each machine and shows its progress", () => {
    render(
      <UnitPhotoListView
        data={{
          categories: [],
          categoryId: null,
          items: [
            { ...LIST_UNITS[0], coverUrl: PHOTO_COVER },
          ],
          page: 1,
          pageCount: 1,
        }}
        errorMessage={null}
      />
    );

    expect(
      screen.getByRole(ARIA_ROLE.LINK, { name: /JS-0/ })
    ).toHaveAttribute(
      "href",
      PATHS.OPERATIONS.UNIT_PHOTOS(LIST_UNITS[0].id)
    );
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "value",
      "1"
    );
    expect(
      screen.getByRole(ARIA_ROLE.IMG, {
        name: UNIT_PHOTO_LIST_COPY.COVER_ALT("JS-0"),
      })
    ).toBeInTheDocument();
  });

  it("shows the error", () => {
    render(
      <UnitPhotoListView
        data={null}
        errorMessage={UNIT_PHOTO_LIST_COPY.FORBIDDEN}
      />
    );

    expect(
      screen.getByRole(ARIA_ROLE.ALERT)
    ).toHaveTextContent(UNIT_PHOTO_LIST_COPY.FORBIDDEN);
  });
});
