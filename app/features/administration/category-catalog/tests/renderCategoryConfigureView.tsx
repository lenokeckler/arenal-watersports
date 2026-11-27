import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { STORE_SLICES } from "@/app/constants";
import CategoryConfigureView from "../CategoryConfigureView";
import type { CategoryConfiguration } from "../models/CategoryConfiguration.interface";
import categoryConfigureReducer from "../store/categoryConfigureSlice";
import { DEFAULT_CATEGORY_CONFIGURATION } from "./CategoryConfiguration.constants";

export const renderCategoryConfigureView = (
  configuration: CategoryConfiguration = DEFAULT_CATEGORY_CONFIGURATION
) =>
  render(
    <Provider
      store={configureStore({
        reducer: {
          [STORE_SLICES.CATEGORY_CONFIGURE]:
            categoryConfigureReducer,
        },
      })}
    >
      <CategoryConfigureView
        configuration={configuration}
      />
    </Provider>
  );
