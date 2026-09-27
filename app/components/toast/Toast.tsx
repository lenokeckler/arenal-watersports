import { ToastProps } from "./models/ToastProps.interface";
import {
  ICON_PATHS,
  ICON_ALTS,
  ARIA_LABEL,
} from "@/app/constants";
import { Icon, Button, Image } from "@/app/components";
import {
  TOAST_CLASS,
  TOAST_CLOSE_BUTTON_CLASS,
  TOAST_ICON_CLASS,
  TOAST_ICON_WRAPPER_CLASS,
  TOAST_MESSAGE_CLASS,
} from "./styles/Toast.styles";

export default function Toast({
  message,
  iconPath,
  onClose,
}: ToastProps) {
  return (
    <div className={TOAST_CLASS}>
      <div className={TOAST_ICON_WRAPPER_CLASS}>
        <Icon
          src={iconPath}
          alt={ICON_ALTS.TOAST_ICON}
          width={30}
          height={30}
          priority
          aria-hidden
          className={TOAST_ICON_CLASS}
        ></Icon>
      </div>
      <div className={TOAST_MESSAGE_CLASS}>{message}</div>
      <Button
        onClick={onClose}
        aria-label={ARIA_LABEL.CLOSE_TOAST}
        className={TOAST_CLOSE_BUTTON_CLASS}
      >
        <Image
          src={ICON_PATHS.X_MODAL}
          alt={ICON_ALTS.CLOSE_TOAST_ICON}
          width={20}
          height={20}
          aria-hidden
          priority
        />
      </Button>
    </div>
  );
}
