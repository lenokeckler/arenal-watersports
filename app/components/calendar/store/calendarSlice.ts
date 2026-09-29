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
    setCalendar: (
      _state,
      action: PayloadAction<CalendarState>
    ) => action.payload,
  },
});

export const calendarActions = calendarSlice.actions;
export default calendarSlice.reducer;
