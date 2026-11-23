import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Provider } from "react-redux";
import { vi } from "vitest";
import { CheckDeviceWidth_Provider } from "@/app/components/check-device-width";
import toastReducer from "@/app/components/toast/store/toastSlice";
import { STORE_SLICES } from "@/app/constants";
import CategoryConfigureView from "../CategoryConfigureView";
import type { CategoryConfiguration } from "../models/CategoryConfiguration.interface";
import categoryConfigureReducer from "../store/categoryConfigureSlice";
import { DEFAULT_CATEGORY_CONFIGURATION } from "./CategoryConfiguration.constants";

const FAKE_BFCACHE_ID = "fake-bfcache-id";

export const categoryConfigureRouter = {
  back: vi.fn(),
  bfcacheId: FAKE_BFCACHE_ID,
  forward: vi.fn(),
  prefetch: vi.fn(),
  push: vi.fn(),
  refresh: vi.fn(),
  replace: vi.fn(),
};

export const renderCategoryConfigureView = (
  configuration: CategoryConfiguration = DEFAULT_CATEGORY_CONFIGURATION
) => {
  const store = configureStore({
    reducer: {
      [STORE_SLICES.CATEGORY_CONFIGURE]:
        categoryConfigureReducer,
      [STORE_SLICES.TOAST]: toastReducer,
    },
  });

  render(
    <Provider store={store}>
      <AppRouterContext.Provider
        value={categoryConfigureRouter}
      >
        <CheckDeviceWidth_Provider>
          <CategoryConfigureView
            configuration={configuration}
          />
        </CheckDeviceWidth_Provider>
      </AppRouterContext.Provider>
    </Provider>
  );

  return store;
};
