import {
  Status,
  ToastWithIcon,
} from "../models/Toast.types";
import { TOAST_ICONS } from "../constants/ToastIcons.constants";

export class ToastFactory {
  static create(
    type: Status,
    message: string,
    duration = 3000
  ): ToastWithIcon {
    return {
      id: Date.now(),
      type,
      message,
      duration,
      iconPath: TOAST_ICONS[type],
    };
  }
}
