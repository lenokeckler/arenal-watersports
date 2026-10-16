import { LOGIN_NOTICE, PATHS } from "@/app/constants";
import { LOGIN_FORM_COPY } from "../constants/LoginFormCopy.constants";

export const UNKNOWN_LOGIN_NOTICE = "<script>";

export const ARRAY_LOGIN_NOTICE = [
  LOGIN_NOTICE.PASSWORD_RECOVERED,
  LOGIN_NOTICE.PASSWORD_RECOVERED,
];

export const RECOVERED_URL = `${PATHS.ACCESS.LOGIN}?notice=${LOGIN_NOTICE.PASSWORD_RECOVERED}`;

export const RECOVERED_NOTICE =
  LOGIN_FORM_COPY.PASSWORD_RECOVERED_NOTICE;

export const LOGIN_FORM_TEST_ID = "login-form";
export const LOGIN_NOTICE_ATTRIBUTE = "data-notice";
export const HREF_ATTRIBUTE = "href";
