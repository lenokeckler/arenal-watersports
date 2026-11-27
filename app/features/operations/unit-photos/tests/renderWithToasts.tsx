import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { Provider } from "react-redux";
import { CheckDeviceWidth_Provider } from "@/app/components/check-device-width";
import ToastContainer from "@/app/components/toast/ToastContainers";
import { store, toastActions } from "@/app/store";

export const renderWithToasts = (
  ui: ReactElement
): ReturnType<typeof render> =>
  render(
    <Provider store={store}>
      <CheckDeviceWidth_Provider>
        {ui}
        <ToastContainer />
      </CheckDeviceWidth_Provider>
    </Provider>
  );

export const clearToasts = (): void => {
  store
    .getState()
    .toast.toasts.forEach((toast) =>
      store.dispatch(toastActions.removeToast(toast.id))
    );
};
