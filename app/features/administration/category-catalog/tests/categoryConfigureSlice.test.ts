import { describe, expect, it } from "vitest";
import { CATEGORY_CONFIGURE_SAVE_STATUS } from "../constants/CategoryConfigureSaveStatus.constants";
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

  it("opens several sections at once without repeating one that is open", () => {
    const state = reducer(
      initialCategoryConfigureState,
      categoryConfigureActions.openSections([
        CATEGORY_CONFIGURE_SECTION_ID.RESERVATIONS,
        CATEGORY_CONFIGURE_SECTION_ID.DEPOSIT,
      ])
    );

    expect(state.openSectionIds).toEqual([
      CATEGORY_CONFIGURE_SECTION_ID.RESERVATIONS,
      CATEGORY_CONFIGURE_SECTION_ID.DEPOSIT,
    ]);
  });

  it("keeps the save status and the leave prompt it is given", () => {
    const saving = reducer(
      initialCategoryConfigureState,
      categoryConfigureActions.setSaveStatus(
        CATEGORY_CONFIGURE_SAVE_STATUS.SAVING
      )
    );
    const prompted = reducer(
      saving,
      categoryConfigureActions.setIsLeavePromptOpen(true)
    );

    expect(prompted).toMatchObject({
      saveStatus: CATEGORY_CONFIGURE_SAVE_STATUS.SAVING,
      isLeavePromptOpen: true,
    });
  });

  it("goes back to the initial state on reset", () => {
    const edited = reducer(
      reducer(
        initialCategoryConfigureState,
        categoryConfigureActions.setIsLeavePromptOpen(true)
      ),
      categoryConfigureActions.toggleSection(
        CATEGORY_CONFIGURE_SECTION_ID.PHOTO
      )
    );

    expect(
      reducer(edited, categoryConfigureActions.reset())
    ).toEqual(initialCategoryConfigureState);
  });
});
