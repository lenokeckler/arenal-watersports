import {
  LOGIN_NOTICE,
  type LoginNotice,
} from "@/app/constants";
import { LOGIN_FORM_COPY } from "./LoginFormCopy.constants";

export const LOGIN_NOTICE_CHOICES: readonly LoginNotice[] =
  Object.values(LOGIN_NOTICE);

export const LOGIN_NOTICE_MESSAGE: Record<
  LoginNotice,
  string
> = {
  [LOGIN_NOTICE.PASSWORD_RECOVERED]:
    LOGIN_FORM_COPY.PASSWORD_RECOVERED_NOTICE,
};
