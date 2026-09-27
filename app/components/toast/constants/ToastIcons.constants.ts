import { STATUS } from "@/app/constants";
import { Status } from "../models/Toast.types";

export const TOAST_ICONS: Record<Status, string> = {
  [STATUS.SUCCESS]: "/icons/success.svg",
  [STATUS.ERROR]: "/icons/error.svg",
  [STATUS.WARNING]: "/icons/warning.svg",
};
