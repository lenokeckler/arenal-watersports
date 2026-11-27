import { configureStore } from "@reduxjs/toolkit";
import type { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { STORE_SLICES } from "@/app/constants";
import categoryConfigureReducer from "../store/categoryConfigureSlice";

export const createCategoryConfigureStoreWrapper = () => {
  const store = configureStore({
    reducer: {
      [STORE_SLICES.CATEGORY_CONFIGURE]:
        categoryConfigureReducer,
    },
  });
  const wrapper = ({
    children,
  }: PropsWithChildren): React.JSX.Element => (
    <Provider store={store}>{children}</Provider>
  );

  return { store, wrapper };
};
