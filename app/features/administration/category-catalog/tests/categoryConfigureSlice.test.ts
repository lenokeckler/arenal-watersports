import { describe, expect, it } from "vitest";
import { CATEGORY_CONFIGURE_SECTION_ID } from "../constants/CategoryConfigureSectionId.constants";
import reducer, {
  categoryConfigureActions,
  initialCategoryConfigureState,
} from "../store/categoryConfigureSlice";

describe("categoryConfigureSlice", () => {
  it("starts with only the reservations section open", () => {
    expect(
      initialCategoryConfigureState.openSectionIds
    ).toEqual([CATEGORY_CONFIGURE_SECTION_ID.RESERVATIONS]);
  });

  it("opens a closed section", () => {
    const state = reducer(
      initialCategoryConfigureState,
      categoryConfigureActions.toggleSection(
        CATEGORY_CONFIGURE_SECTION_ID.PHOTO
      )
    );

    expect(state.openSectionIds).toEqual([
      CATEGORY_CONFIGURE_SECTION_ID.RESERVATIONS,
      CATEGORY_CONFIGURE_SECTION_ID.PHOTO,
    ]);
  });

  it("closes an open section", () => {
    const state = reducer(
      initialCategoryConfigureState,
      categoryConfigureActions.toggleSection(
        CATEGORY_CONFIGURE_SECTION_ID.RESERVATIONS
      )
    );

    expect(state.openSectionIds).toEqual([]);
  });
});
