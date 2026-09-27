import { useCallback } from "react";
import { ToastFactory } from "./ToastFactory";
import { Status } from "../models/Toast.types";
import { toastActions, RootState } from "@/app/store";
import { useSelector, useDispatch } from "react-redux";
import { useCheckDeviceWidth } from "@/app/components/check-device-width";

export function useToast() {
  const toasts = useSelector(
    (state: RootState) => state.toast.toasts
  );
  const dispatch = useDispatch();
  const { isMobile } = useCheckDeviceWidth();

  const showToast = useCallback(
    (type: Status, message: string, duration?: number) => {
      const toast = ToastFactory.create(
        type,
        message,
        duration
      );

      dispatch(toastActions.addToast(toast));

      setTimeout(() => {
        dispatch(toastActions.removeToast(toast.id));
      }, toast.duration);
    },
    [dispatch]
  );

  const removeToast = useCallback(
    (id: number) => {
      dispatch(toastActions.removeToast(id));
    },
    [dispatch]
  );

  const handleRemoveToast = (id: number) => () =>
    removeToast(id);

  return {
    toasts,
    showToast,
    removeToast,
    isMobile,
    handleRemoveToast,
  };
}
