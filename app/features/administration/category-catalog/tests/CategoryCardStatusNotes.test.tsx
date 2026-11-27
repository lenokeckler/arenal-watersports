import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CategoryCard from "../components/CategoryCard";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { createCategoryCardPage } from "./CategoryCard.page";
import { DEFAULT_CATEGORY_CARD_VIEW_MODEL } from "./CategoryCardViewModel.constants";

describe("CategoryCard status notes", () => {
  it("shows the no image note under a reservable category without an image", () => {
    render(
      <CategoryCard {...DEFAULT_CATEGORY_CARD_VIEW_MODEL} />
    );

    expect(
      createCategoryCardPage().getStatusNote(
        CATEGORY_CATALOG_COPY.STATUS_NOTE_NO_IMAGE
      )
    ).toBeInTheDocument();
  });

  it("shows the not reservable note under a category that cannot be reserved", () => {
    render(
      <CategoryCard
        {...DEFAULT_CATEGORY_CARD_VIEW_MODEL}
        category={{
          ...DEFAULT_CATEGORY_CARD_VIEW_MODEL.category,
          isReservable: false,
        }}
      />
    );

    expect(
      createCategoryCardPage().getStatusNote(
        CATEGORY_CATALOG_COPY.STATUS_NOTE_NOT_RESERVABLE
      )
    ).toBeInTheDocument();
  });

  it("shows no note for a reservable category with an image", () => {
    render(
      <CategoryCard
        {...DEFAULT_CATEGORY_CARD_VIEW_MODEL}
        category={{
          ...DEFAULT_CATEGORY_CARD_VIEW_MODEL.category,
          hasImage: true,
        }}
      />
    );

    expect(
      createCategoryCardPage().getStatusNote(
        CATEGORY_CATALOG_COPY.STATUS_NOTE_NO_IMAGE
      )
    ).not.toBeInTheDocument();
  });
});
