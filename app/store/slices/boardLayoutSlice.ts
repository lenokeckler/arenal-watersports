import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  DEFAULT_BOARD_LAYOUT,
  STORE_SLICES,
  type BoardLayoutColumns,
} from "@/app/constants";
import type {
  BoardLayoutCard,
  BoardLayoutPreference,
  NullableRef,
} from "@/app/types";
import type { BoardLayoutState } from "./BoardLayoutState.interface";

const initialState: BoardLayoutState = {
  ...DEFAULT_BOARD_LAYOUT,
  cards: [],
};

const boardLayoutSlice = createSlice({
  name: STORE_SLICES.BOARD_LAYOUT,
  initialState,
  reducers: {
    setCards: (
      state,
      action: PayloadAction<BoardLayoutCard[]>
    ) => {
      state.cards = action.payload;
    },
    setColumns: (
      state,
      action: PayloadAction<NullableRef<BoardLayoutColumns>>
    ) => {
      state.columns = action.payload;
    },
    setOrder: (state, action: PayloadAction<string[]>) => {
      state.order = action.payload;
    },
    setPreference: (
      state,
      action: PayloadAction<BoardLayoutPreference>
    ) => {
      state.columns = action.payload.columns;
      state.order = action.payload.order;
    },
  },
});

export const boardLayoutActions = boardLayoutSlice.actions;
export default boardLayoutSlice.reducer;
