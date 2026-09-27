import { ToastWithIcon } from "./Toast.types";

export interface ToastProps {
  message: string;
  iconPath: string;
  onClose: () => void;
}

export interface ToastContainerProps {
  toasts: ToastWithIcon[];
  removeToast: (_id: number) => () => void;
}
