import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { STORE_SLICES } from "@/app/constants";
import { CATEGORY_CONFIGURE_INITIAL_OPEN_SECTION_IDS } from "../constants/CategoryConfigureSectionOrder.constants";
import type { CategoryConfigureSectionId } from "../models/CategoryConfigureSectionId.type";
import type { CategoryConfigureState } from "./CategoryConfigureState.interface";

export const initialCategoryConfigureState: CategoryConfigureState =
  {
    openSectionIds:
      CATEGORY_CONFIGURE_INITIAL_OPEN_SECTION_IDS,
  };

const categoryConfigureSlice = createSlice({
  name: STORE_SLICES.CATEGORY_CONFIGURE,
  initialState: initialCategoryConfigureState,
  reducers: {
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
