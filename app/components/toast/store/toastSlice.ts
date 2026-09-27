import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { STORE_SLICES } from "@/app/constants";
import { ToastState } from "./ToastState.interface";
import { ToastWithIcon } from "@/app/components/toast/models/Toast.types";

const initialState: ToastState = {
  toasts: [],
};

const toastSlice = createSlice({
  name: STORE_SLICES.TOAST,
  initialState,
  reducers: {
    addToast: (
      state,
      action: PayloadAction<ToastWithIcon>
    ) => {
      state.toasts.push(action.payload);
    },
    removeToast: (state, action: PayloadAction<number>) => {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload
      );
    },
  },
});

export const toastActions = toastSlice.actions;

export default toastSlice.reducer;
