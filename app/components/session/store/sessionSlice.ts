import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { STORE_SLICES } from "@/app/constants";

interface SessionState {
  hasActiveUser: boolean;
}

const initialState: SessionState = {
  hasActiveUser: false,
};

const sessionSlice = createSlice({
  name: STORE_SLICES.SESSION,
  initialState,
  reducers: {
    setHasActiveUser: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.hasActiveUser = action.payload;
    },
    resetSession: () => ({ ...initialState }),
  },
});

export const sessionActions = sessionSlice.actions;
export default sessionSlice.reducer;
