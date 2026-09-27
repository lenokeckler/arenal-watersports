import { Language } from "@/app/types";
import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  STORE_SLICES,
  DEFAULT_LANGUAGE,
} from "@/app/constants";

interface LanguageState {
  currentLanguage: Language;
}

const initialState: LanguageState = {
  currentLanguage: DEFAULT_LANGUAGE,
};

const languageSlice = createSlice({
  name: STORE_SLICES.LANGUAGE,
  initialState,
  reducers: {
    setLanguage: (
      state,
      action: PayloadAction<Language>
    ) => {
      state.currentLanguage = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
