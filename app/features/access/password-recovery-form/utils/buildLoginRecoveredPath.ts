import {
  LOGIN_NOTICE,
  LOGIN_NOTICE_QUERY_PARAM,
  PATHS,
} from "@/app/constants";
import { appendQueryParam } from "@/app/utils/pathname/appendQueryParam";

export const buildLoginRecoveredPath = (): string =>
  appendQueryParam(
    PATHS.ACCESS.LOGIN,
    LOGIN_NOTICE_QUERY_PARAM,
    LOGIN_NOTICE.PASSWORD_RECOVERED
  );
