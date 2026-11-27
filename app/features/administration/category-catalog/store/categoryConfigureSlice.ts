import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { STORE_SLICES } from "@/app/constants";
import {
  CATEGORY_CONFIGURE_SAVE_STATUS,
  type CategoryConfigureSaveStatus,
} from "../constants/CategoryConfigureSaveStatus.constants";
import { CATEGORY_CONFIGURE_INITIAL_OPEN_SECTION_IDS } from "../constants/CategoryConfigureSectionOrder.constants";
import type { CategoryConfigureSectionId } from "../models/CategoryConfigureSectionId.type";
import type { CategoryConfigureState } from "./CategoryConfigureState.interface";

export const initialCategoryConfigureState: CategoryConfigureState =
  {
    openSectionIds:
      CATEGORY_CONFIGURE_INITIAL_OPEN_SECTION_IDS,
    saveStatus: CATEGORY_CONFIGURE_SAVE_STATUS.IDLE,
    isLeavePromptOpen: false,
  };

const categoryConfigureSlice = createSlice({
  name: STORE_SLICES.CATEGORY_CONFIGURE,
  initialState: initialCategoryConfigureState,
  reducers: {
    openSections: (
      state,
      action: PayloadAction<CategoryConfigureSectionId[]>
    ) => {
      state.openSectionIds = [
        ...new Set([
          ...state.openSectionIds,
          ...action.payload,
        ]),
      ];
    },
    reset: () => initialCategoryConfigureState,
    setIsLeavePromptOpen: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isLeavePromptOpen = action.payload;
    },
    setSaveStatus: (
      state,
      action: PayloadAction<CategoryConfigureSaveStatus>
    ) => {
      state.saveStatus = action.payload;
    },
    toggleSection: (
      state,
      action: PayloadAction<CategoryConfigureSectionId>
    ) => {
      state.openSectionIds = state.openSectionIds.includes(
        action.payload
      )
        ? state.openSectionIds.filter(
            (sectionId) => sectionId !== action.payload
          )
        : [...state.openSectionIds, action.payload];
    },
  },
});

export const categoryConfigureActions =
  categoryConfigureSlice.actions;

export default categoryConfigureSlice.reducer;
