export const LOGIN_NOTICE_QUERY_PARAM = "notice";

export const LOGIN_NOTICE = {
  PASSWORD_RECOVERED: "password-recovered",
} as const;

export type LoginNotice =
  (typeof LOGIN_NOTICE)[keyof typeof LOGIN_NOTICE];
