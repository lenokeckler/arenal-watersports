import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  CALENDAR_VIEW,
  STORE_SLICES,
} from "@/app/constants";
import type { CalendarState } from "./CalendarState.interface";

const initialState: CalendarState = {
  anchor: null,
  selectedView: CALENDAR_VIEW.DAY,
  preferenceError: null,
};

const calendarSlice = createSlice({
  name: STORE_SLICES.CALENDAR,
  initialState,
  reducers: {
    setSelectedView: (
      state,
      action: PayloadAction<CalendarState["selectedView"]>
    ) => {
      state.selectedView = action.payload;
    },
    setAnchor: (
      state,
      action: PayloadAction<CalendarState["anchor"]>
    ) => {
      state.anchor = action.payload;
    },
    setPreferenceError: (
      state,
      action: PayloadAction<
        CalendarState["preferenceError"]
      >
    ) => {
      state.preferenceError = action.payload;
    },
  },
});

export const calendarActions = calendarSlice.actions;
export default calendarSlice.reducer;
