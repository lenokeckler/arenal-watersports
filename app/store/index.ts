import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./slices/languageSlice";
import { STORE_SLICES } from "./constants";
import toastReducer from "@/app/components/toast/store/toastSlice";
import sessionReducer from "@/app/components/session/store/sessionSlice";

export const store = configureStore({
  reducer: {
    [STORE_SLICES.LANGUAGE]: languageReducer,
    [STORE_SLICES.TOAST]: toastReducer,
    [STORE_SLICES.SESSION]: sessionReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { setLanguage } from "./slices/languageSlice";
export { default as languageReducer } from "./slices/languageSlice";
export { useLanguage } from "./useLanguage";
export { toastActions } from "@/app/components/toast/store/toastSlice";
export { sessionActions } from "@/app/components/session/store/sessionSlice";
