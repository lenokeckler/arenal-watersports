import { STATUS } from "@/app/constants";

export type Status = (typeof STATUS)[keyof typeof STATUS];

export interface typeToast {
  id: number;
  type: Status;
  message: string;
  duration?: number;
}

export interface ToastWithIcon extends typeToast {
  iconPath: string;
}
